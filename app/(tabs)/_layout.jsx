import { Redirect, Tabs } from "expo-router";
import { Image, Text, View, ScrollView } from "react-native";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { GlobalContext } from "../../context/GlobalProvider";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import CustomDrawerContent from "./CustomDrawerContent";
import { useContext } from "react";

const DrawerLayout = () => {
  const { loading, isLogged, constants, userInfo, logout } =
    useContext(GlobalContext);
  if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => (
          <CustomDrawerContent
            {...props}
            userInfo={userInfo}
            //logout={logout()}
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
              <Ionicons name="newspaper-outline" size={size} color={color} />
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
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
