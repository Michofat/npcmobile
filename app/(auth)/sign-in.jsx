import { useContext, useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { images } from "../../constants";
import { CustomButton, FormField } from "../../components";
import { GlobalContext } from "../../context/GlobalProvider";
import { validateEmail } from "../../helperFunctions/validate";

const SignIn = () => {
  const { login } = useContext(GlobalContext);
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = () => {
    let { email, password } = form;
    email = email.trim().toLowerCase();
    password = password.trim();
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    if (password.length < 8 || password.length > 16) {
      Alert.alert("Error", "Password must be between 8 and 16 characters.");
      return;
    }
    // setSubmitting(true);
    login(email, password).finally(() => {
      //   setSubmitting(false);
    });
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#14452F" }}>
      <ScrollView>
        <View
          className="w-full flex justify-center px-4 my-6 h-screen"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <View className="items-center">
            <Image
              source={images.logo}
              resizeMode="contain"
              //  className="w-[115px] h-[34px]"
            />
            <Text className="text-4xl  font-semibold text-white mt-10 font-psemibold">
              Log in
            </Text>
          </View>

          <FormField
            placeholder="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
            maxLength={80}
          />

          <FormField
            placeholder="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            keyboardType="default"
            maxLength={16}
          />

          <CustomButton
            title="Sign In"
            handlePress={handleSignIn}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Having issues?
            </Text>
            <Link
              href="/contact"
              className="text-lg font-psemibold text-secondary"
            >
              Contact Admin
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
