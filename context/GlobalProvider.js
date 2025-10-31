import React, { createContext, useEffect, useState, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { newRequest } from "../utils/newRequest";
import axios from "axios";
import { router } from "expo-router";

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
        // console.error("Error retrieving user info from AsyncStorage", error);
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
      // console.error("Error during login", error.response?.data || error);
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
      // console.error("AsyncStorage update error", error);
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
      Alert.alert(
        "Notification!",
        "Successful",
        [
          {
            text: "OK",
            onPress: null,
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      // console.error("Error updating user info:", error);
      Alert.alert("Error", "Failed to update user data. Please try again.");
    }
  };

  const refreshProfileNow = async () => {
    try {
      const id = userInfo[0]?.id;
      if (!id) {
        throw new Error("User ID not found");
      }

      await AsyncStorage.removeItem("userInfo");

      const response = await newRequest.get(`/myrecord2/${id}`);
      const newUserInfo = response.data;
      //console.log("NEWWWW", newUserInfo);
      setUserInfo(newUserInfo);
      await AsyncStorage.setItem("userInfo", JSON.stringify(newUserInfo));

      Alert.alert(
        "Notification!",
        "Profile refresh successful",
        [
          {
            text: "OK",
            onPress: null,
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      // console.error("Error updating user info:", error);
      Alert.alert("Error", "Failed to update user data. Please try again.");
    }
  };

  const requestApproval = async () => {
    // console.log("APPROVA AL");
    try {
      const id = userInfo[0]?.id;
      if (!id) {
        throw new Error("User ID not found");
      }

      await AsyncStorage.removeItem("userInfo");

      const response = await newRequest.put(`/approvalRequest/${id}`);
      const newUserInfo = response.data;

      setUserInfo(newUserInfo);
      await AsyncStorage.setItem("userInfo", JSON.stringify(newUserInfo));

      Alert.alert(
        "Notification!",
        "Approval request sent successfully",
        [
          {
            text: "OK",
            onPress: null,
          },
        ],
        { cancelable: true }
      );
    } catch (error) {
      // console.error("Error updating user info:", error);
      Alert.alert("Error", "Approval request failed. Please try again later.");
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
      router.push("/home");
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

  const processdates = async (dob) => {
    setLoading(true);

    try {
      const id = userInfo[0]?.id;
      if (!id) throw new Error("User ID not found");
      //console.log("COMING DATES", dob);
      const response = await newRequest.put(`/updatedates/${id}`, dob);

      await updateDataInAsyncStorage(id);

      Alert.alert("Success!", response.data, [{ text: "Okay" }], {
        cancelable: true,
      });
      setLoading(false);
      router.push("/home");
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
      router.push("/home");
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
      return false;
    }

    try {
      setLoading(true);
      const imageUrl = await generateImageLink(selectedImage);
      const response = await newRequest.put(`/uploadcertificate/${id}`, {
        imageUrl,
      });

      await updateDataInAsyncStorage(id);

      Alert.alert("Success!", response.data, [{ text: "Okay" }], {
        cancelable: true,
      });

      router.push("/home");
      return true; // Return true on successful upload
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
      return false; // Return false on failure
    } finally {
      setLoading(false);
    }
  };

  const generateImageLink = async (selectedImage) => {
    setLoading(true); // Set loading to true while processing

    try {
      const formData = new FormData();
      formData.append("myimage", {
        name: "image.jpg",
        uri: selectedImage,
        type: "image/jpg",
      });

      const response = await axios.put(
        "https://storage.michofat.com/npcimage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response?.data;
    } catch (error) {
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
      router.push("/home");
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

  const updatespouse = async (
    spousename,
    spousefon,
    spouseoffice,
    spouseoccup
  ) => {
    try {
      setLoading(true);

      const id = userInfo[0]?.id;
      const response = await newRequest.put(`/updatespouse/${id}`, {
        spousename,
        spousefon,
        spouseoffice,
        spouseoccup,
      });

      await updateDataInAsyncStorage(id);

      Alert.alert(
        "Success!",
        response.data,
        [
          {
            text: "Okay",
          },
        ],
        { cancelable: true }
      );
      router.push("/home");
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

  const processDeptRank = async (station, postinglg, dept, rank) => {
    setLoading(true);

    try {
      const id = userInfo[0].id;
      const updateResponse = await newRequest.put(`/updatedeptrank/${id}`, {
        id,
        station,
        postinglg,
        dept,
        rank,
      });

      await updateDataInAsyncStorage(id);

      Alert.alert("Success!", updateResponse.data, [{ text: "OK" }]);
      router.push("/home");
    } catch (error) {
      // console.error("Edit error:", error);

      // Show error alert
      Alert.alert(
        "Error!!!",
        "Failed, please try again",
        [{ text: "OK", onPress: () => setLoading(false) }],
        { cancelable: true }
      );
    } finally {
      setLoading(false);
    }
  };

  const updatebnkpfa = async (bnk, accno, pfaname, pfapin) => {
    setLoading(true);

    try {
      const id = userInfo[0].id;
      const response = await newRequest.put(`/updatebnkpfa/${id}`, {
        bnk,
        accno,
        pfaname,
        pfapin,
      });

      await updateDataInAsyncStorage(id);

      Alert.alert("Success!", response.data, [{ text: "Okay" }], {
        cancelable: true,
      });
      router.push("/home");
    } catch (error) {
      Alert.alert(
        "Error!!!",
        error.message || "Failed, please try again",
        [{ text: "Okay", onPress: () => setLoading(false) }],
        { cancelable: true }
      );
    } finally {
      setLoading(false);
    }
  };

  const processupload = async (selectedImage) => {
    const id = userInfo[0]?.id;
    if (!id) {
      alert("User ID not found");
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await generateImageLink(selectedImage);
      const response = await newRequest.put(`/uploadpassport/${id}`, {
        imageUrl,
      });

      await updateDataInAsyncStorage(id);

      alert(response?.data || "Upload successful");
      router.push("/home");
    } catch (error) {
      alert(error.message || "Failed to upload image, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const uploadsig = async (selectedImage) => {
    const id = userInfo[0]?.id;
    if (!id) {
      alert("User ID not found");
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await generateImageLink(selectedImage);
      const response = await newRequest.put(`/uploadsignature/${id}`, {
        imageUrl,
      });

      await updateDataInAsyncStorage(id);

      alert(response?.data || "Upload successful");
      router.push("/home");
    } catch (error) {
      log;
      alert("Failed to upload signature. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const uploadpassportnok = async (selectedImage) => {
    if (!userInfo || !userInfo[0] || !userInfo[0].id) {
      alert("User information is not available.");
      return;
    }

    const id = userInfo[0].id;
    setLoading(true);

    try {
      const imageUrl = await generateImageLink(selectedImage);
      const response = await newRequest.put(`/uploadpassportnok/${id}`, {
        imageUrl,
      });
      await updateDataInAsyncStorage(id);
      alert(response?.data);
      router.push("/home");
    } catch (error) {
      alert("An error occurred while uploading the passport.");
    } finally {
      setLoading(false);
    }
  };

  const uploadsignaturenok = async (selectedImage) => {
    if (!userInfo || !userInfo[0] || !userInfo[0].id) {
      alert("User information is not available.");
      return;
    }

    const id = userInfo[0].id;
    setLoading(true);

    try {
      const imageUrl = await generateImageLink(selectedImage);
      const response = await newRequest.put(`/uploadsignaturenok/${id}`, {
        imageUrl,
      });
      await updateDataInAsyncStorage(id);
      alert(response?.data);
      router.push("/home");
    } catch (error) {
      alert("An error occurred while uploading the signature.");
    } finally {
      setLoading(false);
    }
  };

  const addredepnow = async (newstation, datered, datexit, desigpost) => {
    if (!newstation.trim() || !datered.trim() || !datexit.trim()) {
      Alert.alert(
        "Error!",
        "Please fill all the fields",
        [{ text: "Try again", onPress: () => setLoading(false) }],
        { cancelable: true }
      );
      return;
    }

    try {
      setLoading(true);
      const userId = userInfo[0]?.id;
      const fullName = userInfo[0]?.fullname;

      const response = await newRequest.post(`/addredeployment/${userId}`, {
        station: newstation,
        dtrans: datered,
        dexit: datexit,
        desig: desigpost,
        staffid: userId,
        fulln: fullName,
      });

      Alert.alert(
        "Success!",
        response.data,
        [{ text: "Okay", onPress: () => setLoading(false) }],
        { cancelable: true }
      );
      router.push("/Redeployment");
    } catch (error) {
      Alert.alert(
        "Error!!!",
        error.message || "Failed, please try again",
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
      updatespouse,
      processDeptRank,
      updatebnkpfa,
      processupload,
      uploadsig,
      uploadpassportnok,
      uploadsignaturenok,
      processdates,
      setIsLogged,
      setUserInfo,
      setLoading,
      addredepnow,
      requestApproval,
      refreshProfileNow,
    }),
    [login, loading, isLogged, userInfo]
  );

  //console.log("USERI FORM", userInfo);

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
