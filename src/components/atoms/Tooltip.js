import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../styles/colors.json';

class Tooltip extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[{justifyContent: 'center', alignItems: 'center'}, this.props.style]}>
                <View style={{borderRadius: 10, backgroundColor: colors.pink}}>
                    <Text style={styles.text}>
                        Invalid login or password
                    </Text>
                </View>
                <View style={styles.arrow}>
                    <View style={styles.halfCircle}></View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    arrow: {
        width: 15,
        height: 7,
        // backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderBottomWidth: 0,
        borderRightWidth: 5,
        borderTopWidth: 9,
        borderLeftWidth: 5,
        borderTopColor: colors.pink,
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    halfCircle: {
        width: 5,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomColor: colors.pink,
    },
    text: {
        color: colors.mainBgColor,
        padding: 10,
        paddingHorizontal: 35,
        fontSize: 16
    }
});

export default Tooltip;
