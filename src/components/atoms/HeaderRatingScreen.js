import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../styles/colors.json';

class HeaderTeamScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View style={styles.container}>
                <Icon
                    type='material-community'
                    name='chevron-left'
                    color={colors.mainBgColor}
                    size={28}
                    containerStyle={{marginRight: '3%'}}
                    onPress={() => this.props.goBack()}
                    />
                <Text style={styles.text}>
                    Team rating
                </Text>
                <View style={{paddingHorizontal: '3%'}}/>
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

export default HeaderTeamScreen;
