import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, PanResponder, Animated, FlatList ,Modal,Alert} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../RESPONSIVE'
import Color from '../../Constants/Colors'


const PopularRecipe = props => {
    return (
        <View style={styles.center}>

            <TouchableOpacity style={styles.card} onPress={props.onClick} onLongPress={() => {  }} onPressOut={() => { }}>


                <View style={styles.topBar} >
                    <TouchableOpacity style={styles.leftBar}>
                        <View style={styles.roundButton}>
                            <Image style={styles.avatarImg}
                                source={{ uri: props.avatarUri }} />
                        </View>
                        <Text style={{ ...styles.text, marginLeft: wp('3%'), width: '60%' }} numberOfLines={1}>
                            {props.name}
                        </Text>
                    </TouchableOpacity>
                    <View style={{ ...styles.rightBar, padding: 10 }}>
                        <TouchableOpacity style={styles.roundButton} onPress={() => { }}>
                            <MaterialIcons name="favorite-border" size={hp('3%')} color="#f85959" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.Image}>
                    <Image style={{ height: '100%', width: '100%' }}
                        source={{ uri: props.imageUri }} />
                </View>

                <View style={styles.actions}>
                    <Text style={{ ...styles.text, marginLeft: wp('3%') }} numberOfLines={1}>{props.recipeName}</Text>
                </View>


            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: hp('2%'),

    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '15%',
        alignItems: 'center',
        zIndex: 4,
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0 ,0.5)',
        bottom: 0
        //  backgroundColor: 'blue',

    },
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: wp('4%'),
        backgroundColor: Color.lgdark,
        height: hp('30%'),
        width: wp('90%'),
        overflow: 'hidden',
        borderWidth: 2,

        //   borderColor:Color.primary
    },
    avatarImg: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain'
    },
    Image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
        overflow: 'hidden',
        zIndex: 2,
        //  position:'absolute',
        //    bottom:'15%'
        //    position:'absolute'
    },
    round: {
        // backgroundColor:Color.primary,
        borderColor: '#E2ECFD',
        borderWidth: 1,
        width: '20%',
        height: '100%',
        borderRadius: 20,
        shadowColor: '#FBFFFF',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        marginLeft: '3%',
        overflow: 'hidden',
        backgroundColor: Color.lgdark,
    },
    text: {
        color: Color.text,
        fontSize: hp('3.3%'),
        marginVertical: hp('1%')
    },
    hr: {
        height: hp('1%'),
        backgroundColor: 'rgba(255, 255, 255 ,0.1)',
        alignSelf: 'stretch'
    },
    topBar: {

        zIndex: 3,
        position: 'absolute',
        height: '20%',
        width: '100%',
        //  borderBottomRightRadius: 100,
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftBar: {
        //        backgroundColor: 'blue',
        backgroundColor: 'rgba(0, 0, 0 ,0.5)',
        height: '100%',
        width: '70%',
        borderBottomRightRadius: 100,
        flexDirection: 'row',
        alignItems: 'center'
    },
    rightBar: {
        height: '100%',
        width: '30%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        right: 0
    },
    roundButton: {
        backgroundColor: 'rgba(0, 0, 0 ,0.5)',
        borderColor: '#E2ECFD',
        //borderWidth: 1,
        width: wp('9%'),
        height: wp('9%'),
        borderRadius: wp('9%') / 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#FBFFFF',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        // marginTop: hp('1%'),
        marginLeft: '3%',
        overflow: 'hidden',
    }
});

export default PopularRecipe;


