import { AsyncStorage } from 'react-native';

// export const SIGNUP = 'SIGNUP';
// export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
// import firebase from '../../config';
import firebase from 'firebase';
import * as Google from 'expo-google-app-auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyD682v8FH_hBEtPYAM7hHrja-5xHa1hF44",
//   authDomain: "recipe-292c7.firebaseapp.com",
//   databaseURL: "https://recipe-292c7.firebaseio.com",
//   projectId: "recipe-292c7",
//   storageBucket: "recipe-292c7.appspot.com",
//   messagingSenderId: "802451063029",
//   appId: "1:802451063029:web:51cbae1c36b2c9cf31c5bc",
//   measurementId: "G-YTRVFJJSCV"
// };
// FIREBASE.initializeApp(firebaseConfig);


export const authenticate = (userId, token) => {
  return dispatch => {
    dispatch({ type: AUTHENTICATE, userId: userId });
  };
};



export const setLogin = () => {

  return async dispatch => {
    var user = await firebase.auth().currentUser;
    // console.log(user)
    var id, token;
    console.log('fucck youuuu');
    id = user.uid;
    //   token=user.email;
    console.log(id + 'id');
    // console.log(token+'token');

    saveDataToStorage(id);
    dispatch({ type: AUTHENTICATE, userId: id });

  };
}






export const signup = (email, password) => {
  return async dispatch => {
    //  console.log('lodu');
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      var user = firebase.auth().currentUser;
      firebase
        .database()
        .ref('/users/' + user.uid)
        .set({
          gmail: user.email,
          profile_picture: result.additionalUserInfo.profile.picture,
          firstName: 'DUDE',
          lirstName: '',
          created_at: Date.now()
        }).then(() => { console.log('success') });
      saveDataToStorage(user.uid);
      dispatch(authenticate(user.uid));
    }
    catch (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      let message;
      if (errorCode == 'auth/weak-password') {
        message = 'The password is too weak.';
      }
      else if (errorCode === 'auth/email-already-in-use') {
        message = 'The email already exists';
      }
      else {

        message = errorMessage;
      }
      throw new Error(message);
    };
  };
};

export const login = (email, password) => {
  return async dispatch => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      var user = firebase.auth().currentUser;
      await firebase
        .database()
        .ref('/users/' + user.uid)
        .update({
          last_logged_in: Date.now()
        });
      saveDataToStorage(user.uid);
      dispatch(authenticate(user.uid));
    }
    catch (error) {
      console.log('heuyuuu');
      var errorCode = error.code;
      var errorMessage = error.message;
      let message;
      if (errorCode === 'auth/wrong-password') {
        message = 'Wrong password.'
      }
      else if (errorCode === 'auth/user-not-found') {
        message = 'User not found.'
      }
      else {
        message = errorMessage;
      }
      console.log(message);
      throw new Error(message);
    };
  }
};

const saveDataToStorage = async (userId) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      userId: userId
    })
  );
};

export const logout = () => {
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};




























const isUserEqual = (googleUser, firebaseUser) => {
 // console.log('fuck')
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (
        providerData[i].providerId ===
        firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
        providerData[i].uid === googleUser.getBasicProfile().getId()
      ) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
};


export const onSignIn = googleUser => {
  return async dispatch => {
    // console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
   // console.log('h');
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function (firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
        //  console.log(googleUser.idToken,
       //     googleUser.accessToken);
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );

     //     console.log('v');
          firebase
            .auth()
            .signInAndRetrieveDataWithCredential(credential)
            .then(function (result) {
              console.log('user signed in ');
              saveDataToStorage(result.user.uid)

              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    firstName: result.additionalUserInfo.profile.given_name,
                    lastName: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now()
                  })
                  .then(function (snapshot) {
                    // console.log('Snapshot', snapshot);
                  });
              } else {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .update({
                    last_logged_in: Date.now()
                  });
              }
              saveDataToStorage(result.user.uid)
              dispatch(authenticate(result.user.uid));
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              if (errorMessage === 'auth/account-exists-with-different-credential') {
                throw new Error('Already used')
              }
              var credential = error.credential;
              console.log(error);
            });
        } else {
          console.log('User already signed-in Firebase.');
        }
    //    console.log('k')
      }
    );
  }
};



export const signInWithGoogleAsync = () => {
 // console.log('fmfkm')
  return async dispatch => {
    try {
   //   console.log('fmfkm')
      const result = await Google.logInAsync({

        androidClientId: '802451063029-vo3qj1e5ba66stobdtdaspje8rmljoaa.apps.googleusercontent.com',
        behavior: 'web',
        iosClientId: '802451063029-ml8ug5nt16ea7oeja8ckpmfckf09qcpq.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      });

      //const result = await Google.signInAsync();
      if (result.type === 'success') {
        dispatch(onSignIn(result));
        //   return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
 //     console.log(e);
      return { error: true };

    }
  }
};