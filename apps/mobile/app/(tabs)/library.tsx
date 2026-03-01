import { ScrollView, Text, View } from "react-native";

export default function LibraryScreen() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#000" }} contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Text style={{ color: "#fff", fontSize: 24, fontWeight: "700" }}>Library</Text>
      <View style={{ borderWidth: 1, borderColor: "#272727", borderRadius: 12, padding: 14 }}>
        <Text style={{ color: "#fff", fontWeight: "600" }}>Liked Songs</Text>
        <Text style={{ color: "#9a9a9a" }}>Synced from /tracks/:id/like</Text>
      </View>
      <View style={{ borderWidth: 1, borderColor: "#272727", borderRadius: 12, padding: 14 }}>
        <Text style={{ color: "#fff", fontWeight: "600" }}>Following Artists</Text>
        <Text style={{ color: "#9a9a9a" }}>Synced from /follows/:artistId</Text>
      </View>
      <View style={{ borderWidth: 1, borderColor: "#272727", borderRadius: 12, padding: 14 }}>
        <Text style={{ color: "#fff", fontWeight: "600" }}>Playlists</Text>
        <Text style={{ color: "#9a9a9a" }}>Backed by Playlist + PlaylistTrack</Text>
      </View>
    </ScrollView>
  );
}
