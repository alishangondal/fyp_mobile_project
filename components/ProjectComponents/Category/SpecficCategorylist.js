import React, { useEffect, useContext, useState } from "react";
import { useRoute } from "@react-navigation/stack";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Context } from "../../../Context/FoodContext";
import Resultlists from "../Recipe/Recipelist";
import {
  FontAwesome5,
  Ionicons,
  FontAwesome,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";

export default ({ navigation, route }) => {
  const { state, getcatdata } = useContext(Context);
  const [Ainemate, setanimate] = useState();
  console.disableYellowBox = true;
  useEffect(() => {
    navigation.addListener("focus", () => {
      setanimate(true);
      getcatdata(route.params.type);
      setTimeout(() => {
        setanimate(false);
      }, 3000);
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {Ainemate == true ? (
        <ActivityIndicator
          color="#0000ff"
          size="large"
          style={{ marginTop: 300 }}
        />
      ) : (
        <Resultlists
          navigation={navigation}
          title={route.params.type}
          result={state}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    margin: 25,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "white",
    marginTop: 35,
  },
  iconStyle: {
    fontSize: 30,
    alignSelf: "center",
    marginHorizontal: 10,
  },
  iconOT: {
    marginTop: 12,
  },
  Htext: {
    fontSize: 16,
    marginVertical: 14,
    // fontFamily: "serif",
    fontWeight: "bold",
    flexGrow: 1,
    paddingLeft: 15,
  },
});
