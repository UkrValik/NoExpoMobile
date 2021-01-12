import React from 'react';
import { View, TouchableNativeFeedback, StyleSheet } from 'react-native';
import colors from '../../styles/colors.json';

class ListTypeButton extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const backgroundColor = this.props.buttonType === this.props.listType ? 
            colors.mainColor : colors.mainBgColor;
        const color = this.props.buttonType === this.props.listType ? 
            colors.mainBgColor : colors.midgray;

        if (this.props.buttonType === 1) {

            return (
                <TouchableNativeFeedback onPress={() => this.props.setListType(1)}>
                    <View style={[styles.container1, {backgroundColor: backgroundColor}]}>
                        <View style={[styles.rect, {backgroundColor: color}]}/>
                        <View style={[styles.rect, {backgroundColor: color}]}/>
                    </View>
                </TouchableNativeFeedback>
            );
        } else if (this.props.buttonType === 2) {

            return (
                <TouchableNativeFeedback onPress={() => this.props.setListType(2)}>
                    <View style={[styles.container2, {backgroundColor: backgroundColor}]}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={[styles.square, {backgroundColor: color}]}/>
                            <View style={[styles.square, {backgroundColor: color}]}/>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={[styles.square, {backgroundColor: color}]}/>
                            <View style={[styles.square, {backgroundColor: color}]}/>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            );
        }
    }
}

const styles = StyleSheet.create({
    container1: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        elevation: 7,
    },
    rect: {
        height: 9,
        width: 18,
        margin: 0.5,
    },
    container2: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        elevation: 7,
    },
    square: {
        height: 9,
        width: 9,
        margin: 0.5,
    }
});

export default ListTypeButton;
