import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { newRequest } from "../../utils/newRequest";
import { useUserInfo } from "../../hooks/useUserInfo";
import { router } from "expo-router";
import { showAlert } from "../../utils/showalert";
import { FontAwesome } from "@expo/vector-icons";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      // console.log("CHANGE Error!!!", error);
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
      <Text style={styles.textinput}>Current password</Text>
      <TextInput
        style={styles.input}
        placeholder="********"
        secureTextEntry={true}
        value={oldPassword}
        onChangeText={setOldPassword}
        autoComplete="off"
      />
      <Text style={styles.textinput}>New password</Text>
      <TextInput
        style={styles.input}
        placeholder="********"
        secureTextEntry={true}
        value={newPassword}
        onChangeText={setNewPassword}
        autoComplete="off"
      />
      <Text style={styles.textinput}>Confirm new password</Text>
      <TextInput
        style={styles.input}
        placeholder="********"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        autoComplete="off"
      />

      <TouchableOpacity
        style={[styles.link, styles.button]}
        onPress={changepass}
      >
        <Text style={styles.buttonText}>
          {isLoading ? (
            <ActivityIndicator size="large" color="yellow" />
          ) : (
            "SUBMIT"
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    margin: 15,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 40,
  },
  input: {
    marginBottom: 30,
    marginTop: 10,
    borderWidth: 0.5,
    height: 40,
    padding: 10,
  },
  textinput: {
    fontSize: 18,
  },
  link: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#14452F",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
});

export default ChangePassword;
