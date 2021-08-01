import React from 'react';
import { View, Text, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import colors from '../../styles/colors.json';
import icomoonConfig from '../../styles/selection.json';

const Icon = createIconSetFromIcoMoon(icomoonConfig);

const NoTeams = (props) => {

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: props.activeTeams.length === 0 ? '50%' : 0,
            }}>
            {
                props.activeTeams.length === 0 &&
                <Text
                    style={{
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        fontSize: 20,
                        marginBottom: '5%',
                        color: colors.textColor,
                        padding: 10,
                    }}>
                    Sie haben derzeit keine aktiven Challenges.
                </Text>
            }
            {
                props.inactiveTeams.length !== 0 &&
                <TouchableNativeFeedback
                    onPress={() => props.setShowInactiveTeams(true)}
                    >
                    <View
                        style={{
                            marginBottom: '5%',
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: colors.mainColor,
                            padding: 10,
                            backgroundColor: colors.mainBgColor,
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                color: colors.textColor,
                            }}>
                            Anzeige beendet
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            }
            {
                props.activeTeams.length === 0 &&
                <TouchableWithoutFeedback
                    onPress={() => props.navigateToChallenges()}
                    >
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 10,
                            marginBottom: '10%',
                        }}>
                        <Text
                            style={{
                                fontSize: 16,
                                marginRight: 10,
                                color: colors.textColor,
                            }}>
                            Alle Challenges
                        </Text>
                        <Icon
                            name='arrow-right'
                            size={14}
                            color={colors.textColor}
                            />
                    </View>
                </TouchableWithoutFeedback>
                
            }
        </View>
    );
}

export default NoTeams;
