/** @format */

import { View, Text, ImageBackground, StyleSheet } from "react-native";
const imageURL = require("./../assets/homeI.jpg");
const HomeHeader = ({ totalcount }) => {
  const d = new Date();
  let day = d.getDay();
  let date = d.getDate();
  // let time = d.getTime();

  switch (day) {
    case 1:
      day = "Mon";
      break;
    case 2:
      day = "Tue";
      break;
    case 3:
      day = "Wed";
      break;
    case 4:
      day = "Thur";
      break;
    case 5:
      day = "Fri";
      break;
    case 6:
      day = "Sat";
      break;
    case 7:
      day = "Sun";
      break;
    default:
      day = "3";
  }

  return (
    <View>
      <ImageBackground
        source={imageURL}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={{ marginTop: 45, ...styles.headerView }}>
          <Text
            style={{ fontSize: 23, color: "white", fontWeight: "600" }}
          >{`${day},${date}`}</Text>
          <Text style={{ fontSize: 23, color: "white", fontWeight: "400" }}>
            {totalcount}
          </Text>
        </View>
        <View></View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 90,
    width: "100%",
    zIndex: 100,
  },
});
export default HomeHeader;
