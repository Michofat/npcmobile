import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { GlobalContext } from "../../context/GlobalProvider";
import { newRequest } from "../../utils/newRequest";
import filter from "lodash.filter";
import ViewProfile from "./ViewProfile";
import { router } from "expo-router";

const SearchStaff = ({ navigation }) => {
  const { userInfo } = useContext(GlobalContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fulldata, setFullData] = useState([]);
  const [error, setError] = useState(null);

  const handlenavigation = (email) => {
    console.log("SENDING ID", email);
    // router.push("ViewProfile", { email });
    router.push({
      pathname: "ViewProfile",
      params: { email },
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await newRequest.get("/allstaffbrief");
      const responseData = response.data;
      setData(responseData);
      setFullData(responseData);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    const filteredData = filter(fulldata, (user) => {
      return contains(user, formattedQuery);
    });
    setData(filteredData.slice(0, 20));
  };

  // const contains = ({ fullname, emal }, query) => {
  //   if (fullname.includes(query) || emal.includes(query)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  const contains = ({ fullname, emal }, query) => {
    if (
      (fullname && fullname.toLowerCase().includes(query)) ||
      (emal && emal.toLowerCase().includes(query))
    ) {
      return true;
    }
    return false;
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color="#5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>
          There is an error fetching staff, please check your internet
          connection
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Type a name "
        clearButtonMode="always"
        style={styles.searchBox}
        autoCapitalize="none"
        autoCorrect={false}
        value={searchQuery}
        onChangeText={(query) => handleSearch(query)}
      />

      {searchQuery !== "" && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View>
                <Image style={styles.image} source={{ uri: item.pix }} />
              </View>
              <View>
                <Text style={styles.textName}>{item.fullname}</Text>
                <Text style={styles.textEmail}>{item.emal}</Text>
                <Text style={styles.textName2}>{item.station}</Text>

                {userInfo[0].role === 1 && (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handlenavigation(item.emal)}
                  >
                    <Text style={styles.buttonText}>View Profile</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchStaff;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  searchBox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  image: {
    width: 66,
    height: 66,
    borderRadius: 33,
    marginBottom: 10,
  },
  textName: {
    fontSize: 17,
    marginLeft: 10,
    fontWeight: "600",
    color: "green",
  },
  textEmail: {
    fontSize: 14,
    marginLeft: 10,
  },
  textName2: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: "400",
  },
  button: {
    backgroundColor: "green",
    padding: 5,
    marginVertical: 10,
    alignItems: "center",
    marginLeft: 15,
    width: 120,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
