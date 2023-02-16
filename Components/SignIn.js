/** @format */

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";

const SignIn = ({ setForm, form, navigation, setProfile }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [btnText, setBtnText] = useState("Sign In");

  const loginHandler = async () => {
    setBtnText("...");
    setDisabled(true);
    if (email == "" || password == "") {
      Alert.alert("Credentials Missing", "Fill in the details carefully!", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      const url = "https://to-do-backend-lmnc.onrender.com/api/v1/signin";
      const data = {
        email,
        password,
      };
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setProfile(result.data);
        Alert.alert("", "Login Successfully", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);

        navigation.navigate("Home");
      } else {
        Alert.alert("", result.message, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    }
    setBtnText("Sign In");
    setDisabled(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.signup}>Log In</Text>
      <TextInput
        style={styles.textinput}
        placeholder="* Email"
        value={email}
        onChangeText={(val) => setEmail(val)}
      />
      <TextInput
        style={styles.textinput}
        placeholder="* Password"
        value={password}
        onChangeText={(val) => setPassword(val)}
      />
      <TouchableOpacity
        disabled={disabled}
        style={styles.signupbtn}
        onPress={loginHandler}
      >
        <Text style={styles.appbtntext}>{btnText}</Text>
      </TouchableOpacity>
      <Text style={styles.navtext} onPress={() => {}}>
        Forgot password? <Text style={styles.innernavtext}> CLICK HERE !</Text>
      </Text>
      <Text style={styles.navtext} onPress={() => setForm(!form)}>
        Don't have an account?{" "}
        <Text style={styles.innernavtext}> SIGN UP !</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // height: "50%",
    width: "100%",
    padding: 20,
    alignItems: "center",
  },
  signup: {
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 10,
    color: "#87CEEB",
  },
  textinput: {
    width: "90%",
    height: 40,
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 10,
    marginBottom: 4,
  },
  signupbtn: {
    width: "90%",
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#87CEEB",
    borderRadius: 6,
    marginBottom: 20,
  },
  appbtntext: {
    color: "white",
    fontWeight: "600",
  },
  navtext: {
    fontWeight: "500",
    marginBottom: 8,
  },
  innernavtext: {
    paddingLeft: 10,
    color: "#87CEEB",
  },
});

export default SignIn;
