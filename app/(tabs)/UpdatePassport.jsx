import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { GlobalContext } from "../../context/GlobalProvider";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

export default function UpdatePassport() {
  const { userInfo, loading, processupload } = useContext(GlobalContext);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission not granted");
      }
    })();
  }, []);

  const handleImageSelect = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]?.uri || result.assets[0]?.localUri);
    } else {
      alert("No image selected");
    }
  };

  const exitUpload = () => {
    setSelectedImage(null);
  };

  const handleUpload = () => {
    processupload(selectedImage);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload passport</Text>
      {selectedImage ? (
        <>
          <Image source={{ uri: selectedImage }} style={styles.image} />
          <TouchableOpacity
            style={[styles.button, styles.uploadButton]}
            onPress={handleUpload}
          >
            <Text style={styles.uploadButtonText}>
              {loading ? (
                <ActivityIndicator size="large" color="yellow" />
              ) : (
                "Upload Now"
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.exitButton]}
            onPress={exitUpload}
          >
            <Text style={styles.exitButtonText}>Exit</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Image
            source={{ uri: userInfo[0].pix }}
            style={styles.imagePlaceholder}
          />
          <TouchableOpacity
            style={styles.replaceButton}
            onPress={handleImageSelect}
          >
            <Text style={styles.replaceButtonText}>
              {loading ? (
                <ActivityIndicator size="large" color="yellow" />
              ) : (
                "Replace Image"
              )}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: Constants.statusBarHeight,
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 400,
    marginTop: 30,
  },
  imagePlaceholder: {
    width: 200,
    height: 200,
    marginTop: 30,
  },
  button: {
    borderWidth: 1,
    width: "70%",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    alignItems: "center",
  },
  uploadButton: {
    backgroundColor: "green",
    top: 40,
  },
  exitButton: {
    backgroundColor: "gray",
    top: 40,
  },
  uploadButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  exitButtonText: {
    color: "gold",
    fontSize: 20,
    fontWeight: "700",
  },
  replaceButton: {
    borderWidth: 1,
    width: "70%",
    borderRadius: 10,
    padding: 10,
    marginTop: 40,
    alignItems: "center",
    backgroundColor: "green",
  },
  replaceButtonText: {
    color: "gold",
    fontSize: 20,
    fontWeight: "700",
  },
});
