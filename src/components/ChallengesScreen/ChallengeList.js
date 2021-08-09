import React from 'react';
import { View, Dimensions, ScrollView, RefreshControl } from 'react-native';
import colors from '../../styles/colors.json';
import ChallengeItem from './ChallengeItem';

const ChallengeList = (props) => {

    if (props.challenges) {
        return (
            <ScrollView
                ref={props.scrollRef}
                refreshControl={
                    <RefreshControl
                        refreshing={props.refreshing}
                        onRefresh={props.onRefresh}
                        colors={[colors.mainColor]}
                        />
                }
                style={{
                    width: '100%',
                }}>
                <View
                    style={{
                        marginTop: '3%',
                        // backgroundColor: colors.gray,
                    }}>
                    {props.challenges.map(challenge => (
                        <ChallengeItem
                            key={challenge.challengeId}
                            challenge={challenge}
                            navigation={props.navigation}
                            />
                    ))}
                </View>
            </ScrollView>
        );
    } else {
        return (
            <></>
        );
    }
}

export default ChallengeList;

