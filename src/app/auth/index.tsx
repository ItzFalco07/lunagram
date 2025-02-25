import {
  Text,
  View,
  TouchableNativeFeedback,
  Platform,
  Animated,
  Image,
  Pressable,
} from "react-native";

import Fly from '@/assets/images/onboarding/fly'
import FlyBg from '@/assets/images/onboarding/flybg'

import { Link, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";

export default function AuthIndex() {
  const router = useRouter();

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
  }, []);

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

      {/* Single animated container for both properties */}
      <Animated.View
        className="relative mx-auto z-[2] my-auto"
        style={{
          transform: [{ translateY }],
          elevation: 1, // Required for Android
        }}
      >
        <Fly />
      </Animated.View>

      {/* Static background element */}
      <View className="absolute z-[1] top-0 w-full justify-center items-center">
        <FlyBg />
      </View>

      {/* ... rest of your component ... */}
      <View className="w-full h-[60%] px-6 relative bottom-0 bg-background rounded-t-[50px]">
        <View className="w-[34px] h-[3px] rounded-full relative my-4 mx-auto bg-zinc-700" />

        <Text className="text-white text-center text-2xl font-bold pb-2">
          Lets Go!
        </Text>

        {/* Auth Signups */}
        <View className="w-full mt-4 gap-4">
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#ffffff20", false)}
            className="rounded-[10px]"
          >
            <View className="flex-row items-center justify-center gap-3 bg-zinc-800 rounded-[10px] h-[50px]">
              <Image
                className="w-6 h-6"
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png",
                }}
              />
              <Text className="text-white font-[400]">
                Continue With Google
              </Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#ffffff20", false)}
            className="rounded-[10px]"
          >
            <View className="flex-row items-center justify-center gap-3 bg-zinc-800 rounded-[10px] h-[50px]">
              <Image
                className="w-6 h-6"
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/768px-Facebook_Logo_%282019%29.png",
                }}
              />
              <Text className="text-white font-[400]">
                Continue With Facebook
              </Text>
            </View>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#ffffff20", false)}
            className="rounded-[10px]"
          >
            <View className="flex-row items-center justify-center gap-3 bg-zinc-800 rounded-[10px] h-[50px]">
              <Image
                className="w-6 h-6"
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
                }}
              />
              <Text className="text-white font-[400]">
                Continue With Github
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>

        {/* OR */}
        <View className="flex-row relative w-full items-center justify-between mt-8">
          <View className="w-[45%] h-[1px] bg-zinc-800"></View>
          <Text className="text-zinc-400">OR</Text>
          <View className=" w-[45%] h-[1px] bg-zinc-800"></View>
        </View>

        {Platform.OS === "android" ? (
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#ffffff20", false)}
            onPress={() => router.push("/auth/signup")}
          >
            <View
              className="py-3 rounded-lg mt-4 items-center bg-[#FF4D67]"
            >
              <Text className="text-white font-medium text-lg">Signup With Password</Text>
            </View>
          </TouchableNativeFeedback>
        ) : (
          <Pressable onPress={()=> router.push("/auth/signup")} style={{ borderRadius: 999 }}>
            <View
              className={`py-3 rounded-lg mt-4 items-centerbg-[#FF4D67]`}
            >
              <Text className="text-white font-medium text-lg">Signup With Password</Text>
            </View>
          </Pressable>
        )}

        <Text className="text-zinc-500 text-center mt-4">Alredy Have An Account? <Link href="/auth/login" className="text-[#FF4D67]">Login</Link></Text>
      </View>
    </View>
  );
}
