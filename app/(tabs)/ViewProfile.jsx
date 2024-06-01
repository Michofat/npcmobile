import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { newRequest } from "../../utils/newRequest";
import { useLocalSearchParams } from "expo-router";

export default function ViewProfile() {
  const { userid } = useLocalSearchParams();

  const [userdetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getRecord = async () => {
    try {
      const response = await newRequest.get(`/myrecord/${userid}`);
      setUserDetails(response.data);
      setIsLoading(false);
    } catch (error) {
      alert(error.response.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecord();
  }, []);

  return (
    <ScrollView>
      <View style={{ alignItems: "center", padding: 15 }}>
        <Text style={{ fontSize: 30 }}>Please check back later</Text>
      </View>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color="green"
            style={{ marginTop: 30 }}
          />
        </View>
      ) : (
        userdetails[0] && (
          <View style={styles.container}>
            <ImageBackground
              style={styles.imageBackground}
              source={require("../../assets/npcbuild.jpg")}
            >
              <Image
                style={styles.profileImage}
                source={{ uri: userdetails[0].pix }}
              />
            </ImageBackground>
            <Text style={styles.fullName}>
              {userdetails[0].titl + " " + userdetails[0].fullname}
            </Text>
            <Text style={styles.rank}>{userdetails[0].rank}</Text>
            {renderInfoSection("user", [
              { title: "Gender", value: userdetails[0].sex },
              { title: "Marital status", value: userdetails[0].marit },
              { title: "Date of birth", value: userdetails[0].dob },
              { title: "State of origin", value: userdetails[0].orig },
              { title: "Local Government Area", value: userdetails[0].lga },
            ])}
            {renderInfoSection("home", [
              { title: "Station", value: userdetails[0].station },
              {
                title: "Date of first appointment",
                value: userdetails[0].dfirstappt,
              },
              { title: "Date of confirmation", value: userdetails[0].dconfirm },
              {
                title: "Date of present appointment",
                value: userdetails[0].dpreappt,
              },
              { title: "Department", value: userdetails[0].dept },
              { title: "Rank", value: userdetails[0].rank },
              {
                title: "Retirement (" + userdetails[0].retirewhy + ")",
                value: userdetails[0].retireyear,
              },
              {
                title: "Signature",
                value: (
                  <Image
                    style={styles.signature}
                    source={{ uri: userdetails[0].siggn }}
                  />
                ),
              },
            ])}
            {renderInfoSection("book", [
              { title: "PFA name", value: userdetails[0].pfaname },
              { title: "PFA PIN", value: userdetails[0].pfapin },
              { title: "IPPIS number", value: userdetails[0].ippisno },
              { title: "Bank name", value: userdetails[0].bnk },
              { title: "Account number", value: userdetails[0].accno },
            ])}
            {renderInfoSection("edit", [
              {
                title: "Secondary school attended name",
                value: userdetails[0].acadsecondary,
              },
              {
                title: "Tertiary education",
                value: userdetails[0].acadtertiary,
              },
              { title: "Masters", value: userdetails[0].acadmasters },
              { title: "PhD", value: userdetails[0].acadphd },
              {
                title: "Professional qualifications",
                value: userdetails[0].proff,
              },
            ])}
            {renderInfoSection("mail", [
              { title: "Mobile 1", value: userdetails[0].fon },
              { title: "Mobile 2", value: userdetails[0].fonb },
              { title: "Email address", value: userdetails[0].emal },
              { title: "Address", value: userdetails[0].addy },
            ])}
            {renderInfoSection("edit", [
              { title: "Spouse name", value: userdetails[0].spousename },
              { title: "Occupation", value: userdetails[0].spouseoccup },
              { title: "Office", value: userdetails[0].spouseoffice },
            ])}
            {renderInfoSection("file1", [
              { title: "Next of kin", value: userdetails[0].nok },
              { title: "Relationship", value: userdetails[0].nokwho },
              { title: "Phone number", value: userdetails[0].nokfon },
              { title: "Address", value: userdetails[0].nokaddy },
              { title: "Next of kin 2", value: userdetails[0].nok2 },
              { title: "Relationship", value: userdetails[0].nok2who },
              { title: "Phone number", value: userdetails[0].nok2fon },
              { title: "Address", value: userdetails[0].nok2addy },
            ])}
            {renderInfoSection("book", [
              {
                title: "Marriage certificate",
                value: (
                  <Image
                    style={styles.marriageCertificate}
                    source={{ uri: userdetails[0].mcert }}
                  />
                ),
              },
            ])}
          </View>
        )
      )}
    </ScrollView>
  );
}

const renderInfoSection = (iconName, infoItems) => {
  return (
    <>
      {infoItems.map((item, index) => (
        <View key={index} style={styles.infoContainer}>
          <AntDesign name={iconName} size={28} color="green" />
          <View style={styles.rightData}>
            <Text style={styles.textTitle}>{item.title}</Text>
            <Text style={styles.textValue}>{item.value}</Text>
          </View>
        </View>
      ))}
      <View style={styles.horizontalLine} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaeded",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    alignItems: "center",
    height: 150,
    borderRadius: 100,
    marginBottom: 70,
  },
  profileImage: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    marginTop: 70,
  },
  fullName: {
    alignSelf: "center",
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "700",
  },
  rank: {
    alignSelf: "center",
    color: "brown",
    fontWeight: "700",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  rightData: {
    paddingLeft: 20,
  },
  textTitle: {
    color: "grey",
    fontSize: 15,
    marginBottom: 5,
  },
  textValue: {
    marginBottom: 12,
  },
  horizontalLine: {
    width: "100%",
    borderBottomWidth: 1,
    marginVertical: 10,
    borderBottomColor: "#C5C5C5",
  },
  signature: {
    width: 250,
    height: 200,
  },
  marriageCertificate: {
    width: 250,
    height: 400,
  },
});
