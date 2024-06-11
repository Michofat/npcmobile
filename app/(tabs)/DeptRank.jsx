import React, { useState, useContext, useEffect } from "react";
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

const DeptRank = () => {
  const { userInfo, processDeptRank, loading } = useContext(GlobalContext);
  const [isFocus, setIsFocus] = useState(false);
  const [deptview, setDeptview] = useState([]);
  const [stationView, setStationView] = useState([]);
  const [cadreView, setCadreView] = useState([]);
  const [rankView, setRankView] = useState([]);

  const [station, setStation] = useState(userInfo[0]?.station);
  const [postingLg, setPostingLg] = useState(userInfo[0]?.postinglg);
  const [dept, setDept] = useState(userInfo[0]?.dept);
  const [rank, setRank] = useState(userInfo[0]?.rank);
  const [cadre, setCadre] = useState(userInfo[0]?.cadre);
  const [gradeL, setGradeL] = useState(userInfo[0]?.gradel);
  const [stepP, setStepP] = useState(userInfo[0]?.stepp);

  const fetchDeptData = async () => {
    try {
      const response = await newRequest.get("/fetchdeptrecord");
      setDeptview(response.data);
    } catch (error) {
      // console.error(error);
    }
  };

  const fetchRankData = async () => {
    try {
      const response = await newRequest.get("/fetchrankrecord");
      setRankView(response.data);
    } catch (error) {
      // console.error(error);
    }
  };

  const fetchCadreData = async () => {
    try {
      const response = await newRequest.get("/fetchcadrerecord");
      setCadreView(response.data);
    } catch (error) {
      //console.error(error);
      // Handle error
    }
  };

  const fetchStationData = async () => {
    try {
      const response = await newRequest.get("/fetchstation");
      setStationView(response.data);
    } catch (error) {
      // console.error(error);
      // Handle error
    }
  };

  useEffect(() => {
    fetchDeptData();
    fetchRankData();
    fetchCadreData();
    fetchStationData();
  }, []);

  const transformedData = (data, labelKey, valueKey) =>
    data.map((item, index) => ({
      key: index.toString(),
      label: item[labelKey],
      value: item[valueKey],
    }));

  return (
    <ScrollView style={{ marginTop: Constants.statusBarHeight }}>
      <Text style={styles.title}>EDIT OFFICE DETAILS</Text>
      <View style={styles.separator} />

      <View style={styles.container}>
        <Text style={styles.label}>
          Select your state of posting ({userInfo[0].station})
        </Text>

        <RNPickerSelect
          onValueChange={(value) => setStation(value)}
          items={transformedData(stationView, "ate", "ate") || []}
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

        <Text style={styles.label}>Posting Local Govt. Area</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPostingLg(text)}
          value={postingLg}
        />

        <Text style={styles.label}>
          Select your department ({userInfo[0].dept})
        </Text>
        <RNPickerSelect
          onValueChange={(value) => setDept(value)}
          items={transformedData(deptview, "dept", "dept")}
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

        <Text style={styles.label}>Select your rank ({userInfo[0].rank})</Text>

        <RNPickerSelect
          onValueChange={(value) => setRank(value)}
          items={transformedData(rankView, "ranc", "ranc")}
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

        <Text style={styles.label}>
          Select your cadre ({userInfo[0].cadre})
        </Text>
        <RNPickerSelect
          onValueChange={(value) => setCadre(value)}
          items={transformedData(cadreView, "kadres", "kadres")}
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

        <Text style={styles.label}>Grade level</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setGradeL(text)}
          value={gradeL}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Step</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setStepP(text)}
          value={stepP}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={[
            styles.button,
            station && postingLg && dept && rank && cadre && gradeL && stepP
              ? styles.enabled
              : styles.disabled,
          ]}
          onPress={() =>
            processDeptRank(
              station,
              postingLg,
              dept,
              rank,
              cadre,
              gradeL,
              stepP
            )
          }
          disabled={
            !(station && postingLg && dept && rank && cadre && gradeL && stepP)
          }
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    color: "green",
    marginHorizontal: 25,
  },
  separator: {
    borderBottomWidth: 1,
    marginTop: 15,
    width: "100%",
    alignSelf: "center",
  },
  label: {
    fontSize: 18,
    // marginTop: 15,
    marginVertical: 15,
    fontWeight: "600",
  },
  input: {
    marginBottom: 30,
    marginTop: 10,
    borderWidth: 0.5,
    height: 40,
    padding: 10,
  },
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 30,
    backgroundColor: "green",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  enabled: {
    backgroundColor: "green",
  },
  disabled: {
    backgroundColor: "#999999",
  },
});

const pickerSelectStyles = StyleSheet.create({
  input: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: Platform.OS === "ios" ? 12 : 8,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
});

export default DeptRank;
