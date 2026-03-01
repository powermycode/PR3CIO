import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";

export default function CreateTabScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#000", padding: 24, justifyContent: "center", gap: 16 }}>
      <Text style={{ color: "#fff", fontSize: 26, fontWeight: "700" }}>AI Studio</Text>
      <Text style={{ color: "#9b9b9b" }}>Generate lyrics + instrumentals, upload vocals, merge, then publish.</Text>

      <Pressable onPress={() => router.push("/create")} style={{ backgroundColor: "#6f2bff", padding: 14, borderRadius: 12 }}>
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>Open Create Studio</Text>
      </Pressable>
    </View>
  );
}
