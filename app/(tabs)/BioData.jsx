import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalProvider";
import RNPickerSelect from "react-native-picker-select";

const genderOptions = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
];

const maritalStatusOptions = [
  { label: "Single", value: "Single" },
  { label: "Married", value: "Married" },
  { label: "Divorced", value: "Divorced" },
  { label: "Separated", value: "Separated" },
];

const BioData = () => {
  const { userInfo, processbio, loading } = useContext(GlobalContext);

  const [gender, setGender] = useState(userInfo[0]?.sex);
  const [marital, setMarital] = useState(userInfo[0]?.marit);
  const [title, setTitle] = useState(userInfo[0]?.titl);
  const [fon, setFon] = useState(userInfo[0]?.fon);
  const [addy, setAddy] = useState(userInfo[0]?.addy);
  const [emal, setEmal] = useState(userInfo[0]?.emal);

  const handleSubmit = () => {
    if (title && gender && marital && fon && addy) {
      processbio(title, gender, marital, fon, addy);
    } else {
      Alert.alert("Error", "Please fill out all required fields");
    }
  };

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.header}>Edit Profile</Text>
      <View style={styles.card}>
        <Text style={styles.sectionHeader}>Personal Information</Text>
        <TextInput
          placeholder="Title (e.g., Mr, Mrs, Dr)"
          maxLength={20}
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <RNPickerSelect
          items={genderOptions}
          value={gender}
          onValueChange={setGender}
          placeholder={{ label: "Select Gender", value: null }}
          style={pickerSelectStyles}
        />
        <RNPickerSelect
          items={maritalStatusOptions}
          value={marital}
          onValueChange={setMarital}
          placeholder={{ label: "Select Marital Status", value: null }}
          style={pickerSelectStyles}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionHeader}>Contact Information</Text>
        <TextInput
          placeholder="Email Address"
          value={emal}
          editable={false}
          style={[styles.input, styles.disabledInput]}
        />
        <TextInput
          placeholder="Phone Number"
          maxLength={11}
          keyboardType="number-pad"
          value={fon}
          onChangeText={setFon}
          style={styles.input}
        />
        <TextInput
          placeholder="Residential Address"
          value={addy}
          onChangeText={setAddy}
          multiline
          numberOfLines={3}
          style={styles.textArea}
        />
      </View>
      {userInfo[0]?.completed < 2 && (
        <TouchableOpacity
          style={[
            styles.submitButton,
            title && gender && marital && fon && addy
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={handleSubmit}
          disabled={loading || !(title && gender && marital && fon && addy)}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.submitButtonText}>SUBMIT</Text>
          )}
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
    color: "#333",
  },
  card: {
    backgroundColor: "#FFF",
    margin: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#444",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#FFF",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#FFF",
  },
  disabledInput: {
    backgroundColor: "#EEE",
    color: "#666",
  },
  submitButton: {
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  activeButton: {
    backgroundColor: "green",
  },
  inactiveButton: {
    backgroundColor: "#999",
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    backgroundColor: "#FFF",
    marginBottom: 15,
  },
  inputAndroid: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    backgroundColor: "#FFF",
    marginBottom: 15,
  },
};

export default BioData;
