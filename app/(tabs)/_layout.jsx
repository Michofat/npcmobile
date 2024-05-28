import { Redirect, Tabs } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GlobalContext } from "../../context/GlobalProvider";
import {
  AntDesign,
  Ionicons,
  FontAwesome5,
  FontAwesome6,
} from "@expo/vector-icons";
import CustomDrawerContent from "../../components/CustomDrawerContent";
import { useContext } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const DrawerLayout = () => {
  const {
    loading,
    setLoading,
    isLogged,
    constants,
    userInfo,
    setIsLogged,
    setUserInfo,
  } = useContext(GlobalContext);

  if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  const loggingout = async () => {
    console.log("LOGGING OUT");
    try {
      await AsyncStorage.clear();
      setIsLogged(false);
      setUserInfo(null);
      setLoading(loading);
      console.log("All items removed from AsyncStorage");

      // Redirect to the sign-in screen using replace
      router.push("/");
      console.log("Navigated to SignIn screen");
    } catch (error) {
      Alert.alert("Error!!!", error.message || "Error during logout", [
        { text: "Okay" },
      ]);
      console.error("Error during logout", error);
    } finally {
      console.log("Logout process finished");
    }
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => (
          <CustomDrawerContent
            {...props}
            userInfo={userInfo}
            loggingout={loggingout}
          />
        )}
        screenOptions={{
          //headerShown: false,
          drawerActiveBackgroundColor: "#14452F",
          drawerActiveTintColor: "white",

          drawerLabelStyle: {
            fontSize: 18,
          },
          headerStyle: {
            backgroundColor: constants.primaryColor,
          },
          headerTintColor: constants.headerTintColor,
          headerTitleStyle: { color: constants.headerTitleStyle, fontSize: 22 },
        }}
      >
        <Drawer.Screen
          name="home"
          options={{
            drawerLabel: "Home",
            headerTitle: "Home",
            drawerIcon: ({ size, color }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Profile",
            headerTitle: "Profile",
            drawerIcon: ({ size, color }) => (
              <AntDesign name="user" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="ChangePassword"
          options={{
            drawerLabel: "Change password",
            headerTitle: "Change password",
            drawerIcon: ({ size, color }) => (
              <AntDesign name="lock" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="BioData"
          options={{
            drawerLabel: "Bio Data",
            headerTitle: "Bio Data",
            drawerIcon: ({ size, color }) => (
              <AntDesign name="book" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="DeptRank"
          options={{
            drawerLabel: "Dept & Rank",
            headerTitle: "Dept & Rank",
            drawerIcon: ({ size, color }) => (
              <AntDesign name="table" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Qualifications"
          options={{
            drawerLabel: "Qualifications",
            headerTitle: "Qualifications",
            drawerIcon: ({ size, color }) => (
              <AntDesign name="menufold" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Certificates"
          options={{
            drawerLabel: "Certificates",
            headerTitle: "Certificates",
            drawerIcon: ({ size, color }) => (
              <AntDesign name="profile" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Nok"
          options={{
            drawerLabel: "Next-of-Kin",
            headerTitle: "Next-of-Kin",
            drawerIcon: ({ size, color }) => (
              <AntDesign name="contacts" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Spouse"
          options={{
            drawerLabel: "Spouse",
            headerTitle: "Spouse",
            drawerIcon: ({ size, color }) => (
              <AntDesign name="swap" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="BankPen"
          options={{
            drawerLabel: "Bank & Pension",
            headerTitle: "Bank & Pension",
            drawerIcon: ({ size, color }) => (
              <AntDesign name="book" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="UpdatePassport"
          options={{
            drawerLabel: "Update Passport",
            headerTitle: "Update Passport",
            drawerIcon: ({ size, color }) => (
              <AntDesign name="picture" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="UploadSignature"
          options={{
            drawerLabel: "Upload Signature",
            headerTitle: "Upload Signature",
            drawerIcon: ({ size, color }) => (
              <FontAwesome5 name="signature" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="NokPassport"
          options={{
            drawerLabel: "NoK Passport",
            headerTitle: "NoK Passport",
            drawerIcon: ({ size, color }) => (
              <FontAwesome5 name="image" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="NokSignature"
          options={{
            drawerLabel: "NoK Signature",
            headerTitle: "NoK Signature",
            drawerIcon: ({ size, color }) => (
              <FontAwesome6 name="signature" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
