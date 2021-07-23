import React from 'react';
import { Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import ChallengesScreen from '../components/ChallengesScreen';
import TeamScreen from '../containers/TeamScreen';
import RatingScreen from '../containers/RatingScreen';
import icomoonConfig from '../styles/selection.json';
import colors from '../styles/colors.json';

const Stack = createStackNavigator();
const Icon = createIconSetFromIcoMoon(icomoonConfig);

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
                listeners={({navigation, route}) => ({
                    focus: (e) => {
                        navigation.dangerouslyGetParent().setOptions({
                            tabBarIcon: ({size}) => (
                                <Icon name='challenge' size={size} color={colors.pink} />
                            ),
                            tabBarLabel: () => (
                                <Text
                                    style={{
                                        fontSize: 11,
                                        color: colors.pink,
                                    }}>
                                    Challenges
                                </Text>
                            ),
                        });
                    },
                    blur: (e) => {
                        navigation.dangerouslyGetParent().setOptions({
                            tabBarIcon: ({size}) => (
                                <Icon name='challenge' size={size} color={colors.mainColor} />
                            ),
                            tabBarLabel: () => (
                                <Text
                                    style={{
                                        fontSize: 11,
                                        color: colors.mainColor,
                                    }}>
                                    Challenges
                                </Text>
                            ),
                        });
                    }
                })}
                />
            <Stack.Screen
                name='Team'
                component={TeamScreen}
                // listeners={({navigation, route}) => ({
                //     focus: (e) => {
                //         navigation.dangerouslyGetParent().setOptions({
                //             tabBarIcon: ({size}) => (
                //                 <Icon name='challenge' size={size} color={colors.mainColor} />
                //             ),
                //             tabBarLabel: () => (
                //                 <Text
                //                     style={{
                //                         fontSize: 10,
                //                         color: colors.mainColor,
                //                     }}>
                //                     Challenges
                //                 </Text>
                //             ),
                //         });
                //     }
                // })}
                />
            <Stack.Screen name='Rating' component={RatingScreen} />
        </Stack.Navigator>
    );
}

export default ChallengeScreenStack;

