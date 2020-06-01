import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  PanResponder,
  Animated,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Color from "../../Constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../RESPONSIVE";

import CardImage from "../../Components/UI/cardImage";
import PopularRecipe from "../../Components/UI/popularRecipe";
import ViewAll from "../../Components/UI/viewAll";
import * as mealActions from "../../store/actions/meal-action";
import { useSelector, useDispatch } from "react-redux";

const DashboardScreen = (props) => {
  const dispatch = useDispatch();
  let POPULAR = useSelector((state) => state.meal.popularMeals);
  const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //     console.log('hey');
  //     fetch();
  // }, []);

  const loadMeals = useCallback(async () => {
    //  setError(null);
    try {
      await dispatch(mealActions.fetchMeal());
    } catch (err) {}
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    setIsLoading(true);
    loadMeals().then(() => {
      setIsLoading(false);
    });
    // console.log(POPULAR.length+'aditya');
  }, [dispatch, loadMeals]);

  if (POPULAR.length === 0 || isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Color.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Color.dark }}
      scrollEventThrottle={16}
    >
      <StatusBar />

      <View
        style={{
          width: "100%",
          height: "9%",
          // padding: 26,
          marginLeft: wp("6%"),
          marginTop: hp("3%"),
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderBottomEndRadius: 40,
        }}
      >
        <Text style={{ ...styles.text, fontSize: hp("4%") }} numberOfLines={1}>
          Hey Aditya,
        </Text>
        <Text style={{ ...styles.text, fontSize: hp("3%") }} numberOfLines={2}>
          what do you want to eat today?
        </Text>
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginTop: "1%" }}
      >
        <CardImage
          imageUri={require("../../Images/indian.jpg")}
          category="Indian"
          onPress={() => {
            props.navigation.navigate("DisplayRecipe", {
              cuisine: "Indian",
            });
          }}
        />
        <CardImage
          imageUri={require("../../Images/italian.jpg")}
          category="Italian"
          onPress={() => {
            props.navigation.navigate("DisplayRecipe", {
              cuisine: "Italian",
            });
          }}
        />
        <CardImage
          imageUri={require("../../Images/mexican.jpg")}
          category="Mexican"
          onPress={() => {
            props.navigation.navigate("DisplayRecipe", {
              cuisine: "Mexican",
            });
          }}
        />
        <CardImage
          imageUri={require("../../Images/desert.jpg")}
          category="Desert"
          onPress={() => {
            props.navigation.navigate("DisplayRecipe", {
              cuisine: "Desert",
            });
          }}
        />
        <ViewAll
          onPress={() => {
            props.navigation.navigate("DisplayRecipe", {
              cuisine: "All",
            });
          }}
        />
      </ScrollView>

      <View style={styles.center}>
        <View style={styles.hr} />
        <Text style={styles.text}>Latest Uploads</Text>
        <View style={styles.hr} />
      </View>

      <FlatList
        keyExtractor={(item) => item.id}
        data={POPULAR}
        renderItem={(itemData) => (
          <PopularRecipe
            name={itemData.item.USER_NAME}
            recipeName={itemData.item.title}
            avatarUri={itemData.item.USER_IMG}
            imageUri={itemData.item.imageUrl}
            onClick={() => {
              props.navigation.navigate({
                routeName: "RecipeDetail",
                params: {
                  id: itemData.item.id,
                  mealTitle: itemData.item.title,
                },
              });
            }}
          />
        )}
      />
    </ScrollView>
  );
};

DashboardScreen.navigationOptions = (navigationData) => {
  return {
    headerTransparent: "true",
  };
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp("2%"),
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: "15%",
    alignItems: "center",
    //  backgroundColor: 'blue',
  },
  info: {
    marginLeft: wp("7%"),
    marginTop: hp("2%"),
    flexDirection: "row",
    width: wp("100%"),
    height: "6%",
    justifyContent: "space-around",
    //   backgroundColor:'blue'
  },
  card: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: wp("4%"),
    backgroundColor: Color.lgdark,
    height: hp("40%"),
    width: wp("90%"),
    overflow: "hidden",
    borderWidth: 3,
    borderColor: Color.accent,
  },
  avatarImg: {
    height: "100%",
    width: "100%",
    resizeMode: "contain",
  },
  Image: {
    height: "85%",
    width: "100%",
    resizeMode: "cover",
    overflow: "hidden",
    zIndex: 2,
    //  position:'absolute',
    //    bottom:'15%'
    //    position:'absolute'
  },
  round: {
    // backgroundColor:Color.primary,
    borderColor: "#E2ECFD",
    borderWidth: 1,
    width: "20%",
    height: "100%",
    borderRadius: 20,
    shadowColor: "#FBFFFF",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    marginLeft: "3%",
    overflow: "hidden",
    backgroundColor: Color.lgdark,
  },
  text: {
    color: Color.text,
    fontSize: hp("4%"),
    marginVertical: hp("1%"),
  },
  hr: {
    height: 3,
    backgroundColor: Color.accent,
    //    alignSelf: 'stretch',
    width: "80%",
  },
  topBar: {
    zIndex: 3,
    position: "absolute",
    height: "20%",
    width: "100%",
    //  borderBottomRightRadius: 100,
    flexDirection: "row",
    alignItems: "center",
  },
  leftBar: {
    //    backgroundColor: 'blue',
    backgroundColor: "rgba(0, 0, 0 ,0.5)",
    height: "100%",
    width: "70%",
    borderBottomRightRadius: 100,
    flexDirection: "row",
    alignItems: "center",
  },
  rightBar: {
    height: "100%",
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    right: 0,
  },
  roundButton: {
    backgroundColor: "rgba(0, 0, 0 ,0.5)",
    borderColor: "#E2ECFD",
    //borderWidth: 1,
    width: wp("12%"),
    height: hp("7%"),
    borderRadius: wp("100%") / 2,
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
  centered: {
    flex: 1,
    backgroundColor: Color.dark,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DashboardScreen;
