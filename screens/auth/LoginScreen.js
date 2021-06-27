import React, { useContext, useState } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/FormInput";
import FormButton from "../../components/FormButton";
import ErrorMessage from "../../components/ErrorMessage";
import { Context } from "../../Context/FoodContext";
import UserContext from "../../connection/userContext";
import userlogcontext from "../../connection/userLogContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
  password: Yup.string()
    .label("Password")
    .required()
    .min(6, "Password must have at least 6 characters "),
});

function Login({ navigation, firebase }) {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("ios-eye");
  const { state, getlogindata } = useContext(Context);
  const { loggedIn, setLoggedin } = useContext(UserContext);
  const { data1, data2 } = useContext(userlogcontext);
  const [id, setid] = data1;
  const [type, settype] = data2;

  function goToSignup() {
    return navigation.navigate("Register");
  }

  function goToForgotPassword() {
    return navigation.navigate("Reset");
  }

  function handlePasswordVisibility() {
    if (rightIcon === "ios-eye") {
      setRightIcon("ios-eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "ios-eye-off") {
      setRightIcon("ios-eye");
      setPasswordVisibility(!passwordVisibility);
    }
  }

  async function handleOnLogin(values, actions) {
    var check = true;

    for (var i = 0; i < state.length; i++) {
      if (state[i].user === values.email && state[i].pass === values.password) {
        setid(state[i].id);
        settype(state[i].account_type);
        actions.setSubmitting(false);
        setLoggedin(true);
        console.log("success");
        check = true;
        var Data = {
          id: state[i].id,
          type: state[i].account_type,
          LogStatus: true,
        };
        await AsyncStorage.setItem("DataKey", JSON.stringify(Data));
        break;
      }
    }
    if (check == false) {
      actions.setSubmitting(false);
      alert("Failed to login...");
    } else {
      actions.setSubmitting(false);
      console.log(actions);
      setLoggedin(true);
      actions.resetForm();
      navigation.navigate("Home");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          handleOnLogin(values, actions);
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          values,
          handleSubmit,
          errors,
          isValid,
          touched,
          handleBlur,
          isSubmitting,
        }) => (
          <>
            <FormInput
              name="email"
              value={values.email}
              onChangeText={handleChange("email")}
              placeholder="Enter email"
              autoCapitalize="none"
              iconName="ios-mail"
              iconColor="#2C384A"
              onBlur={handleBlur("email")}
              onEndEditing={() => {
                getlogindata(values.email);
              }}
            />
            <ErrorMessage errorValue={touched.email && errors.email} />
            <FormInput
              name="password"
              value={values.password}
              onChangeText={handleChange("password")}
              placeholder="Enter password"
              secureTextEntry={passwordVisibility}
              iconName="ios-lock"
              autoCapitalize="none"
              iconColor="#2C384A"
              onBlur={handleBlur("password")}
              rightIcon={
                <TouchableOpacity onPress={handlePasswordVisibility}>
                  <Ionicons name={rightIcon} size={28} color="grey" />
                </TouchableOpacity>
              }
            />
            <ErrorMessage errorValue={touched.password && errors.password} />
            <View style={styles.buttonContainer}>
              <FormButton
                buttonType="outline"
                onPress={handleSubmit}
                title="LOGIN"
                buttonColor="#039BE5"
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
              />
            </View>
            <ErrorMessage errorValue={errors.general} />
          </>
        )}
      </Formik>
      <Button
        title="Don't have an account? Sign Up"
        onPress={goToSignup}
        titleStyle={{
          color: "#F57C00",
        }}
        type="clear"
      />
      <Button
        title="Forgot Password?"
        onPress={goToForgotPassword}
        titleStyle={{
          color: "#039BE5",
        }}
        type="clear"
      />
    </SafeAreaView>
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
});

export default Login;
