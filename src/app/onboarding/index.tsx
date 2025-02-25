import {
  Text,
  View,
  TouchableNativeFeedback,
  Platform,
  Pressable,
  Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
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

  const translateY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const insets = useSafeAreaInsets();

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentPage]);

  useEffect(() => {
    translateY.setValue(0);
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -20,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  const isAndroid = Platform.OS === "android";

  return (
    <View className="bg-secondary w-full h-full relative flex justify-between">
      {currentPage === 0 ? (
        <>
          <Animated.View
            className="relative mx-auto z-[2] my-auto"
            style={{
              transform: [{ translateY }],
              elevation: 1,
            }}
          >
            <Man />
          </Animated.View>
          <View className="absolute z-[1] top-0 w-full justify-center items-center">
            <ManBg />
          </View>
        </>
      ) : (
        <>
          <Animated.View style={{ opacity: fadeAnim }}>
            <Animated.View
              className="relative mx-auto z-[2] mt-10"
              style={{ transform: [{ translateY }] }}
            >
              <Message />
            </Animated.View>
            <View className="absolute z-[1] top-0 w-full justify-center items-center">
              <MessageBg />
            </View>
          </Animated.View>
        </>
      )}

      <View
        className="w-full h-[60%] bg-background rounded-t-[50px]"
        style={{
          
        }}
      >
        <View className="w-[34px] h-[3px] rounded-full relative my-4 mx-auto bg-zinc-700"></View>

        <View className="w-full h-full px-10 py-4 justify-between flex-1">
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

          <View className="flex flex-row justify-center my-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <View
                key={index}
                className={`w-[10px] h-[10px] mx-1 !rounded-full ${
                  currentPage === index ? "bg-red-500" : "bg-zinc-800"
                }`}
              />
            ))}
          </View>

          {/* BUTTONS */}
          <View className="w-full gap-3 ">
            {["Next", "Skip"].map((label, index) => {
              const handlePress = () => {
                if (label === "Next" && currentPage < totalPages - 1) {
                  setCurrentPage(currentPage + 1);
                } else {
                  router.push("/auth");
                }
              };

              return (
                <View key={index} className="overflow-hidden rounded-full">
                  {isAndroid ? (
                    <TouchableNativeFeedback
                      background={TouchableNativeFeedback.Ripple("#ffffff20", false)}
                      onPress={handlePress}
                    >
                      <View
                        className={`py-3 rounded-lg items-center ${
                          label === "Next" ? "bg-[#FF4D67]" : "bg-zinc-800"
                        }`}
                      >
                        <Text className="text-white font-bold text-lg">{label}</Text>
                      </View>
                    </TouchableNativeFeedback>
                  ) : (
                    <Pressable onPress={handlePress} style={{ borderRadius: 999 }}>
                      <View
                        className={`py-3 rounded-lg items-center ${
                          label === "Next" ? "bg-[#FF4D67]" : "bg-zinc-800"
                        }`}
                      >
                        <Text className="text-white font-bold text-lg">{label}</Text>
                      </View>
                    </Pressable>
                  )}
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}
