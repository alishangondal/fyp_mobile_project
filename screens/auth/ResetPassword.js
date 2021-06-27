import React, { Component, useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Context } from "../../Context/FoodContext";
import { Button, Input } from "react-native-elements";

export default ForgettonPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, putrevorypass, getlogindata } = useContext(Context);

  function checkuser() {
    for (var i = 0; i < state.length; i++) {
      if (state[i].user == undefined) {
        return null;
      }
      if (state[i].user === email) {
        let data = {
          id: state[i].id,
          name: state[i].name,
          user: email,
          pass: password,
          type: state[i].account_type,
        };
        putrevorypass(data, () => {
          navigation.navigate("Login");
        });
        return true;
      }
    }
    alert("Email is Incorrect");
    return false;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={{}}>
        <Input
          inputContainerStyle={styles.input}
          placeholder="Enter Email"
          value={email}
          onChangeText={(n) => setEmail(n)}
          textContentType={"emailAddress"}
          onEndEditing={() => {
            getlogindata(email);
          }}
        />
        <Input
          inputContainerStyle={styles.input}
          placeholder="Enter New Password"
          value={password}
          onChangeText={(n) => setPassword(n)}
          textContentType={"password"}
        />
      </View>

      <Button
        title={"Registered"}
        onPress={() => {
          checkuser;
        }}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: "#fdfdfd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: "#ededed",
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 1,
  },
  input: {
    marginVertical: 20,
  },
});
