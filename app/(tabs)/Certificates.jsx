import { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { GlobalContext } from "../../context/GlobalProvider";
import * as ImagePicker from "expo-image-picker";
import { ImageManipulator } from "expo-image-manipulator";
import Constants from "expo-constants";
import CertificateList from "../../components/CertificateList";
import { newRequest } from "../../utils/newRequest";

export default function Certificates(props) {
  const { userInfo, loading, uploadCertificate } = useContext(GlobalContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [certificates, setCertificates] = useState([]);

  const userId = userInfo[0]?.id;

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await newRequest.get(`/mycerti/${userId}`);
        setCertificates(response?.data);
      } catch (error) {
        alert(error.response.data);
      }
    };
    fetchCertificates();
  }, []);

  useEffect(() => {
    const getPermission = async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission not granted", status);
      }
    };
    getPermission();
  }, []);

  const handleImageSelect = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    });

    if (!result.canceled) {
      setSelectedImage(result?.assets[0]?.uri || result?.assets[0]?.localUri);
      // await handleImageCrop();
    } else {
      alert("You did not select any image.");
    }
  };

  const handleImageCrop = async () => {
    const croppedImage = await ImageManipulator.manipulateAsync(
      selectedImage,
      [{ crop: { originX: 0, originY: 0, width: 250, height: 250 } }],
      { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
    );

    setSelectedImage(croppedImage.uri);
  };

  const exitUpload = () => {
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Upload Certificate(s)</Text>
      {selectedImage ? (
        <>
          <Image source={{ uri: selectedImage }} style={styles.image} />
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => {
              uploadCertificate(selectedImage);
            }}
          >
            <Text style={styles.buttonText}>Upload now</Text>
            {loading && <ActivityIndicator size="large" color="yellow" />}
          </TouchableOpacity>
          <TouchableOpacity style={styles.exitButton} onPress={exitUpload}>
            <Text style={styles.buttonText}>Exit</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={styles.selectButton}
          onPress={handleImageSelect}
        >
          <Text style={styles.buttonText}>Add new certificate</Text>
        </TouchableOpacity>
      )}

      <FlatList
        showsVerticalScrollIndicator={false}
        data={certificates}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CertificateList id={item.id} certlink={item.certlink} />
        )}
      />
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
  image: {
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
    marginTop: 40,
  },
  exitButton: {
    borderWidth: 1,
    width: "70%",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "gray",
    marginTop: 40,
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
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
});
