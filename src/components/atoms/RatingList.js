import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableNativeFeedback } from 'react-native';
import colors from '../../styles/colors.json';

class RatingList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let i = 0;

        const backgroundColor = (i) => {
            switch (i) {
                case 0:
                    return colors.pink;
                case 1:
                    return colors.blue;
                case 2:
                    return colors.altColor;
                default:
                    return colors.mainBgColor;
            }
        }

        return (
            <ScrollView>
                {this.props.participants.map(consumer => (
                    <TouchableNativeFeedback key={i.toString()}>
                        <View style={[styles.columnNames, {backgroundColor: backgroundColor(i)}]}>
                            <Text style={[styles.column, {flex: 1}]}>{(++i).toString()}</Text>
                            <Text style={[styles.column, {flex: 3, textAlign: 'center', marginLeft: '5%'}]}>
                                {consumer.displayName}
                            </Text>
                            <Text style={[styles.column, {flex: 1.5}]}>{consumer.score}</Text>
                        </View>
                    </TouchableNativeFeedback>
                ))}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    column: {
        fontSize: 20,
        color: colors.mainBgColor,
        fontWeight: '700',
        textAlign: 'center',
        paddingVertical: '5%',
    },
    columnNames: {
        flexDirection: 'row',
        marginTop: '5%',
        marginHorizontal: '5%',
        borderRadius: 10,
    }
});

export default RatingList;
