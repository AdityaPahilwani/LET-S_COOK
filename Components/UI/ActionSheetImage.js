import React from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../RESPONSIVE";
import { AntDesign } from "@expo/vector-icons";
import Color from "../../Constants/Colors";

const ImageSheet = (props) => {
  const { img } = props;

  return (
    <View style={styles.modalView}>
      <Image source={{ uri: img }} style={styles.image}/>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "#403f3f",
    borderTopColor: Color.accent,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "absolute",
    marginTop:hp('25%'),
    height: hp('50%'),
    width: "100%",
    borderTopColor: Color.accent,
   // padding:6,
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    overflow: "hidden",
  }
});

export default ImageSheet;
