import React, { useState, useContext, useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { GlobalContext } from "../../context/GlobalProvider";

const AddRedeployment = () => {
  const { userInfo, addredepnow, loading } = useContext(GlobalContext);
  const [newstation, setNewstation] = useState("");
  const [datered, setDatered] = useState("");
  const [datexit, setDateexit] = useState("");
  const [desigpost, setDesigpost] = useState("");

  const handleSubmit = () => {
    addredepnow(newstation, datered, datexit, desigpost);
  };

  const isFormValid =
    newstation.length > 2 &&
    datered.length > 5 &&
    datexit.length > 5 &&
    desigpost.length > 2;

  return (
    <ScrollView>
      <View style={styles.container}>
        <FormField
          title="Station of redeployment"
          value={newstation}
          onChangeText={setNewstation}
        />
        <FormField
          title="Date redeployed"
          value={datered}
          onChangeText={setDatered}
        />
        <FormField
          title="Date posted out"
          value={datexit}
          onChangeText={setDateexit}
        />
        <FormField
          title="Designation/rank at redeployment"
          value={desigpost}
          onChangeText={setDesigpost}
        />

        <TouchableOpacity
          style={[
            styles.button,
            isFormValid ? styles.enabledButton : styles.disabledButton,
          ]}
          onPress={handleSubmit}
          disabled={!isFormValid}
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

const FormField = ({ title, value, onChangeText }) => (
  <>
    <Text style={styles.inputTitle}>{title}</Text>
    <TextInput
      maxLength={65}
      onChangeText={onChangeText}
      value={value}
      style={styles.input}
      autoCapitalize="none"
    />
  </>
);

export default AddRedeployment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  adtitle: {
    alignSelf: "center",
    fontSize: 26,
    fontWeight: "700",
    marginTop: 30,
  },
  inputTitle: {
    marginBottom: 5,
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
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 15,
    width: "80%",
  },
  enabledButton: {
    backgroundColor: "green",
  },
  disabledButton: {
    backgroundColor: "#999999",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
});
