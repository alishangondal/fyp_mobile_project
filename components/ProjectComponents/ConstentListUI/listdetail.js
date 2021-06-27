import React, {useContext} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Body, Card, CardItem, Icon, Left, Right} from "native-base";
import {AirbnbRating} from "react-native-elements";
import {Context} from "../../../Context/FoodContext";
import userlogcontext from "../../../connection/userLogContext";

export default ({result, navigation, del_type}) => {
  const {data1, data2} = useContext(userlogcontext);
  const [id, setid] = data1;
  const [type, settype] = data2;
  const {delfavrec, delfavchief} = useContext(Context);
  console.disableYellowBox = true;
  if (result === undefined || result === null) {
    return null;
  }
  return (
      <View>
        <View
            style={{
              marginHorizontal: 10,
            }}
        >
          <View>
            <Card style={{marginVertical: 10}}>
              <CardItem>
                <Image
                    style={styles.image}
                    source={{
                      uri: result.pic,
                    }}
                />
              </CardItem>
              <CardItem>
                <Body>
                  <Text style={{fontSize: 18}}>{result.name}</Text>
                </Body>
                <Right>
                  {del_type == true && result !== null ? (
                      <TouchableOpacity
                          style={{
                            fontSize: 22,
                          }}
                          onPress={() => {
                            delfavrec(result.id, id, type, () => {
                              navigation.navigate("Profile");
                            });
                          }}
                      >
                        <Icon
                            name="trash-alt"
                            style={{color: "red", fontSize: 32}}
                            type="FontAwesome5"
                        />
                      </TouchableOpacity>
                  ) : null}
                </Right>
              </CardItem>
              <CardItem footer style={{flexDirection: "row"}}>
                <Left>
                  <Text style={{fontSize: 18, paddingRight: 10}}>
                    <Icon
                        style={{fontSize: 18, color: "red", margin: 10}}
                        name="silverware-fork-knife"
                        type="MaterialCommunityIcons"
                    />
                    {result.category === undefined ? "NaN" : result.category}
                  </Text>
                </Left>
                <Body
                    style={{flexGrow: 1, borderLeftWidth: 1, borderRightWidth: 1}}
                >
                  <AirbnbRating
                      count={
                        result.rate !== undefined
                            ? result.rate
                            : Math.floor(Math.random() * 5) + 1
                      }
                      reviews={["Terrible", "Bad", "OK", "Good", "Delicus"]}
                      size={20}
                  />
                </Body>
                <Right
                    style={{flexDirection: "row", justifyContent: "flex-end"}}
                >
                  <Text style={{fontSize: 18}}>
                    {result.views !== undefined
                        ? result.views
                        : Math.floor(Math.random() * 5) + 1}
                  </Text>
                  <Icon name="eye" type="FontAwesome5" style={{fontSize: 20}}/>
                </Right>
              </CardItem>
            </Card>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    margin: 25,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 15,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    marginHorizontal: 20,
    marginVertical: 5,
  },
});
