import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { AirbnbRating } from "react-native-elements";
import {
  Accordion,
  Body,
  Card,
  CardItem,
  Icon,
  Left,
  Right,
  Tab,
  TabHeading,
  Tabs,
} from "native-base";
import { Context } from "../../Context/FoodContext";
import userlogcontext from "../../connection/userLogContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default ({ navigation, route }) => {
  const selectid = route.params.id;
  const [rdata, setrdata] = useState();
  AsyncStorage.getItem("DataKey").then((value) => {
    console.log("recipe detial", value);
    setrdata(JSON.parse(value));
  });

  const [Ainemate, setanimate] = useState(true);
  const { state, getdata, putfav } = useContext(Context);
  const [Iname, setIname] = useState("hearto");
  const [Icheck, setIcheck] = useState(false);

  useEffect(() => {
    navigation.addListener("focus", () => {});
    setanimate(true);
    getdata();
    setTimeout(() => {
      setanimate(false);
    }, 3000);
  }, []);
  console.disableYellowBox = true;
  if (state[selectid - 1] === undefined) {
    return null;
  }
  const data = [
    {
      title: "Ingretients",
      content: state[selectid - 1].ingredients,
    },
  ];
  console.log("picture", state[selectid - 1].pic);
  return (
    <ScrollView style={{ flex: 1 }}>
      {Ainemate == true ? (
        <ActivityIndicator
          color="#0000ff"
          size="large"
          style={{ marginTop: 300 }}
        />
      ) : (
        <View>
          <Image
            source={{
              uri: state[selectid - 1].pic,
            }}
            style={{ height: 300, marginVertical: 10 }}
          />
          <Card transparent>
            <CardItem>
              <Body>
                <Text style={{ fontSize: 22 }}>{state[selectid - 1].name}</Text>
              </Body>
              {rdata?.type === "Visitor" ? (
                <Right>
                  <Icon
                    name={Iname}
                    type="AntDesign"
                    style={{ color: "red", fontSize: 22 }}
                    onPress={() => {
                      if (Icheck == false) {
                        setIname("heart");
                        setIcheck(true);
                        var data = {
                          id: selectid,
                          user: rdata.id,
                          name: state[selectid - 1].name,
                          pic: state[selectid - 1].pic,
                          type: "fav_recipe",
                        };
                        putfav(data, () => {
                          Alert.alert("Recipe Add");
                        });
                      } else {
                        setIname("hearto");
                        setIcheck(false);
                      }
                    }}
                  />
                </Right>
              ) : null}
            </CardItem>
            <CardItem footer style={{ flexDirection: "row" }}>
              <Left>
                <Text style={{ fontSize: 18 }}>
                  <Icon
                    style={{ fontSize: 20, color: "red" }}
                    name="silverware-fork-knife"
                    type="MaterialCommunityIcons"
                  />
                  {state[selectid - 1].category}
                </Text>
              </Left>
              <Body style={{ flexGrow: 1 }}>
                <AirbnbRating
                  count={state[selectid - 1].rate}
                  reviews={["Terrible", "Bad", "OK", "Good", "Delicus"]}
                  size={20}
                />
              </Body>
              <Right
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Text style={{ fontSize: 18 }}>
                  {state[selectid - 1].views}
                </Text>
                <Icon name="eye" type="FontAwesome5" style={{ fontSize: 20 }} />
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Icon
                  type="MaterialIcons"
                  name="timer"
                  style={{ fontSize: 28, color: "green" }}
                />
                <Text style={{ marginTop: 4, fontSize: 18, paddingBottom: 3 }}>
                  {state[selectid - 1].time}
                </Text>
              </Left>
              <Right
                style={{ flexDirection: "row", justifyContent: "flex-end" }}
              >
                <Text style={{ marginTop: 4, fontSize: 18, paddingBottom: 3 }}>
                  {state[selectid - 1].serving}
                </Text>
                <Icon
                  type="Ionicons"
                  name="md-cart"
                  style={{ fontSize: 28, color: "green" }}
                />
              </Right>
            </CardItem>
          </Card>
          <View style={{ flexDirection: "row" }}></View>
          <Accordion
            style={{
              marginTop: 30,
              backgroundColor: "white",
              borderRadius: 20,
              marginHorizontal: 20,
            }}
            expanded={false}
            renderHeader={_Header}
            renderContent={_Content}
            dataArray={data}
          />
          <Tabs
            style={{
              marginVertical: 30,
            }}
          >
            <Tab
              heading={
                <TabHeading
                  style={{
                    backgroundColor: "#f52559",
                  }}
                >
                  <Icon name="info" type="Feather" />
                  <Text
                    style={{
                      color: "white",
                      marginLeft: 2,
                    }}
                  >
                    Prpratation
                  </Text>
                </TabHeading>
              }
            >
              <Text style={{ paddingLeft: 30, paddingVertical: 20 }}>
                {state[selectid - 1].des}
              </Text>
            </Tab>
            <Tab
              heading={
                <TabHeading style={{ backgroundColor: "#f52559" }}>
                  <Icon name="ondemand-video" type="MaterialIcons" />
                  <Text style={{ color: "white", marginLeft: 2 }}>Online</Text>
                </TabHeading>
              }
            >
              <Text style={{ paddingLeft: 30, paddingVertical: 20 }}>
                Not avaliable
              </Text>
            </Tab>
          </Tabs>
        </View>
      )}
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
