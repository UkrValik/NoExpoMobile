import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, Dimensions } from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../../styles/selection.json';
import colors from '../../styles/colors.json';

const Icon = createIconSetFromIcoMoon(icomoonConfig);

class HeaderAccountScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            // <View style={styles.container}>
                <ImageBackground
                    source={require('../../assets/background-blue.png')}
                    resizeMode='cover'
                    style={{flex: 1}}
                    imageStyle={{borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}
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
                            />
                    </View>
                    <View style={styles.bottom}>
                        <Image
                            style={styles.image}
                            source={{uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}}
                            />
                        <Text style={styles.textHello}>
                            Hello!
                        </Text>
                        <Text style={styles.textName}>
                            {this.props.firstName + ' ' + this.props.lastName}
                        </Text>
                    </View>
                </ImageBackground>
            // </View>
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
