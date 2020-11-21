import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import colors from '../../styles/colors.json';

const image = require('../../assets/touching-hands.jpg');

class AccountHeader extends React.Component {
    render() {
        return (
            <ImageBackground source={image} style={styles.image} resizeMode='cover'>
                <View style={styles.container}>
                    <Text style={styles.upperText}>
                        Main Profile
                    </Text>
                    <Text style={styles.downText}>
                        Your data - at a glance
                    </Text>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 3/7, 
        width: '100%', 
        height: '100%',
        marginBottom: '5%'
    },
    container: {
        marginLeft: '5%', 
        flexDirection: 'column',
        marginTop: '35%'
    },
    upperText: {
        backgroundColor: colors.mainColor, 
        color: colors.mainBgColor, 
        margin: 3, 
        padding: 4, 
        fontSize: 20, 
        alignSelf: 'flex-start'
    },
    downText: {
        backgroundColor: colors.mainColor, 
        color: colors.mainBgColor, 
        margin: 3, 
        padding: 4, 
        fontSize: 15, 
        alignSelf: 'flex-start'
    }
});

export default AccountHeader;
