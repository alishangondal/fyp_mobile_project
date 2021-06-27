import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SearchBar } from "react-native-elements";
import Resultlists from "../components/ProjectComponents/Recipe/Recipelist";
import { Context } from "../Context/FoodContext";

export default function SearchScreen({ navigation }) {
  const [value, setvalue] = useState("");
  const [result, setresult] = useState();
  const [Ainemate, setanimate] = useState();
  const { state, getsearch } = useContext(Context);
  console.disableYellowBox = true;
  useEffect(() => {
    navigation.addListener("focus", () => {
      setresult(undefined);
      getsearch(value);
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <View>
        <SearchBar
          name="Search"
          value={value}
          onChangeText={(ne) => {
            setvalue(ne);
          }}
          round
          lightTheme
          platform="default"
          containerStyle={{ marginVertical: 10 }}
          inputContainerStyle={styles.input}
          placeholder="Search"
          onEndEditing={() => {
            getsearch(value);
            setanimate(true);
            setresult(state);
            setTimeout(() => {
              setanimate(false);
            }, 5000);
          }}
        />
      </View>
      {Ainemate == true ? (
        <ActivityIndicator
          color="#0000ff"
          size="large"
          style={{ marginTop: 300 }}
        />
      ) : result === undefined ? null : result.length == 0 ? (
        <Text>No Result</Text>
      ) : (
        <Resultlists
          title={`Total Result (${result.length})`}
          result={result}
          navigation={navigation}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {},
});
