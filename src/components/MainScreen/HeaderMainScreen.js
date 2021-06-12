import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../../styles/selection.json';
import colors from '../../styles/colors.json';

const Icon = createIconSetFromIcoMoon(icomoonConfig);

class HeaderMainScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        // let paddingTop = DeviceInfo.hasNotch() ? 25 : 0;

        return (
            <View style={[styles.container,]}>
                <Text style={styles.text}>
                    Home
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.mainColor,
        // borderBottomLeftRadius: 15,
        // borderBottomRightRadius: 15,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        color: colors.mainBgColor,
        fontSize: 22,
        fontWeight: '500',
        paddingVertical: '3%',
//         marginLeft: '5%',
    }
});

export default HeaderMainScreen;
