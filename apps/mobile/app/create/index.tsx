import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { apiClient } from "../../src/lib/api";

const DRAFT_KEY = "pr3cio_ai_drafts";

export default function CreateStudioScreen() {
  const [mood, setMood] = useState("cinematic");
  const [genre, setGenre] = useState("hip-hop");
  const [theme, setTheme] = useState("ambition");
  const [customLyrics, setCustomLyrics] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const onGenerate = async () => {
    setSubmitting(true);
    try {
      const result = await apiClient.generateAI({
        mood,
        genre,
        theme,
        customLyrics: customLyrics || undefined
      });

      const projectId = result.data.projectId;
      const previous = await AsyncStorage.getItem(DRAFT_KEY);
      const ids = previous ? (JSON.parse(previous) as string[]) : [];
      if (!ids.includes(projectId)) {
        ids.unshift(projectId);
        await AsyncStorage.setItem(DRAFT_KEY, JSON.stringify(ids.slice(0, 20)));
      }

      router.push(`/create/${projectId}`);
    } catch (error) {
      Alert.alert("Generation failed", error instanceof Error ? error.message : "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#000" }} contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Text style={{ color: "#fff", fontSize: 24, fontWeight: "700" }}>Create OG with AI</Text>

      <Input label="Mood" value={mood} onChangeText={setMood} />
      <Input label="Genre" value={genre} onChangeText={setGenre} />
      <Input label="Theme" value={theme} onChangeText={setTheme} />
      <Input label="Custom Lyrics (optional)" value={customLyrics} onChangeText={setCustomLyrics} multiline />

      <Pressable
        onPress={() => void onGenerate()}
        disabled={submitting}
        style={{ backgroundColor: "#6f2bff", borderRadius: 10, padding: 12, opacity: submitting ? 0.7 : 1 }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>
          {submitting ? "Generating..." : "Generate Draft"}
        </Text>
      </Pressable>

      <Pressable onPress={() => router.push("/create/drafts")} style={{ borderColor: "#383838", borderWidth: 1, borderRadius: 10, padding: 12 }}>
        <Text style={{ color: "#fff", textAlign: "center" }}>Open Drafts</Text>
      </Pressable>
    </ScrollView>
  );
}

function Input(props: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  multiline?: boolean;
}) {
  return (
    <View style={{ gap: 8 }}>
      <Text style={{ color: "#d8d8d8" }}>{props.label}</Text>
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        multiline={props.multiline}
        numberOfLines={props.multiline ? 4 : 1}
        style={{
          color: "#fff",
          borderColor: "#2d2d2d",
          borderWidth: 1,
          borderRadius: 10,
          paddingHorizontal: 12,
          paddingVertical: 10,
          minHeight: props.multiline ? 100 : undefined,
          textAlignVertical: props.multiline ? "top" : "center"
        }}
      />
    </View>
  );
}
