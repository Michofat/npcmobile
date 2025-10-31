import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useUserInfo } from "../../hooks/useUserInfo";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";
import { formatDate } from "../../helperFunctions/validate";

const Preview = () => {
  const { requestApproval } = useContext(GlobalContext);
  const {
    id,
    pix,
    titl,
    fullname,
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
    siggn,
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
    pixnok,
    noksign,
    nok2,
    nok2who,
    nok2fon,
    nok2addy,
    completed,
  } = useUserInfo();

  const refresher = () => {
    Alert.alert(
      "Notification!",
      "You are about to send your profile to Admin for approval. You will no longer be able to make changes. Click OK to continue.",
      [
        {
          text: "Cancel",
          onPress: () => {
            //  console.log("Reload canceled");
          },
          style: "cancel", // Adds emphasis to the cancel button
        },
        {
          text: "OK",
          onPress: () => {
            requestApproval();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const PreviewSection = ({ icon, data }) => (
    <View>
      <View style={styles.hori} />
      <View style={styles.containdata}>
        <AntDesign name={icon} size={28} color="green" />
        <View style={styles.rightdata}>{data}</View>
      </View>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <ImageBackground
          style={styles.ImageBackground}
          source={require("../../assets/npcbuild.jpg")}
        >
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => router.push("/UpdatePassport")}
          >
            <Image style={styles.mypic} source={{ uri: pix }} />
          </TouchableOpacity>
        </ImageBackground>
        <Text style={styles.centeredText}>{`${titl} ${fullname}`}</Text>
        <Text style={styles.rankText}>{rank}</Text>

        <PreviewSection
          icon="user"
          data={
            <>
              <ProfileText title="Gender" value={sex} />
              <ProfileText title="Marital status" value={marit} />
              <ProfileText title="Date of birth" value={formatDate(dob)} />
              <ProfileText title="State of origin" value={orig} />
              <ProfileText title="Local Government Area" value={lga} />
            </>
          }
        />
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push("/BioData")}
        >
          <AntDesign name="edit" size={30} color="blue" />
        </TouchableOpacity>

        <PreviewSection
          icon="home"
          data={
            <>
              <ProfileText title="Station" value={station} />
              <ProfileText
                title="Date of first appointment"
                value={formatDate(dfirstappt)}
              />
              <ProfileText
                title="Date of confirmation"
                value={formatDate(dconfirm)}
              />
              <ProfileText
                title="Date of present appointment"
                value={formatDate(dpreappt)}
              />
              <ProfileText title="Department" value={dept} />
              <ProfileText title="Rank" value={rank} />
              <ProfileText
                title={`Retirement (${retirewhy})`}
                value={retireyear}
              />
              <ProfileText
                title="My signature"
                value={
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => router.push("/UploadSignature")}
                  >
                    <Image style={styles.mysig} source={{ uri: siggn }} />
                  </TouchableOpacity>
                }
              />
            </>
          }
        />
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push("/DeptRank")}
        >
          <AntDesign name="edit" size={30} color="blue" />
        </TouchableOpacity>

        <PreviewSection
          icon="book"
          data={
            <>
              <ProfileText title="PFA name" value={pfaname} />
              <ProfileText title="PFA PIN" value={pfapin} />
              <ProfileText title="IPPIS number" value={ippisno} />
              <ProfileText title="Bank name" value={bnk} />
              <ProfileText title="Account number" value={accno} />
            </>
          }
        />
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push("/BankPen")}
        >
          <AntDesign name="edit" size={30} color="blue" />
        </TouchableOpacity>

        <PreviewSection
          icon="edit"
          data={
            <>
              <ProfileText
                title="Secondary school attended name"
                value={acadsecondary}
              />
              <ProfileText title="Tertiary education" value={acadtertiary} />
              <ProfileText title="Masters" value={acadmasters} />
              <ProfileText title="PhD" value={acadphd} />
              <ProfileText title="Professional qualifications" value={proff} />
            </>
          }
        />
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push("/Qualifications")}
        >
          <AntDesign name="edit" size={30} color="blue" />
        </TouchableOpacity>
        <PreviewSection
          icon="mail"
          data={
            <>
              <ProfileText title="Mobile 1" value={fon} />
              <ProfileText title="Mobile 2" value={fonb} />
              <ProfileText title="Email address" value={emal} />
              <ProfileText title="Address" value={addy} />
            </>
          }
        />

        <PreviewSection
          icon="edit"
          data={
            <>
              <ProfileText title="Spouse name" value={spousename} />
              <ProfileText title="Occupation" value={spouseoccup} />
              <ProfileText title="Office" value={spouseoffice} />
            </>
          }
        />
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push("/Spouse")}
        >
          <AntDesign name="edit" size={30} color="blue" />
        </TouchableOpacity>

        <PreviewSection
          icon="file"
          data={
            <>
              <ProfileText title="Next of kin" value={nok} />
              <ProfileText title="Relationship" value={nokwho} />
              <ProfileText title="Phone number" value={nokfon} />
              <ProfileText title="Address" value={nokaddy} />
              <View style={styles.nokContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => router.push("/NokPassport")}
                >
                  <Image style={styles.nokpic} source={{ uri: pixnok }} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => router.push("/NokSignature")}
                >
                  <Image style={styles.noksign} source={{ uri: noksign }} />
                </TouchableOpacity>
              </View>
              <ProfileText title="Next of kin 1" value={nok2} />
              <ProfileText title="Relationship" value={nok2who} />
              <ProfileText title="Phone number" value={nok2fon} />
              <ProfileText title="Address" value={nok2addy} />
            </>
          }
        />
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push("/Nok")}
        >
          <AntDesign name="edit" size={30} color="blue" />
        </TouchableOpacity>
        {completed === 1 && (
          <TouchableOpacity style={styles.opac} onPress={refresher}>
            <Text style={styles.optext}>Send for Approval</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const ProfileText = ({ title, value }) => (
  <>
    <Text style={styles.texttitle}>{title}</Text>
    <Text style={styles.textvalue}>{value}</Text>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaeded",
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
  ImageBackground: {
    alignItems: "center",
    height: 150,
    marginBottom: 70,
  },
  mypic: {
    position: "absolute",
    width: 140,
    height: 140,
    borderRadius: 70,
    marginTop: 70,
  },
  mysig: {
    width: 250,
    height: 200,
    borderRadius: 70,
  },
  nokpic: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  noksign: {
    width: 120,
    height: 80,
    marginLeft: 20,
  },
  containdata: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 30,
  },
  rightdata: {
    paddingLeft: 20,
  },
  texttitle: {
    color: "grey",
    fontSize: 15,
    marginBottom: 5,
  },
  textvalue: {
    marginBottom: 12,
  },
  hori: {
    width: "100%",
    borderBottomWidth: 1,
    marginVertical: 10,
    borderBottomColor: "#C5C5C5",
  },
  centeredText: {
    alignSelf: "center",
  },
  rankText: {
    alignSelf: "center",
    color: "brown",
    fontWeight: "700",
  },
  nokContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  editButton: {
    alignItems: "center",
    position: "relative",
    margin: 10,
    color: "blue",
  },
});

export default Preview;
