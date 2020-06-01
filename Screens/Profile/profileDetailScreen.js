import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

const ProfileDetailScreen = props =>{
    return(
        <View>
            <Text>mdbmg</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    
});

ProfileDetailScreen.navigationOptions=(navigationData)=>{
    return{
       headerTransparent: 'true',
    };
}

export default ProfileDetailScreen;