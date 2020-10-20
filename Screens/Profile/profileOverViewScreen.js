import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  AsyncStorage,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../RESPONSIVE";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../../store/actions/auth";
import UserGrid from "../../Components/UI/UserGrid";
import firebase from "firebase";
import Colors from "../../Constants/Colors";
import { Button } from "react-native-paper";
import * as mealActions from "../../store/actions/meal-action";

const ProfileOverViewScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState();

  let DATA = useSelector((state) => state.meal.userMeals);
  let img = useSelector((state) => state.auth.profilePic);
  let firstName = useSelector((state) => state.auth.firstName);
  let lastName = useSelector((state) => state.auth.lastName);
  let name = firstName + " " + lastName;
  const logout = useCallback(() => {
    firebase.auth().signOut();

    Alert.alert(
      "Logout",
      "Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            dispatch(authActions.logout());
            props.navigation.navigate("Login");
          },
        },
      ],
      { cancelable: true }
    );
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    fetch().then(() => {
      console.log("donee");
      setIsLoading(false);
    });
    // console.log(POPULAR.length+'aditya');
  }, [dispatch, fetch]);

  const fetch = useCallback(async () => {
    console.log("hey");
    await dispatch(mealActions.fetchUserMeal());
  }, [dispatch, setIsLoading]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  let { navigation } = props;
  return (
    <ScrollView contentContainerStyle={{ backgroundColor: Colors.lgdark }}>
      <View style={styles.gradient}>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          <View style={styles.profilePic}>
            <Image
              style={{ height: "100%", width: "100%" }}
              source={{ uri: img }}
            />
          </View>
          <Text style={{fontSize:hp('3%'),color:Colors.text2,marginLeft:10,width:'55%'}} numberOfLines={1}>{name}</Text>
        </View>

        <TouchableOpacity
          style={{ ...styles.roundButton, marginLeft: hp("3%") }}
          onPress={logout}
        >
          <AntDesign name="logout" size={hp("3%")} color="#12e2a3" />
        </TouchableOpacity>
      </View>
      <View style={styles.DATA}>
        {DATA.map((item) => {
          return (
            <UserGrid
              id={item.id}
              imageUrl={item.imageUrl}
              NUM_COLUMN={3}
              navigation={navigation}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

ProfileOverViewScreen.navigationOptions = (navigationData) => {
  return {
    headerMode:'none',
    headerTransparent: 'true',
  };
};

const styles = StyleSheet.create({
  gradient: {
    //  flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    height: hp("15%"),
    width: wp("100%"),
    overflow: "hidden",
    borderBottomLeftRadius: wp("8%"),
    borderBottomRightRadius: wp("8%"),
    flexDirection: "row",
    //  backgroundColor: "white",
  },

  roundButton: {
    backgroundColor: "rgba(0, 0, 0 ,0.5)",
    borderColor: "#E2ECFD",
    //borderWidth: 1,
    width: wp("12%"),
    height: wp("12%"),
    borderRadius: wp("12%") / 2,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FBFFFF",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    marginRight:10,
    overflow: "hidden",
  },

  profilePic: {
    backgroundColor: "rgba(0, 0, 0 ,0.5)",
    borderColor: "#E2ECFD",
    //borderWidth: 1,
    width: wp("14%"),
    height: wp("14%"),
    borderRadius: wp("14%") / 2,
    //  justifyContent: "center",
    //  alignItems: "center",
    shadowColor: "#FBFFFF",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    // marginTop: hp('1%'),
    marginLeft: "3%",
    overflow: "hidden",
  },
  DATA: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: Colors.lgdark,
    height: hp("85%"),
    width: wp("100%")
  },
  centered: {
    flex: 1,
    backgroundColor: Colors.dark,
    justifyContent: "center",
    alignItems: "center",
  },
});


export default ProfileOverViewScreen;
