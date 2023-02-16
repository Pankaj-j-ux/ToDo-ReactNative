/** @format */

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

import IncompleteTaskModel from "./IncompleteTaskModel";
import CompleteTaskModel from "./CompleteTaskModel";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AddTaskModel from "./AddTaskModel";
import { useState } from "react";

const HomeBody = ({
  slide,
  incompleteTask,
  completeTask,
  setIncompleteTask,
  setCompleteTask,
  profile,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const finalChangeStatus = async (_id) => {
    const url = "https://to-do-backend-lmnc.onrender.com/api/v1/taskstatus";
    const data = {
      _id,
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
      let targetIndex = incompleteTask.findIndex((todo, index) => {
        return todo._id === _id;
      });

      const targetToDo = incompleteTask[targetIndex];

      let newIncomplete = incompleteTask.filter((value, index) => {
        return index != targetIndex;
      });
      setIncompleteTask(newIncomplete);
      setCompleteTask([targetToDo, ...completeTask]);
    } else {
      Alert.alert("", "Operation Failed!", [
        { text: "CANCEL", onPress: () => console.log("Cancel Pressed") },
      ]);
    }
  };

  const changeStatusHandler = (_id, title) => {
    // console.log(_id);
    Alert.alert(title, "Change status of above mentioned task to complete!", [
      { text: "CANCEL", onPress: () => console.log("Cancel Pressed") },
      { text: "OK", onPress: () => finalChangeStatus(_id) },
    ]);
  };

  const finalDelete = async (_id, flag) => {
    const url = "https://to-do-backend-lmnc.onrender.com/api/v1/deletetask";
    const data = {
      _id,
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
      if (flag === 1) {
        let targetIndex = incompleteTask.findIndex((todo, index) => {
          return todo._id === _id;
        });

        let newIncomplete = incompleteTask.filter((value, index) => {
          return index != targetIndex;
        });
        setIncompleteTask(newIncomplete);
      } else {
        let targetIndex = completeTask.findIndex((todo, index) => {
          return todo._id === _id;
        });

        let newComplete = completeTask.filter((value, index) => {
          return index != targetIndex;
        });
        setCompleteTask(newComplete);
      }
    } else {
      Alert.alert("", "Operation Failed!", [
        { text: "CANCEL", onPress: () => console.log("Cancel Pressed") },
      ]);
    }
  };

  const deleteHandler = (_id, title, flag) => {
    Alert.alert(title, "Deleting above mentioned task!", [
      { text: "CANCEL", onPress: () => console.log("Cancel Pressed") },
      { text: "OK", onPress: () => finalDelete(_id, flag) },
    ]);
  };

  return (
    <View style={{ width: "100%" }}>
      <AddTaskModel
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        profile={profile}
        setIncompleteTask={setIncompleteTask}
        incompleteTask={incompleteTask}
      />
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.addtaskbtn}
      >
        <Text style={styles.addtasktext}>+</Text>
      </TouchableOpacity>
      <View style={styles.sliderOuter}>
        <View style={{ ...styles.page, marginLeft: slide ? "-50%" : "0%" }}>
          {incompleteTask.length ? (
            <View>
              <Text
                style={{
                  color: "red",
                  fontSize: 12,
                  textAlign: "center",
                  marginBottom: 8,
                }}
              >
                Press <Text style={{ color: "green" }}>green</Text> tick to
                change the status of task to complete
              </Text>
              <View style={{ paddingBottom: 50 }}>
                <FlatList
                  data={incompleteTask}
                  renderItem={(item) => (
                    <IncompleteTaskModel
                      item={item}
                      changeStatusHandler={changeStatusHandler}
                      deleteHandler={deleteHandler}
                    />
                  )}
                />
              </View>
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="delete-empty-outline"
                size={100}
                color="grey"
              />
              <Text style={{ fontSize: 30, color: "grey", fontWeight: "800" }}>
                No Data Present
              </Text>
            </View>
          )}
        </View>

        <View style={styles.page}>
          {completeTask.length ? (
            <View>
              <FlatList
                data={completeTask}
                renderItem={(item) => (
                  <CompleteTaskModel
                    item={item}
                    deleteHandler={deleteHandler}
                  />
                )}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="delete-empty-outline"
                size={100}
                color="grey"
              />
              <Text style={{ fontSize: 30, color: "grey", fontWeight: "800" }}>
                No Data Present
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderOuter: {
    height: "100%",
    width: "200%",
    flexDirection: "row",
    // overflow: "scroll"
  },

  addtaskbtn: {
    width: 60,
    height: 60,
    backgroundColor: "black",
    position: "absolute",
    bottom: 15,
    right: 15,
    zIndex: 10,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  addtasktext: {
    color: "white",
    fontSize: 30,
  },

  page: {
    backgroundColor: "#d8e5ebf1",
    padding: 10,
    paddingRight: 0,
    width: "50%",

    // paddingBottom: 100,
  },
});

export default HomeBody;
