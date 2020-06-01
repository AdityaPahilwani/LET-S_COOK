import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, PanResponder, Animated, FlatList } from 'react-native'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../RESPONSIVE'
import Color from '../../Constants/Colors'


const viewAll = props => {
    return (
        <View>
            <TouchableOpacity style={styles.card} onPress={props.onPress}>
                <Image
                    style={styles.Image}
                    source={require('../../Images/home.jpeg')}
                />
                <View style={styles.Icon}>
                    <View style={{  position: 'absolute' }}>
                        <AntDesign name="rightcircleo" size={hp('6%')} color="#f85959" />
                    </View>
                </View>
                <Text style={{ ...styles.text, marginTop: -hp('3%') }} numberOfLines={1}>View all</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        //   elevation: 3,
        height: hp('25%'),
        width: wp('70%'),
        //   backgroundColor: Color.lgdark,
        borderRadius: hp('5%'),
        overflow: 'hidden',
        marginLeft: wp('7%'),
        //  marginRight:wp('2%'),
        marginTop: hp('1%'),
        // justifyContent: 'center',
        //  alignItems: 'center'
    },
    Icon:{
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        height: hp('25%'),
        width: wp('70%'),
       
        borderRadius: hp('5%'),
        overflow: 'hidden',
        justifyContent: 'center',
         alignItems: 'center',
         position:'absolute'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    Image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        overflow: 'hidden',
        opacity: 0.4
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

export default viewAll;


