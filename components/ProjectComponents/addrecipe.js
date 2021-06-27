import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableHighlight,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native-gesture-handler";
import { Button, Overlay, Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { Context } from "../../Context/FoodContext";
import userlogcontext from "../../connection/userLogContext";
// import Key from "../../API/FirebaseStorageConfig";
// import * as firebase from "Firebase/app";
// import "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default ({ navigation }) => {
  const { putrecipe } = useContext(Context);
  const [value, setvalue] = useState("");
  const [value2, setvalue2] = useState("");
  const [Detail, setDetail] = useState([]);
  const [ingdata, setingdata] = useState([]);
  const [image, setImage] = useState(null);
  const { data1, data2 } = useContext(userlogcontext);
  const [id, setid] = useState();
  const [visible, setVisible] = useState(false);
  AsyncStorage.getItem("DataKey").then((value) => {
    setid(JSON.parse(value).id);
  });
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  console.disableYellowBox = true;
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        setImage(result.base64);
      }
    } catch (E) {
      alert(E);
    }
  };
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Details</Text>
        <View style={{ alignItems: "center", paddingTop: 20 }}>
          {image && (
            <Image
              source={{ uri: "data:image/jpeg;base64," + image }}
              style={{ width: 200, height: 200 }}
            />
          )}
          <Button
            title=" Pick Image "
            onPress={pickImage}
            style={{ padding: 20 }}
          />
        </View>
        <TextInput
          autoCorrect={false}
          style={styles.input}
          placeholder="Name"
          value={Detail.length == 0 ? value : Detail[0]}
          onChangeText={(newvalue) => {
            setvalue(newvalue);
          }}
          onEndEditing={() => {
            setDetail([...Detail, value]);
            setvalue("");
          }}
        />
        <TextInput
          autoCorrect={false}
          style={styles.input}
          placeholder="Category"
          value={Detail.length == 1 ? value : Detail[1]}
          onChangeText={(newvalue) => {
            setvalue(newvalue);
          }}
          onEndEditing={() => {
            setDetail([...Detail, value]);
            setvalue("");
          }}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          placeholder="Serving"
          value={Detail.length == 2 ? value : Detail[2]}
          keyboardType="numeric"
          onChangeText={(newvalue) => {
            setvalue(newvalue);
          }}
          onEndEditing={() => {
            setDetail([...Detail, value]);
            setvalue("");
          }}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          placeholder="Time"
          keyboardType="numeric"
          value={Detail.length == 3 ? value : Detail[3]}
          onChangeText={(newvalue) => {
            setvalue(newvalue);
          }}
          onEndEditing={() => {
            setDetail([...Detail, value]);
            setvalue("");
          }}
        />
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          style={{ ...styles.input, height: 250 }}
          placeholder="Prepatation"
          multiline={true}
          numberOfLines={30}
          scrollEnabled={true}
          textBreakStrategy="balanced"
          textAlignVertical="top"
          value={Detail.length == 4 ? value2 : Detail[4]}
          onChangeText={(newvalue) => {
            setvalue2(newvalue);
          }}
        />
        <View>
          <Button title="Add Ingredients" onPress={toggleOverlay} />
          <View>
            <FlatList
              data={ingdata}
              keyExtractor={() => {
                " " + Math.floor(Math.random() * 99999);
              }}
              renderItem={({ item }) => {
                return (
                  <Text
                    style={{
                      borderBottomWidth: 1,
                      margin: 10,
                      fontSize: 18,
                    }}
                  >
                    {item}
                  </Text>
                );
              }}
            />
          </View>
          <Overlay
            isVisible={visible}
            overlayStyle={{ height: 250, justifyContent: "center" }}
            onBackdropPress={toggleOverlay}
          >
            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Add Ingredients
              </Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                placeholder="Ingredients"
                value={value}
                onChangeText={(newvalue) => {
                  setvalue(newvalue);
                }}
                onEndEditing={() => {}}
              />
              <Button
                title="Save"
                containerStyle={{ margin: 20 }}
                type="outline"
                buttonStyle={{ borderRadius: 20, borderWidth: 2 }}
                onPress={() => {
                  setingdata([...ingdata, value]);
                  setvalue("");
                  setVisible(!visible);
                }}
              />
            </View>
          </Overlay>
        </View>
        <Button
          title="Save"
          containerStyle={{ margin: 20 }}
          type="outline"
          buttonStyle={{ borderRadius: 20, borderWidth: 2 }}
          onPress={() => {
            setDetail([...Detail, value2]);
            setvalue2("");
            if (Detail.length < 4) {
              Alert.alert("Please Complete All The Information");
              return null;
            } else if (ingdata.length < 1) {
              Alert.alert("Please Add All The Indredient");
              return null;
            } else {
              for (var i = 0; i < Detail.length; i++) {
                if (Detail[i] == "" || Detail[i] == undefined) {
                  Alert.alert("Please Complete All The Information");
                  return null;
                }
              }
            }
            const data = {
              category: Detail[1],
              des: value2,
              id: id,
              ingredients: ingdata,
              name: Detail[0],
              pic: "data:image/jpeg;base64," + image,
              rate: Math.floor(Math.random() * 5) + 1,
              serving: Detail[2],
              time: Detail[3],
              views: Math.floor(Math.random() * 99999) + 1,
            };
            putrecipe(data, () => {
              alert("New Recipe Added");
              navigation.navigate("Profile");
            });
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 320,
  },
  openButton: {
    borderRadius: 20,
    borderColor: "#107de3",
    borderWidth: 2,
    width: 170,
    height: 45,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  AddtextStyle: {
    color: "#107de3",
    fontSize: 16,
    marginTop: 10,
  },
  textStyle: {
    fontSize: 28,
    color: "#23a868",
    marginRight: 30,
    position: "absolute",
    width: 50,
    height: 50,
    right: -20,
    top: 10,
  },
  ingredent: {
    borderWidth: 2,
    backgroundColor: "white",
    borderRadius: 30,
    marginVertical: 40,
    marginHorizontal: 20,
  },
  ingredenttext: {
    fontSize: 18,
    borderBottomWidth: 2,
    marginHorizontal: 30,
    marginVertical: 20,
    color: "#969394",
    borderColor: "#dee0e3",
    paddingLeft: 20,
  },
  input: {
    fontSize: 16,
    fontStyle: "italic",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 15,
    paddingLeft: 20,
    height: 40,
    color: "black",
    borderBottomWidth: 1,
    backgroundColor: "#dee0e3",
  },
  title: {
    alignContent: "center",
    fontSize: 34,
    fontStyle: "italic",
    alignSelf: "center",
    marginTop: 20,
  },
  User: {
    fontSize: 18,
    fontStyle: "italic",
    marginHorizontal: 45,
    marginBottom: 10,
  },
});
