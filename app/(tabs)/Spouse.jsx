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
        <Text style={styles.inputTitle}>Spouse full name</Text>
        <TextInput
          maxLength={65}
          onChangeText={(text) => setSpouseName(text)}
          autoCapitalize="none"
          value={spouseName}
          style={styles.input}
          selectTextOnFocus={false}
        />

        <Text style={styles.inputTitle}>Spouse phone number </Text>
        <TextInput
          maxLength={65}
          onChangeText={(text) => setSpousePhoneNumber(text)}
          autoCapitalize="none"
          value={spousePhoneNumber}
          style={styles.input}
          selectTextOnFocus={false}
        />

        <Text style={styles.inputTitle}>Spouse Occupation</Text>
        <TextInput
          maxLength={65}
          onChangeText={(text) => setSpouseOccupation(text)}
          autoCapitalize="none"
          value={spouseOccupation}
          style={styles.input}
          selectTextOnFocus={false}
        />

        <Text style={styles.inputTitle}>Spouse Office address</Text>
        <TextInput
          maxLength={65}
          onChangeText={(text) => setSpouseOfficeAddress(text)}
          autoCapitalize="none"
          value={spouseOfficeAddress}
          style={styles.input}
          selectTextOnFocus={false}
        />

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

export default Spouse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  content: {
    padding: 30,
  },
  inputTitle: {
    marginBottom: 10,
    fontSize: 18,
  },
  input: {
    marginBottom: 30,
    borderWidth: 0.5,
    height: 40,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#999999",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginRight: 10,
  },
  buttonEnabled: {
    backgroundColor: "green",
  },
  buttonDisabled: {
    backgroundColor: "#999999",
  },
});
