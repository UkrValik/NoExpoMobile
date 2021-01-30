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
                imageStyle={{borderBottomLeftRadius: 15, borderBottomRightRadius: 15, marginTop: Platform.OS === 'ios' ? -600 : 0}}
                >
                <View style={styles.top}>
                    <Icon
                        name='arrow-left'
                        size={16}
                        color={colors.mainBgColor}
                        style={{marginLeft: '3%'}}
                        onPress={() => this.props.goBack()}
                        />
                    <Text style={styles.textAccount}>
                        Account
                    </Text>
                    <Icon
                        name='exit'
                        size={20}
                        color={colors.mainBgColor}
                        style={{marginRight: '5%'}}
                        onPress={() => this.props.logout()}
                        />
                </View>
                <View style={styles.bottom}>
                    <FastImage
                        style={styles.image}
                        source={{
                            uri: this.props.avatar,
                            headers: {'Authorization': 'Bearer ' + this.props.token}
                        }}
                        />
                    <Text style={styles.textHello}>
                        Hello!
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
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginVertical: '3%',
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
