import { Redirect, Tabs } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GlobalContext } from "../../context/GlobalProvider";
import {
  AntDesign,
  Ionicons,
  FontAwesome5,
  FontAwesome6,
  MaterialIcons,
  Entypo,
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
    try {
      await AsyncStorage.clear();
      setIsLogged(false);
      setUserInfo(null);
      setLoading(loading);

      // Redirect to the sign-in screen using replace
      router.push("/");
    } catch (error) {
      Alert.alert("Error!!!", error.message || "Error during logout", [
        { text: "Okay" },
      ]);
      // console.error("Error during logout", error);
    } finally {
    }
  };
  //loggingout();

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
          name="preview"
          options={{
            drawerLabel: "Preview",
            headerTitle: "Preview",
            drawerIcon: ({ size, color }) => (
              <AntDesign name="eye" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="ChangePassword"
          options={{
            drawerLabel: "Password",
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
          name="DateForm"
          options={{
            drawerLabel: "Date Form",
            headerTitle: "Date Form",
            drawerIcon: ({ size, color }) => (
              <Entypo name="clock" size={size} color={color} />
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
        <Drawer.Screen
          name="Redeployment"
          options={{
            drawerLabel: "Redeployment",
            headerTitle: "Redeployment",
            drawerIcon: ({ size, color }) => (
              <FontAwesome6 name="book" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="AddRedeployment"
          options={{
            drawerLabel: "Add Redeployment",
            headerTitle: "Add Redeployment",
            drawerIcon: ({ size, color }) => (
              <FontAwesome6 name="plus" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Birthday"
          options={{
            drawerLabel: "Birthday",
            headerTitle: "Birthday",
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="cake" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="LeaveHistory"
          options={{
            drawerLabel: "Leave History",
            headerTitle: "Leave History",
            drawerIcon: ({ size, color }) => (
              <FontAwesome6 name="list-check" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="LeaveApplication"
          options={{
            drawerLabel: "Apply for Leave",
            headerTitle: "Apply for Leave",
            drawerIcon: ({ size, color }) => (
              <Entypo name="pencil" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="SearchStaff"
          options={{
            drawerLabel: "Search Staff",
            headerTitle: "Search Staff",
            drawerIcon: ({ size, color }) => (
              <FontAwesome5 name="search" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="ViewProfile"
          options={{
            drawerLabel: "View Profile",
            headerTitle: "View Profile",
            drawerIcon: ({ size, color }) => (
              <AntDesign name="eye" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
