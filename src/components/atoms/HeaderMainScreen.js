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
        return (
            <View style={styles.container}>
                <View style={{paddingHorizontal: '3%'}}/>
                <Text style={styles.text}>
                    Main
                </Text>
                <Icon
                    name='user'
                    color={colors.mainBgColor}
                    size={18}
                    style={{marginRight: '5%'}}
                    onPress={() => this.props.navigateToAccount()}
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.mainColor,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        color: colors.mainBgColor,
        fontSize: 20,
        fontWeight: '700',
        paddingVertical: '3%',
        marginLeft: '5%',
    }
});

export default HeaderMainScreen;
