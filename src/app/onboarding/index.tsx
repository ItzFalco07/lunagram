import {
  Text,
  View,
  TouchableNativeFeedback,
  Platform,
  Animated,
} from "react-native";
import Man from "@/assets/images/onboarding/man";
import ManBg from "@/assets/images/onboarding/manbg";
import Message from "@/assets/images/onboarding/message";
import MessageBg from "@/assets/images/onboarding/messagebg";

import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";

export default function Onboarding1() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 2;

  // Create new animated values
  const translateY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true, // Keep opacity animation native
    }).start();
  }, [currentPage]);

  // SVG animation (must be JS-driven)
  useEffect(() => {
    // Reset translateY to avoid driver conflict
    translateY.setValue(0);

    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -20,
          duration: 1000,
          useNativeDriver: false, // Must be false for SVG transforms
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false, // Consistent driver usage
        }),
      ])
    ).start();
  }, []);

  return (
    <View className="bg-secondary w-full h-full relative flex justify-between">
      {/* Wrap in Animated.View for better transform handling */}

      {currentPage === 0 ? (
        <>
          {/* Single animated container for both properties */}
          <Animated.View
            className="relative mx-auto z-[2] my-auto"
            style={{
              transform: [{ translateY }],
              elevation: 1, // Required for Android
            }}
          >
            <Man />
          </Animated.View>

          {/* Static background element */}
          <View className="absolute z-[1] top-0 w-full justify-center items-center">
            <ManBg />
          </View>
        </>
      ) : (
        <>
          {/* Separate opacity and translateY animations */}
          <Animated.View // Native-driven opacity
            style={{ opacity: fadeAnim }}
          >
            <Animated.View // JS-driven translateY
              className="relative mx-auto z-[2] mt-10"
              style={{ transform: [{ translateY }] }}
            >
              <Message />
            </Animated.View>

            <View className="absolute z-[1] top-0 w-full justify-center items-center ">
              <MessageBg />
            </View>
          </Animated.View>
        </>
      )}

      {/* ... rest of your component ... */}
      <View className="w-full h-[60%] relative bottom-0 bg-background rounded-t-[50px]">
        <View className="w-[34px] h-[3px] rounded-full relative my-4 mx-auto bg-zinc-700"></View>

        <View className="w-full h-full px-10 py-4 justify-between">
          {/* Text with Fade-in Animation */}
          <View>
            <Animated.Text
              style={{ opacity: fadeAnim }}
              className="text-white text-center text-2xl font-bold pb-2"
            >
              {currentPage === 0
                ? `Share, Chat, and Explore \n with Auragram`
                : `Connect with friends and share your moments`}
            </Animated.Text>

            <Animated.Text
              style={{ opacity: fadeAnim }}
              className="text-zinc-400 text-center"
            >
              {currentPage === 0
                ? `Welcome to Auragram, where every story shines. Connect, share, and discover moments under the glow of a vibrant community.`
                : `Stay close to your friends by sharing photos, videos, and updates. Connect, chat, and enjoy every moment together on Lunagram.`}
            </Animated.Text>
          </View>

          {/* Pagination Dots (Above Buttons) */}
          <View className="flex flex-row justify-center my-4">
            {Array.from({ length: totalPages }).map((_, index) => (
              <View
                key={index}
                className={`w-[10px] h-[10px] mx-1 !rounded-full ${
                  currentPage === index ? "bg-red-500" : "bg-zinc-800"
                }`}
              />
            ))}
          </View>

          {/* Custom Buttons (Ripple on Android, Normal on iOS) */}
          <View className="w-full gap-3 pb-12">
            <View className="overflow-hidden rounded-full">
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple("#ffffff20", false)}
                onPress={() => {
                  if (currentPage < totalPages - 1) {
                    setCurrentPage(currentPage + 1);
                  } else {
                    router.push("/auth");
                  }
                }}
                disabled={Platform.OS !== "android"} // Ripple only on Android
              >
                <View className="bg-[#FF4D67] py-3 rounded-lg items-center">
                  <Text className="text-white font-bold text-lg">Next</Text>
                </View>
              </TouchableNativeFeedback>
            </View>

            <View className="overflow-hidden rounded-full">
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple("#ffffff20", false)}
                onPress={() => router.push("/auth")}
                disabled={Platform.OS !== "android"} // Ripple only on Android
              >
                <View className="bg-zinc-800 py-3 rounded-lg items-center">
                  <Text className="text-white font-bold text-lg">Skip</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
