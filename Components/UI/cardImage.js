import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import Color from '../../Constants/Colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../RESPONSIVE'
const cardImage = props => {
    return (
        <View >
            <TouchableOpacity style={styles.card} onPress={props.onPress}>
                <Image
                    style={styles.Image}
                    source={props.imageUri}
                />
                <Text style={{ ...styles.text, marginTop: -hp('3%') }} numberOfLines={1}>{props.category}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        //   elevation: 3,
        height: hp('25%'),
        width: wp('70%'),
        //     backgroundColor: Color.dark,
        borderRadius: hp('5%'),
        overflow: 'hidden',
        marginLeft: wp('7%'),
        //  marginRight:wp('2%'),
      //  marginTop: hp('1%'),
    },
    Image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        overflow: 'hidden'
    },
    text: {
        color: Color.text,
        top: -hp('3%'),
        left: 0,
        fontSize: hp('4%'),
        marginLeft: wp('7%'),
        //  position:'absolute'
    }
});

export default cardImage;
