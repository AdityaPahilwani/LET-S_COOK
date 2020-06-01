export const CREATE_MEAL = "CREATE_MEAL";
export const FETCH_MEAL = "FETCH_MEAL";
export const FETCH_CUISINE_MEAL = "FETCH_CUISINE_MEAL";
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
    const { userId } = transformedData;
    let id1 = userId + title + Math.random();
    const response = await fetch(imageUri);
    const blob = await response.blob();
    var ref = firebase.storage().ref(`${userId}`).child(id1);
    const picurl = await ref.put(blob);
    var url = await ref.getDownloadURL();

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
        // MEAL = new Meal(
        //     key,
        //     cuisine,
        //     title,
        //     description,
        //     url,
        //     indgredients,
        //     steps,
        //     USER_NAME,
        //     USER_IMG,
        //     userId
        //   );
      });
  };
};


export const fetchMeal = () => {
  return async (dispatch) => {
    //    console.log('Fetched');
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
        //    console.log(key, userId)
        //  console.log(userId)

        usersRef = (userId) => {
          return new Promise((resolve, reject) => {
            firebase
              .database()
              .ref("/users/" + userId)
              .on("value", function (dataSnapshot) {
                let USER_RES = dataSnapshot.toJSON();
                resolve(USER_RES);
              });
          });
        };
        PromiseArr.push(usersRef(userId));
      }

      Promise.all(PromiseArr).then((values) => {
        var userId;
        for (key in res) {
          userId = ARR[num];
          USER_NAME = values[num]["name"];
          USER_IMG = values[num]["profile_picture"];
          console.log("Inn with finding user " + res[key]["title"]);
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
    //   console.log('Dispatching');
    dispatch({ type: FETCH_MEAL, meals: MEALARR });
  };
};

export const fetchCuisine = (MEAL, cuisine) => {
  return async (dispatch) => {
    console.log(cuisine + "11111");
    let res = MEAL;
    let data, key;
    let MEALS = [];
    //   console.log(res);
    for (key in res) {
      data = res[key]["categoryIds"][cuisine];

      // console.log('abccccccccc');
      if (data) {
        MEALS.push(res[key]);
      }
    }
    //   console.log(MEALS + 'abccc');
    dispatch({ type: FETCH_CUISINE_MEAL, cuisine: cuisine, MEALS: MEALS });
  };
};
