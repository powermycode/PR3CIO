import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#050505" },
        headerTintColor: "#f5f5f5",
        tabBarStyle: { backgroundColor: "#050505", borderTopColor: "#1a1a1a" },
        tabBarActiveTintColor: "#7a3cff",
        tabBarInactiveTintColor: "#8c8c8c"
      }}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="discover" options={{ title: "Discover" }} />
      <Tabs.Screen name="create" options={{ title: "Create" }} />
      <Tabs.Screen name="library" options={{ title: "Library" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
