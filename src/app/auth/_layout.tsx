import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      edges={["top", "left", "right"]} // Exclude bottom edge
    >
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none", // Disables transitions (fade/zoom)
        }}
      />
    </SafeAreaView>
  );
}
