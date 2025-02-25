import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";

export default function Layout() {
  return (
    <>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <Stack screenOptions={{ headerShown: false, animation: 'none' }} />
    </>
  );
}
