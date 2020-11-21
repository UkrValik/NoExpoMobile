import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import colors from '../../styles/colors.json';

const ChallengeHeader = (props) => {
    return (
        <View>
            <ImageBackground style={{justifyContent: 'center', alignItems: 'center', height: Dimensions.get('screen').height / 5}} resizeMode='cover' source={{uri: 'https://i.dailymail.co.uk/i/pix/2015/07/20/10/00D426931000044C-3167957-image-m-3_1437383016987.jpg'}}>
                <Text style={{color: colors.mainColor, fontWeight: 'bold', fontSize: 30}}>
                    Morning glass of water
                </Text>
                <Text style={{color: colors.mainColor, fontWeight: '500', fontSize: 16}}>
                    Some plain text
                </Text>
            </ImageBackground>
            <Text style={{color: colors.mainColor, fontSize: 14, marginHorizontal: '5%', marginVertical: '2%'}}>
                Some more plain text, it's description
            </Text>
        </View>
    );
}

export default ChallengeHeader;
