import React from 'react';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import MainScreen from '../components/MainScreen/MainScreen'
import TeamScreen from '../containers/TeamScreen';
import RatingScreen from '../containers/RatingScreen';
import icomoonConfig from '../styles/selection.json';
import colors from '../styles/colors.json';

const Stack = createStackNavigator();
const Icon = createIconSetFromIcoMoon(icomoonConfig);

const MainScreenStack = (props) => {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Main'
                component={MainScreen}
                listeners={({navigation, route}) => ({
                    focus: (e) => {
                        navigation.dangerouslyGetParent().setOptions({
                            tabBarIcon: ({size}) => (
                                <Icon name='home' size={size} color={colors.pink} />
                            ),
                            tabBarLabel: () => (
                                <Text
                                    style={{
                                        fontSize: 11,
                                        color: colors.pink,
                                        // borderWidth: 0.5,
                                        // borderColor: '#FFF',
                                    }}>
                                    Home
                                </Text>
                            ),
                        });
                    },
                    blur: (e) => {
                        navigation.dangerouslyGetParent().setOptions({
                            tabBarIcon: ({size}) => (
                                <Icon name='home' size={size} color={colors.mainColor} />
                            ),
                            tabBarLabel: () => (
                                <Text
                                    style={{
                                        fontSize: 11,
                                        color: colors.mainColor,
                                    }}>
                                    Home
                                </Text>
                            ),
                        });
                    }
                })}
                />
            <Stack.Screen name='Team' component={TeamScreen} />
            <Stack.Screen name='Rating' component={RatingScreen} />
        </Stack.Navigator>
    );
}

export default MainScreenStack;

