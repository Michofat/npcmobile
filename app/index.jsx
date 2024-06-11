import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { GlobalContext } from "../context/GlobalProvider";
import { useContext } from "react";

const Welcome = () => {
  const { loading, isLogged } = useContext(GlobalContext);

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView style={{ backgroundColor: "#14452F" }}>
      <Loader isLoading={loading} />

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-2xl text-white font-bold text-center">
              National Population Commission{"\n"}
              <Text className=" text-gray-300">
                Human Resource Info. System
              </Text>
            </Text>
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            We're excited to have NPC Staff onboard. Your HR portal is designed
            to make managing your personal and professional information a
            breeze.
          </Text>

          <CustomButton
            title="Let's get started!"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
