/** @format */

import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

const SignUp = ({ setForm, form, navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [btnText, setBtnText] = useState("Sign Up");

  const signupHandler = async () => {
    setBtnText("...");
    setDisabled(true);

    if (email == "" || password == "" || name == "") {
      Alert.alert("Credentials Missing", "Fill in the details carefully!", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      const url = "https://to-do-backend-lmnc.onrender.com/api/v1/signup";
      const data = {
        name,
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
        Alert.alert(
          "Successfully Registered!",
          "Verfication email Sent. Please Verifiy your email before login",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );

        setForm(!form);
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
      <Text style={styles.signup}>Sign Up</Text>
      <TextInput
        style={styles.textinput}
        placeholder="Full Name"
        value={name}
        onChangeText={(val) => setName(val)}
      />
      <TextInput
        style={styles.textinput}
        placeholder="Email"
        value={email}
        onChangeText={(val) => setEmail(val)}
      />
      <TextInput
        style={styles.textinput}
        placeholder="Password"
        value={password}
        onChangeText={(val) => setPassword(val)}
      />
      <TouchableOpacity
        disabled={disabled}
        style={styles.signupbtn}
        onPress={signupHandler}
      >
        <Text style={styles.appbtntext}>{btnText}</Text>
      </TouchableOpacity>
      <Text style={styles.navtext} onPress={() => setForm(!form)}>
        Already have an account?{" "}
        <Text style={styles.innernavtext}> LOG IN !</Text>
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
  },
  innernavtext: {
    paddingLeft: 10,
    color: "#87CEEB",
  },
});

export default SignUp;
