import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Entypo, FontAwesome5, Ionicons, MaterialCommunityIcons,} from "@expo/vector-icons";

export default list = ({navigation}) => {
  console.disableYellowBox = true;
  return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: "row", justifyContent: "center"}}>
          <TouchableOpacity
              style={styles.cat}
              onPress={() => {
                navigation.navigate("CatSpec", {type: "Pizza"});
              }}
          >
            <Ionicons name="md-pizza" style={styles.catIcon}/>
            <Text style={styles.catText}>Pizza</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.cat}
              onPress={() => {
                navigation.navigate("CatSpec", {type: "Drinks"});
              }}
          >
            <Entypo name="drink" style={styles.catIcon}/>
            <Text style={styles.catText}>Drinks</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.cat}
              onPress={() => {
                navigation.navigate("CatSpec", {type: "Soup"});
              }}
          >
            <Entypo name="bowl" style={styles.catIcon}/>
            <Text style={styles.catText}>Soup</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: "row", justifyContent: "center"}}>
          <TouchableOpacity
              style={styles.cat}
              onPress={() => {
                navigation.navigate("CatSpec", {type: "Fish"});
              }}
          >
            <FontAwesome5 name="fish" style={styles.catIcon}/>
            <Text style={styles.catText}>Fish</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.cat}
              onPress={() => {
                navigation.navigate("CatSpec", {type: "Sweets"});
              }}
          >
            <FontAwesome5 name="cookie-bite" style={styles.catIcon}/>
            <Text style={styles.catText}>Sweets</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.cat}
              onPress={() => {
                navigation.navigate("CatSpec", {type: "Chicken"});
              }}
          >
            <FontAwesome5 name="bone" style={styles.catIcon}/>
            <Text style={styles.catText}>Chicken</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: "row", marginLeft: 22}}>
          <TouchableOpacity
              style={styles.cat}
              onPress={() => {
                navigation.navigate("CatSpec", {type: "Pasta"});
              }}
          >
            <MaterialCommunityIcons
                name="silverware-fork-knife"
                style={styles.catIcon}
            />
            <Text style={styles.catText}>Pasta</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  cat: {
    backgroundColor: "white",
    width: 80,
    height: 90,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  catText: {fontSize: 16, color: "#23a868", marginLeft: 4},
  catIcon: {fontSize: 42, marginTop: 10, color: "#23a868", marginLeft: 4},
});
