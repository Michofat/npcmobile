import React, { useState, useContext, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import { newRequest } from "../../utils/newRequest";
import Constants from "expo-constants";
import RNPickerSelect from "react-native-picker-select";
import { AntDesign } from "@expo/vector-icons";
import { GlobalContext } from "../../context/GlobalProvider";

const useDropdownData = (endpoint) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await newRequest.get(endpoint);
        setData(response.data);
      } catch (error) {
        console.error(`Failed to fetch data from ${endpoint}`, error);
      }
    };
    fetchData();
  }, [endpoint]);

  return data;
};

const Dropdown = ({
  items,
  value,
  setValue,
  label,
  placeholder,
  onItemChange,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.label}>{label}</Text>
      <RNPickerSelect
        onValueChange={(selectedValue) => {
          setValue(selectedValue);
          onItemChange?.(selectedValue); // Notify parent of the selected value
        }}
        items={items}
        value={value}
        placeholder={{ label: placeholder, value: null, color: "#9EA0A4" }}
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
    </View>
  );
};

const DeptRank = () => {
  const { userInfo, processDeptRank, loading } = useContext(GlobalContext);

  const [station, setStation] = useState("");
  const [postingLg, setPostingLg] = useState("");
  const [dept, setDept] = useState("");
  const [deptId, setDeptId] = useState(null);
  const [rank, setRank] = useState("");
  const [rankView, setRankView] = useState([]);

  const stationView = useDropdownData("/fetchstation");
  const deptView = useDropdownData("/fetchdeptrecord");

  // Initialize state based on userInfo
  useEffect(() => {
    if (userInfo[0]) {
      const { station, postinglg, dept, rank } = userInfo[0];
      setStation(station || "");
      setPostingLg(postinglg || "");
      setDept(dept || "");
      setRank(rank || "");
    }
  }, [userInfo]);

  // Fetch ranks when deptId changes
  useEffect(() => {
    const fetchRanksForDepartment = async () => {
      if (deptId) {
        try {
          const response = await newRequest.get(`/fetchranks/${deptId}`);
          setRankView(response.data);
        } catch (error) {
          console.error("Failed to fetch ranks for department", error);
        }
      }
    };
    fetchRanksForDepartment();
  }, [deptId]);

  // Transform data for dropdowns
  const transformedData = useCallback(
    (data, labelKey, valueKey) =>
      data.map((item) => ({
        key: item.id.toString(),
        label: item[labelKey],
        value: item[valueKey],
      })),
    []
  );

  // Update department state dynamically
  const handleDeptChange = (selectedDeptId) => {
    const deptIdNumber = parseInt(selectedDeptId, 10); // Convert to number
    setDeptId(deptIdNumber); // Update department ID

    const selectedDept = deptView.find((item) => item.id === deptIdNumber);
    if (selectedDept) {
      setDept(selectedDept.department); // Update department name
    } else {
      console.warn("Department not found for ID:", deptIdNumber);
    }
  };

  const isFormValid = [station, postingLg, dept, rank].every(Boolean);
  console.log("Department Data:", deptView);

  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.title}>Edit Office Details</Text>
      <View style={styles.separator} />

      <View style={styles.container}>
        <Dropdown
          items={transformedData(stationView, "ate", "ate")}
          value={station}
          setValue={setStation}
          label={`State of Posting (${userInfo[0]?.station || ""})`}
          placeholder="Select state"
        />

        <Text style={styles.title2}>
          {`Posting LG area (${userInfo[0]?.postinglg || ""})`}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Posting Local Govt. Area"
          value={postingLg}
          onChangeText={setPostingLg}
        />

        <Dropdown
          items={transformedData(deptView, "department", "id")}
          value={deptId} // Pass the department ID directly
          setValue={(selectedId) => {
            handleDeptChange(selectedId);
          }}
          label="Department"
          placeholder="Select department"
          onItemChange={(selectedId) => setDeptId(selectedId)} // Update deptId if necessary
        />

        <Dropdown
          items={transformedData(rankView, "designation", "designation")}
          value={rank}
          setValue={setRank}
          label="Rank"
          placeholder="Select rank"
        />
        {userInfo[0]?.completed < 2 && (
          <TouchableOpacity
            style={[
              styles.button,
              isFormValid ? styles.enabled : styles.disabled,
            ]}
            onPress={() =>
              isFormValid && processDeptRank(station, postingLg, dept, rank)
            }
            disabled={!isFormValid}
          >
            <Text style={styles.buttonText}>
              {loading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                "Submit"
              )}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    marginTop: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    color: "green",
    marginHorizontal: 25,
    marginBottom: 20,
  },
  title2: {
    fontSize: 16,
    fontWeight: "500",
    // color: "green",
    // marginHorizontal: 25,
    marginVertical: 10,
  },
  separator: {
    borderBottomWidth: 1,
    marginTop: 15,
    marginBottom: 20,
    width: "100%",
    alignSelf: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 10,
    color: "#333",
  },
  input: {
    marginBottom: 20,
    borderWidth: 0.5,
    height: 40,
    padding: 10,
    borderRadius: 5,
    borderColor: "#ddd",
    color: "#333",
  },
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
  },
  enabled: {
    backgroundColor: "green",
  },
  disabled: {
    backgroundColor: "#999999",
  },
  dropdownContainer: {
    marginBottom: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  input: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
});

export default DeptRank;
