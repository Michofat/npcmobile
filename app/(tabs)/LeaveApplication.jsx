import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { newRequest } from "../../utils/newRequest";
import { GlobalContext } from "../../context/GlobalProvider";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { router } from "expo-router";

export default LeaveApplication = () => {
  const { userInfo } = useContext(GlobalContext);
  const navigation = useNavigation();
  const [nodays, setNodays] = useState("");
  const [whereleave, setWhereleave] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [valueloaname, setValueloaname] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [loanview, setLoanView] = useState([]);
  const [date, setDate] = useState(new Date());
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [stationView, setStationView] = useState([]);

  const maritalStatusOptions = [
    { label: "Single", value: "Single" },
    { label: "Married", value: "Married" },
    { label: "Divorced", value: "Divorced" },
    { label: "Separated", value: "Separated" },
  ];

  const toggleDatepicker = () => setShowPicker(!showPicker);

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatepicker();
        setDateOfBirth(formatDate(currentDate));
      }
    } else {
      toggleDatepicker;
    }
  };

  const confirmIOSDate = () => {
    setDateOfBirth(formatDate(date));
    toggleDatepicker();
  };

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${day}-${month}-${year}`;
  };

  const processleave = async () => {
    setIsLoading(true);
    try {
      const staffid = userInfo[0]?.id;
      const fullname = userInfo[0]?.fullname;
      const station = userInfo[0]?.station;
      const emal = userInfo[0]?.emal;
      const fon = userInfo[0]?.fon;
      const response = await newRequest.post("/leaveapplication", {
        staffid,
        fulln: fullname,
        station,
        emal,
        fon,
        leavetype: valueloaname,
        dstart: date,
        whereleave,
        ddays: nodays,
      });
      Alert.alert(
        "Success!",
        `${response.data}. Please check later for approval by the Admin.`,
        [{ text: "OK", onPress: () => router.push("/LeaveHistory") }],
        { cancelable: true }
      );
      setIsLoading(false);
    } catch (error) {
      Alert.alert(
        "Error!!!",
        error.response.data,
        [{ text: "Try again", onPress: () => setIsLoading(false) }],
        { cancelable: true }
      );
      setIsLoading(false);
    }
  };

  const fetchLeave = async () => {
    try {
      const response = await newRequest.get("/fetchleave");

      setLoanView(response?.data);
    } catch (error) {
      alert(error?.response?.data);
    }
  };

  useEffect(() => {
    fetchLeave();
  }, []);

  const transformedLoan = loanview?.map((item) => ({
    label: item?.leavetype,
    value: item?.leavevalue,
  }));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Fill form below</Text>
      <View style={styles.separator} />

      <Text style={styles.label}>Type of leave</Text>

      <RNPickerSelect
        onValueChange={(value) => setValueloaname(value)}
        items={transformedLoan || []}
        placeholder={{
          label: isFocus ? "..." : "Select item",
          value: null,
          color: "#9EA0A4",
        }}
        onOpen={() => setIsFocus(true)}
        onClose={() => setIsFocus(false)}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        Icon={() => (
          <AntDesign
            name="caretdown"
            size={20}
            color={isFocus ? "green" : "black"}
          />
        )}
      />

      <Text style={styles.label}>Proposed start date</Text>
      <View>
        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onChange}
            style={styles.datePicker}
            minimumDate={new Date()}
          />
        )}
        {!showPicker && (
          <Pressable onPress={toggleDatepicker}>
            <TextInput
              style={styles.input}
              placeholder="00-00-0000"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              placeholderTextColor="#11182744"
              editable={false}
              onPressIn={toggleDatepicker}
            />
          </Pressable>
        )}
        {showPicker && Platform.OS === "ios" && (
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={toggleDatepicker}
            >
              <Text style={[styles.buttonText, { color: "#075985" }]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={confirmIOSDate}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Text style={styles.label}>Number of days requested</Text>
      <TextInput
        style={styles.inputdays}
        value={nodays}
        onChangeText={setNodays}
        autoCompleteType="off"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Location during leave</Text>
      <TextInput
        style={styles.input}
        value={whereleave}
        onChangeText={setWhereleave}
        autoCompleteType="off"
      />

      <TouchableOpacity
        style={[
          styles.button,
          valueloaname && date && whereleave && nodays
            ? styles.enabledButton
            : styles.disabledButton,
        ]}
        onPress={processleave}
        disabled={!valueloaname || !date || !whereleave || !nodays}
      >
        <Text style={styles.buttonText}>
          {isLoading ? (
            <ActivityIndicator size="large" color="yellow" />
          ) : (
            "SUBMIT"
          )}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  separator: {
    borderBottomWidth: 1,
    marginTop: 15,
    width: "100%",
    alignSelf: "center",
  },
  title: {
    marginHorizontal: 25,
    marginTop: 30,
    fontSize: 25,
    fontWeight: "700",
    color: "green",
  },
  label: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: "600",
  },
  input: {
    marginBottom: 30,
    marginTop: 10,
    borderWidth: 0.5,
    height: 40,
    padding: 10,
  },
  inputdays: {
    marginBottom: 30,
    marginTop: 10,
    borderWidth: 0.5,
    height: 40,
    width: 50,
    padding: 10,
  },
  dropdown: {
    marginBottom: 30,
    marginTop: 10,
    borderWidth: 0.5,
    padding: 10,
  },
  placeholder: {
    fontSize: 16,
  },
  selectedText: {
    fontSize: 16,
  },
  inputSearch: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    width: 20,
    height: 20,
  },
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  enabledButton: {
    backgroundColor: "green",
  },
  disabledButton: {
    backgroundColor: "#999999",
  },
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  buttonRow: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  cancelButton: {
    paddingHorizontal: 20,
    backgroundColor: "#11182711",
  },
  confirmButton: {
    paddingHorizontal: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
});
