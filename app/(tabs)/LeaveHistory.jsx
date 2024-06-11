import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, FlatList, View } from "react-native";
import { newRequest } from "../../utils/newRequest";
import { GlobalContext } from "../../context/GlobalProvider";
import LeaveList from "../../components/LeaveList";

const LeaveHistory = () => {
  const { userInfo } = useContext(GlobalContext);
  const [leaveHistory, setLeaveHistory] = useState([]);

  const fetchLeaveHistory = async () => {
    try {
      const response = await newRequest.get(
        `/myleavehistory/${userInfo[0].id}`
      );
      setLeaveHistory(response.data);
    } catch (error) {
      //console.error("Error fetching leave history:", error);
      alert(error.response?.data || "Failed to fetch leave history");
    }
  };

  useEffect(() => {
    fetchLeaveHistory();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previous Leave Applications</Text>
      <View style={styles.line} />

      <FlatList
        data={leaveHistory}
        renderItem={({ item }) => (
          <LeaveList
            id={item.id}
            leavetype={item.leavetype}
            dstart={item.dstart}
            appstart={item.appstart}
            append={item.append}
            ddays={item.ddays}
            status={item.status}
            whereleave={item.whereleave}
            dreg={item.dreg}
            dapp={item.dapp}
            dresum={item.dresum}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
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
  flatListContent: {
    paddingBottom: 20,
  },
});

export default LeaveHistory;
