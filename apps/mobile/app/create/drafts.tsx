import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

const DRAFT_KEY = "pr3cio_ai_drafts";

export default function DraftsScreen() {
  const [projectIds, setProjectIds] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(DRAFT_KEY)
      .then((value: string | null) => {
        setProjectIds(value ? (JSON.parse(value) as string[]) : []);
      })
      .catch(() => setProjectIds([]));
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#000" }} contentContainerStyle={{ padding: 16, gap: 10 }}>
      <Text style={{ color: "#fff", fontSize: 24, fontWeight: "700" }}>Draft Projects</Text>

      {projectIds.map((projectId: string) => (
        <Pressable
          key={projectId}
          onPress={() => router.push(`/create/${projectId}`)}
          style={{ borderColor: "#303030", borderWidth: 1, borderRadius: 10, padding: 12 }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>{projectId}</Text>
        </Pressable>
      ))}

      {!projectIds.length && (
        <View style={{ borderWidth: 1, borderColor: "#272727", borderRadius: 10, padding: 14 }}>
          <Text style={{ color: "#9b9b9b" }}>No drafts yet. Generate one in Create Studio.</Text>
        </View>
      )}
    </ScrollView>
  );
}
