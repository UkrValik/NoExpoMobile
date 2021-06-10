import React from 'react';
import { ActivityIndicator, Dimensions, Text, View, Image, StatusBar, Platform } from 'react-native';
import colors from '../../styles/colors.json';

export const Loading = () => {

    const gbTextWidth = Dimensions.get('screen').width * 70 / 100;
    const gbTextHeight = 40;
    const badgeWidth = Dimensions.get('screen').width / 3 * 1.2;
    const badgeHeight = Dimensions.get('screen').width / 3 * 1.2;

    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor(colors.mainColor+'ee');

    return(
        <View
            style={{
                flex: 1,
                backgroundColor: colors.mainColor,
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            }}>
            <View
                style={{
                    flex: 1,
                }}>
            </View>
            <View
                style={{
                    alignSelf: 'center',
                    flex: 1.7,
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        fontSize: 40,
                        color: '#FFF',
                        marginBottom: '3%',
                        // fontWeight: '600',
                        fontFamily: 'Commissioner-SemiBold'
                    }}>
                    Challenges
                </Text>
                <Image
                    source={require('../../assets/badge.png')}
                    style={{
                        width: badgeWidth,
                        height: badgeHeight,
                        tintColor: colors.mainBgColor,
                    }}
                    />
                {/* <ActivityIndicator size='large' color='#FFF'/> */}
            </View>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignSelf: 'center',
                    marginBottom: '5%',
                }}>
                <Image
                    source={require('../../assets/gb-text.png')}
                    style={{
                        width: gbTextWidth,
                        height: gbTextHeight,
                        tintColor: colors.dark,
                    }}
                    />
            </View>
        </View>
    );
}

export default Loading;
