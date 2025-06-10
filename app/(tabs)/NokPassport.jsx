import { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { GlobalContext } from "../../context/GlobalProvider";

export default function NokPassport() {
  const { userInfo, loading, uploadpassportnok } = useContext(GlobalContext);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission not granted",
          "You need to grant camera roll permissions to use this feature."
        );
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
      Alert.alert("No image selected", "You did not select any image.");
    }
  };

  const exitUpload = () => {
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Upload Passport</Text>
      {selectedImage ? (
        <>
          <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => uploadpassportnok(selectedImage)}
          >
            <Text style={styles.uploadButtonText}>
              {loading ? (
                <ActivityIndicator size="large" color="yellow" />
              ) : (
                "Upload Now"
              )}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exitButton} onPress={exitUpload}>
            <Text style={styles.exitButtonText}>Exit</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Image
            source={{ uri: userInfo[0]?.pixnok }}
            style={styles.imagePreview}
          />
          <TouchableOpacity
            style={styles.selectButton}
            onPress={handleImageSelect}
          >
            <Text style={styles.selectButtonText}>Replace</Text>
            {loading && <ActivityIndicator size="large" color="yellow" />}
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
  headerText: {
    fontSize: 30,
    marginBottom: 10,
  },
  imagePreview: {
    width: 300,
    height: 400,
    marginTop: 30,
  },
  uploadButton: {
    borderWidth: 1,
    width: "70%",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "green",
  },
  uploadButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  exitButton: {
    borderWidth: 1,
    width: "70%",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "gray",
  },
  exitButtonText: {
    color: "gold",
    fontSize: 20,
    fontWeight: "700",
  },
  selectButton: {
    borderWidth: 1,
    width: "70%",
    borderRadius: 10,
    padding: 10,
    marginTop: 40,
    alignItems: "center",
    backgroundColor: "green",
  },
  selectButtonText: {
    color: "gold",
    fontSize: 20,
    fontWeight: "700",
  },
});
