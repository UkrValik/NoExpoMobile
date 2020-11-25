import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../styles/colors.json';

class TeamScreenIcon extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const size = Dimensions.get('screen').width / 7;

        return (
            <View>
                <Icon
                    type='material-community'
                    name={this.props.iconName}
                    size={size}
                    color={colors.mainColor}
                    />
                <Text style={styles.textValue}>
                    {this.props.value}
                </Text>
                <Text style={[styles.textLabel, {width: size * 2}]}>
                    {this.props.label}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    textValue: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
        color: colors.mainColor,
        marginVertical: 10,
    },
    textLabel: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
        color: colors.textColor,
    }
});

export default TeamScreenIcon;
