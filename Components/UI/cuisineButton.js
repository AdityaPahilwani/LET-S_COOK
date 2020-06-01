import React from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../RESPONSIVE'
import Color from '../../Constants/Colors';


const CuisineButton = props => {
    //  console.log(props);
    const { handler, name,value } = props;



    const toggle = () => {
        handler();
    }
    return (
        <TouchableOpacity style={{ ...styles.customButtom, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }} onPress={toggle}>
            {value ?
                (
                    <View style={{ borderWidth: 1, width: '10%', height: '35%', borderColor: Color.accent, marginRight: '10%', backgroundColor: Color.accent }} />


                )
                :
                (
                    <View style={{ borderWidth: 1, width: '10%', height: '35%', borderColor: Color.accent, marginRight: '10%', backgroundColor: Color.lgdark }} />


                )
            }
            <Text style={styles.buttonText}>{props.name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonText: {
        color: Color.text,
        fontSize: hp('3%'),
        marginVertical: hp('1%')
    },
    customButtom: {
        height: hp('6%'),
        width: '40%',
        //  backgroundColor: Color.dark,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp('4%')
    }
});

export default CuisineButton;