import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { newRequest } from "../../utils/newRequest";
import { useUserInfo } from "../../hooks/useUserInfo";
import { router } from "expo-router";
import { showAlert } from "../../utils/showalert";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isOldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const { id } = useUserInfo();

  const changepass = async () => {
    setIsLoading(true);

    if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      showAlert("Error!", "Please fill all the fields. It is compulsory");
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 8 || newPassword.length > 16) {
      showAlert(
        "Error!!!",
        "Your password character length must be between 8 and 16"
      );
      setIsLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      showAlert(
        "Error!!!",
        "Your new password and confirm password are not the same"
      );
      setIsLoading(false);
      return;
    }

    if (newPassword === oldPassword) {
      showAlert(
        "Error!!!",
        "Your new password must be different from your current password"
      );
      setIsLoading(false);
      return;
    }

    try {
      const response = await newRequest.put(`/changepassword/${id}`, {
        oldpassword: oldPassword,
        newpassword: newPassword,
        confirmpassword: confirmPassword,
        id,
      });
      showAlert(
        "Success!",
        `${response.data}. Use the new password when next you login`,
        isLoading
      );
      router.push("/home");
    } catch (error) {
      if (error.response) {
        showAlert("Error!!!", error.response.data);
      } else if (error.request) {
        showAlert(
          "Error!!!",
          "No response from server. Please try again later.",
          isLoading
        );
      } else {
        showAlert("Error!!!", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Change Password</Text>

      {/* Old Password */}
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Current Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            // placeholder="Enter current password"
            secureTextEntry={!isOldPasswordVisible}
            value={oldPassword}
            onChangeText={setOldPassword}
            autoComplete="off"
          />
          <TouchableOpacity
            onPress={() => setOldPasswordVisible(!isOldPasswordVisible)}
          >
            <FontAwesome
              name={isOldPasswordVisible ? "eye" : "eye-slash"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* New Password */}
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>New Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            // placeholder="Enter new password"
            secureTextEntry={!isNewPasswordVisible}
            value={newPassword}
            onChangeText={setNewPassword}
            autoComplete="off"
          />
          <TouchableOpacity
            onPress={() => setNewPasswordVisible(!isNewPasswordVisible)}
          >
            <FontAwesome
              name={isNewPasswordVisible ? "eye" : "eye-slash"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Confirm Password */}
      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Confirm New Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            //  placeholder="Confirm new password"
            secureTextEntry={!isConfirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            autoComplete="off"
          />
          <TouchableOpacity
            onPress={() => setConfirmPasswordVisible(!isConfirmPasswordVisible)}
          >
            <FontAwesome
              name={isConfirmPasswordVisible ? "eye" : "eye-slash"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={changepass}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Submit</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  button: {
    backgroundColor: "green",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default ChangePassword;
