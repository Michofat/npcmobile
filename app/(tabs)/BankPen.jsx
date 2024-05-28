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
        <InputField title="Bank name" value={bnk} onChangeText={setBnk} />
        <InputField
          title="Account number"
          value={accno}
          onChangeText={setAccno}
        />
        <InputField
          title="PFA Name"
          value={pfaname}
          onChangeText={setPfaname}
        />
        <InputField title="PFA PIN" value={pfapin} onChangeText={setPfapin} />
        <TouchableOpacity
          style={[styles.link, styles.enbutton]}
          onPress={handleSubmit}
        >
          <Text style={styles.opac}>
            {loading ? (
              <ActivityIndicator size="large" color="yellow" />
            ) : (
              "SUBMIT"
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BankPen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },

  opac: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
  link: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#999999",
  },
  enbutton: {
    backgroundColor: "green",
  },
});
