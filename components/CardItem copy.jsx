import { View, Text, StyleSheet } from "react-native";
import React from "react";
import {
  FontAwesome,
  Entypo,
  MaterialIcons,
  Ionicons,
} from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

// Optional: Map icons based on title
const iconMap = {
  Personal: <FontAwesome name="user" size={24} color="#333" />,
  Office: <FontAwesome name="building" size={24} color="#333" />,
  Qualifications: <Ionicons name="school" size={24} color="#333" />,
  Certificates: <MaterialIcons name="verified" size={24} color="#333" />,
  Spouse: <FontAwesome name="heart" size={24} color="#333" />,
  "Next-of-Kin": <FontAwesome name="users" size={24} color="#333" />,
  "Bank & Pension": <FontAwesome name="money" size={24} color="#333" />,
  "Profile Picture Upload": <Ionicons name="image" size={24} color="#333" />,
  "Change Password": <FontAwesome name="lock" size={24} color="#333" />,
  "Date Form": <FontAwesome name="calendar" size={24} color="#333" />,
  "My Signature": <FontAwesome name="pencil" size={24} color="#333" />,
  "NoK Passport": <FontAwesome name="passport" size={24} color="#333" />,
  "NoK Signature": <FontAwesome name="signature" size={24} color="#333" />,
};

const CardItem = ({ title, condition, handlePress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.iconWrapper}>
        {iconMap[title] || <FontAwesome name="file" size={24} color="#333" />}
      </View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.statusIcon}>
        {condition ? (
          <FontAwesome name="check-circle" size={20} color="green" />
        ) : (
          <Entypo name="circle-with-cross" size={20} color="red" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "30%",
    height: 100, // or 110, 120 based on how spacious you want
    marginVertical: 8,
    marginHorizontal: "1.5%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },

  iconWrapper: {
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "600",
  },
  statusIcon: {
    marginTop: 8,
  },
});

export default CardItem;
