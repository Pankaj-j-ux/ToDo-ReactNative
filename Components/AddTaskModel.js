/** @format */

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import { useState } from "react";

const AddTaskModel = ({
  setModalVisible,
  modalVisible,
  profile,
  setIncompleteTask,
  incompleteTask,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addHandler = async () => {
    if (title == "" || description == "") {
      Alert.alert("Credentials Missing", "Fill in the details carefully!", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } else {
      const url = "https://to-do-backend-lmnc.onrender.com/api/v1/createtask";
      const data = {
        title,
        description,
        createdBy: profile._id,
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
        setIncompleteTask([result.data, ...incompleteTask]);
        setModalVisible(!modalVisible);
        Alert.alert("", "Successfully Add!", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      } else {
        setModalVisible(!modalVisible);
        Alert.alert("Operation Failed", "Please try again.", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextInput
            onChangeText={(val) => setTitle(val)}
            style={styles.textInput}
            placeholder="Title"
          />
          <TextInput
            onChangeText={(val) => setDescription(val)}
            style={styles.textInput}
            placeholder="Description"
          ></TextInput>
          <View style={styles.btnView}>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.buttonClose}
            >
              <Text style={styles.btnText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={addHandler} style={styles.buttonClose}>
              <Text style={styles.btnText}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "80%",
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    flex: 1,
    margin: 5,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    borderRadius: 10,
  },
  btnText: { color: "#fff", fontWeight: "800" },

  textInput: {
    backgroundColor: "#fff",
    width: "100%",
    height: 45,
    borderWidth: 0.6,
    borderColor: "grey",
    borderRadius: 10,
    marginBottom: 10,
    padding: 8,
  },

  btnView: {
    width: "100%",
    flexDirection: "row",
  },
});
export default AddTaskModel;
