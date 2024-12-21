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
        <Text style={styles.header}>
          Academic & Professional Qualifications
        </Text>

        <Text style={styles.inputTitle}>Secondary Education</Text>
        <Text style={styles.inputSubtitle}>
          Name of school, address, year of completion, and certificate obtained.
        </Text>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={400}
          onChangeText={(text) => setAcadsecondary(text)}
          value={acadsecondary}
          style={styles.input}
          placeholder="Enter details"
        />

        <Text style={styles.inputTitle}>Tertiary Education (Optional)</Text>
        <Text style={styles.inputSubtitle}>
          Name of institution, address, course of study, year of graduation, and
          certificate obtained.
        </Text>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={400}
          onChangeText={(text) => setAcadtertiary(text)}
          value={acadtertiary}
          style={styles.input}
          placeholder="Enter details"
        />

        <Text style={styles.inputTitle}>Masters Education (Optional)</Text>
        <Text style={styles.inputSubtitle}>
          Name of institution, address, course of study, year of graduation, and
          certificate obtained.
        </Text>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={400}
          onChangeText={(text) => setAcadmasters(text)}
          value={acadmasters}
          style={styles.input}
          placeholder="Enter details"
        />

        <Text style={styles.inputTitle}>PhD Education (Optional)</Text>
        <Text style={styles.inputSubtitle}>
          Name of institution, address, course of study, year of graduation, and
          certificate obtained.
        </Text>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={400}
          onChangeText={(text) => setAcadphd(text)}
          value={acadphd}
          style={styles.input}
          placeholder="Enter details"
        />

        <Text style={styles.inputTitle}>
          Professional Certifications (Optional)
        </Text>
        <Text style={styles.inputSubtitle}>
          Certification, awarding body, year joined, and year awarded.
        </Text>
        <TextInput
          editable
          multiline
          numberOfLines={4}
          maxLength={400}
          onChangeText={(text) => setProff(text)}
          value={proff}
          style={styles.input}
          placeholder="Enter details"
        />

        {userInfo[0]?.completed < 2 && (
          <TouchableOpacity
            style={[
              styles.submitButton,
              acadsecondary && proff
                ? styles.enabledButton
                : styles.disabledButton,
            ]}
            onPress={() => {
              updatequal(
                acadsecondary,
                acadtertiary,
                acadmasters,
                acadphd,
                proff
              );
            }}
            disabled={!(acadsecondary && proff)}
          >
            <Text style={styles.buttonText}>
              {loading ? (
                <ActivityIndicator size="large" color="#fff" />
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

export default Qualifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#444",
    marginBottom: 5,
  },
  inputSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  submitButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  enabledButton: {
    backgroundColor: "#28a745",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
