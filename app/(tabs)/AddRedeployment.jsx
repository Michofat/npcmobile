import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
  Pressable,
  Platform,
} from "react-native";
import { GlobalContext } from "../../context/GlobalProvider";
import DateTimePicker from "@react-native-community/datetimepicker";

const AddRedeployment = () => {
  const { userInfo, addredepnow, loading } = useContext(GlobalContext);
  const [newstation, setNewstation] = useState("");
  const [datered, setDatered] = useState(""); // Date redeployed
  const [datexit, setDatexit] = useState(""); // Date posted out
  const [desigpost, setDesigpost] = useState("");
  const [showDateredPicker, setShowDateredPicker] = useState(false);
  const [showDatexitPicker, setShowDatexitPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const toggleDateredPicker = () => setShowDateredPicker(!showDateredPicker);
  const toggleDatexitPicker = () => setShowDatexitPicker(!showDatexitPicker);

  const onChangeDatered = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDateredPicker();
        setDatered(formatDate(currentDate)); // Set `datered` with the formatted date
      }
    } else {
      toggleDateredPicker();
    }
  };

  const onChangeDatexit = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatexitPicker();
        setDatexit(formatDate(currentDate)); // Set `datexit` with the formatted date
      }
    } else {
      toggleDatexitPicker();
    }
  };

  const confirmIOSDatered = () => {
    setDatered(formatDate(date)); // Set `datered` for iOS
    toggleDateredPicker();
  };

  const confirmIOSDatexit = () => {
    setDatexit(formatDate(date)); // Set `datexit` for iOS
    toggleDatexitPicker();
  };

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = () => {
    addredepnow(newstation, datered, datexit, desigpost); // Submit both dates
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

        {/* Date Redeployed */}
        <Text style={styles.label}>Date redeployed</Text>
        <View>
          {showDateredPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={onChangeDatered}
              style={styles.datePicker}
            />
          )}
          {!showDateredPicker && (
            <Pressable onPress={toggleDateredPicker}>
              <TextInput
                style={styles.input}
                placeholder="00-00-0000"
                value={datered} // Bind to `datered`
                onChangeText={setDatered}
                placeholderTextColor="#11182744"
                editable={false}
                onPressIn={toggleDateredPicker}
              />
            </Pressable>
          )}
          {showDateredPicker && Platform.OS === "ios" && (
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={toggleDateredPicker}
              >
                <Text style={[styles.buttonText, { color: "#075985" }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={confirmIOSDatered}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Date Posted Out */}
        <Text style={styles.label}>Date posted out</Text>
        <View>
          {showDatexitPicker && (
            <DateTimePicker
              mode="date"
              display="spinner"
              value={date}
              onChange={onChangeDatexit}
              style={styles.datePicker}
            />
          )}
          {!showDatexitPicker && (
            <Pressable onPress={toggleDatexitPicker}>
              <TextInput
                style={styles.input}
                placeholder="00-00-0000"
                value={datexit} // Bind to `datexit`
                onChangeText={setDatexit}
                placeholderTextColor="#11182744"
                editable={false}
                onPressIn={toggleDatexitPicker}
              />
            </Pressable>
          )}
          {showDatexitPicker && Platform.OS === "ios" && (
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={toggleDatexitPicker}
              >
                <Text style={[styles.buttonText, { color: "#075985" }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={confirmIOSDatexit}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

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
          disabled={!isFormValid || loading}
        >
          {loading ? (
            <ActivityIndicator size="large" color="yellow" />
          ) : (
            <Text style={styles.buttonText}>SUBMIT</Text>
          )}
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
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "transparent",
    padding: 5,
  },
  confirmButton: {
    backgroundColor: "#075985",
    padding: 5,
  },
});
