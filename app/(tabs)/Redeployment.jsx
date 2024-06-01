import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { newRequest } from "../../utils/newRequest";
import RedeployList from "../../components/RedeployList";
import { GlobalContext } from "../../context/GlobalProvider";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const Redeployment = () => {
  const { userInfo } = useContext(GlobalContext);
  const [redeployments, setRedeployments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRedeployments = async () => {
      try {
        const response = await newRequest.get(
          `/myredeployments/${userInfo[0].id}`
        );
        setRedeployments(response.data);
      } catch (error) {
        Alert.alert(
          "Error",
          error.response?.data || "Failed to fetch redeployments"
        );
      } finally {
        setLoading(false); // Set loading state to false when finished
      }
    };

    fetchRedeployments();
  }, [userInfo, loading]); // useEffect dependencies

  const handleRefresh = () => {
    setLoading(true); // Trigger loading state to true to re-run useEffect
  };

  //   useEffect(() => {
  //     const fetchRedeployments = async () => {
  //       try {
  //         const response = await newRequest.get(
  //           `/myredeployments/${userInfo[0].id}`
  //         );
  //         setRedeployments(response.data);
  //       } catch (error) {
  //         Alert.alert(
  //           "Error",
  //           error.response?.data || "Failed to fetch redeployments"
  //         );
  //       }
  //     };

  //     fetchRedeployments();
  //   }, [userInfo]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <Text style={styles.refreshButtonText}>Refresh</Text>
        <AntDesign name="reload1" size={24} color="white" />
      </TouchableOpacity>
      <RedeployList transferHistory={redeployments} />
      <TouchableOpacity
        style={styles.enbutton}
        onPress={() => router.push("AddRedeployment")}
      >
        <Text style={styles.enbuttonText}>Add new record</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Redeployment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  enbutton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
  },
  enbuttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginRight: 10,
  },
  refreshButton: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 10,
    width: "60%",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 10,
  },
  refreshButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginRight: 10,
  },
});
