import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../components/MainScreen/MainScreen'
import TeamScreen from '../containers/TeamScreen';
import RatingScreen from '../containers/RatingScreen';

const Stack = createStackNavigator();

const MainScreenStack = (props) => {

    return (
        <Stack.Navigator>
            <Stack.Screen name='Main' component={MainScreen} />
            <Stack.Screen name='Team' component={TeamScreen} />
            <Stack.Screen name='Rating' component={RatingScreen} />
        </Stack.Navigator>
    );
}

export default MainScreenStack;

