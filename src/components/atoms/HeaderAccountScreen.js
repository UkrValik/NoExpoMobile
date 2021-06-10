import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Dimensions, Platform } from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import FastImage from 'react-native-fast-image';
import icomoonConfig from '../../styles/selection.json';
import colors from '../../styles/colors.json';

const Icon = createIconSetFromIcoMoon(icomoonConfig);

class HeaderAccountScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ImageBackground
                source={require('../../assets/background-blue.png')}
                resizeMode='cover'
                style={{flex: 1}}
                imageStyle={{
                    // borderBottomLeftRadius: 15,
                    // borderBottomRightRadius: 15,
                    marginTop: Platform.OS === 'ios' ? -600 : 0
                }}>
                <View style={styles.top}>
                    <Text style={styles.textAccount}>
                        Profilseite
                    </Text>
                </View>
                <View style={styles.bottom}>
                    <FastImage
                        style={{
                            width: 100,
                            height: this.props.avatar ? 100 : 0,
                            borderRadius: 50,
                            marginVertical: '3%',
                        }}
                        source={{
                            uri: this.props.avatar,
                            headers: {'Authorization': 'Bearer ' + this.props.token}
                        }}
                        />
                    <Text style={styles.textHello}>
                        Hallo!
                    </Text>
                    <Text style={styles.textName}>
                        {this.props.firstName + ' ' + this.props.lastName}
                    </Text>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: colors.mainColor,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    top: {
        alignItems: 'center',
        paddingVertical: '3%',
    },
    bottom: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textAccount: {
        color: colors.mainBgColor,
        fontSize: 20,
        fontWeight: '600',
    },
    textHello: {
        color: colors.mainBgColor,
        fontSize: 14,
        fontWeight: '600',
    },
    textName: {
        color: colors.mainBgColor,
        fontSize: 20,
        fontWeight: '600',
        marginBottom: '4%',
    }
});

export default HeaderAccountScreen;
