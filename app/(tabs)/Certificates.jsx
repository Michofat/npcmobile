import { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  FlatList,
  Modal,
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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

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
    } else {
      alert("You did not select any image.");
    }
  };

  const exitUpload = () => {
    setSelectedImage(null);
  };

  const handleUpload = async () => {
    try {
      const isSuccess = await uploadCertificate(selectedImage); // Call uploadCertificate and check if it's successful
      if (isSuccess) {
        setSelectedImage(null); // Clear the selected image only if the upload was successful
      } else {
        alert("Upload failed. Please try again."); // Display error if upload failed
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const openModal = (certificate) => {
    setSelectedCertificate(certificate);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedCertificate(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Certificates</Text>

      {/* Upload Certificate Section with Border */}
      <View style={styles.uploadSection}>
        <Text style={styles.uploadHeaderText}>Upload Certificate(s)</Text>
        {selectedImage ? (
          <>
            <Image source={{ uri: selectedImage }} style={styles.image} />
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleUpload}
            >
              <Text style={styles.buttonText}>
                {loading ? (
                  <ActivityIndicator size="large" color="yellow" />
                ) : (
                  "Upload now"
                )}
              </Text>
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
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      {/* Horizontal Slider for Certificates */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={certificates}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openModal(item)}
            style={styles.certificateContainer}
          >
            <CertificateList id={item.id} certlink={item.certlink} />
          </TouchableOpacity>
        )}
      />

      {/* Modal for Enlarged Certificate View */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
          {selectedCertificate && (
            <Image
              source={{ uri: selectedCertificate.certlink }}
              style={styles.enlargedImage}
            />
          )}
        </View>
      </Modal>
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
  uploadSection: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 10,
    padding: 20,
    width: "90%",
    alignItems: "center",
    marginBottom: 20,
  },
  uploadHeaderText: {
    fontSize: 24,
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
  selectButton: {
    borderWidth: 1,
    width: "70%",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "green",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  separator: {
    height: 1,
    width: "90%",
    backgroundColor: "lightgrey",
    marginVertical: 20,
  },
  certificateContainer: {
    marginHorizontal: 10,
    paddingVertical: 10,
    width: 200,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 10,
  },
  enlargedImage: {
    width: "90%",
    height: "70%",
    resizeMode: "contain",
  },
});
