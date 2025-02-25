import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableNativeFeedback,
  Pressable,
  Image,
} from "react-native";
import { ChevronLeft, Lock, Mail, User } from "lucide-react-native";
import { useState } from "react";
import { Link, useRouter } from "expo-router";

const Signup = () => {
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isFocusedFullName, setIsFocusedFullName] = useState(false);
  const router = useRouter();


  const auths = [
    {
      uri: "/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png",
    },
    {
      uri: "/",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/768px-Facebook_Logo_%282019%29.png",
    },
    {
      uri: "/",
      logo: "https://cdn-icons-png.flaticon.com/512/25/25231.png",
    },
  ];

  return (
    <View className="w-full h-full relative bg-background  px-6 py-4 items-center justify-between">
      {/* Back Button */}
      <View className="w-full">
        <TouchableNativeFeedback onPress={() => router.back()}>
          <View className="w-[40px] h-[40px] rounded-full bg-[#1c1c1c] mb-12 items-center justify-center">
            <ChevronLeft stroke="#f9f9f9" size={24} />
          </View>
        </TouchableNativeFeedback>

        {/* Heading */}
        <Text className="text-white text-4xl font-normal">
          Create Your {"\n"}Account
        </Text>

        <View
          className={`${
            isFocusedFullName ? "bg-[#fd515419] border border-[#BE4152]" : ""
          } flex-row items-center bg-[#1c1c1c] rounded-xl h-[50px] px-4 mt-12`}
        >
          <User
            stroke={isFocusedEmail ? "#FD5168" : "#9c9c9c"}
            size={20}
            className="mr-2"
          />
          <TextInput
            className="flex-1 h-[50px] text-white pl-2"
            placeholderTextColor="#9c9c9c"
            placeholder="Full Name"
            onFocus={() => setIsFocusedFullName(true)}
            onBlur={() => setIsFocusedFullName(false)}
          />
        </View>

        {/* Email Input with Icon (Using flex-row) */}
        <View
          className={`${
            isFocusedEmail ? "bg-[#fd515419] border border-[#BE4152]" : ""
          } flex-row items-center bg-[#1c1c1c] rounded-xl h-[50px] px-4 mt-12`}
        >
          <Mail
            stroke={isFocusedEmail ? "#FD5168" : "#9c9c9c"}
            size={20}
            className="mr-2"
          />
          <TextInput
            keyboardType="email-address"
            className="flex-1 h-[50px] text-white pl-2"
            placeholderTextColor="#9c9c9c"
            placeholder="Your email"
            onFocus={() => setIsFocusedEmail(true)}
            onBlur={() => setIsFocusedEmail(false)}
          />
        </View>

        <View
          className={`${
            isFocusedPassword ? "bg-[#fd515419] border border-[#BE4152]" : ""
          } flex-row items-center bg-[#1c1c1c] rounded-xl h-[50px] px-4 mt-4`}
        >
          <Lock
            stroke={isFocusedPassword ? "#FD5168" : "#9c9c9c"}
            size={20}
            className="mr-2"
          />
          <TextInput
            className="flex-1 h-[50px] text-white pl-2"
            placeholderTextColor="#9c9c9c"
            placeholder="Your password"
            onFocus={() => setIsFocusedPassword(true)}
            onBlur={() => setIsFocusedPassword(false)}
          />
        </View>

        {/* Signup Button */}

        {Platform.OS === "android" ? (
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#ffffff20", false)}
            onPress={() => router.push("/auth/signup")}
          >
            <View className="py-3 rounded-lg mt-4 items-center bg-[#FF4D67]">
              <Text className="text-white font-medium text-lg">Signup</Text>
            </View>
          </TouchableNativeFeedback>
        ) : (
          <Pressable
            onPress={() => router.push("/auth/signup")}
            style={{ borderRadius: 999 }}
          >
            <View className={`py-3 rounded-lg mt-4 items-centerbg-[#FF4D67]`}>
              <Text className="text-white font-medium text-lg">Signup</Text>
            </View>
          </Pressable>
        )}

        <Text className="text-zinc-500 text-center mt-4">
          Alredy Have An Account?{" "}
          <Link href="/auth/login" className="text-[#FF4D67]">
            Login
          </Link>
        </Text>
      </View>

      <View className="relative w-full">
        {/* OR */}
        <View className="flex-row relative w-full items-center justify-between mt-8">
          <View className="w-[30%] h-[1px] bg-zinc-800"></View>
          <Text className="text-zinc-400">or continue with</Text>
          <View className=" w-[30%] h-[1px] bg-zinc-800"></View>
        </View>

        {/* Social Buttons */}
        <View className="flex-row justify-between my-6 w-[70%] mx-auto">
          {auths.map((auth, index) => (
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.Ripple("#ffffff20", false)}
              key={index}
              onPress={() =>
                // call backend auth function
                router.push(auth.uri)
              }
            >
              <View className=" rounded-lg  w-[60px] justify-center h-[60px] items-center bg-[#181818] border border-[#282828]">
                <Image
                  className="w-8 h-8"
                  source={{
                    uri: auth.logo,
                  }}
                />
              </View>
            </TouchableNativeFeedback>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Signup;
