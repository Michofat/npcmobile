import React, { useContext } from "react";
import { View, Text, ScrollView, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useUserInfo } from "../../hooks/useUserInfo";
import CardItem from "../../components/CardItem";
import { router } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const {
    id,
    fullname,
    compchpass,
    comppersonal,
    compoffice,
    compqual,
    compcert,
    compnok,
    compspouse,
    compbnkpfa,
    compmypass,
    compmysign,
    compnokpass,
    compnoksign,
    completed,
    finall,
    compdates,
  } = useUserInfo();
  const { bringInfo } = useContext(GlobalContext);

  //console.log("ccc", finall);

  const refresher = () => {
    Alert.alert(
      "Notification!",
      "You are about to reload your profile. Click OK to continue",
      [
        {
          text: "Cancel",
          onPress: () => {
            // console.log("Canceled");
          },
          style: "cancel", // Adds emphasis to the cancel button
        },
        {
          text: "OK",
          onPress: () => {
            bringInfo(id);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const cardDetails = [
    {
      id: 12,
      title: "Change Password",
      condition: compchpass,
      href: "ChangePassword",
    },
    {
      id: 1,
      title: "Personal",
      condition: comppersonal,
      href: "BioData",
    },
    {
      id: 34,
      title: "Date Form",
      condition: compdates,
      href: "DateForm",
    },
    { id: 2, title: "Office", condition: compoffice, href: "DeptRank" },
    {
      id: 3,
      title: "Qualifications",
      condition: compqual,
      href: "Qualifications",
    },
    {
      id: 4,
      title: "Certificates",
      condition: compcert,
      href: "Certificates",
    },
    {
      id: 5,
      title: "Next-of-Kin",
      condition: compnok,
      href: "Nok",
    },
    { id: 6, title: "Spouse", condition: compspouse, href: "Spouse" },
    {
      id: 7,
      title: "Bank & Pension",
      condition: compbnkpfa,
      href: "BankPen",
    },
    {
      id: 8,
      title: "Profile Picture Upload",
      condition: compmypass,
      href: "UpdatePassport",
    },
    {
      id: 9,
      title: "My Signature",
      condition: compmysign,
      href: "UploadSignature",
    },
    {
      id: 10,
      title: "NoK Passport",
      condition: compnokpass,
      href: "NokPassport",
    },
    {
      id: 11,
      title: "NoK Signature",
      condition: compnoksign,
      href: "NokSignature",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome, {fullname}!</Text>
        </View>
        <View style={styles.profileStatus}>
          <Text style={styles.profileStatusText}>Profile Onboarding:</Text>
          <Text
            style={[
              styles.profileStatusValue,
              {
                color:
                  completed === 0
                    ? "red"
                    : completed === 1
                    ? "blue"
                    : completed === 2
                    ? "green"
                    : "black", // Default color for unexpected values
              },
            ]}
          >
            {completed === 0
              ? "Not Completed"
              : completed === 1
              ? "Preview and submit"
              : completed === 2
              ? "Awaiting Approval"
              : completed === 3
              ? "Approved"
              : "Unknown Status"}
          </Text>
        </View>
        {completed === 0 ? (
          <TouchableOpacity style={styles.opac} onPress={refresher}>
            <Text style={styles.optext}>Refresh profile</Text>
          </TouchableOpacity>
        ) : completed === 1 ? (
          <TouchableOpacity
            style={styles.opac}
            onPress={() => router.push("/preview")}
          >
            <Text style={styles.optext}>Preview profile</Text>
          </TouchableOpacity>
        ) : completed === 2 ? (
          <TouchableOpacity style={styles.opac}>
            <Text style={styles.optext}>Request processing</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.opac}
            // onPress={() => router.push("/preview")}
          >
            <Text style={styles.optext}>Profile Approved</Text>
          </TouchableOpacity>
        )}

        <View style={styles.cardsContainer}>
          {cardDetails.map(({ id, title, condition, href }) => (
            <CardItem
              key={id}
              title={title}
              condition={condition}
              handlePress={() => router.push(`${href}`)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  scrollContainer: {
    padding: 10,
  },
  welcomeContainer: {
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  profileStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  profileStatusText: {
    fontSize: 18,
    fontWeight: "500",
    marginRight: 8,
  },
  profileStatusValue: {
    fontSize: 18,
    fontWeight: "500",
  },
  cardsContainer: {
    marginTop: 16,
  },

  opac: {
    backgroundColor: "#FF9C01",
    padding: 10,
  },
  optext: {
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "700",
  },
});

export default Home;
