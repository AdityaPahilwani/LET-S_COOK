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
  Modal,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../RESPONSIVE";
import CuisineButton from "../../Components/UI/cuisineButton";

import ActionSheet from "../../Components/UI/ActionSheetData";
import ImageSheet from "../../Components/UI/ActionSheetImage";

import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import Color from "../../Constants/Colors";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Card from "../../Components/UI/Card";
import * as mealActions from "../../store/actions/meal-action";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AddRecipeScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [indgredientModal, setIndgredientModal] = useState(false);
  const [stepModal, setStepModal] = useState(false);
  const [pickedImage, setPickedImage] = useState("");
  const [preview, setPreview] = useState(false);
  const formDispatch = useDispatch();
  const [error, setError] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [indgredient, setIndgredient] = useState("");
  const [value, setValue] = useState("");
  const [stepValue, setstepValue] = useState("");

  const [indian, setIndian] = useState(false);
  const [italian, setItalian] = useState(false);
  const [mexican, setMexican] = useState(false);
  const [desert, setDesert] = useState(false);

  const [indgredientsArray, setindgredientsArray] = useState([]);
  const [steps, setsteps] = useState([]);

  let load=false;
  useEffect(() => {
    //manageState
    return () => {
      console.log("bye");
    };
  }, []);

  useEffect(() => {
    if (error) {
      Alert.alert("Error!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const indgredientHandler = () => {
    console.log(indgredient, value);
    if (indgredient && value) {
      const id1 = Math.random();
      const newIndgredient = {
        id: id1,
        indgredient: indgredient,
        value: value,
      };
      setindgredientsArray((prevState) => [...prevState, newIndgredient]);
      setIndgredient("");
      setValue("");
    } else {
      console.log(indgredient, value);
      setError("Please add some indgredient and its respective value");
    }
  };
  const stepsHandler = () => {
    if (stepValue) {
      const id1 = Math.random();
      const newSteps = {
        id: id1,
        steps: stepValue,
      };
      setsteps((prevState) => [...prevState, newSteps]);
      setstepValue("");
    } else {
      setError("Please add some step first");
    }
  };

  const SAVEHANDLER = async () => {
    
    if (
      pickedImage &&
      title &&
      description &&
      indgredientsArray &&
      steps &&
      (indian || italian || mexican || desert)
    ) {
      const cuisine = {
        Indian: indian,
        Italian: italian,
        Mexican: mexican,
        Desert: mexican,
      };
      

      props.navigation.navigate("Dashboard");
      await formDispatch(
        mealActions.createMeal(
          pickedImage,
          title,
          description,
          indgredientsArray,
          steps,
          cuisine
        )
      );
      
      Alert.alert("Congrats", "Your recipe is added", [{ text: "Okay" }]);
      
    } else {
      setError("Please Fill all Details");
    }
    clearData();
  };

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
    );
    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions",
        "You need to grant camera permission",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };
  let type;
  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    let image;
    if (type === "camera") {
      image = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.1,
      });
    } else if (type === "gallery") {
      image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.1,
      });
    }
    setPickedImage(image.uri);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Color.primary} />
      </View>
    );
  }

  useEffect(() => {
    const willFocus = props.navigation.addListener("willFocus", clearData);

    return () => {
      willFocus.remove();
    };
  }, [clearData]);

  const clearData = () => {
    setTitle("");
    setDescription("");
    setstepValue("");
    setIndgredient("");
    setValue("");
    setindgredientsArray([]);
    setsteps([]);
    setPickedImage("");
    setIndian(false);
    setItalian(false);
    setMexican(false);
    setDesert(false);
    setError("");
    setIndgredientModal(false);
    setStepModal(false);
    setModalVisible(false);
    setIsLoading(false);
  };

  const actionClick = () => {
    setModalVisible(!modalVisible);
    setIndgredientModal(false);
    setStepModal(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: Color.dark }}
    >
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        {indgredientModal && (
          <ActionSheet
            onClick={actionClick}
            name="Indgredients"
            data={indgredientsArray}
            lines={1}
            type="ing"
          />
        )}
        {stepModal && (
          <ActionSheet
            onClick={actionClick}
            name="Steps"
            data={steps}
            lines={2}
            type="steps"
          />
        )}
      </Modal>
      <Modal animationType="fade" transparent={true} visible={preview}>
          <ImageSheet img={pickedImage} />
      </Modal>

      <View style={styles.center}>
        <Text style={{ ...styles.text, marginVertical: hp("1%") }}>
          Add your recipe
        </Text>
        <View style={styles.hr} />

        <Card style={{ ...styles.CardLayout, height: hp("68%") }}>
          <TouchableOpacity
            style={{ ...styles.imagePicker }}
            onLongPress={() => {
              if (pickedImage) {
                setPreview(true);
              }
            }}
            onPressOut={() => {
              setPreview(false);
            }}
          >
            {pickedImage ? (
              <Image style={styles.image} source={{ uri: pickedImage }} />
            ) : (
              <>
                <AntDesign name="camera" size={hp("4%")} color={Color.accent} />
                <Text style={{ ...styles.text, fontSize: hp("3%") }}>
                  Please select an image
                </Text>
              </>
            )}
          </TouchableOpacity>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.customButtom}
              onPress={() => {
                type = "camera";
                takeImageHandler();
              }}
            >
              <Text style={styles.buttonText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.customButtom}
              onPress={() => {
                type = "gallery";
                takeImageHandler();
              }}
            >
              <Text style={styles.buttonText}>Gallery</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder="Recipe Name"
            autoCapitalize="none"
            value={title}
            onChangeText={(text) => {
              setTitle(text);
            }}
            style={[styles.input]}
          />

          <TextInput
            placeholder="Description"
            multiline={true}
            value={description}
            autoCapitalize="none"
            onChangeText={(text) => {
              setDescription(text);
            }}
            style={[styles.input, styles.bigInput]}
          />
        </Card>
        <Card style={styles.CardLayout}>
          <TextInput
            placeholder="Indgredient"
            value={indgredient}
            autoCapitalize="none"
            onChangeText={(text) => {
              setIndgredient(text);
            }}
            style={[styles.input]}
          />
          <TextInput
            placeholder="Value"
            value={value}
            autoCapitalize="none"
            onChangeText={(text) => {
              setValue(text);
            }}
            style={[styles.input]}
          />

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.customButtom}
              onPress={() => {
                setModalVisible(!modalVisible);
                setIndgredientModal(true);
              }}
            >
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.customButtom}
              onPress={indgredientHandler}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="Steps"
            value={stepValue}
            autoCapitalize="none"
            onChangeText={(text) => {
              setstepValue(text);
            }}
            multiline
            style={[styles.input, styles.bigInput]}
          />
          <View style={{ ...styles.row }}>
            <TouchableOpacity
              style={styles.customButtom}
              onPress={() => {
                setModalVisible(!modalVisible);
                setStepModal(true);
              }}
            >
              <Text style={styles.buttonText}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.customButtom}
              onPress={stepsHandler}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </Card>
        <Card style={{ ...styles.CardLayout, height: hp("27%") }}>
          <View style={{ marginLeft: wp("4%"), marginTop: hp("2%") }}>
            <Text style={{ color: Color.text, fontSize: hp("3%") }}>
              Select cuisuine
            </Text>
            <View style={{ ...styles.row, marginTop: hp("2%") }}>
              <CuisineButton
                name="Indian"
                value={indian}
                handler={() => {
                  setIndian(!indian);
                }}
              />
              <CuisineButton
                name="Italian"
                value={italian}
                handler={() => {
                  setItalian(!italian);
                }}
              />
            </View>
            <View style={{ ...styles.row, marginVertical: hp("2%") }}>
              <CuisineButton
                name="Mexican"
                value={mexican}
                handler={() => {
                  setMexican(!mexican);
                }}
              />
              <CuisineButton
                name="desert"
                value={desert}
                handler={() => {
                  setDesert(!desert);
                }}
              />
            </View>
          </View>
        </Card>
        <View
          style={{ ...styles.center, width: "100%", paddingBottom: hp("4%") }}
        >
          <TouchableOpacity style={styles.handlerButtons} onPress={SAVEHANDLER}>
            <Text style={{ color: Color.primary, fontSize: hp("3%") }}>
              Save Recipe
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.handlerButtons} onPress={clearData}>
            <Text style={{ color: Color.primary, fontSize: hp("3%") }}>
              Clear
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
  },
  centered: {
    flex: 1,
    backgroundColor: Color.dark,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Color.text,
    fontSize: hp("4%"),
  },
  hr: {
    height: 3,
    backgroundColor: Color.accent,
    marginTop: "2%",
    width: "70%",
  },

  card: {
    width: wp("90%"),
    height: hp("135%"),
    backgroundColor: Color.lgdark,
    borderRadius: wp("4%"),
    marginVertical: hp("3%"),
    overflow: "hidden",
  },
  imagePicker: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
    borderWidth: 1,
    borderBottomColor: Color.text2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: "5%",
  },
  customButtom: {
    height: hp("6%"),
    width: "40%",
    backgroundColor: Color.dark,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp("4%"),
  },
  buttonText: {
    color: Color.primary,
    fontSize: hp("3%"),
    marginVertical: hp("1%"),
  },
  image: {
    width: "100%",
    height: "100%",
  },
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
  },
  CardLayout: {
    width: wp("90%"),
    height: hp("60%"),
    backgroundColor: Color.lgdark,
    borderRadius: wp("4%"),
    marginVertical: hp("2%"),
    overflow: "hidden",
  },
  ingredientsteps: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: wp("3%"),
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderColor: Color.accent,
    borderBottomWidth: 1,
    width: "90%",
    height: "10%",
    fontSize: hp("3%"),
    marginTop: hp("2%"),
    color: Color.text2,
    marginHorizontal: wp("4%"),
    // backgroundColor:'#5c5757',
    // borderRadius:wp('2%')
  },
  bigInput: {
    height: "29%",
    borderRadius: wp("2%"),
    borderWidth: 1,
    marginVertical: "4%",
  },
  handlerButtons: {
    height: hp("7%"),
    width: "90%",
    backgroundColor: Color.lgdark,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp("4%"),
    marginVertical: hp("1%"),
  },
});

export default AddRecipeScreen;
