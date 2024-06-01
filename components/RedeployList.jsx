import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const RedeployList = ({ transferHistory }) => {
  return (
    <ScrollView horizontal={true}>
      <View style={styles.container}>
        {/* Table Header */}
        <View style={[styles.tableRow, styles.headerRow]}>
          <Text style={[styles.tableHeaderCell, styles.column1]}>State</Text>
          <Text style={[styles.tableHeaderCell, styles.column2]}>Position</Text>
          <Text style={[styles.tableHeaderCell, styles.column3]}>
            From Date
          </Text>
          <Text style={[styles.tableHeaderCell, styles.column4]}>To Date</Text>
        </View>

        {/* Table Data */}
        {transferHistory.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.column1]}>
              {item.station}
            </Text>
            <Text style={[styles.tableCell, styles.column2]}>{item.desig}</Text>
            <Text style={[styles.tableCell, styles.column3]}>
              {item.dtrans}
            </Text>
            <Text style={[styles.tableCell, styles.column4]}>{item.dexit}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
  },
  headerRow: {
    backgroundColor: "#f0f0f0",
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  tableHeaderCell: {
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
    fontSize: 18,
  },
  tableCell: {
    textAlign: "center",
    padding: 10,
  },
  column1: {
    flex: 2,
  },
  column2: {
    flex: 2,
  },
  column3: {
    flex: 3,
  },
  column4: {
    flex: 3,
  },
});

export default RedeployList;
