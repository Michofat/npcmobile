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

const LeaveApplication = () => {
  const { userInfo } = useContext(GlobalContext);
  const navigation = useNavigation();
  const [nodays, setNodays] = useState("");
  const [whereleave, setWhereleave] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [valueloaname, setValueloaname] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [loanview, setLoanView] = useState([]);
  const [datered, setDatered] = useState(""); // Date redeployed

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

  const isSubmitEnabled = valueloaname && datered && whereleave && nodays;
  // console.log(isSubmitEnabled, valueloaname, datered, whereleave, nodays);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Fill the form below</Text>
      <View style={styles.separator} />

      <Text style={styles.label}>Type of leave</Text>
      <RNPickerSelect
        value={valueloaname}
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
            name="down"
            size={20}
            color={isFocus ? "green" : "black"}
          />
        )}
      />

      <Text style={styles.label}>Proposed start date</Text>
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

      <Text style={styles.label}>Number of days requested</Text>
      <TextInput
        style={styles.inputdays}
        value={nodays}
        onChangeText={setNodays}
        keyboardType="numeric"
        placeholder="e.g., 5"
      />

      <Text style={styles.label}>Location during leave</Text>
      <TextInput
        style={styles.input}
        value={whereleave}
        onChangeText={setWhereleave}
        placeholder="Enter location"
      />

      <TouchableOpacity
        style={[
          styles.button,
          isSubmitEnabled ? styles.enabledButton : styles.disabledButton,
        ]}
        onPress={processleave}
        disabled={!isSubmitEnabled}
      >
        <Text style={styles.buttonText}>
          {isLoading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            "Submit"
          )}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F8F9FA",
  },
  separator: {
    borderBottomWidth: 1,
    marginVertical: 20,
    borderColor: "#E0E0E0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#343A40",
    textAlign: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#495057",
    marginTop: 15,
  },
  input: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#CED4DA",
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#FFF",
  },
  inputdays: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#CED4DA",
    borderRadius: 8,
    height: 48,
    width: 100,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#FFF",
  },
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  enabledButton: {
    backgroundColor: "#28A745",
  },
  disabledButton: {
    backgroundColor: "#6C757D",
  },
  cancelButton: {
    backgroundColor: "#FFC107",
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: "#007BFF",
  },
  datePicker: {
    width: "100%",
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#CED4DA",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "#FFF",
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#CED4DA",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: "#FFF",
    marginBottom: 20,
  },
  iconContainer: {
    top: 15,
    right: 10,
  },
});

export default LeaveApplication;
