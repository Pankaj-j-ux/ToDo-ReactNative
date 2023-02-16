/** @format */

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const HomeOptions = ({ setSlide, slide, completeLength, incompleteLength }) => {
  return (
    <View
      style={{
        height: 60,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#c7c4c4f3",
      }}
    >
      <View
        style={{
          flex: 1,
          borderBottomWidth: slide ? 0 : 4,
          borderBottomColor: "grey",
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            margin: 10,
            justifyContent: "center",
            alignItems: "center",
            // borderRightWidth: 0.5,
            // borderRightColor: "#c7c4c4f3",
            marginRight: 0,
            flexDirection: "row",
          }}
          onPress={() => setSlide(false)}
        >
          <Text style={{ marginRight: 6 }}>Incomplete</Text>
          <View
            style={{
              backgroundColor: "#af3333f3",
              height: 30,
              width: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              {incompleteLength}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          borderBottomWidth: slide ? 4 : 0,
          borderBottomColor: "grey",
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            margin: 10,
            justifyContent: "center",
            alignItems: "center",
            borderLeftWidth: 0.5,
            borderLeftColor: "#c7c4c4f3",
            marginLeft: 0,
            flexDirection: "row",
          }}
          onPress={() => setSlide(true)}
        >
          <Text style={{ marginRight: 6 }}>Completed</Text>
          <View
            style={{
              backgroundColor: "#2fa839f3",
              height: 30,
              width: 30,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 50,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              {completeLength}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeOptions;
