import React from "react";
import { StyleSheet, Text, View } from "react-native";

import LoadingScreen from "../Screens/auth/LoadingScreen";
import LoginScreen from "../Screens/auth/LoginScreen";
import DashboardScreen from "../Screens/user/DashboardScreen";
import RecipeDetailScreen from "../Screens/user/recipeDetailScreen";
import DisplayRecipeScreen from "../Screens/user/displayRecipeScreen";
import FavouriteScreen from "../Screens/user/favouriteScreen";
import AddRecipeScreen from "../Screens/user/addRecipeScreen";
import ProfileOverViewScreen from "../Screens/Profile/profileOverViewScreen";
import ProfileDetailScreen from "../Screens/Profile/profileDetailScreen";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator, HeaderTitle } from "react-navigation-stack";
import { Platform } from "react-native";
import { Ionicons, AntDesign, MaterialIcons, Entypo } from "@expo/vector-icons";
import Color from "../Constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../RESPONSIVE";

import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

const profileNav = createStackNavigator(
  {
    ProfileOverView: {
      screen: ProfileOverViewScreen,
      navigationOptions: () => ({
        headerMode: "none",
        headerTransparent: "true",
      }),
    },
    ProfileDetail: ProfileDetailScreen,
    RecipeDetail: RecipeDetailScreen,
  },
  {
    // headerMode:'none',
    headerTransparent: "true",
  }
);

const FavNav = createStackNavigator(
  {
    Favourite: FavouriteScreen,
    RecipeDetail: RecipeDetailScreen,
  },
  {
    //headerMode:'none',
    //headerTransparent: 'true',
  }
);

const userNav = createStackNavigator(
  {
    Dashboard: DashboardScreen,
    DisplayRecipe: DisplayRecipeScreen,
    RecipeDetail: RecipeDetailScreen,

    ProfileDetail: ProfileDetailScreen,
  },
  {
    // headerMode:'none',
    headerTransparent: "true",
  }
);

const tabScreenConfig = {
  Meals: {
    screen: userNav,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Entypo name="home" size={23} color={Color.accent} />;
      },
      tabBarColor: Color.lgdark,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontSize: hp("2%"), color: Color.text2 }}>Home</Text>
        ) : (
          <Text>Home</Text>
        ),
    },
  },
  add: {
    screen: AddRecipeScreen,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <MaterialIcons name="add-circle" size={23} color={Color.accent} />
        );
      },
      tabBarColor: Color.lgdark,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontSize: hp("2%"), color: Color.text2 }}>Add</Text>
        ) : (
          <Text>Add</Text>
        ),
    },
  },

  ProfileOverView: {
    screen: profileNav,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <AntDesign name="user" size={23} color={Color.accent} />;
      },
      tabBarColor: Color.lgdark,
      tabBarLabel:
        Platform.OS === "android" ? (
          <Text style={{ fontSize: hp("2%"), color: Color.text2 }}>user</Text>
        ) : (
          <Text>user</Text>
        ),
    },
  },
};

const MealsFavTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: "white",
        shifting: true,
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            //for ios back button styling
          },
          activeTintColor: Color.accentColor,
        },
      });

const MainNav = createSwitchNavigator({
  Loading: LoadingScreen,
  Login: LoginScreen,
  Dashboard: MealsFavTabNavigator,
});

export default createAppContainer(MainNav);
