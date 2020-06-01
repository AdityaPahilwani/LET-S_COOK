import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from '../../RESPONSIVE'
import Color from '../../Constants/Colors'
import PopularRecipe from '../../Components/UI/popularRecipe'

const FavouriteScreen = props => {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: Color.dark }}>
            <View style={{marginTop:hp('2%')}}>
            
            </View>

        </ScrollView>
    )
}

FavouriteScreen.navigationOptions=(navigationData)=>{
    return{
       headerTransparent: 'true',
    };
}
const styles = StyleSheet.create({

});

export default FavouriteScreen;