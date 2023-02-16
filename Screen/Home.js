/** @format */

import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from "react-native";
import HomeBody from "../Components/HomeBody";
import HomeHeader from "../Components/HomeHeader";
import HomeOptions from "../Components/HomeOption";

const imageURL = require("./../assets/homeI.jpg");

const Home = ({ profile }) => {
  const [slide, setSlide] = useState(false);
  const [incompleteTask, setIncompleteTask] = useState([]);
  const [completeTask, setCompleteTask] = useState([]);

  const getdata = async () => {
    const url = "https://to-do-backend-lmnc.onrender.com/api/v1/gettask";
    const data = {
      userId: profile._id,
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
      // console.log(result.data);
      setCompleteTask(result.data.completeTask);
      setIncompleteTask(result.data.incompleteTask);
    } else {
      console.log("Kuch nahi hua ");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <View style={styles.container}>
      <HomeHeader totalcount={incompleteTask.length + completeTask.length} />
      <View style={styles.section}>
        <HomeOptions
          slide={slide}
          setSlide={setSlide}
          incompleteLength={incompleteTask.length}
          completeLength={completeTask.length}
        />
        <HomeBody
          slide={slide}
          setIncompleteTask={setIncompleteTask}
          setCompleteTask={setCompleteTask}
          incompleteTask={incompleteTask}
          completeTask={completeTask}
          profile={profile}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  section: {
    paddingTop: 90,
    // backgroundColor: "black",
    height: "100%",
    paddingBottom: "16%",
  },
});

export default Home;
