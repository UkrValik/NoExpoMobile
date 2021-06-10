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
                paddingVertical: '3%',
                alignItems: 'center',
            }}>
            <Text
                style={{
                    fontSize: 22,
                    color: '#FFF',
                }}>
                Einstellungen
            </Text>
        </View>
    );
}

export default Header;
