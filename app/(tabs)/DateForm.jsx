import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { GlobalContext } from "../../context/GlobalProvider";

const DateForm = () => {
  const { processdates, loading, userInfo } = useContext(GlobalContext);

  const [dates, setDates] = useState({
    dob: "",
    dfirstappt: "",
    dconfirm: "",
    dpreappt: "",
  });

  const [dateType, setDateType] = useState(null); // Tracks which date picker is open
  const [tempDate, setTempDate] = useState(new Date());

  const toggleDatePicker = (type) => {
    setDateType(type);
  };

  const onChangeDate = ({ type }, selectedDate) => {
    if (type === "set") {
      const formattedDate = formatDate(selectedDate);
      setDates((prevDates) => ({ ...prevDates, [dateType]: formattedDate }));
      setTempDate(selectedDate);
      toggleDatePicker(null);
    } else {
      toggleDatePicker(null);
    }
  };

  const confirmIOSDate = () => {
    const formattedDate = formatDate(tempDate);
    setDates((prevDates) => ({ ...prevDates, [dateType]: formattedDate }));
    toggleDatePicker(null);
  };

  const handleSubmit = () => {
    const isFormComplete = Object.values(dates).every((date) => date);
    if (isFormComplete) {
      processdates(dates);
    } else {
      Alert.alert(
        "Error",
        "Please fill out all date fields before submitting."
      );
    }
  };

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${year}-${month}-${day}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Date Form</Text>

      {["dob", "dfirstappt", "dconfirm", "dpreappt"].map((key, index) => (
        <View key={index} style={styles.inputGroup}>
          <Text style={styles.label}>
            {key === "dob"
              ? "Date of Birth"
              : key === "dfirstappt"
              ? "Date of Employment"
              : key === "dconfirm"
              ? "Date of Confirmation"
              : "Date of Last Deployment"}
          </Text>
          <Pressable onPress={() => toggleDatePicker(key)}>
            <TextInput
              style={styles.input}
              placeholder="YYYY-MM-DD"
              value={dates[key]}
              editable={false}
              onPressIn={() => toggleDatePicker(key)}
            />
          </Pressable>
        </View>
      ))}

      {dateType && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={tempDate}
          onChange={onChangeDate}
        />
      )}
      {dateType && Platform.OS === "ios" && (
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => toggleDatePicker(null)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.confirmButton]}
            onPress={confirmIOSDate}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      )}

      {userInfo[0]?.completed < 2 && (
        <TouchableOpacity
          style={[
            styles.submitButton,
            Object.values(dates).every((date) => date)
              ? styles.enabled
              : styles.disabled,
          ]}
          onPress={handleSubmit}
          disabled={loading || !Object.values(dates).every((date) => date)}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.submitButtonText}>Submit</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F8F9FA",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CED4DA",
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#FFF",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 20,
  },
  cancelButton: {
    backgroundColor: "#FFC107",
  },
  confirmButton: {
    backgroundColor: "#007BFF",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
  },
  submitButton: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
  },
  enabled: {
    backgroundColor: "#28A745",
  },
  disabled: {
    backgroundColor: "#6C757D",
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default DateForm;
