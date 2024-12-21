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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                placeholderTextColor="#B0B0B0"
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
                <Text style={[styles.buttonText, { color: "#FF6B6B" }]}>
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
                placeholderTextColor="#B0B0B0"
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
                <Text style={[styles.buttonText, { color: "#FF6B6B" }]}>
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
            <ActivityIndicator size="large" color="white" />
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
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: "#F9F9F9",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  inputTitle: {
    marginBottom: 8,
    fontSize: 16,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#ddd",
    borderRadius: 8,
    height: 45,
    paddingLeft: 12,
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  button: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8, // Reduced padding for a smaller button
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: "48%", // Fit buttons within available width
  },
  enabledButton: {
    backgroundColor: "#28a745",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  cancelButton: {
    backgroundColor: "#FFF",
  },
  confirmButton: {
    backgroundColor: "#28abbb",
  },
  datePicker: {
    width: "100%",
    backgroundColor: "#fff",
  },
});
