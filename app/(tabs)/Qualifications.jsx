import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useContext } from "react";
import { GlobalContext } from "../../context/GlobalProvider";
import Constants from "expo-constants";

const Qualifications = () => {
  const { userInfo, updatequal, loading } = useContext(GlobalContext);
  const [acadsecondary, setAcadsecondary] = useState(
    userInfo[0]?.acadsecondary
  );
  const [acadtertiary, setAcadtertiary] = useState(userInfo[0]?.acadtertiary);
  const [acadmasters, setAcadmasters] = useState(userInfo[0]?.acadmasters);
  const [acadphd, setAcadphd] = useState(userInfo[0]?.acadphd);
  const [proff, setProff] = useState(userInfo[0]?.proff);

  return (
    <ScrollView style={{ marginTop: Constants.statusBarHeight }}>
      <View style={styles.container}>
        <Text style={{ fontSize: 30, marginBottom: 10 }}>
          Academic & Professional Qualifications
        </Text>
        <Text style={styles.inputtitle}>Secondary education</Text>
        <Text style={styles.inputtitle2}>
          Name of school, address and certificate obtained
        </Text>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={400}
          onChangeText={(text) => setAcadsecondary(text)}
          value={acadsecondary}
          style={styles.input2}
        />

        <Text style={styles.inputtitle}>Tertiary education (optional)</Text>
        <Text style={styles.inputtitle2}>
          Name of institution, address, course of study, year of graduation,
          certificate obtained on a new line
        </Text>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={400}
          onChangeText={(text) => setAcadtertiary(text)}
          value={acadtertiary}
          style={styles.input2}
        />

        <Text style={styles.inputtitle}>Masters education (optional)</Text>
        <Text style={styles.inputtitle2}>
          Name of institution, address, course of study, year of graduation,
          certificate obtained on a new line
        </Text>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={400}
          onChangeText={(text) => setAcadmasters(text)}
          value={acadmasters}
          style={styles.input2}
        />

        <Text style={styles.inputtitle}>PhD education (optional)</Text>
        <Text style={styles.inputtitle2}>
          Name of institution, address, course of study, year of graduation,
          certificate obtained on a new line.
        </Text>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={400}
          onChangeText={(text) => setAcadphd(text)}
          value={acadphd}
          style={styles.input2}
        />

        <Text style={styles.inputtitle3}>
          Professional bodies & certifications (optional)
        </Text>
        <Text style={styles.inputtitle2}>
          CERTIFICATION - AWARDING BODY - YEAR JOINED - YEAR AWARDED each on a
          new line.
        </Text>
        <Text style={styles.inputtitle2}></Text>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={400}
          onChangeText={(text) => setProff(text)}
          value={proff}
          style={styles.input2}
        />

        <TouchableOpacity
          style={[
            styles.link,
            acadsecondary && proff ? styles.enbutton : styles.disbutton,
          ]}
        >
          <Text
            style={styles.opac}
            onPress={() => {
              updatequal(
                acadsecondary,
                acadtertiary,
                acadmasters,
                acadphd,
                proff
              );
            }}
            disabled={acadsecondary && proff ? false : true}
          >
            SUBMIT
          </Text>
          {loading && <ActivityIndicator size="large" color="yellow" />}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Qualifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  inputtitle: { marginBottom: 5, fontSize: 18 },
  inputtitle3: { marginBottom: 5, fontSize: 18, fontWeight: "700" },
  inputtitle2: { marginBottom: 25, fontSize: 14, color: "green" },
  input: {
    marginBottom: 30,
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
  opac: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },

  link: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#999999",
  },
  containerx: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textFailed: {
    alignSelf: "flex-end",
    color: "red",
  },
  enbutton: { backgroundColor: "green" },
  disbutton: { backgroundColor: "#999999" },
});
