import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Image, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomDrawerContent(props) {
  const { userInfo, ...rest } = props;
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        // contentContainerStyle={{ backgroundColor: "blue" }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            backgroundColor: "green",
          }}
        >
          <Image
            source={{
              uri: userInfo[0]?.pix,
            }}
            style={{ width: 100, height: 100, borderRadius: 50, marginTop: 20 }}
          />
          <Text
            style={{
              color: "#fff",
              fontWeight: "700",
              fontSize: 17,
              marginTop: 10,
            }}
          >
            {userInfo && userInfo[0].fullname}
          </Text>
          <Text
            style={{
              color: "gold",
              fontSize: 15,
              fontWeight: "700",
              marginTop: 7,
            }}
          >
            {userInfo[0]?.rank}
          </Text>
          <View
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 15,
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: "500" }}>
              {userInfo[0]?.station}
            </Text>
          </View>
        </View>
        <DrawerItemList {...props} />

        <DrawerItem
          label="Logout"
          sty
          onPress={() => {
            logout();
          }}
          icon={() => <AntDesign name="logout" size={18} />}
          labelStyle={{
            fontSize: 20, // Adjust the font size
            fontWeight: "700", // Apply font weight
            color: "red", // Apply text color
          }}
        />
      </DrawerContentScrollView>
    </View>
  );
}
