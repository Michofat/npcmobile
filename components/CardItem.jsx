import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const CardItem = ({ title, condition, handlePress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Text style={styles.cardTitle}>{title}</Text>
      {condition ? (
        <FontAwesome name="check-circle" size={24} color="green" />
      ) : (
        <Entypo name="circle-with-cross" size={24} color="red" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default CardItem;
