import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ 
      headerShown: false, 
      animation: "none" // Disables transitions (fade/zoom)
    }} />
  );
}
