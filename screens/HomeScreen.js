import React, { Component, useContext, useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { Context } from "../Context/FoodContext";
import Resultlists from "../components/ProjectComponents/Recipe/Recipelist";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default ({ navigation }) => {
  const { state, getdata } = useContext(Context);
  const [Ainemate, setanimate] = useState();
  console.disableYellowBox = true;
  const latest = [];
  useEffect(() => {
    getdata();
    setanimate(true);
    setTimeout(() => {
      setanimate(false);
    }, 3000);
    navigation.addListener("focus", () => {
      setanimate(true);
      getdata();
      setTimeout(() => {
        setanimate(false);
      }, 3000);
    });
  }, []);

  var j = 0;
  if (state == undefined) {
    return null;
  }
  for (var i = state.length > 0 ? state.length : -1; i >= 0; i--) {
    latest[i] = state[j];
    j++;
  }
  if (!(latest.length > 0)) {
    return null;
  }
  return (
    <View style={styles.container}>
      {Ainemate == true ? (
        <ActivityIndicator
          color="#0000ff"
          size="large"
          style={{ marginTop: 300 }}
        />
      ) : (
        <Resultlists
          title="Newly Added"
          result={latest.reverse()}
          navigation={navigation}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 40,
  },
});
