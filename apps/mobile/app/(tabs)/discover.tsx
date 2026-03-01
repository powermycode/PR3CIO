import { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { apiFetch } from "../../src/lib/api";

interface DiscoverTrack {
  id: string;
  title: string;
  genre: string;
}

export default function DiscoverScreen() {
  const [query, setQuery] = useState("");
  const [tracks, setTracks] = useState<DiscoverTrack[]>([]);

  useEffect(() => {
    apiFetch<{ newReleases: DiscoverTrack[] }>("/feed/home")
      .then((data) => setTracks(data.newReleases ?? []))
      .catch(() => setTracks([]));
  }, []);

  const filtered = tracks.filter((track) =>
    `${track.title} ${track.genre}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#000" }} contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Text style={{ color: "#fff", fontSize: 24, fontWeight: "700" }}>Discover</Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search artists or songs"
        placeholderTextColor="#777"
        style={{
          borderWidth: 1,
          borderColor: "#333",
          borderRadius: 10,
          color: "#fff",
          paddingHorizontal: 12,
          paddingVertical: 10
        }}
      />
      {filtered.map((track) => (
        <View key={track.id} style={{ borderWidth: 1, borderColor: "#242424", borderRadius: 10, padding: 12 }}>
          <Text style={{ color: "#fff", fontWeight: "600" }}>{track.title}</Text>
          <Text style={{ color: "#9b9b9b" }}>{track.genre}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
