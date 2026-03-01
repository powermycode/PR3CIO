import { useState } from "react";
import { router } from "expo-router";
import { Alert, Pressable, ScrollView, Text, TextInput } from "react-native";
import { apiFetch } from "../../src/lib/api";

export default function ArtistOnboardingScreen() {
  const [stageName, setStageName] = useState("");
  const [bio, setBio] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");
  const [genres, setGenres] = useState("hip-hop");

  const submit = async () => {
    try {
      await apiFetch("/artists/onboarding", {
        method: "POST",
        body: JSON.stringify({
          stageName,
          bio,
          instagramUrl: instagramUrl || undefined,
          youtubeUrl: youtubeUrl || undefined,
          tiktokUrl: tiktokUrl || undefined,
          genres: genres
            .split(",")
            .map((value: string) => value.trim())
            .filter(Boolean)
        })
      });

      router.replace("/(tabs)/home");
    } catch (error) {
      Alert.alert("Onboarding failed", error instanceof Error ? error.message : "Unknown error");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#000" }} contentContainerStyle={{ padding: 16, gap: 10 }}>
      <Text style={{ color: "#fff", fontSize: 24, fontWeight: "700" }}>Artist Onboarding</Text>
      <Text style={{ color: "#8f8f8f" }}>Publishing requires OG upload + original work declaration.</Text>

      <FormInput label="Stage Name" value={stageName} onChangeText={setStageName} />
      <FormInput label="Bio" value={bio} onChangeText={setBio} multiline />
      <FormInput label="Instagram URL" value={instagramUrl} onChangeText={setInstagramUrl} />
      <FormInput label="YouTube URL" value={youtubeUrl} onChangeText={setYoutubeUrl} />
      <FormInput label="TikTok URL" value={tiktokUrl} onChangeText={setTiktokUrl} />
      <FormInput label="Genres (comma separated)" value={genres} onChangeText={setGenres} />

      <Pressable onPress={() => void submit()} style={{ backgroundColor: "#6f2bff", borderRadius: 10, padding: 12 }}>
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>Complete Onboarding</Text>
      </Pressable>
    </ScrollView>
  );
}

function FormInput(props: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <>
      <Text style={{ color: "#cfcfcf" }}>{props.label}</Text>
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        multiline={props.multiline}
        numberOfLines={props.multiline ? 4 : 1}
        style={{
          borderColor: "#2f2f2f",
          borderWidth: 1,
          borderRadius: 10,
          color: "#fff",
          paddingHorizontal: 12,
          paddingVertical: 10,
          minHeight: props.multiline ? 90 : undefined,
          textAlignVertical: props.multiline ? "top" : "center"
        }}
      />
    </>
  );
}
