import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import { GlobalContext } from "../../context/GlobalProvider";
import InputField from "../../components/InputField";

const BankPen = () => {
  const { userInfo, updatebnkpfa, loading } = useContext(GlobalContext);
  const [bnk, setBnk] = useState(userInfo[0]?.bnk || "");
  const [accno, setAccno] = useState(userInfo[0]?.accno || "");
  const [pfaname, setPfaname] = useState(userInfo[0]?.pfaname || "");
  const [pfapin, setPfapin] = useState(userInfo[0]?.pfapin || "");

  const handleSubmit = () => {
    updatebnkpfa(bnk, accno, pfaname, pfapin);
  };

  return (
    <ScrollView style={{ marginTop: Constants.statusBarHeight }}>
      <View style={styles.container}>
        <InputField title="Bank Name" value={bnk} onChangeText={setBnk} />
        <InputField
          title="Account Number"
          value={accno}
          onChangeText={setAccno}
        />
        <InputField
          title="PFA Name"
          value={pfaname}
          onChangeText={setPfaname}
        />
        <InputField title="PFA PIN" value={pfapin} onChangeText={setPfapin} />
        {userInfo[0]?.completed < 2 && (
          <TouchableOpacity
            style={[styles.button, styles.buttonEnabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                "Submit"
              )}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default BankPen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: "#f7f7f7",
  },
  button: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
  },
  buttonEnabled: {
    backgroundColor: "#28a745", // Green for enabled button
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  link: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#999999",
  },
  opac: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
});
