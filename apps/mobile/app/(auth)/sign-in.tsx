import { Alert, Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { useAuthSession } from "../../src/hooks/useAuthSession";

export default function SignInScreen() {
  const { signInWithProvider } = useAuthSession();

  const signIn = async (provider: "google" | "apple") => {
    try {
      await signInWithProvider(provider);
      router.replace("/(auth)/role-select");
    } catch (error) {
      Alert.alert("Sign in failed", error instanceof Error ? error.message : "Unknown error");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#000", padding: 24, justifyContent: "center", gap: 16 }}>
      <Text style={{ color: "#fff", fontSize: 32, fontWeight: "700" }}>PR3CIO</Text>
      <Text style={{ color: "#a0a0a0", fontSize: 16 }}>Original music + AI creation platform.</Text>

      <Pressable
        onPress={() => void signIn("google")}
        style={{ backgroundColor: "#6f2bff", padding: 14, borderRadius: 12 }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>Continue with Google</Text>
      </Pressable>

      <Pressable
        onPress={() => void signIn("apple")}
        style={{ borderColor: "#333", borderWidth: 1, padding: 14, borderRadius: 12 }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>Continue with Apple</Text>
      </Pressable>
    </View>
  );
}
