import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Avatar, ListItem } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import { Context } from "../../../Context/FoodContext";
import userlogcontext from "../../../connection/userLogContext";
import { Body, Card, CardItem, Icon, Left, Right } from "native-base";

export default ({ navigation, route }) => {
  console.log("#############################################");
  const { state, getSingleuserdata } = useContext(Context);
  const [Ainemate, setanimate] = useState();
  const cid = route.params.cid;
  const { data1, data2 } = useContext(userlogcontext);
  const [id, setid] = data1;
  const [type, settype] = data2;
  const [Iname, setIname] = useState("hearto");
  const [Icheck, setIcheck] = useState(false);
  console.disableYellowBox = true;
  useEffect(() => {
    setanimate(true);
    getSingleuserdata("Chief");
    setTimeout(() => {
      setanimate(false);
    }, 3000);
    navigation.addListener("focus", () => {
      setanimate(true);
      getSingleuserdata("Chief");
      setTimeout(() => {
        setanimate(false);
      }, 3000);
    });
  }, []);
  if (state[id - 1] == undefined) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      {Ainemate == true ? (
        <ActivityIndicator
          color="#0000ff"
          size="large"
          style={{ marginTop: 300 }}
        />
      ) : (
        <View style={{ height: 250, backgroundColor: "#f52559" }}>
          <LinearGradient
            colors={["rgba(0,0,0,0.5)", "transparent"]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              top: 0,
              height: 250,
            }}
          />
          <Avatar
            rounded
            overlayContainerStyle={{
              backgroundColor: "white",
            }}
            containerStyle={{
              marginLeft: 130,
              marginTop: 50,
              backgroundColor: "white",
            }}
            source={{
              uri: state[cid - 1].pic,
            }}
            size="xlarge"
          />
        </View>
      )}
      {Ainemate == true ? (
        <ActivityIndicator
          color="#0000ff"
          size="large"
          style={{ marginTop: 300 }}
        />
      ) : (
        <Card style={{ height: 200, marginVertical: 30 }}>
          <CardItem>
            <Body>
              <Text style={{ marginLeft: 125, fontSize: 20 }}>
                {state[cid - 1].name}
              </Text>
            </Body>
            {type == "Visitor" ? (
              <Right>
                <Icon
                  name={Iname}
                  type="AntDesign"
                  style={{ color: "red", fontSize: 16 }}
                  onPress={() => {
                    if (Icheck == false) {
                      setIname("heart");
                      setIcheck(true);
                      var data = {
                        id: id,
                        user: type,
                        name: state[selectid - 1].name,
                        pic: state[selectid - 1].pic,
                        type: "fav_recipe",
                      };
                      putfav(data, () => {
                        Alert.alert("Add");
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
          <CardItem>
            <Left>
              <Text style={{ fontSize: 18 }}>
                <Icon
                  name="phone"
                  type="FontAwesome"
                  style={{ color: "green", fontSize: 22 }}
                />
                {state[cid - 1].ph}
              </Text>
            </Left>
            <Body style={{ flexDirection: "row" }}>
              <Icon name="mail" type="Entypo" style={{ fontSize: 22 }} />
              <Text>{state[cid - 1].mail}</Text>
            </Body>
          </CardItem>
          <CardItem style={{}}>
            <Left>
              <View>
                <Text style={{ fontSize: 22 }}>
                  <Icon name="info" type="Feather" />
                  About:
                </Text>
                <Text style={{ fontSize: 13 }}>{state[cid - 1].about}</Text>
              </View>
            </Left>
          </CardItem>
        </Card>
      )}
      {Ainemate == true ? (
        <ActivityIndicator
          color="#0000ff"
          size="large"
          style={{ marginTop: 300 }}
        />
      ) : (
        <View style={{ marginTop: 120, marginBottom: 30, height: 80 }}>
          <ListItem
            Component={TouchableScale}
            friction={90}
            tension={100}
            activeScale={0.95}
            linearGradientProps={{
              colors: ["#FF9800", "#F44336"],
              start: [1, 0],
              end: [0.2, 0],
            }}
            ViewComponent={LinearGradient}
            title={type !== "Chief" ? "Favourite" : "Food"}
            titleStyle={{ color: "white", fontWeight: "bold" }}
            chevron={{ color: "white" }}
            onPress={() => {
              navigation.navigate("DisplayList", {
                data: state[cid - 1].recipe,
                premission: false,
              });
            }}
          />
          <ListItem
            Component={TouchableScale}
            friction={90}
            tension={100}
            activeScale={0.95}
            linearGradientProps={{
              colors: ["#FF9800", "#F44336"],
              start: [1, 0],
              end: [0.2, 0],
            }}
            ViewComponent={LinearGradient}
            title="Recipe"
            titleStyle={{ color: "white", fontWeight: "bold" }}
            chevron={{ color: "white" }}
            onPress={() => {
              navigation.navigate("DisplayList", {
                data: state[cid - 1].recipe,
                premission: false,
              });
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
