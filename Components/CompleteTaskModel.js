/** @format */

import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { AntDesign, MaterialIcons, Entypo, Octicons } from "@expo/vector-icons";

const CompleteTaskModel = ({ item, deleteHandler }) => {
  const [isOpen, setIsOpen] = useState(false);
  const d = new Date(item.item.createdAt).toLocaleDateString();

  return (
    <View style={{ marginBottom: 10, paddingRight: 10 }}>
      <View
        style={{
          ...styles.upperSection,
          borderBottomRightRadius: isOpen ? 0 : 15,
          borderBottomLeftRadius: isOpen ? 0 : 15,
        }}
      >
        <TouchableOpacity
          style={styles.touchBox}
          onPress={() => setIsOpen(!isOpen)}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Octicons name="dot-fill" size={20} color="green" />
            <Text style={styles.titleText}>{item.item.title}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 10, marginRight: 4, fontWeight: "500" }}>
              {d}
            </Text>
            {/* <Entypo name="edit" size={20} color="grey" /> */}
            <AntDesign
              name="delete"
              size={20}
              color="red"
              onPress={() => deleteHandler(item.item._id, item.item.title, 0)}
            />
          </View>
        </TouchableOpacity>
      </View>
      {isOpen && (
        <View style={styles.bottomSection}>
          <Text style={styles.descText}>{item.item.description}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  upperSection: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 15,
    // borderTopRightRadius: 15,
    borderWidth: 0.4,
    borderColor: "#d3d3d3f3",
    padding: 8,
  },
  touchBox: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bottomSection: {
    backgroundColor: "#6e6e6e65",

    padding: 10,
    // borderRadius: 15,
    borderWidth: 0.4,
    borderColor: "#646464f3",
  },
  titleText: {
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 8,
  },
  descText: {
    color: "#fff",
    fontSize: 13,
  },
});

export default CompleteTaskModel;
