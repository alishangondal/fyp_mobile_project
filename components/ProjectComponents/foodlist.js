import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { withNavigation } from "react-navigation";
import { ListItem } from "react-native-elements";

export default list = ({ navigation, route }) => {
  console.disableYellowBox = true;
  return (
    <View>
      <Text style={styles.title}>Food List</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={route.params.data}
        keyExtractor={() => "" + Math.floor(Math.random() * 99999)}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Food", {
                  id: item.id,
                })
              }
            >
              <ListItem
                key={() => "" + Math.floor(Math.random() * 99999)}
                title={item.name}
                bottomDivider
                chevron
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    margin: 25,
  },
});
