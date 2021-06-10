import React from 'react';
import { View, Text, TouchableWithoutFeedback, Linking } from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import colors from '../../styles/colors.json';
import selection from '../../styles/selection.json';

const Icon = createIconSetFromIcoMoon(selection);

const SupportGroup = (props) => {

    const helpLinkPressed = () => {
        Linking.openURL('https://www.gesund.live/info/faqs-public/');
    }

    const supportLinkPressed = () => {
        Linking.openURL('https://www.gesund.live/info/kontakt-und-feedback/');
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
                    SUPPORT
                </Text>
            </View>
            <TouchableWithoutFeedback 
                onPress={helpLinkPressed}
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
                            Hilfe
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
                onPress={supportLinkPressed}
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
                            Support-Kontakt
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

export default SupportGroup;
