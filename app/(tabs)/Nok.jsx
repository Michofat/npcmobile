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
      </View>
    </ScrollView>
  );
};

export default Nok;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: "700",
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
