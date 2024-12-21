import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalProvider";
import Constants from "expo-constants";

const Nok = () => {
  const { userInfo, loading, updatenok } = useContext(GlobalContext);

  const [nok, setNok] = useState(userInfo[0]?.nok);
  const [nokwho, setNokwho] = useState(userInfo[0]?.nokwho);
  const [nokfon, setNokfon] = useState(userInfo[0]?.nokfon);
  const [nokaddy, setNokaddy] = useState(userInfo[0]?.nokaddy);
  const [nok2, setNok2] = useState(userInfo[0]?.nok2);
  const [nok2who, setNok2who] = useState(userInfo[0]?.nok2who);
  const [nok2fon, setNok2fon] = useState(userInfo[0].nok2fon);
  const [nok2addy, setNok2addy] = useState(userInfo[0]?.nok2addy);

  const isFormValid = () => {
    return (
      nok &&
      nokfon &&
      nokaddy &&
      nokwho &&
      nok2 &&
      nok2fon &&
      nok2addy &&
      nok2who
    );
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      updatenok(nok, nokfon, nokaddy, nokwho, nok2, nok2fon, nok2addy, nok2who);
    } else {
      Alert.alert("Please fill in all fields.");
    }
  };

  return (
    <ScrollView style={{ marginTop: Constants.statusBarHeight }}>
      <View style={styles.container}>
        <Text style={styles.title}>NEXT-OF-KIN EDIT</Text>

        <TextInput
          maxLength={65}
          onChangeText={(text) => setNok(text)}
          //  onChangeText={(text) => handleCheckEmail(text)}
          autoCapitalize="none"
          value={nok}
          style={styles.input}
          selectTextOnFocus={false}
        />

        <Text style={styles.inputtitle}>Relationship </Text>

        <TextInput
          maxLength={65}
          onChangeText={(text) => setNokwho(text)}
          //  onChangeText={(text) => handleCheckEmail(text)}
          autoCapitalize="none"
          value={nokwho}
          style={styles.input}
          selectTextOnFocus={false}
        />

        <Text style={styles.inputtitle}>Phone number</Text>

        <TextInput
          maxLength={65}
          onChangeText={(text) => setNokfon(text)}
          //  onChangeText={(text) => handleCheckEmail(text)}
          autoCapitalize="none"
          value={nokfon}
          style={styles.input}
          selectTextOnFocus={false}
        />

        <Text style={styles.inputtitle}>Address</Text>

        <TextInput
          maxLength={65}
          onChangeText={(text) => setNokaddy(text)}
          //  onChangeText={(text) => handleCheckEmail(text)}
          autoCapitalize="none"
          value={nokaddy}
          style={styles.input}
          selectTextOnFocus={false}
        />

        <View style={{ borderBottomWidth: 3, marginBottom: 30 }} />

        <Text style={styles.inputtitle}>Secondary Nok (Full Name) </Text>

        <TextInput
          maxLength={65}
          onChangeText={(text) => setNok2(text)}
          autoCapitalize="none"
          value={nok2}
          style={styles.input}
          selectTextOnFocus={false}
        />

        <Text style={styles.inputtitle}>Relationship</Text>

        <TextInput
          maxLength={65}
          onChangeText={(text) => setNok2who(text)}
          autoCapitalize="none"
          value={nok2who}
          style={styles.input}
          selectTextOnFocus={false}
        />

        <Text style={styles.inputtitle}>Phone number </Text>

        <TextInput
          maxLength={65}
          onChangeText={(text) => setNok2fon(text)}
          autoCapitalize="none"
          value={nok2fon}
          style={styles.input}
          selectTextOnFocus={false}
        />

        <Text style={styles.inputtitle}>Address</Text>

        <TextInput
          maxLength={65}
          onChangeText={(text) => setNok2addy(text)}
          autoCapitalize="none"
          value={nok2addy}
          style={styles.input}
          selectTextOnFocus={false}
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
              {" "}
              {loading ? (
                <ActivityIndicator size="large" color="yellow" />
              ) : (
                "SUBMIT"
              )}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default Nok;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  inputtitle: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "500",
    color: "#555",
  },
  input: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 45,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    backgroundColor: "#4CAF50", // Default green button
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 10,
  },
  buttonEnabled: {
    backgroundColor: "#28a745", // Brighter green for enabled state
  },
  buttonDisabled: {
    backgroundColor: "#ddd", // Gray for disabled state
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginVertical: 20,
  },
});
