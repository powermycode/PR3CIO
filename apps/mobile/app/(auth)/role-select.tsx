import { Alert, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import type { UserRole } from "@pr3cio/types";
import { useAuthSession } from "../../src/hooks/useAuthSession";
import { apiFetch } from "../../src/lib/api";

const roles: UserRole[] = ["LISTENER", "ARTIST", "ADMIN"];

export default function RoleSelectScreen() {
  const { session } = useAuthSession();

  const selectRole = async (role: UserRole) => {
    if (!session?.user?.id || !session.user.email) {
      Alert.alert("Session missing", "Please sign in again.");
      return;
    }

    await apiFetch("/auth/session", {
      method: "POST",
      body: JSON.stringify({
        supabaseUserId: session.user.id,
        email: session.user.email,
        role,
        displayName: session.user.user_metadata?.full_name ?? session.user.email.split("@")[0]
      })
    });

    if (role === "ARTIST") {
      router.replace("/artist/onboarding");
      return;
    }

    router.replace("/(tabs)/home");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000", padding: 24, justifyContent: "center", gap: 14 }}>
      <Text style={{ color: "#fff", fontSize: 26, fontWeight: "700" }}>Choose account role</Text>
      {roles.map((role) => (
        <Pressable
          key={role}
          onPress={() => void selectRole(role)}
          style={{ backgroundColor: "#101010", borderWidth: 1, borderColor: "#2f2f2f", borderRadius: 12, padding: 16 }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>{role}</Text>
        </Pressable>
      ))}
    </View>
  );
}
