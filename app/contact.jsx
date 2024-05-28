import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
import { GlobalContext } from "../context/GlobalProvider";
import { useContext } from "react";

const Contact = () => {
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
          <View className="relative mt-5">
            <Text className="text-2xl text-white font-bold text-center">
              <Text className="text-secondary-200">
                National Population Commission, No. 1 Masaka Close, Off Olusegun
                Obasanjo Way, Wuse Zone 7, Abuja, Nigeria
              </Text>
            </Text>
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            hrm@npcng.com
          </Text>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            +234-8063-378-481
          </Text>

          <CustomButton
            title="Login!"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Contact;
