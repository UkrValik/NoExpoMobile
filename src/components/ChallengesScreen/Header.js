import React from 'react';
import { View, Text } from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../../styles/selection.json';
import colors from '../../styles/colors.json';

const Icon = createIconSetFromIcoMoon(icomoonConfig);

const Header = (props) => {

    return (
        <View
            style={{
                backgroundColor: colors.mainColor,
                // borderBottomLeftRadius: 15,
                // borderBottomRightRadius: 15,
                alignItems: 'center',
                width: '100%',
            }}>
            <Text
                style={{
                    color: colors.mainBgColor,
                    fontSize: 22,
                    fontWeight: '500',
                    paddingVertical: '3%',
                }}>
                Challenges
            </Text>
        </View>
    );
}

export default Header;

