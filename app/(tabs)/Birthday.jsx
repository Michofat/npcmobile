import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, FlatList, View } from "react-native";
import moment from "moment";
import { newRequest } from "../../utils/newRequest";
import BirthdayList from "../../components/BirthdayList";
import { GlobalContext } from "../../context/GlobalProvider";

const Birthday = () => {
  const { userInfo } = useContext(GlobalContext);
  const [bdaytoday, setBdaytoday] = useState([]);
  const today = moment().format("MMMM DD, YYYY");

  useEffect(() => {
    const todaybirthday = async () => {
      try {
        const response = await newRequest.get("/birthdaytoday");
        const responseData = response.data;
        setBdaytoday(responseData);
      } catch (error) {
        // console.error("Error fetching birthday data:", error);
        alert(error.response?.data || "Failed to fetch birthday data");
      }
    };
    todaybirthday();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.bday}>{today}</Text>

      <FlatList
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        data={bdaytoday}
        renderItem={({ item }) => (
          <BirthdayList
            id={item.id}
            fullname={item.fullname}
            station={item.station}
            dept={item.dept}
            pix={item.pix}
          />
        )}
        keyExtractor={(item, index) => index.toString()} // Use index if id is missing or invalid
      />
    </View>
  );
};

export default Birthday;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bday: {
    alignSelf: "center",
    color: "green",
    fontSize: 22,
    marginTop: 30,
    fontWeight: "700",
  },
});
