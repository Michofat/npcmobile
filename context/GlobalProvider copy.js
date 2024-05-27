import React, { createContext, useEffect, useState, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import NetInfo from "@react-native-community/netinfo";
import { Alert } from "react-native";
import { newRequest } from "../utils/newRequest";

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
      setBackHome(true);

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

  const logout = async () => {
    setLoading(true);
    try {
      await AsyncStorage.removeItem("userInfo");
      setUserInfo(null);
      setIsLogged(false);
    } catch (error) {
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
      processbio,
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
