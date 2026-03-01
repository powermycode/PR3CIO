import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#050505" },
        headerTintColor: "#f5f5f5",
        contentStyle: { backgroundColor: "#000000" }
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)/sign-in" options={{ title: "Sign In" }} />
      <Stack.Screen name="(auth)/role-select" options={{ title: "Select Role" }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="create/index" options={{ title: "AI Studio" }} />
      <Stack.Screen name="create/drafts" options={{ title: "Draft Projects" }} />
      <Stack.Screen name="create/[projectId]" options={{ title: "Project" }} />
      <Stack.Screen name="artist/onboarding" options={{ title: "Artist Onboarding" }} />
    </Stack>
  );
}
