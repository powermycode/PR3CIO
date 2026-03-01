import { Alert, Pressable, ScrollView, Text, View } from "react-native";
import { useAuthSession } from "../../src/hooks/useAuthSession";

export default function ProfileScreen() {
  const { session, signOut } = useAuthSession();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      Alert.alert("Sign out error", error instanceof Error ? error.message : "Unknown error");
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#000" }} contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Text style={{ color: "#fff", fontSize: 24, fontWeight: "700" }}>Profile</Text>
      <View style={{ borderWidth: 1, borderColor: "#272727", borderRadius: 12, padding: 14, gap: 6 }}>
        <Text style={{ color: "#fff", fontWeight: "600" }}>{session?.user?.email ?? "Guest"}</Text>
        <Text style={{ color: "#9a9a9a" }}>Role and account details are synced from /auth/session.</Text>
      </View>
      <Pressable onPress={() => void handleSignOut()} style={{ borderColor: "#3a3a3a", borderWidth: 1, borderRadius: 10, padding: 12 }}>
        <Text style={{ color: "#fff", textAlign: "center" }}>Sign Out</Text>
      </Pressable>
    </ScrollView>
  );
}
