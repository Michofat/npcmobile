import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const BirthdayList = ({ fullname, dept, station, pix }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: pix }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{fullname}</Text>
        <Text style={styles.department}>{dept}</Text>
        <Text style={styles.station}>{station}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    marginBottom: 3,
  },
  department: {
    fontSize: 15,
    color: "gray",
  },
  station: {
    fontSize: 13,
    color: "green",
  },
});

export default BirthdayList;
