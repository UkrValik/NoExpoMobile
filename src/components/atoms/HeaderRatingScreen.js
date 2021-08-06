import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../../styles/selection.json';
import colors from '../../styles/colors.json';

const Icon = createIconSetFromIcoMoon(icomoonConfig);

class HeaderTeamScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={styles.container}>
                <Icon
                    name='arrow-left'
                    color={colors.mainBgColor}
                    size={16}
                    style={{marginLeft: '3%'}}
                    onPress={() => this.props.goBack()}
                    />
                <Text style={styles.text}>
                    Teamwertung
                </Text>
                <View style={{paddingHorizontal: '3%'}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.mainColor,
        // borderBottomLeftRadius: 15,
        // borderBottomRightRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
    },
    text: {
        color: colors.mainBgColor,
        fontSize: 24,
        fontWeight: '500',
    }
});

export default HeaderTeamScreen;
