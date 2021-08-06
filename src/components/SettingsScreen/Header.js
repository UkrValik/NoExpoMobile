import React from 'react';
import { View, Text } from 'react-native';
import colors from '../../styles/colors.json';

const Header = (props) => {

    return (
        <View
            style={{
                backgroundColor: colors.mainColor,
                // borderBottomLeftRadius: 15,
                // borderBottomRightRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                height: 60,
            }}>
            <Text
                style={{
                    fontSize: 24,
                    fontWeight: '500',
                    color: '#FFF',
                }}>
                Einstellungen
            </Text>
        </View>
    );
}

export default Header;
