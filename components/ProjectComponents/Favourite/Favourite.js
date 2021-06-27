import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View } from "react-native";
import ResultList from "../Recipe/Recipelist";
import ChiefList from "../Chief/Cheiflist";

export default ({ navigation, route }) => {
  const [Ainemate, setanimate] = useState();
  useEffect(() => {
    setanimate(true);
    setTimeout(() => {
      setanimate(false);
    }, 3000);
  }, []);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        {Ainemate == true ? (
          <ActivityIndicator
            color="#0000ff"
            size="large"
            style={{ marginTop: 300 }}
          />
        ) : (
          <View>
            <ResultList
              title="All Recipe's"
              result={route.params.data.fav_recipe}
              del_type={true}
              navigation={navigation}
            />
            <ChiefList
              title="All Chief's"
              result={route.params.data.fav_chief}
              del_type={true}
              navigation={navigation}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
