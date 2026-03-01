import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";
import { useAuthSession } from "../src/hooks/useAuthSession";

export default function IndexRoute() {
  const { loading, session } = useAuthSession();

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#000", alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color="#7a3cff" />
      </View>
    );
  }

  return <Redirect href={session ? "/(tabs)/home" : "/(auth)/sign-in"} />;
}
