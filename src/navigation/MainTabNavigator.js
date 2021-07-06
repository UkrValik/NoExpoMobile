import React from 'react';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import MainScreenStack from './MainScreenStack';
import AccountScreen from '../containers/AccountScreen';
import SettingsScreen from '../components/SettingsScreen';
import ChallengeScreenStack from './ChallengeScreenStack';
import Loading from '../components/atoms/Loading';
import icomoonConfig from '../styles/selection.json';
import colors from '../styles/colors.json';
import GDPRView from '../components/GDPR';
import {
    checkGDPR,
    updateGDPRDate,
} from '../redux/actions/ActionCreators';

const Tab = createBottomTabNavigator();
const Icon = createIconSetFromIcoMoon(icomoonConfig);

const mapStateToProps = state => {
    return {
        consumer: state.consumer,
    };
};

const mapDispatchToProps = dispatch => ({
    updateGDPRDate: (date) => dispatch(updateGDPRDate(date)),
    checkGDPR: (params, token) => dispatch(checkGDPR(params, token)),
});

const MainTabNavigator = (props) => {

    const [gdprChecked, setgdprChecked] = React.useState(false);

    React.useEffect(() => {
        const effectFunction = async () => {
            let date = props.consumer.gdprDate;
            if (props.consumer.firstLogin) {
                date = new Date().toISOString();
                await props.updateGDPRDate(date);
            }
            await props.checkGDPR({ date: date, firstTimeOpen: props.consumer.firstLogin }, props.consumer.token);
            setTimeout(() => setgdprChecked(true), 1000);
        }
        effectFunction();
    }, [props.consumer.firstLogin, props.consumer.token]);

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

    if (gdprChecked && props.consumer.gdprData.dataPrivacy === '') {
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
    } else if (gdprChecked && props.consumer.gdprData.dataPrivacy !== '') {
        console.log('BLIABLUA', props.consumer.gdprData);
        return (
            <GDPRView />
        );
    } else {
        return (
            <Loading />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainTabNavigator);
