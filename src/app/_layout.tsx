import { Stack } from "expo-router";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";

export default function Layout() {

  return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="#000" barStyle="light-content" />
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
  );
}
