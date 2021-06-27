import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-elements";
import { Context } from "../../../Context/FoodContext";
import { AntDesign } from "@expo/vector-icons";
import ResultList from "../Recipe/Recipelist";
// import FoodList from "../";
// import AddRecipe from "../Components/addrecipe";
// import ChiefList from "../Components/cheiflist";
// import { TextInput } from "react-native-gesture-handler";

export default ({ navigation, route }) => {
  console.log(
    "route.params.premission in DiaplayUserCustomList -> ",
    route.params.premission
  );
  const { state, getcheifdata } = useContext(Context);
  const [Ainemate, setanimate] = useState();

  return (
    <View style={{ flex: 1 }}>
      {Ainemate === true ? (
        <ActivityIndicator
          color="#0000ff"
          size="large"
          style={{ marginTop: 300 }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <ResultList
            navigation={navigation}
            title="Chief Recipe"
            result={route.params.data}
            del_type={route.params.premission === true}
          />
          {route.params.premission === true ? (
            <Button
              onPress={() => navigation.navigate("AddRecipe")}
              title={"Add"}
              Icon={{ name: "plus" }}
              style={{ padding: 10, marginTop: 20 }}
              type="outline"
              buttonStyle={{
                borderRadius: 20,
                marginHorizontal: 40,
                marginVertical: 20,
                borderWidth: 2,
              }}
            />
          ) : null}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "white",
    marginTop: -45,
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
  button: {
    marginHorizontal: 60,
    borderRadius: 25,
    borderColor: "#eb0c40",
    marginTop: 80,
    borderWidth: 1,
    height: 45,
  },
  buttontext: {
    color: "#eb0c40",
    marginLeft: 110,
    fontSize: 18,
    marginTop: 9,
  },
});
