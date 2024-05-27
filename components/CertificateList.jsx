import React from "react";
import { View, Image, StyleSheet } from "react-native";

const CertificateList = ({ id, certlink }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: certlink }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 10,
    overflow: "hidden", // Ensure the image stays within the bounds of the container
    elevation: 5, // Add elevation for a shadow effect
  },
  image: {
    width: "100%", // Take up the entire width of the container
    height: 200, // Adjust the height as needed
    aspectRatio: 16 / 9, // Adjust aspect ratio to maintain image proportions
  },
});

export default CertificateList;
