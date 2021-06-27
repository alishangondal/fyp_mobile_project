import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { AirbnbRating } from "react-native-elements";
import {
  Accordion,
  Icon,
  Card,
  CardItem,
  Body,
  Tab,
  Tabs,
  TabHeading,
  Left,
  Right,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Context } from "../../Context/FoodContext";

const Details = ({ navigation, route }) => {
  const id = route.params.id;
  console.disableYellowBox = true;
  const [Ainemate, setanimate] = useState();
  const { state, getfooddata } = useContext(Context);
  console.disableYellowBox = true;
  useEffect(() => {
    getfooddata();
  }, []);
  if (state[id - 1] === undefined) {
    return null;
  }
  return (
    <ScrollView style={{ flex: 1 }}>
      <View>
        <Image
          source={{
            uri: state[id - 1].recipe.pic,
          }}
          style={{ height: 300, marginVertical: 10 }}
        />
        <Card transparent>
          <CardItem>
            <Body>
              <Text style={{ fontSize: 22 }}>{state[id - 1].name}</Text>
            </Body>
          </CardItem>
          <CardItem footer style={{ flexDirection: "row" }}>
            <Left>
              <Text style={{ fontSize: 18 }}>
                <Icon
                  style={{ fontSize: 20, color: "red" }}
                  name="silverware-fork-knife"
                  type="MaterialCommunityIcons"
                />
                Category
              </Text>
            </Left>
          </CardItem>
        </Card>
        <Text
          style={{
            marginVertical: 20,
            marginLeft: 20,
            fontSize: 20,
          }}
        >
          It's Recipe
        </Text>
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            fontSize: 20,
            paddingLeft: 45,
          }}
        >
          <Text>{state[id - 1].recipe.name}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

function _Header(item, expanded) {
  return (
    <View
      style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 20,
        marginHorizontal: 20,
      }}
    >
      <Text style={{ fontWeight: "600" }}> {item.title}</Text>
      {expanded ? (
        <Icon style={{ fontSize: 18, color: "red" }} name="remove" />
      ) : (
        <Icon style={{ fontSize: 18, color: "green" }} name="add" />
      )}
    </View>
  );
}

function _Content(item) {
  return (
    <Text
      style={{
        backgroundColor: "#e3f1f1",
        padding: 10,
        fontStyle: "italic",
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        paddingHorizontal: 50,
      }}
    >
      {item.content}
    </Text>
  );
}

export default Details;

const styles = StyleSheet.create({
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
