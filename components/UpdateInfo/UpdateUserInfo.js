import React, { Component, useContext } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Avatar, Button, ListItem } from "react-native-elements";
import UserContext from "../../connection/userContext";
import userlogcontext from "../../connection/userLogContext";

const ProfileScreen = ({ navigation }) => {
  const { data1, data2 } = useContext(userlogcontext);
  const [id, setid] = data1;
  const [type, settype] = data2;

  const data = {
    fullName: "John Doe",
    email: "johndoe@example.com",
    location: "Birmingham",
    phone: "123123123",
    password: "0000000",
  };

  return (
    <UserContext.Consumer>
      {({ loggedIn, setLoggedin }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
          >
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <Avatar
                source={require("../../assets/images/robot-prod.png")}
                size={"xlarge"}
                rounded
                showEditButton
              />
            </View>

            <ListItem
              topDivider
              title="Full Name"
              input={{
                placeholder: "Type Here",
                defaultValue: data.fullName,
                onChangeText: (text) => {
                  data.fullName = text;
                },
              }}
            />
            <ListItem
              topDivider
              title="Email"
              input={{
                placeholder: "Type Here",
                defaultValue: data.email,
                textContentType: "emailAddress",
                onChangeText: (text) => {
                  data.email = text;
                },
              }}
            />
            <ListItem
              topDivider
              title="Location"
              input={{
                placeholder: "Type Here",
                defaultValue: data.location,
                onChangeText: (text) => {
                  data.location = text;
                },
              }}
            />
            <ListItem
              topDivider
              title="Phone"
              input={{
                placeholder: "Type Here",
                defaultValue: data.phone,
                textContentType: "telephoneNumber",
                onChangeText: (text) => {
                  data.phone = text;
                },
              }}
            />
            <ListItem
              topDivider
              title="Password"
              input={{
                placeholder: "Type Here",
                textContentType: "password",
                secureTextEntry: true,
                defaultValue: data.password,
                onChangeText: (text) => {
                  data.password = text;
                },
              }}
            />

            <Button
              onPress={() => alert("info update")}
              title={"Update Profile"}
              style={{ padding: 10, marginTop: 20 }}
            />
            <Button
              onPress={() => setLoggedin(false)}
              title={"Sign Out"}
              style={{ padding: 10, marginTop: 20 }}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </UserContext.Consumer>
  );
};
export default ProfileScreen;
// export default class ProfileScreen extends Component {
//   render() {

//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center",
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)",
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center",
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center",
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
