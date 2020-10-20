import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../RESPONSIVE";
import Color from "../../Constants/Colors";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";

import Card from "../../Components/UI/Card";
import RenderGridItem from "../../Components/UI/GridItem";
import { useSelector, useDispatch } from "react-redux";
import * as mealActions from "../../store/actions/meal-action";

import firebase from 'firebase';
const NUM_COLUMN = 2;

const DisplayRecipeScreen = (props) => {
  //console.log(MEAL);
  const MEAL = [];
  let data, key, res;
  const cuisine = props.navigation.getParam("cuisine");
  let displayMeals = useSelector((state) => state.meal.meals);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  // const places = useSelector(state => state.places.places);
  let PRECUISINE = useSelector((state) => state.meal.cuisine);
  //  let displayMeals;

  let num = 1;
  for (key in displayMeals) {
    // console.log(displayMeals[key]['title'],num);
    num++;
  }

  if (cuisine !== "All") {
//    console.log("in filtering");
    displayMeals = displayMeals.filter(
      (meal) => meal["categoryIds"][cuisine] === true
    );
  }

  useEffect(() => {
    fetch();
  }, []);

  const fetch = async () => {
    // var num=0;
    // var ref = firebase.database().ref("Meals/");

    // ref.orderByChild("cuisine/Indian")
    //   .equalTo(true)
    //   .on("child_added", function (snapshot) {
    //     console.log(snapshot.key);
    //     console.log(num);
    //     num++;
    //   });
    await dispatch(mealActions.fetchUserMeal());
     
  };


  const { navigation } = props;
  const renderGridItem = (itemData) => {
    //   console.log(itemData.item.title)
  //  console.log(itemData.item.USER_NAME);
    return (
      <RenderGridItem
        id={itemData.item.id}
        imageUrl={itemData.item.imageUrl}
        title={itemData.item.title}
        USER_NAME={itemData.item.USER_NAME}
        NUM_COLUMN={NUM_COLUMN}
        navigation={navigation}
      />
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Color.primary} />
      </View>
    );
  }

  return (
    <>
      <View style={{ flexDirection: "row", backgroundColor: Color.dark }}>
        <View style={{ marginTop: hp("3%"), marginLeft: wp("20%") }}>
          <Text style={styles.text}>{cuisine} FOOD RECIPES</Text>
          <View>
            <View style={styles.hr} />
          </View>
        </View>
      </View>
      <View style={styles.center}>
        <View style={{ marginTop: hp("4%"), flex: 1 }}>
          <FlatList
            numColumns={NUM_COLUMN}
            data={displayMeals.reverse()}
            renderItem={renderGridItem}
          />
        </View>
      </View>
    </>
  );
};

DisplayRecipeScreen.navigationOptions = (navigationData) => {
  return {
    headerTransparent: "true",
    headerLeft: (
      <TouchableOpacity
        style={{ ...styles.roundButton, marginLeft: hp("3%") }}
        onPress={() => {
          navigationData.navigation.goBack();
          console.log("rtbb");
        }}
      >
        <AntDesign name="back" size={hp("4%")} color="#12e2a3" />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Color.dark,
    height: hp("12"),
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    //   flexDirection: 'row',
    width: "100%",
    height: "25%",
    //   marginVertical:hp('0.5%'),
    marginLeft: wp("3%"),
    //   backgroundColor: 'white'
  },
  detailColumn: {
    // marginVertical:hp('0.5%'),
    marginLeft: wp("3%"),
    width: "75%",
    height: "100%",
    backgroundColor: "blue",
  },
  center: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Color.dark,
  },
  text: {
    color: Color.text2,
    fontSize: hp("4%"),
    marginVertical: hp("0.3%"),
  },
  hr: {
    height: 3,
    backgroundColor: Color.accent,
    //    alignSelf: 'stretch',
    width: "100%",
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
  cardStyle: {
    //  alignItems:'center',
    height: hp("40%"),
    //  padding:wp('3%'),
    width: wp("95%") / NUM_COLUMN,
    backgroundColor: Color.accent,
    backgroundColor: Color.lgdark,
    marginHorizontal: wp("0.5%"),
    marginVertical: hp("0.5%"),
    overflow: "hidden",
    borderWidth: 2,
    //  borderColor:Color.text2
  },
  ImageStyle: {
    width: wp("95%") / NUM_COLUMN,
    height: "75%",
  },
  topBar: {
    zIndex: 3,
    position: "absolute",
    height: "10%",
    width: "100%",
    //  borderBottomRightRadius: 100,
    flexDirection: "row",
    alignItems: "center",
  },
  rightBar: {
    height: "100%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    //   backgroundColor:'blue',
    // right: 0
  },
  centered: {
    flex: 1,
    backgroundColor: Color.dark,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DisplayRecipeScreen;
