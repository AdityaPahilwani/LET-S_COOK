export const CREATE_MEAL = "CREATE_MEAL";
export const FETCH_MEAL = "FETCH_MEAL";
export const FETCH_CUISINE_MEAL = "FETCH_CUISINE_MEAL";
export const USER_MEAL="USER_MEAL";
import firebase from "firebase";
import { AsyncStorage } from "react-native";
import Meal from "../../models/meal";

export const createMeal = (
  imageUri,
  title,
  description,
  indgredients,
  steps,
  cuisine
) => {
  return async (dispatch, getState) => {
    const userData = await AsyncStorage.getItem("userData");
    const transformedData = JSON.parse(userData);
    const userId = getState().auth.userId;
    const firstName = getState().auth.firstName;
    const lastName = getState().auth.lastName;
    const profilePic = getState().auth.profilePic;
    // const { userId, firstName, lastName, profilePic } = transformedData;
    let id1 = userId + title + Math.random();
    const response = await fetch(imageUri);
    const blob = await response.blob();
    var ref = firebase.storage().ref(`${userId}`).child(id1);
    const picurl = await ref.put(blob);
    var url = await ref.getDownloadURL();
    var USER_NAME = firstName + " " + lastName;
    var mealData;
    firebase
      .database()
      .ref("/Meals/")
      .push({
        image: url,
        title: title,
        description: description,
        indgredients: indgredients,
        steps: steps,
        cuisine: cuisine,
        createdBy: userId,
      })
      .then(function (snapshot) {
        var key = snapshot.key;
        mealData = new Meal(
          key,
          cuisine,
          title,
          description,
          url,
          indgredients,
          steps,
          USER_NAME,
          profilePic,
          userId
        );

        /// console.log(mealData);
        dispatch({ type: CREATE_MEAL, newMeal: mealData });
      });
  };
};

export const fetchMeal = () => {
  return async (dispatch) => {
    var userId, usersRef, mealssRef;
    let MEALARR = [],
      MEAL,
      ARR = [];
    let res, ARRINDEX;
    let data, key, USER_NAME, USER_IMG;
    let num = 0;
    let PromiseArr = [];
    let PromiseMealArr = [];

    let tempArr = [];
    const myPromise = new Promise((resolve, reject) => {
      firebase
        .database()
        .ref("Meals/")
        .on("value", function (dataSnapshot) {
          res = dataSnapshot.toJSON();
          resolve(res);
        });
    }).then(() => {
      for (key in res) {
        userId = res[key]["createdBy"];
        ARR.push(userId);
        usersRef = (userId) => {
          return new Promise((resolve, reject) => {
            firebase
              .database()
              .ref("/users/" + userId)
              .on("value", function (dataSnapshot) {
                let USER_RES = dataSnapshot.toJSON();
              //  console.log(USER_RES);
                resolve(USER_RES);
              });
          });
        };
        PromiseArr.push(usersRef(userId));
      }

      Promise.all(PromiseArr).then((values) => {
        var userId;
        num = 0;
        for (key in res) {
          userId = ARR[num];
          USER_NAME = values[num]["name"];
          USER_IMG = values[num]["profile_picture"];

          MEAL = new Meal(
            key,
            res[key]["cuisine"],
            res[key]["title"],
            res[key]["description"],
            res[key]["image"],
            res[key]["indgredients"],
            res[key]["steps"],
            USER_NAME,
            USER_IMG,
            userId
          );
          MEALARR.push(MEAL);
          num++;
        }

        dispatch({ type: FETCH_MEAL, meals: MEALARR });
      });
    });
  };
};

export const STOREE = (MEALARR) => {
  return (dispatch) => {
    dispatch({ type: FETCH_MEAL, meals: MEALARR });
  };
};

export const fetchCuisine = (MEAL, cuisine) => {
  return async (dispatch) => {
    let res = MEAL;
    let data, key;
    let MEALS = [];
    for (key in res) {
      data = res[key]["categoryIds"][cuisine];
      if (data) {
        MEALS.push(res[key]);
      }
    }
    dispatch({ type: FETCH_CUISINE_MEAL, cuisine: cuisine, MEALS: MEALS });
  };
};

export const fetchUserMeal = () => {
  return async (dispatch,getState) => {
    console.log('in action');
    let data, key, USER_NAME,MEAL,MEALARR=[];
    const userId = getState().auth.userId;
    const firstName = getState().auth.firstName;
    const lastName = getState().auth.lastName;
    const USER_IMG = getState().auth.profilePic;
    USER_NAME = firstName + " " + lastName;
    console.log('before firebase');
    firebase
      .database()
      .ref("Meals/")
      .orderByChild("createdBy")
      .equalTo(userId)
      .on("child_added", function (dataSnapshot) {
        res = dataSnapshot.toJSON();
        key = dataSnapshot.key;
        MEAL = new Meal(
          key,
          res["cuisine"],
          res["title"],
          res["description"],
          res["image"],
          res["indgredients"],
          res["steps"],
          USER_NAME,
          USER_IMG,
          userId
        );
        MEALARR.push(MEAL);
       console.log('Hello');
      })
        console.log('after firebase');
        dispatch({ type: USER_MEAL,meals: MEALARR });
      
      
  };
};
