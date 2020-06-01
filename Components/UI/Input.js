import React, { useReducer, useEffect,useCallback } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Color from '../../Constants/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../RESPONSIVE'
const INPUT_CHANGE = 'INPUT_CHANGE';

const inputReducer=(state,action)=>{
  switch(action.type)
  {
    case INPUT_CHANGE:{
     // console.log(action.value+'   '  );
      return {
        value:action.value,
        isValid:action.isValid
      }
    }
    default: return state;
  }
}

const Input = props => {

  const [inputState,dispatch]=useReducer(inputReducer,{
    value:props.value?props.value:'',
    isValid:true
  })

  const {onInputChange,id}=props;

  useEffect(()=>{
    onInputChange(id,inputState.value,inputState.isValid);
  },[inputState.value]);

  const textChangeHandler = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };


  return (
    <View style={styles.formControl}>
      {props.label ? <Text style={styles.label}>{props.label}</Text> :null}
      <TextInput
        {...props}
        style={[styles.input,props.style]}
        value={inputState.value}
        
        placeholderTextColor={Color.text2}
        onChangeText={textChangeHandler}
        placeholder={props.placeholder}
      />
      {!inputState.isValid  && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
   // width: '100%'
  },
  label: {
   // fontFamily: 'open-sans-bold',
    marginVertical: hp('1%')
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderColor: Color.accent,
 //   borderRadius: 20,
    borderBottomWidth: 1,
    width: wp('70%'),
    height: hp('8%'),
    fontSize: hp('3%'),
    padding: 5,
    marginBottom: hp('2%'),
    color:Color.text2
  },
  errorContainer: {
    marginVertical: hp('0.5%'),
    marginLeft:wp('4%')
  },
  errorText: {
    //fontFamily: 'open-sans',
    color: '#e2434b',
    fontSize: hp('1.5%')
  }
});

export default Input;
