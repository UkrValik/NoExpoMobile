import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import MainScreenStack from './MainScreenStack';
import AccountScreen from '../containers/AccountScreen';
import SettingsScreen from '../components/SettingsScreen';
import ChallengeScreenStack from './ChallengeScreenStack';
import icomoonConfig from '../styles/selection.json';
import colors from '../styles/colors.json';

const Tab = createBottomTabNavigator();
const Icon = createIconSetFromIcoMoon(icomoonConfig);

const MainTabNavigator = (props) => {

    const screenOptions = ({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let iconColor = focused ? colors.pink : colors.mainColor;

            if (route.name === 'Home') {
                iconName = 'home';
            } else if (route.name === 'Account') {
                iconName = 'user';
            } else if (route.name === 'Settings') {
                iconName = 'settings';
            } else {
                iconName = 'challenge';
            }

            return <Icon name={iconName} size={size} color={iconColor} />
        }
    });

    const tabBarOptions = {
        activeTintColor: colors.pink,
        inactiveTintColor: colors.mainColor,
    };

    return (
        <Tab.Navigator
            screenOptions={screenOptions}
            tabBarOptions={tabBarOptions}
            >
            <Tab.Screen
                name='Home'
                component={MainScreenStack}
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        navigation.navigate('Home');
                    }
                })}
                />
            <Tab.Screen
                name='Challenges'
                component={ChallengeScreenStack}
                listeners={({ navigation, route }) => ({
                    tabPress: e => {
                        navigation.navigate('Challenges');
                    }
                })}
                />
            <Tab.Screen
                name='Account'
                component={AccountScreen}
                options={{title: 'Konto'}}
                />
            <Tab.Screen
                name='Settings'
                component={SettingsScreen}
                options={{title: 'Einstellungen'}}
                />
        </Tab.Navigator>
    );
}

export default MainTabNavigator;
