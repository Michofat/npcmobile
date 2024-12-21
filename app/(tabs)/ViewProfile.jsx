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
  //const { email } = useLocalSearchParams();

  const params = useLocalSearchParams();
  const email = params.email;

  //console.log("Received email in ViewProfile:", email);

  const [userdetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log("USERDETAILS", userdetails);
  const getRecord = async () => {
    try {
      const response = await newRequest.get(`/myrecord3/${email}`);
      const reponseData = response.data;
      setUserDetails(reponseData);
      setIsLoading(false);
    } catch (error) {
      alert(error.response.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRecord();
  }, [email]);

  const {
    fullname,
    titl,
    pix,
    rank,
    sex,
    marit,
    dob,
    orig,
    lga,
    station,
    dfirstappt,
    dconfirm,
    dpreappt,
    dept,
    retirewhy,
    retireyear,
    signn,
    pfaname,
    pfapin,
    ippisno,
    bnk,
    accno,
    acadsecondary,
    acadtertiary,
    acadmasters,
    acadphd,
    proff,
    fon,
    fonb,
    emal,
    addy,
    spousename,
    spouseoccup,
    spouseoffice,
    nok,
    nokwho,
    nokfon,
    nokaddy,
    nok2,
    nok2who,
    nok2fon,
    nok2addy,
    siggn,
  } = userdetails[0] || {};

  const titl2 = titl === null ? "" : titl;

  return (
    <ScrollView>
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
              <Image style={styles.profileImage} source={{ uri: pix }} />
            </ImageBackground>
            <Text style={styles.fullName}>{titl2 + " " + fullname}</Text>
            <Text style={styles.rank}>{rank}</Text>
            {renderInfoSection("user", [
              { title: "Gender", value: sex },
              { title: "Marital status", value: marit },
              { title: "Date of birth", value: dob },
              { title: "State of origin", value: orig },
              { title: "Local Government Area", value: lga },
            ])}
            {renderInfoSection("home", [
              { title: "Station", value: station },
              {
                title: "Date of first appointment",
                value: dfirstappt,
              },
              { title: "Date of confirmation", value: dconfirm },
              {
                title: "Date of present appointment",
                value: dpreappt,
              },
              { title: "Department", value: dept },
              { title: "Rank", value: rank },
              {
                title: "Retirement (" + retirewhy + ")",
                value: retireyear,
              },
              {
                title: "Signature",
                value: (
                  <Image style={styles.signature} source={{ uri: siggn }} />
                ),
              },
            ])}
            {renderInfoSection("book", [
              { title: "PFA name", value: pfaname },
              { title: "PFA PIN", value: pfapin },
              { title: "IPPIS number", value: ippisno },
              { title: "Bank name", value: bnk },
              { title: "Account number", value: accno },
            ])}
            {renderInfoSection("edit", [
              {
                title: "Secondary school attended name",
                value: acadsecondary,
              },
              {
                title: "Tertiary education",
                value: acadtertiary,
              },
              { title: "Masters", value: acadmasters },
              { title: "PhD", value: acadphd },
              {
                title: "Professional qualifications",
                value: proff,
              },
            ])}
            {renderInfoSection("mail", [
              { title: "Mobile 1", value: fon },
              { title: "Mobile 2", value: fonb },
              { title: "Email address", value: emal },
              { title: "Address", value: addy },
            ])}
            {renderInfoSection("edit", [
              { title: "Spouse name", value: spousename },
              { title: "Occupation", value: spouseoccup },
              { title: "Office", value: spouseoffice },
            ])}
            {renderInfoSection("file1", [
              { title: "Next of kin", value: nok },
              { title: "Relationship", value: nokwho },
              { title: "Phone number", value: nokfon },
              { title: "Address", value: nokaddy },
              { title: "Next of kin 2", value: nok2 },
              { title: "Relationship", value: nok2who },
              { title: "Phone number", value: nok2fon },
              { title: "Address", value: nok2addy },
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
