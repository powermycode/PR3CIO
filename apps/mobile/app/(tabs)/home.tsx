import { useEffect, useMemo, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { Platform } from "react-native";
import { usePlayback } from "../../src/hooks/usePlayback";
import { useStreamAnalytics } from "../../src/hooks/useStreamAnalytics";
import { apiFetch } from "../../src/lib/api";
import { API_URL } from "../../src/lib/constants";
import { supabase } from "../../src/lib/supabase";

interface FeedTrack {
  id: string;
  title: string;
  genre: string;
  publishedAt: string;
}

export default function HomeScreen() {
  const [tracks, setTracks] = useState<FeedTrack[]>([]);
  const sessionId = useMemo(() => `session-${Math.random().toString(36).slice(2)}`, []);
  const { sendEvent } = useStreamAnalytics();

  const playback = usePlayback((secondsPlayed, completionRate, completed) => {
    const active = tracks[0];
    if (!active) {
      return;
    }

    void sendEvent({
      trackId: active.id,
      sessionId,
      secondsPlayed,
      completionRate,
      completed,
      source: Platform.OS === "android" ? "MOBILE_ANDROID" : "MOBILE_IOS"
    });
  });

  useEffect(() => {
    apiFetch<{ trending: FeedTrack[] }>("/feed/home")
      .then((data) => setTracks(data.trending ?? []))
      .catch(() => setTracks([]));
  }, []);

  const playTrack = async (trackId: string) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      if (!token) {
        throw new Error("Missing access token");
      }

      await playback.load({
        uri: `${API_URL}/tracks/${trackId}/stream-manifest`,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } catch (error) {
      Alert.alert("Playback unavailable", error instanceof Error ? error.message : "Unknown error");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#000" }} contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Text style={{ color: "#fff", fontSize: 24, fontWeight: "700" }}>Trending OGs</Text>
      {tracks.map((track) => (
        <View
          key={track.id}
          style={{
            backgroundColor: "#101010",
            borderColor: "#232323",
            borderWidth: 1,
            borderRadius: 12,
            padding: 14,
            gap: 8
          }}
        >
          <Text style={{ color: "#fff", fontSize: 17, fontWeight: "600" }}>{track.title}</Text>
          <Text style={{ color: "#9f9f9f" }}>{track.genre}</Text>
          <Pressable
            onPress={() => void playTrack(track.id)}
            style={{ backgroundColor: "#6f2bff", borderRadius: 10, padding: 10 }}
          >
            <Text style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>Play</Text>
          </Pressable>
        </View>
      ))}

      <Pressable onPress={() => void playback.toggle()} style={{ borderColor: "#383838", borderWidth: 1, borderRadius: 10, padding: 12 }}>
        <Text style={{ color: "#fff", textAlign: "center" }}>{playback.isPlaying ? "Pause" : "Resume"}</Text>
      </Pressable>
    </ScrollView>
  );
}
