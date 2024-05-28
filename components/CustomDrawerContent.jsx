import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { AntDesign } from "@expo/vector-icons";
import { Image, View, Text, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CustomDrawerContent(props) {
  const { userInfo, loggingout, ...rest } = props;
  const { top, bottom } = useSafeAreaInsets();
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
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
          label="Log out"
          sty
          onPress={loggingout}
          icon={() => <AntDesign name="logout" size={18} />}
          labelStyle={{
            fontSize: 20,
            fontWeight: "700",
            color: "red",
          }}
        />
      </DrawerContentScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  userInfoSection: {
    padding: 20,
    backgroundColor: "#f4f4f4",
  },
});
