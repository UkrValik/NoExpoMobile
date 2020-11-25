import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../styles/colors.json';

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
                    type='material-community'
                    name='account'
                    color={colors.mainBgColor}
                    size={28}
                    containerStyle={{marginRight: '3%'}}
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
    }
});

export default HeaderMainScreen;
