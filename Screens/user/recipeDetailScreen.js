import React, { useEffect, useState, useRef } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, PanResponder, Animated, FlatList } from 'react-native'
import Color from '../../Constants/Colors'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../RESPONSIVE'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Card from '../../Components/UI/Card';
import { useSelector } from 'react-redux';

const RecipeDetailScreen = props => {
    const availableMeals = useSelector(state => state.meal.meals);
    const MealId = props.navigation.getParam('id');
    const selectedMeal = availableMeals.find(meal => meal.id === MealId);
    console.log(selectedMeal);
    console.log('--------');
    let STEPARR = [], ing = [];
    let key
    for (key in selectedMeal.steps) {
        STEPARR.push(selectedMeal.steps[key]['steps']);
    }
    for (key in selectedMeal.ingredients) {
        ing.push({ text: selectedMeal.ingredients[key]['indgredient'], value: selectedMeal.ingredients[key]['value'] })
    }

    const Step = props => {
        return (
            <Card style={styles.ingredients}>
                <Text style={styles.text}>{props.children}</Text>
            </Card>
        )
    };


    const INGDISPLAY = props => {
        return (
            <>
                <View style={styles.ingredientsteps}>
                    <Text style={styles.text} numberOfLines={1}>{props.name}</Text>
                    <Text style={styles.text} numberOfLines={1}>{props.value}</Text>
                </View>
                <View style={styles.center}>
                    <View style={{ ...styles.hr, backgroundColor: 'rgba(255, 255, 255 ,0.1)', width: '94%' }} />
                </View>
            </>
        )
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: Color.dark }} nestedScrollEnabled={true} >
            <View style={styles.card}>
                <View style={styles.topBar} >
                    <View style={{ ...styles.rightBar, padding: 10 }}>
                        <TouchableOpacity style={styles.roundButton} onPress={() => { }}>
                            <MaterialIcons name="favorite-border" size={32} color="#f85959" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.Image}>
                    <Image style={{ height: '100%', width: '100%' }}
                        source={{ uri: selectedMeal.imageUrl }} />
                </View>
            </View>

            <View style={styles.profileandrecipecontainer}>
                <View style={{ ...styles.innerprofileandrecipecontainer }}>

                    <View style={{ justifyContent: 'center', alignItems: 'center',height:'100%', flex: 2 }}>
                        <View style={styles.roundButton}>
                            <Image style={styles.avatarImg}
                                source={{ uri: selectedMeal.USER_IMG }}
                            />
                        </View>
                    </View>

                    <View style={{ justifyContent: 'center', width: wp('60%'), height: hp('10%'), flex: 4 }}>
                        <View style={{ ...styles.center }}>
                            <Text style={{ ...styles.recipeName, fontSize: hp('2%') }}>Chef Name</Text>
                        </View>
                        <View style={styles.center}>
                            <View style={{ ...styles.hr, backgroundColor: 'rgba(255, 255, 255 ,0.1)' }} />
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 9 }}>
                            <Text style={{ ...styles.recipeName, fontSize: hp('2%') }} numberOfLines={1}>{selectedMeal.USER_NAME}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ ...styles.innerprofileandrecipecontainer, marginTop: hp('7%') }}>
                    <View style={styles.center}>
                        <Text style={{ ...styles.recipeName, fontSize: hp('4%') }} numberOfLines={1}>{selectedMeal.title}</Text>
                    </View>
                </View>
            </View>
            <View style={{ ...styles.center, marginTop: hp('1%'), }}>
                <Card style={styles.ingredients}>
                    <Text style={{ ...styles.recipeName, fontSize: hp('4%'), marginVertical: hp('0%') }}>Description</Text>
                    <View style={{ ...styles.hr, width: '44%' }} />
                    <Text style={{ ...styles.recipeName, fontSize: hp('2%') }}>{selectedMeal.desctiption}</Text>
                </Card>
            </View>
            <Text style={{ ...styles.recipeName, marginLeft: wp('10%') }} numberOfLines={1}>Ingredients you need</Text>
            <View style={styles.center}>
                <View style={styles.hr} />
            </View>

            <View style={{ ...styles.center, marginTop: hp('2%') }}>

                <Card style={styles.ingredients}>
                    {ing.map(i => <INGDISPLAY name={i.text} value={i.value} />)}
                </Card>
            </View>


            <Text style={{ ...styles.recipeName, marginLeft: wp('10%') }} numberOfLines={1}>Steps to follow</Text>
            <View style={styles.center}>
                <View style={styles.hr} />
            </View>

            <View style={{ ...styles.center, marginTop: hp('2%') }}>
                {STEPARR.map(step =>
                    <Step key={step}>
                        {step}
                    </Step>)
                }

            </View>
        </ScrollView>


    )
}






RecipeDetailScreen.navigationOptions = (navigationData) => {
    return {
        //   headerMode: 'none',
        headerTransparent: 'true',
        headerLeft: (

            <TouchableOpacity style={{ ...styles.roundButton, marginLeft: hp('3%'), }} onPress={() => {
                navigationData.navigation.goBack();
                console.log('rtbb')
            }}>
                <AntDesign name="back" size={hp('4%')} color='#12e2a3' />
            </TouchableOpacity>

        )

    };
};






const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        //   flex: 1
    },
    profileandrecipecontainer: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        //  backgroundColor:'blue'
    },
    innerprofileandrecipecontainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: wp('48%'),
        height: hp('10%'),
        marginTop: hp('2%'),
        flexDirection: 'row',
        borderRadius: wp('5%'),
        backgroundColor: Color.lgdark
    },
    ingredients: {
        width: wp('90%'),
        //   height: hp('40%'),
        backgroundColor: Color.lgdark,
        borderRadius: wp('4%'),
        padding: 10,
        marginVertical: hp('2%')
    },
    leftAlign: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: wp('4%'),
        backgroundColor: Color.lgdark,
        height: hp('40%'),
        width: wp('100%'),
        overflow: 'hidden',
        borderBottomLeftRadius: hp('8%'),
        borderBottomRightRadius: hp('8%'),
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
        color: Color.text2,
        fontSize: hp('2%'),
        //   marginVertical: hp('1%')
    },
    hr: {
        height: 3,
        backgroundColor: Color.accent,
        //    alignSelf: 'stretch',
        width: '80%'
    },
    topBar: {

        zIndex: 3,
        position: 'absolute',
        height: '40%',
        width: '100%',
        //  borderBottomRightRadius: 100,
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftBar: {
        //    backgroundColor: 'blue',
        //    backgroundColor: 'rgba(0, 0, 0 ,0.5)',
        height: '100%',
        width: '50%',
        //  borderBottomRightRadius: 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    rightBar: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        //   backgroundColor:'blue',
        // right: 0
    },
    roundButton: {
        backgroundColor: 'rgba(0, 0, 0 ,0.5)',
        borderColor: '#E2ECFD',
        //borderWidth: 1,
        width: wp('12%'),
        height: wp('12%'),
        borderRadius: wp('12%') / 2,
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
    },
    recipeName: {
        color: Color.text2,
        fontSize: hp('4%'),
        marginVertical: hp('1%')
    },
    ingredientsteps: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: wp('3%')
    }
});

export default RecipeDetailScreen;