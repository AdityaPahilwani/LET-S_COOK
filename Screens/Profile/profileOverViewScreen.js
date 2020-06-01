import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, AsyncStorage,Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../RESPONSIVE'
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux'
import * as authActions from '../../store/actions/auth'
import firebase from 'firebase';

const ProfileOverViewScreen = props => {
    const dispatch = useDispatch();
    const logout = useCallback(() => {

        firebase.auth().signOut();

        Alert.alert('Logout', 'Are you sure?', [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            {
                text: "OK", onPress: () => {
                    dispatch(authActions.logout());
                    props.navigation.navigate('Login');
                }
            }
        ],
            { cancelable: true });
    }, [dispatch]
    );
    return (
        <ScrollView>
            <View style={styles.topBar} >
                <View style={{ ...styles.rightBar, padding: 10 }}>
                    <TouchableOpacity style={styles.roundButton} onPress={logout} >
                        <AntDesign name="logout" size={28} color="#f85959" />
                    </TouchableOpacity>
                </View>
            </View>
            <LinearGradient colors={['#141e30', '#243b55']} style={styles.gradient}>


                <View style={styles.profilePic}>
                    <Image style={{ height: '100%', width: '100%' }}
                        source={require('../../Images/avatar.jpg')}
                    />
                </View>

            </LinearGradient>



        </ScrollView>
    )
};


const styles = StyleSheet.create({
    gradient: {
        //  flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('40%'),
        width: wp('100%'),
        overflow: 'hidden',
        borderBottomLeftRadius: wp('8%'),
        borderBottomRightRadius: wp('8%'),
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
        height: hp('7%'),
        borderRadius: wp('100%') / 2,
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


    profilePic: {
        backgroundColor: 'rgba(0, 0, 0 ,0.5)',
        borderColor: '#E2ECFD',
        //borderWidth: 1,
        width: wp('28%'),
        height: hp('15%'),
        borderRadius: wp('100%') / 2,
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




ProfileOverViewScreen.navigationOptions = (navigationData) => {
    return {
        //   headerMode: 'none',
        headerTransparent: 'true',
        //   headerTitle:'jiojoijio',
        headerLeft: (

            <TouchableOpacity style={{ ...styles.roundButton, marginLeft: hp('3%'), }} onPress={() => {
                navigationData.navigation.goBack();
                // console.log('rtbb')
            }}>
                <AntDesign name="back" size={32} color='#12e2a3' />
            </TouchableOpacity>

        )

    };
};

export default ProfileOverViewScreen;