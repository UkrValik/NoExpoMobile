import React from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, Platform, StatusBar } from 'react-native';
import { AllHtmlEntities } from 'html-entities';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import colors from '../../styles/colors.json';
import icomoonConfig from '../../styles/selection.json';

const Icon = createIconSetFromIcoMoon(icomoonConfig);

const ChallengeDetails = (props) => {

    const challenge = props.route.params.challenge;
    const regex = /(<([^>]+)>)/ig;

    const beatifyName = (text) => {
        return AllHtmlEntities.decode(text);
    }

    return (
        <View
            style={{
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                backgroundColor: colors.mainBgColor,
                flex: 1,
            }}>
            <SafeAreaView style={{backgroundColor: colors.mainColor + 'ee'}} />
            <SafeAreaView
                style={{
                    flex: 1,
                }}>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        height: 60,
                        backgroundColor: colors.mainColor,
                        paddingHorizontal: '3%',
                    }}>
                    <Icon
                        name='arrow-left'
                        size={16}
                        color={colors.mainBgColor}
                        onPress={() => props.navigation.goBack()}
                        />
                    <Text
                        style={{
                            fontSize: 24,
                            fontWeight: '500',
                            color: colors.mainBgColor,
                        }}>
                        {beatifyName(challenge.challengeName)}
                    </Text>
                    <View style={{width: 24}}/>
                </View>
                <ScrollView>
                    <Image 
                        source={{uri: challenge.challengeImage}}
                        style={{
                            width: '100%',
                            aspectRatio: challenge.challengeImage ? 2.8 : 100000,
                            backgroundColor: colors.midgray,
                        }}
                        />
                    <View>
                        <Text
                            style={{
                                color: colors.lightTextColor,
                                fontSize: 16,
                                marginTop: challenge.challengeDescription ? '3%' : 0,
                                textAlign: 'center',
                                marginHorizontal: '10%',
                            }}>
                            {challenge.challengeDescription.replace(regex, '')}
                        </Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                color: colors.pink,
                                fontSize: 24,
                                fontWeight: '600',
                                textAlign: 'center',
                                marginTop: challenge.daysToStart > 0 ? '5%' : 0,
                            }}>
                            {challenge.daysToStart > 0 ? challenge.daysToStart + ' days to start' : ''}
                        </Text>
                    </View>

                        {/**
                         * first line icons
                         */}

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            marginTop: '5%',
                            marginHorizontal: '7%',
                        }}>
                        <View
                            style={{
                                alignItems: 'center',
                                flex: 1,
                            }}>
                            <Icon name='team' size={50} color={colors.textColor} />
                            <Text
                                style={{
                                    color: colors.mainColor,
                                    fontSize: 16,
                                    marginVertical: '3%',
                                }}>
                                {challenge.numberOfConsumers}
                            </Text>
                            <Text
                                style={{
                                    color: colors.textColor,
                                }}>
                                Aktive(r) Teilnehmer
                            </Text>
                        </View>
                        <View
                            style={{
                                alignItems: 'center',
                                flex: 1,
                            }}>
                        <Icon name='calendar' size={50} color={colors.textColor} />
                            <Text
                                style={{
                                    color: colors.mainColor,
                                    fontSize: 16,
                                    marginVertical: '3%',
                                }}>
                                {challenge.activityDays}
                            </Text>
                            <Text
                                style={{
                                    color: colors.textColor,
                                }}>
                                Dauer
                            </Text>
                        </View>
                    </View>

                        {/**
                         * second line icons
                         */}

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            marginVertical: '5%',
                            marginHorizontal: '7%',
                        }}>
                        <View
                            style={{
                                alignItems: 'center',
                                flex: 1,
                            }}>
                            <Icon name='bewegung' size={50} color={colors.textColor} />
                            <Text
                                style={{
                                    color: colors.mainColor,
                                    fontSize: 16,
                                    marginVertical: '3%',
                                }}>
                                {challenge.challengeStartDate?.split('-').reverse().join('.')}
                            </Text>
                            <Text
                                style={{
                                    color: colors.textColor,
                                }}>
                                Anfangsdatum
                            </Text>
                        </View>
                        <View
                            style={{
                                alignItems: 'center',
                                flex: 1,
                            }}>
                        <Icon name='end-date' size={50} color={colors.textColor} />
                            <Text
                                style={{
                                    color: colors.mainColor,
                                    fontSize: 16,
                                    marginVertical: '3%',
                                }}>
                                {challenge.challengeEndDate?.split('-').reverse().join('.')}
                            </Text>
                            <Text
                                style={{
                                    color: colors.textColor
                                }}>
                                Enddatum
                            </Text>
                        </View>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default ChallengeDetails;
