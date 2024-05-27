import React, { createContext, useEffect, useState, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import NetInfo from "@react-native-community/netinfo";
import { Alert } from "react-native";
import { newRequest } from "../utils/newRequest";
import axios from "axios";

export const GlobalContext = createContext();

const CONSTANTS = {
  primaryColor: "#14452F",
  headerTintColor: "#FFF",
  headerTitleStyle: "#FFF",
};

export const GlobalProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isLoggedIn = async () => {
      try {
        const asyncUserInfo = await AsyncStorage.getItem("userInfo");
        if (asyncUserInfo) {
          setUserInfo(JSON.parse(asyncUserInfo));
          setIsLogged(true);
        }
      } catch (error) {
        console.error("Error retrieving user info from AsyncStorage", error);
      }
    };

    isLoggedIn();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await newRequest.post("/mylogin", { email, password });
      const newUserInfo = response.data;
      await AsyncStorage.setItem("userInfo", JSON.stringify(newUserInfo));
      setUserInfo(newUserInfo);
      setIsLogged(true);
    } catch (error) {
      Alert.alert("Error", error.response?.data || "An error occurred");
      console.error("Error during login", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  const updateDataInAsyncStorage = async (id) => {
    try {
      await AsyncStorage.removeItem("userInfo");
      const response = await newRequest.get(`/myrecord/${id}`);
      const updatedUserInfo = response.data;
      setUserInfo(updatedUserInfo);
      await AsyncStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
    } catch (error) {
      console.error("AsyncStorage update error", error);
      Alert.alert("Error", "Failed to update user data in AsyncStorage");
    }
  };

  const bringInfo = async () => {
    try {
      const id = userInfo[0]?.id;
      if (!id) {
        throw new Error("User ID not found");
      }

      await AsyncStorage.removeItem("userInfo");

      const response = await newRequest.get(`/myrecord/${id}`);
      const newUserInfo = response.data;

      setUserInfo(newUserInfo);
      await AsyncStorage.setItem("userInfo", JSON.stringify(newUserInfo));
    } catch (error) {
      console.error("Error updating user info:", error);
      Alert.alert("Error", "Failed to update user data. Please try again.");
    }
  };

  const processbio = async (title, gender, marital, fon, addy) => {
    setLoading(true);
    try {
      const id = userInfo[0]?.id;
      if (!id) throw new Error("User ID not found");

      const response = await newRequest.put(`/updatebio/${id}`, {
        id,
        title,
        gender,
        marital,
        fon,
        addy,
      });

      await updateDataInAsyncStorage(id);

      Alert.alert("Success!", response.data, [{ text: "Okay" }], {
        cancelable: true,
      });
      setLoading(false);
    } catch (error) {
      Alert.alert(
        "Error!!!",
        error.message || "Failed, please try again",
        [{ text: "Okay" }],
        { cancelable: true }
      );
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const updatequal = async (
    acadsecondary,
    acadtertiary,
    acadmasters,
    acadphd,
    proff
  ) => {
    setLoading(true); // Start loading

    try {
      const id = userInfo[0].id;
      const compqual = 1;

      // Make the API request to update qualifications
      const response = await newRequest.put(`/updatequalx/${id}`, {
        acadsecondary,
        acadtertiary,
        acadmasters,
        acadphd,
        proff,
        compqual,
      });

      await updateDataInAsyncStorage(id);

      Alert.alert("Success!", response.data, [{ text: "Okay" }], {
        cancelable: true,
      });
    } catch (error) {
      Alert.alert(
        "Error!!!",
        error.message,
        [
          {
            text: "Failed, please try again",
            onPress: () => setLoading(false),
          },
        ],
        { cancelable: true }
      );
    } finally {
      setLoading(false);
    }
  };

  const uploadCertificate = async (selectedImage) => {
    const id = userInfo[0]?.id;

    if (!id) {
      console.error("User ID not available.");
      return;
    }

    try {
      const imageUrl = await generateImageLink(selectedImage);
      const response = await newRequest.put(`/uploadcertificate/${id}`, {
        imageUrl,
      });

      await updateDataInAsyncStorage(id);

      Alert.alert("Success!", response.data, [{ text: "Okay" }], {
        cancelable: true,
      });
    } catch (error) {
      Alert.alert(
        "Error!!!",
        error.message,
        [
          {
            text: "Upload failed, please try again",
            onPress: () => setLoading(false),
          },
        ],
        { cancelable: true }
      );
    } finally {
      setLoading(false);
    }
  };

  const generateImageLink = async (selectedImage) => {
    setLoading(true); // Set loading to true while processing

    try {
      const formData = new FormData();
      formData.append("image", {
        name: "image.jpg",
        uri: selectedImage,
        type: "image/jpg",
      });

      const response = await axios.post(
        "http://storage.npc-huris.com.ng:3003/uploadImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response?.data;
    } catch (error) {
      console.error("Error generating image link:", error);
      // Handle error gracefully
      Alert.alert("Error", "Failed to generate image link. Please try again.");
      return null; // Return null if an error occurs
    } finally {
      setLoading(false); // Set loading to false after processing
    }
  };

  const updatenok = async (
    nok,
    nokfon,
    nokaddy,
    nokwho,
    nok2,
    nok2fon,
    nok2addy,
    nok2who
  ) => {
    setLoading(true);
    try {
      const id = userInfo[0]?.id;

      if (!id) {
        throw new Error("User ID not found.");
      }

      const response = await newRequest.put(`/updatenokk/${id}`, {
        nok,
        nokfon,
        nokaddy,
        nokwho,
        nok2,
        nok2fon,
        nok2addy,
        nok2who,
      });

      await updateDataInAsyncStorage(id);

      Alert.alert("Success!", response.data, [{ text: "Okay" }], {
        cancelable: true,
      });
    } catch (error) {
      // console.error("Error updating next-of-kin:", error);
      Alert.alert(
        "Error!",
        "Failed to update next-of-kin. Please try again.",
        [{ text: "Okay" }],
        { cancelable: true }
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem("userInfo");
      setUserInfo(null);
      setIsLogged(false);
    } catch (error) {
      Alert.alert("Error!!!", error.message || "Error during logout", [
        { text: "Okay" },
      ]);
      console.error("Error during logout", error);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = useMemo(
    () => ({
      login,
      loading,
      isLogged,
      userInfo,
      updateDataInAsyncStorage,
      constants: CONSTANTS,
      bringInfo,
      processbio,
      updatequal,
      uploadCertificate,
      updatenok,
      logout,
    }),
    [login, loading, isLogged, userInfo]
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
