import React, { useContext, useState, useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import ChiefResultlists from "../components/ProjectComponents/Chief/Cheiflist";
import { Context } from "../Context/FoodContext";

export default function ChiefScreen({ navigation }) {
  const { state, getcheifdata } = useContext(Context);
  const [Ainemate, setanimate] = useState();
  console.disableYellowBox = true;

  useEffect(() => {
    navigation.addListener("focus", () => {
      setanimate(true);
      getcheifdata();
      setTimeout(() => {
        setanimate(false);
      }, 3000);
    });
  }, []);

  return (
    <View>
      <View>
        {Ainemate == true ? (
          <ActivityIndicator
            color="#0000ff"
            size="large"
            style={{ marginTop: 300 }}
          />
        ) : Ainemate == false ? (
          setanimate({ type: "Chief", a_type: false })
        ) : (
          <ChiefResultlists
            navigation={navigation}
            title="All Chief's"
            result={state}
            del_type={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
