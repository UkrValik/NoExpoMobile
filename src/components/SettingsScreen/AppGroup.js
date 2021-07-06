import React from 'react';
import { View, Text, TouchableWithoutFeedback, Linking } from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import colors from '../../styles/colors.json';
import selection from '../../styles/selection.json';

const Icon = createIconSetFromIcoMoon(selection);

const AppGroup = (props) => {

    const termsOfUse = () => {
        Linking.openURL('https://www.gesund.live/info/nutzungsbedingungen-rechtshinweise/');
    }

    const dataPrivacy = () => {
        Linking.openURL('https://www.gesund.live/info/datenschutz/');
    }

    return (
        <View>
            <View
                style={{
                    paddingTop: '5%',
                    paddingBottom: '3%',
                    borderBottomWidth: 1,
                    borderColor: colors.midgray,
                    backgroundColor: colors.lightgray,
                }}>
                <Text
                    style={{
                        marginHorizontal: '3%',
                        fontSize: 16,
                        fontWeight: '700',
                        color: colors.textColor,
                    }}>
                    APP
                </Text>
            </View>
            <TouchableWithoutFeedback 
                onPress={termsOfUse}
                >
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderColor: colors.lightgray,
                    }}>
                    <View   
                        style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginHorizontal: '3%',
                            paddingVertical: '3%',
                        }}>
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '500',
                                color: colors.textColor,
                            }}>
                            Nutzungsbedingungen
                        </Text>
                        <Icon
                            name='arrow-right'
                            color={colors.gray}
                            size={16}
                            />
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={dataPrivacy}
                >
                <View
                    style={{
                        borderBottomWidth: 1,
                        borderColor: colors.lightgray,
                    }}>
                    <View   
                        style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginHorizontal: '3%',
                            paddingVertical: '3%',
                        }}>
                        <Text
                            style={{
                                fontSize: 14,
                                fontWeight: '500',
                                color: colors.textColor,
                            }}>
                            Datenprivatsphäre
                        </Text>
                        <Icon
                            name='arrow-right'
                            color={colors.gray}
                            size={16}
                            />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

export default AppGroup;
