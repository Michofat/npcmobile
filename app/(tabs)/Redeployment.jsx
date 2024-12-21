import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  FlatList,
} from "react-native";
import { newRequest } from "../../utils/newRequest";
import { GlobalContext } from "../../context/GlobalProvider";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const Redeployment = () => {
  const { userInfo } = useContext(GlobalContext);
  const [redeployments, setRedeployments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch redeployments when component mounts and whenever userInfo changes
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRedeployments();
  }, [userInfo]); // Fetch when userInfo changes

  const handleRefresh = () => {
    setLoading(true); // Show loading spinner
    fetchRedeployments(); // Re-fetch redeployments on refresh
  };

  const renderRedeploymentItem = ({ item }) => (
    <View style={styles.redeploymentCard}>
      <Text style={styles.designation}>{item.desig}</Text>
      <Text style={styles.infoText}>
        Date Redeployed: {formatDate(item.dtrans)}
      </Text>
      <Text style={styles.infoText}>
        Date Posted Out: {formatDate(item.dexit)}
      </Text>
      <Text style={styles.infoText}>Station: {item.station}</Text>
    </View>
  );

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <Text style={styles.refreshButtonText}>Refresh</Text>
        <AntDesign name="reload1" size={24} color="white" />
      </TouchableOpacity>
      <FlatList
        data={redeployments}
        renderItem={renderRedeploymentItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshing={loading} // This shows the refreshing spinner while loading
        onRefresh={handleRefresh} // This triggers handleRefresh on pull-to-refresh
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => router.push("AddRedeployment")}
      >
        <AntDesign name="plus" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Redeployment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    paddingHorizontal: 16, // Added padding for better aesthetics
  },
  refreshButton: {
    backgroundColor: "green",
    padding: 10,
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
  listContainer: {
    paddingBottom: 80, // Extra space for the floating button
  },
  redeploymentCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  designation: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 4,
    color: "#555",
  },
  floatingButton: {
    backgroundColor: "green",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 30,
    right: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
