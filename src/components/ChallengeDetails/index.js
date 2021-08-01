import React from 'react';
import { View, Text, Image, ScrollView, SafeAreaView } from 'react-native';
import { AllHtmlEntities } from 'html-entities';
import colors from '../../styles/colors.json';

const ChallengeDetails = (props) => {

    const challenge = props.route.params.challenge;
    const regex = /(<([^>]+)>)/ig;

    const beatifyName = (text) => {
        return AllHtmlEntities.decode(text);
    }

    return (
        <View>
            <SafeAreaView style={{backgroundColor: colors.mainColor + 'ee'}} />
            <SafeAreaView>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 50,
                        backgroundColor: colors.mainColor,
                    }}>
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: '500',
                            color: colors.mainBgColor,
                        }}>
                        {beatifyName(challenge.challengeName)}
                    </Text>
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
                                marginTop: '3%',
                                textAlign: 'center',
                                marginHorizontal: '10%',
                            }}>
                            {challenge.challengeDescription.replace(regex, '')}
                        </Text>
                    </View>

                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default ChallengeDetails;
