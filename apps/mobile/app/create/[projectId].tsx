import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { useLocalSearchParams } from "expo-router";
import { Alert, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useAiProjectPolling } from "../../src/hooks/useAiProjectPolling";
import { apiFetch } from "../../src/lib/api";
import { requestVocalUpload, uploadFileWithSignedUrl } from "../../src/lib/storage";

export default function ProjectDetailsScreen() {
  const { projectId } = useLocalSearchParams<{ projectId: string }>();
  const { project, loading } = useAiProjectPolling(projectId, Boolean(projectId));
  const [trackTitle, setTrackTitle] = useState("Untitled OG");
  const [genre, setGenre] = useState("hip-hop");

  const uploadVocal = async () => {
    if (!projectId) {
      return;
    }

    const picked = await DocumentPicker.getDocumentAsync({ type: "audio/*", copyToCacheDirectory: true });
    if (picked.canceled || !picked.assets[0]) {
      return;
    }

    const { uploadUrl } = await requestVocalUpload(projectId);
    await uploadFileWithSignedUrl(uploadUrl, picked.assets[0].uri, picked.assets[0].mimeType ?? "audio/wav");

    Alert.alert("Upload complete", "Vocal uploaded successfully.");
  };

  const merge = async () => {
    if (!projectId || !project?.instrumentalKey || !project?.vocalKey) {
      Alert.alert("Missing stems", "Instrumental and vocal keys are required before merge.");
      return;
    }

    await apiFetch(`/ai/projects/${projectId}/merge-enhance`, {
      method: "POST",
      body: JSON.stringify({
        instrumentalKey: project.instrumentalKey,
        vocalKey: project.vocalKey
      })
    });

    Alert.alert("Merge queued", "Enhancement job queued successfully.");
  };

  const publish = async () => {
    try {
      if (!project?.finalMasterKey) {
        Alert.alert("Final master missing", "Run Merge & Enhance before publishing.");
        return;
      }

      const upload = await apiFetch<{ trackId: string }>("/tracks/upload-url", {
        method: "POST",
        body: JSON.stringify({
          title: trackTitle,
          genre,
          contentType: "audio/wav",
          sourceKey: project.finalMasterKey
        })
      });

      await apiFetch(`/tracks/${upload.trackId}/process-hls`, { method: "POST" });

      try {
        await apiFetch(`/tracks/${upload.trackId}/publish`, {
          method: "POST",
          body: JSON.stringify({
            isOriginal: true,
            copyrightDeclared: true,
            termsAccepted: true
          })
        });
        Alert.alert("Published", "Your OG track has been published.");
      } catch (publishError) {
        Alert.alert(
          "Processing queued",
          `HLS processing started for track ${upload.trackId}. Publish will succeed once status is READY.`
        );
        void publishError;
      }
    } catch (error) {
      Alert.alert("Publish failed", error instanceof Error ? error.message : "Unknown error");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#000" }} contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Text style={{ color: "#fff", fontSize: 24, fontWeight: "700" }}>Project {projectId}</Text>
      <Text style={{ color: "#9d9d9d" }}>Status: {loading ? "Loading..." : project?.status ?? "Unknown"}</Text>

      <View style={{ borderColor: "#2e2e2e", borderWidth: 1, borderRadius: 10, padding: 12, gap: 8 }}>
        <Text style={{ color: "#fff" }}>Lyrics</Text>
        <Text style={{ color: "#b0b0b0" }}>{project?.generatedLyrics ?? "Not generated yet"}</Text>
      </View>

      <Pressable onPress={() => void uploadVocal()} style={{ backgroundColor: "#1f1f1f", borderRadius: 10, padding: 12 }}>
        <Text style={{ color: "#fff", textAlign: "center" }}>Upload Vocal Track</Text>
      </Pressable>

      <Pressable onPress={() => void merge()} style={{ backgroundColor: "#272727", borderRadius: 10, padding: 12 }}>
        <Text style={{ color: "#fff", textAlign: "center" }}>Merge & Enhance</Text>
      </Pressable>

      <TextInput
        value={trackTitle}
        onChangeText={setTrackTitle}
        placeholder="Track title"
        placeholderTextColor="#777"
        style={{ borderColor: "#2d2d2d", borderWidth: 1, borderRadius: 10, color: "#fff", padding: 10 }}
      />
      <TextInput
        value={genre}
        onChangeText={setGenre}
        placeholder="Genre"
        placeholderTextColor="#777"
        style={{ borderColor: "#2d2d2d", borderWidth: 1, borderRadius: 10, color: "#fff", padding: 10 }}
      />

      <Pressable onPress={() => void publish()} style={{ backgroundColor: "#6f2bff", borderRadius: 10, padding: 12 }}>
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>Publish OG</Text>
      </Pressable>
    </ScrollView>
  );
}
