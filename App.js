/** @format */

// import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import Auth from "./Screen/Auth.js";
import Home from "./Screen/Home.js";
import { useState } from "react";

export default function App() {
  const [profile, setProfile] = useState({});

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Auth">
          {(props) => <Auth {...props} setProfile={setProfile} />}
        </Stack.Screen>
        <Stack.Screen name="Home">
          {(props) => <Home {...props} profile={profile} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
