/** @format */

import { View, Text, Button, ImageBackground, StyleSheet } from "react-native";
import SignUp from "../Components/SignUp";
import SignIn from "../Components/SignIn";
import { useState } from "react";
const imageURL = require("./../assets/authB.jpg");

const Auth = ({ navigation, setProfile }) => {
  const [form, setForm] = useState(false);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={imageURL}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.logo}>TO-DO APP</Text>
        {form ? (
          <SignIn
            setProfile={setProfile}
            setForm={setForm}
            form={form}
            navigation={navigation}
          />
        ) : (
          <SignUp form={form} setForm={setForm} navigation={navigation} />
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    fontSize: 30,
    fontWeight: "900",
    color: "white",
    letterSpacing: 5,
    marginBottom: 20,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Auth;
