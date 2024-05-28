import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useUserInfo } from "../../hooks/useUserInfo";
import CardItem from "../../components/CardItem";
import { router } from "expo-router";

const Home = () => {
  const {
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
  } = useUserInfo();

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
              { color: completed ? "green" : "red" },
            ]}
          >
            {completed ? "Completed" : "Not Completed"}
          </Text>
        </View>
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
});

export default Home;
