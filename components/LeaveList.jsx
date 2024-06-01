import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const LeaveList = ({
  leavetype,
  dstart,
  ddays,
  status,
  whereleave,
  dreg,
  dapp,
  dresum,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Text style={styles.leavetype}>{leavetype}</Text>
        <Text style={styles.ddays}>{ddays} days</Text>
        <Text style={styles.dstart}>
          Proposed start date: {dstart.substring(0, 10)}
        </Text>
        <Text style={styles.whereleave}>
          Location during leave: {whereleave}
        </Text>
        <Text style={styles.dreg}>Application date: {dreg}</Text>
        {status === "PENDING APPROVAL" ? (
          <Pressable style={[styles.status, styles.pending]}>
            <AntDesign name="warning" size={24} color="black" />
            <Text style={styles.statusText}>{status}</Text>
          </Pressable>
        ) : (
          <>
            <Pressable style={[styles.status, styles.approved]}>
              <AntDesign name="checkcircle" size={24} color="white" />
              <Text style={styles.statusText}>{status}</Text>
            </Pressable>
            <Text style={styles.dapp}>Approved start date: {dapp}</Text>
            <Text style={styles.dresum}>
              Approved resumption date: {dresum}
            </Text>
          </>
        )}
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  details: {
    paddingHorizontal: 20,
  },
  leavetype: {
    fontSize: 20,
    color: "gray",
    marginBottom: 3,
    fontWeight: "700",
  },
  ddays: {
    fontSize: 18,
    color: "gray",
    marginBottom: 3,
  },
  dstart: {
    fontSize: 15,
    color: "green",
    marginTop: 5,
    fontWeight: "700",
  },
  whereleave: {
    fontSize: 15,
    color: "green",
    marginTop: 5,
    fontWeight: "700",
  },
  dreg: {
    fontSize: 15,
    color: "black",
    marginTop: 5,
    fontWeight: "700",
  },
  dapp: {
    fontSize: 15,
    color: "brown",
    marginTop: 5,
    fontWeight: "700",
  },
  dresum: {
    fontSize: 15,
    color: "brown",
    marginTop: 5,
    fontWeight: "700",
  },
  line: {
    borderBottomWidth: 1,
    marginVertical: 15,
    width: "100%",
    alignSelf: "center",
  },
  status: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 8,
    flexDirection: "row",
  },
  pending: {
    backgroundColor: "gold",
  },
  approved: {
    backgroundColor: "green",
  },
  statusText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "700",
    letterSpacing: 0.25,
    color: "black",
    marginLeft: 5,
  },
});

export default LeaveList;
