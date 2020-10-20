import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../RESPONSIVE";

import Color from "../../Constants/Colors";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
//import MEAL from '../../Dummy-Data.js'
import Card from "../UI/Card";

const UserGrid = (props) => {
  const { navigation, id, title, imageUrl, USER_NAME } = props;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate({
          routeName: "RecipeDetail",
          params: {
            id: id,
          },
        });
      }}
    >
      <Card style={styles.cardStyle}>
        <Image
          source={{ uri: imageUrl }}
          style={{ height: "100%", width: "100%" }}
        />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    height: hp("20%"),
    width: wp("95%") / 3,
    backgroundColor: Color.accent,
    backgroundColor: Color.lgdark,
    marginHorizontal: wp("0.5%"),
    marginVertical: hp("0.5%"),
    overflow: "hidden",
    borderWidth: 2,
  },
  ImageStyle: {
    width: wp("95%") / 2,
    height: "75%",
  },
  topBar: {
    zIndex: 3,
    position: "absolute",
    height: "10%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  rightBar: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  text: {
    color: Color.text2,
    fontSize: hp("4%"),
    marginVertical: hp("0.3%"),
  },
  roundButton: {
    backgroundColor: "rgba(0, 0, 0 ,0.5)",
    borderColor: "#E2ECFD",
    //borderWidth: 1,
    width: wp("10%"),
    height: wp("10%"),
    borderRadius: wp("10%") / 2,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FBFFFF",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    // marginTop: hp('1%'),
    marginLeft: "3%",
    overflow: "hidden",
  },
});

export default UserGrid;
