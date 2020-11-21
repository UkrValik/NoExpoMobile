import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../../styles/colors.json';

const AccountDataLine = (props) => {

    console.log(props.saveValue);
    const [value, setValue] = useState(props.value);

    // useEffect(() => {
    //     if (props.saveValue) {
    //         props.saveValue(value);
    //     }
    // });

    if (props.type === 'input') {
        return (
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>
                    {props.title}
                </Text>
                <Input
                    value={value}
                    placeholder={props.title}
                    onChangeText={value => setValue(value)}
                    inputContainerStyle={styles.inputContainerStyle}
                    containerStyle={styles.inputContainerContainerStyle}
                    style={styles.inputStyle}
                    />
            </View>
        );
    } else if (props.type === 'dropdown') {
        return (
            <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownText}>
                    {props.title}
                </Text>
                <DropDownPicker
                    items={props.items}
                    defaultValue={value}
                    onChangeItem={item => setValue(item.value)}
                    containerStyle={styles.dropdownContainerStyle}
                    style={styles.dropdownStyle}
                    itemStyle={styles.dropdownItemStyle}
                    dropDownStyle={styles.dropdownDropdownStyle}
                    />
            </View>
        );
    } else if (props.type === 'description') {
        return (
            <View style={styles.inputContainer}>
                <Text style={styles.descriptionText}>
                    {props.description}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        marginLeft: '5%',
    },
    inputText: {
        marginLeft: 3, 
        color: colors.textColor, 
        marginBottom: 3,
    },
    inputContainerStyle: {
        borderWidth: 1, 
        borderColor: colors.borderColor, 
        paddingBottom: 0, 
        marginBottom: -15,
    },
    inputContainerContainerStyle: {
        paddingLeft: 3, 
        paddingRight: '5%',
    },
    inputStyle: {
        color: colors.textColor, 
        marginLeft: '3%',
    },
    dropdownContainer: {
        marginLeft: '5%', 
        marginBottom: '3%',
    },
    dropdownText: {
        marginLeft: 3, 
        color: colors.textColor,
    },
    dropdownContainerStyle: {
        height: 40, 
        marginLeft: 0, 
        marginRight: '5%',
    },
    dropdownStyle: {
        backgroundColor: colors.mainBgColor, 
        borderTopLeftRadius: 0, 
        borderTopRightRadius: 0, 
        borderBottomLeftRadius: 0, 
        borderBottomRightRadius: 0, 
        borderColor: colors.borderColor,
    },
    dropdownItemStyle: {
        justifyContent: 'flex-start',
    },
    dropdownDropdownStyle: {
        backgroundColor: colors.mainBgColor, 
        borderBottomRightRadius: 0, 
        borderBottomLeftRadius: 0,
    },
    descriptionText: {
        color: colors.textColor, 
        marginLeft: 3, 
        marginBottom: '2%',
    },
});

export default AccountDataLine;
