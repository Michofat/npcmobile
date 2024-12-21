import React, { useState, useContext } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import { GlobalContext } from "../../context/GlobalProvider";

const Spouse = () => {
  const { userInfo, loading, updatespouse } = useContext(GlobalContext);
  const [spouseName, setSpouseName] = useState(userInfo[0]?.spousename);
  const [spouseOccupation, setSpouseOccupation] = useState(
    userInfo[0]?.spouseoccup
  );
  const [spouseOfficeAddress, setSpouseOfficeAddress] = useState(
    userInfo[0]?.spouseoffice
  );
  const [spousePhoneNumber, setSpousePhoneNumber] = useState(
    userInfo[0]?.spousefon
  );

  const handleSubmit = () => {
    updatespouse(
      spouseName,
      spousePhoneNumber,
      spouseOfficeAddress,
      spouseOccupation
    );
  };

  const isFormValid = () => {
    return (
      spouseName && spousePhoneNumber && spouseOfficeAddress && spouseOccupation
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.inputTitle}>Spouse Full Name</Text>
        <TextInput
          maxLength={65}
          onChangeText={setSpouseName}
          value={spouseName}
          style={styles.input}
          autoCapitalize="none"
        />

        <Text style={styles.inputTitle}>Phone Number</Text>
        <TextInput
          maxLength={15}
          onChangeText={setSpousePhoneNumber}
          value={spousePhoneNumber}
          style={styles.input}
          autoCapitalize="none"
        />

        <Text style={styles.inputTitle}>Occupation</Text>
        <TextInput
          maxLength={65}
          onChangeText={setSpouseOccupation}
          value={spouseOccupation}
          style={styles.input}
          autoCapitalize="none"
        />

        <Text style={styles.inputTitle}>Office Address</Text>
        <TextInput
          maxLength={100}
          onChangeText={setSpouseOfficeAddress}
          value={spouseOfficeAddress}
          style={styles.input}
          autoCapitalize="none"
        />

        {userInfo[0]?.completed < 2 && (
          <TouchableOpacity
            style={[
              styles.button,
              isFormValid() ? styles.buttonEnabled : styles.buttonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!isFormValid()}
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

export default Spouse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    backgroundColor: "#f4f4f4",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  inputTitle: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    marginBottom: 15,
    height: 45,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    fontSize: 16,
    color: "#333",
  },
  button: {
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  buttonEnabled: {
    backgroundColor: "#28a745", // Green for enabled
  },
  buttonDisabled: {
    backgroundColor: "#999", // Gray for disabled
  },
});
