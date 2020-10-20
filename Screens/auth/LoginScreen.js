import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../RESPONSIVE";

import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import * as authActions from "../../store/actions/auth";
import Color from "../../Constants/Colors";
import Input from "../../Components/UI/Input";
import { Value } from "react-native-reanimated";
import firebase from 'firebase';

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  switch (action.type) {
    case FORM_INPUT_UPDATE: {
      //  console.log(state.input);
      const updatedInputValue = {
        ...state.input,
        [action.input]: action.value,
      };
      const updatedFormValidities = {
        ...state.validities,
        [action.input]: action.isValid,
      };
      let formisvalid = true;
      for (const key in updatedFormValidities) {
        formisvalid = formisvalid && updatedFormValidities[key];
      }

      return {
        input: updatedInputValue,
        validities: updatedFormValidities,
        formIsValid: formisvalid,
      };
    }
    default:
      return state;
  }
};

const LoginScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);

  const [formState, dispatch] = useReducer(formReducer, {
    input: {
      email: "",
      pass: "",
      confirmpass: "",
    },
    validities: {
      email: false,
      pass: false,
      conpass: false,
    },
    formIsValid: false,
  });

  const inputChangeHandler = useCallback(
    (id, value, isValid) => {
      dispatch({
        type: FORM_INPUT_UPDATE,
        input: id,
        value: value,
        isValid: isValid,
      });
    },
    [dispatch]
  );

  const Signupview = () => {
    if (!isSignup) {
      return (
        <View style={styles.signup}>
          <Text style={styles.signUpText}>
            Don't have an account?
            <TouchableWithoutFeedback
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.linear
                );
                setIsSignup(!isSignup);
              }}
            >
              <Text style={{ color: Color.accent }}> Sign Up</Text>
            </TouchableWithoutFeedback>
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.signup}>
        <Text style={styles.signUpText}>
          Switch to
          <TouchableWithoutFeedback
            onPress={() => {
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              setIsSignup(!isSignup);
            }}
          >
            <Text style={{ color: Color.accent }}> Sign In</Text>
          </TouchableWithoutFeedback>
        </Text>
      </View>
    );
  };

  const dispatchAction = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if (isSignup) {
      if (formState.formIsValid === true) {
        if (formState.input.pass === formState.input.conpass) {
          action = authActions.signup(
            formState.input.email,
            formState.input.pass
          );
          console.log("innn");
        } else {
          setError("Make sure both passwords are same");
        }
      } else {
        setError("Check your inputs");
      }
    } else {
      if (
        formState.validities.email === true &&
        formState.validities.pass === true
      ) {
        action = authActions.login(formState.input.email, formState.input.pass);
      } else {
        console.log(formState.formIsValid);
        setError("Check your inputs");
      }
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatchAction(action);
      props.navigation.navigate("Dashboard");
      setIsLoading(false);
    } catch (err) {
      console.log("Fuck you");
      setError(err.message);
      setIsLoading(false);
    }
  };

  const googlehandler = async () => {
    try {
      setIsLoading(true);
      try {
        await dispatchAction(authActions.signInWithGoogleAsync());
     //   props.navigation.navigate("Dashboard");
        firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
       //       props.navigation.navigate('Login');
          }
          else {
              props.navigation.navigate('Dashboard');
          }
      });
      } catch(err) {
        console.log(err);
      }

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        <View style={styles.bgImg}>
          <Image
            style={{ height: "100%", width: "100%" }}
            source={require("../../Images/home.jpeg")}
          />
        </View>

        <View style={styles.login}>
          <Input
            id="email"
            // label="E-Mail"
            placeholder="E-MAIL"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorText="Please enter a valid email address."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            id="pass"
            // label="Password"
            placeholder="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={6}
            autoCapitalize="none"
            errorText="Please enter a valid password."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          {isSignup && (
            <Input
              id="conpass"
              //label="Password"
              placeholder="Confirm Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={6}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
          )}

          {isLoading ? (
            <ActivityIndicator size="small" color={Color.primary} />
          ) : (
            <>
              <TouchableOpacity style={styles.button} onPress={authHandler}>
                <Text style={{ color: Color.dark }}>
                  {isSignup ? "Sign up" : "Sign in"}{" "}
                </Text>
              </TouchableOpacity>

              <Text style={styles.text}>
                or Sign in with facebook or google
              </Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.roundButton}
                  onPress={() => {
                    console.log(
                      formState.input.email +
                        "   " +
                        formState.input.pass +
                        " jj"
                    );
                  }}
                >
                  <FontAwesome
                    name="facebook"
                    size={wp("7%")}
                    color={Color.primary}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.roundButton}
                  onPress={googlehandler}
                >
                  <AntDesign
                    name="google"
                    size={wp("7%")}
                    color={Color.primary}
                  />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        <Signupview />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.dark,
    // justifyContent: 'flex-end'
  },
  screen: {
    flex: 1,
  },
  bgImg: {
    height: hp("40%"),
    width: wp("100%"),

    overflow: "hidden",
    backgroundColor: Color.primary,
    justifyContent: "center",
  },
  Title: {
    fontSize: hp("5%"),
    // fontFamily:'bold',
    marginLeft: wp("10%"),
    color: "#000000",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  scroll: {
    backgroundColor: "blue",
    width: "100%",
    height: "100%",
  },
  login: {
    //   backgroundColor:'black',
    width: "100%",
    height: hp("60%"),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.dark,
    borderTopLeftRadius: wp("8%"),
    borderTopRightRadius: wp("8%"),
    marginTop: -hp("10%"),

    //flex: 1,
    // justifyContent: "flex-end",
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderColor: Color.accent,
    //   borderRadius: 20,
    borderBottomWidth: 1,
    width: wp("70%"),
    height: hp("8%"),
    fontSize: hp("3%"),
    padding: 5,
    marginBottom: hp("2%"),
    color: Color.text2,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: wp("100%"),
  },
  roundButton: {
    // backgroundColor:Color.primary,
    // backgroundColor: '#fafaf6',
    // borderColor: '#E2ECFD',
    backgroundColor: "rgba(255,255,255,0.1)",
    borderWidth: 1,
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
    marginTop: hp("1%"),
  },
  text: {
    color: Color.text2,
    fontSize: hp("2%"),
    //   marginVertical: hp('1%')
  },
  button: {
    backgroundColor: Color.primary,
    justifyContent: "center",
    alignItems: "center",
    height: hp("5%"),
    width: wp("70%"),
    borderRadius: wp("3%"),
    marginBottom: hp("1%"),
  },
  buttonText: {
    fontSize: hp("3%"),
  },
  signup: {
    // marginBottom: hp('2%'),
    //    backgroundColor:'blue',
    width: wp("100%"),
    // height: hp('10%'),
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: hp("5%"),
    padding: 10,
    backgroundColor: Color.dark,
  },
  signUpText: {
    fontSize: hp("2%"),
    color: Color.text2,
    // marginBottom: 30
  },
});

export default LoginScreen;
