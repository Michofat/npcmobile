import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Icon,
} from "react-native";
import { newRequest } from "../../utils/newRequest";
import { GlobalContext } from "../../context/GlobalProvider";
import LeaveList from "../../components/LeaveList";

const LeaveHistory = () => {
  const { userInfo } = useContext(GlobalContext);
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLeaveHistory = async () => {
    if (!userInfo || !userInfo[0]?.id) {
      alert("User information is missing. Cannot fetch leave history.");
      return;
    }

    setLoading(true);
    try {
      const response = await newRequest.get(
        `/myleavehistory/${userInfo[0].id}`
      );
      setLeaveHistory(response.data);
    } catch (error) {
      console.error("Error fetching leave history:", error);
      alert(error.response?.data || "Failed to fetch leave history");
    } finally {
      setLoading(false);
    }
  };

  // Call API when component mounts
  useEffect(() => {
    fetchLeaveHistory();
  }, []);

  // Handle the refresh button press
  const handleRefresh = () => {
    fetchLeaveHistory();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previous Leave Applications</Text>
      <View style={styles.line} />

      {/* Refresh Button */}
      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="green" />
      ) : (
        <FlatList
          data={leaveHistory}
          renderItem={({ item }) => <LeaveList {...item} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    alignSelf: "center",
    color: "green",
    fontSize: 22,
    marginTop: 30,
    fontWeight: "700",
  },
  line: {
    borderBottomWidth: 1,
    marginVertical: 15,
    width: "100%",
    alignSelf: "center",
  },
  refreshButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: "center",
  },
  refreshButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
  flatListContent: {
    paddingBottom: 20,
  },
});

export default LeaveHistory;
