import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  TextInput,
  ScrollView,
  Alert,
  Platform,
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

  const [isFocus, setIsFocus] = useState(false);
  const [gender, setGender] = useState(userInfo[0]?.sex || "");
  const [marital, setMarital] = useState(userInfo[0]?.marit || "");
  const [title, setTitle] = useState(userInfo[0]?.titl || "");
  const [fon, setFon] = useState(userInfo[0]?.fon || "");
  const [addy, setAddy] = useState(userInfo[0]?.addy || "");
  const [emal, setEmal] = useState(userInfo[0]?.emal || "");

  const handleSubmit = () => {
    if (title && gender && marital && fon && addy) {
      processbio(title, gender, marital, fon, addy);
    } else {
      Alert.alert("Error", "Please fill out all required fields");
    }
  };

  return (
    <>
      <ScrollView>
        <Text style={styles.dws}>Edit Profile</Text>
        <View style={styles.container}>
          <Text style={styles.inputTitle}>Title (Mr/Mrs/Dr/...)</Text>
          <TextInput
            maxLength={20}
            onChangeText={setTitle}
            value={title}
            style={styles.input}
          />
          <Text style={styles.textInput}>
            Select your gender ({userInfo[0]?.sex})
          </Text>
          <RNPickerSelect
            onValueChange={(value) => {
              setGender(value);
              console.log("Selected Gender:", value);
            }}
            items={genderOptions}
            placeholder={{
              label: isFocus ? "..." : "Select gender",
              value: null,
              color: "#9EA0A4",
            }}
            onOpen={() => setIsFocus(true)}
            onClose={() => setIsFocus(false)}
            style={pickerSelectStyles.input}
          />

          <Text style={styles.textInput}>
            Select marital status ({userInfo[0]?.marit})
          </Text>

          <RNPickerSelect
            onValueChange={(value) => {
              setMarital(value);
              console.log("Selected Gender:", value);
            }}
            items={maritalStatusOptions}
            placeholder={{
              label: isFocus ? "..." : "Select item",
              value: null,
              color: "#9EA0A4",
            }}
            onOpen={() => setIsFocus(true)}
            onClose={() => setIsFocus(false)}
            style={pickerSelectStyles.input}
          />

          <Text style={styles.inputTitle}>Email address</Text>
          <TextInput
            maxLength={65}
            autoCapitalize="none"
            value={emal}
            style={styles.input}
            editable={false}
            selectTextOnFocus={false}
          />
          <Text style={styles.inputTitle}>Phone number *</Text>
          <TextInput
            maxLength={11}
            onChangeText={setFon}
            keyboardType="number-pad"
            value={fon}
            style={styles.input}
          />
          <Text style={styles.inputTitle}>Residential address *</Text>
          <TextInput
            editable
            multiline
            numberOfLines={3}
            maxLength={250}
            onChangeText={setAddy}
            value={addy}
            style={styles.input2}
          />
          <TouchableOpacity
            style={[
              styles.link,
              title && gender && marital && fon && addy
                ? styles.enbutton
                : styles.disbutton,
            ]}
            onPress={handleSubmit}
            disabled={!title || !gender || !marital || !fon || !addy}
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
  },
  dws: {
    margin: 20,
    fontSize: 25,
    fontWeight: "700",
  },
  input: {
    marginBottom: 30,
    marginTop: 10,
    borderWidth: 0.5,
    height: 40,
    padding: 10,
    borderRadius: 5,
  },
  input2: {
    marginBottom: 30,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 5,
  },
  inputTitle: { marginVertical: 15, fontSize: 18 },
  textInput: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: "600",
  },
  dropdown: {
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 10,
    marginBottom: 30,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  enbutton: { backgroundColor: "green" },
  disbutton: { backgroundColor: "#999999" },
  icon: {
    marginRight: 10,
  },
  link: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginTop: 30,
  },
  opac: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
});

const pickerSelectStyles = StyleSheet.create({
  input: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === "ios" ? 12 : 8, // Adjust padding based on platform
    borderWidth: 1,
    borderColor: "black", // Change border color as needed
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default BioData;
