import React, { useState, useContext } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { Button, Input } from "react-native-elements";
import "../../connection/comms";
import { register } from "../../connection/comms";
import * as ImagePicker from "expo-image-picker";
import { CheckBox, Body, ListItem } from "native-base";
import { Context } from "../../Context/FoodContext";

function RegisterScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [fullName, setName] = useState("");
  const [phone, setphno] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check2, setcheck2] = useState(false);
  const { putregistrationdata } = useContext(Context);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      console.log(result);
      if (!result.cancelled) {
        let data = {
          uri: result.uri,
          name: "photo.png",
          filename: "profileImage.png",
          type: "image/png",
        };
        setImage(data);
      }
    } catch (E) {
      alert(E);
    }
  };

  function goToLogin() {
    return navigation.navigate("Login");
  }

  async function handleOnSignup(actions) {
    let data = {
      name: fullName,
      phone: phone,
      email: email,
      password: password,
      type: check2 === true ? "Chief" : "Visitor",
    };

    let formData = new FormData(data);

    console.log(data);
    putregistrationdata(data, () => {
      alert("Registration success. Please login.");
      setLoading(false);
      navigation.navigate("Login");
    }).catch((e) => {
      alert("Failed to register...");
    });
  }

  return (
    <KeyboardAvoidingView style={styles.container} enabled behavior="padding">
      <ScrollView style={{ marginTop: 30 }}>
        {/*   <View style={{ alignItems: "center", paddingTop: 20 }}>
          {image && (
            <Image
              source={{ uri: image.uri }}
              style={{ width: 200, height: 200 }}
            />
          )} 
          <Button
            title=" Pick Image "
            onPress={pickImage}
            style={{ padding: 20 }}
          />
        </View>*/}
        <View style={{ paddingHorizontal: 20 }}>
          <Input
            inputContainerStyle={styles.input}
            placeholder="Enter Full Name"
            value={fullName}
            onChangeText={(n) => setName(n)}
          />
          <Input
            inputContainerStyle={styles.input}
            placeholder="Enter Phone"
            value={phone}
            keyboardType="numeric"
            onChangeText={(n) => setphno(n)}
          />
          <Input
            inputContainerStyle={styles.input}
            placeholder="Enter Email"
            value={email}
            onChangeText={(n) => setEmail(n)}
            textContentType={"emailAddress"}
          />
          <Input
            inputContainerStyle={styles.input}
            placeholder="Enter Password"
            value={password}
            onChangeText={(n) => setPassword(n)}
            textContentType={"password"}
          />
          <ListItem>
            <CheckBox
              checked={check2}
              color="green"
              onPress={() => {
                if (check2 == true) {
                  setcheck2(false);
                } else {
                  setcheck2(true);
                }
              }}
            />
            <Body>
              <Text>Chief</Text>
            </Body>
          </ListItem>
          <Button
            title={"Submit"}
            loading={loading}
            onPress={() => {
              setLoading(true);
              handleOnSignup();
            }}
          />
        </View>
        <Button
          title="Have an account? Login"
          onPress={goToLogin}
          titleStyle={{
            color: "#039BE5",
          }}
          type="clear"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    marginBottom: 15,
    alignItems: "center",
  },
  buttonContainer: {
    margin: 25,
  },
  input: {
    marginBottom: 20,
  },
  checkBoxContainer: {
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
});

export default RegisterScreen;
