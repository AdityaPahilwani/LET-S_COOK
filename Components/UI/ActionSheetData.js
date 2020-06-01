import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../RESPONSIVE";
import { AntDesign } from "@expo/vector-icons";
import Color from "../../Constants/Colors";

const ActionSheet = (props) => {
  const { name, data, onClick, lines, type } = props;

  return (
    <View style={styles.modalView}>
      <View
        style={{
          ...styles.row,
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: "7%",
          paddingVertical: "2%",
        }}
      >
        <Text style={styles.text}>{name}</Text>

        <View>
          <TouchableOpacity onPress={onClick}>
            <AntDesign
              name="closecircleo"
              size={hp("4%")}
              color={Color.accent}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.center}>
        <View
          style={{
            ...styles.hr,
            marginTop: "0%",
            backgroundColor: Color.primary,
            width: "94%",
          }}
        />
      </View>
      <FlatList
        data={data}
        renderItem={(itemData) => {
          return (
            <>
              <View style={styles.ingredientsteps}>
                <Text style={styles.text} numberOfLines={lines}>
                  {type === "ing"
                    ? itemData.item.indgredient
                    : itemData.item.steps}
                </Text>
                {type === "ing" &&
                  <Text style={styles.text} numberOfLines={lines}>
                    {itemData.item.value}
                  </Text>
                }
              </View>
              <View style={styles.center}>
                <View style={styles.hr} />
              </View>
            </>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#403f3f",
    borderTopColor: Color.accent,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    height: "75%",
    width: "100%",
    borderTopColor: Color.accent,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: "5%",
  },
  text: {
    color: Color.text,
    fontSize: hp("4%"),
  },
  hr: {
    height: 3,
  //  marginTop: "2%",
    width: "70%",
    backgroundColor: "rgba(255, 255, 255 ,0.1)",
    width: "94%",
  },
  ingredientsteps: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: wp("3%"),
  },
});

export default ActionSheet;
