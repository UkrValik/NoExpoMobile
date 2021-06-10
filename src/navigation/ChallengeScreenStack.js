import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChallengesScreen from '../components/ChallengesScreen';
import TeamScreen from '../containers/TeamScreen';
import RatingScreen from '../containers/RatingScreen';

const Stack = createStackNavigator();

const ChallengeScreenStack = (props) => {

    const screenOptions = {
        headerShown: false,
    };

    return (
        <Stack.Navigator
            screenOptions={screenOptions}
            initialRouteName='Challenges'
            >
            <Stack.Screen
                name='Challenges'
                component={ChallengesScreen}
                />
            <Stack.Screen name='Team' component={TeamScreen} />
            <Stack.Screen name='Rating' component={RatingScreen} />
        </Stack.Navigator>
    );
}

export default ChallengeScreenStack;

