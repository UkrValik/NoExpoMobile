import React from 'react';
import { ActivityIndicator, Dimensions, Text, View, Image, StatusBar, Platform } from 'react-native';
import colors from '../../styles/colors.json';

export const Loading = (props) => {

    const screenWidth = Dimensions.get('screen').width;
    const screenHeight = Dimensions.get('screen').height;

    const [orientation, setOrientation] = React.useState(screenWidth < screenHeight ? 'PORTRAIT' : 'LANDSCAPE');

    const gbTextWidth = screenWidth * 70 / 100;
    const gbTextHeight = 40;
    const badgeWidth = screenWidth / 3 * 1.2;
    const badgeHeight = screenWidth / 3 * 1.2;

    React.useEffect(() => {
        Dimensions.addEventListener('change', ({window: {width, height}}) => {
            if (width < height) {
                setOrientation('PORTRAIT');
            } else {
                setOrientation('LANDSCAPE');
            }
        });
    });

    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor(colors.mainColor+'ee');

    return(
        <View
            onLayout={(props) => {
                if (Platform.OS === 'android') {
                    setOrientation(
                        props.nativeEvent.layout.height >= 
                        props.nativeEvent.layout.width ? 
                        'PORTRAIT' : 
                        'LANDSCAPE'
                    );
                }
            }}
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
                    flex: orientation === 'PORTRAIT' ? 1.7 : 5,
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        fontSize: 40,
                        color: '#FFF',
                        marginBottom: orientation === 'PORTRAIT' ? '3%' : 0,
                        // fontWeight: '600',
                        fontFamily: 'Commissioner-SemiBold'
                    }}>
                    Challenges
                </Text>
                <Image
                    source={require('../../assets/badge.png')}
                    style={{
                        width: orientation === 'PORTRAIT' || Platform.OS === 'android' ? badgeWidth : screenHeight / 3 * 1.2,
                        height: orientation === 'PORTRAIT' || Platform.OS === 'android' ? badgeHeight : screenHeight / 3 * 1.2,
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
                    marginBottom: orientation === 'PORTRAIT' ? '5%' : '1%',
                }}>
                <Image
                    source={require('../../assets/gb-text.png')}
                    style={{
                        width: orientation === 'PORTRAIT' || Platform.OS === 'android' ? gbTextWidth : screenHeight * 70 / 100,
                        height: gbTextHeight,
                        tintColor: colors.dark,
                    }}
                    />
            </View>
        </View>
    );
}

export default Loading;
