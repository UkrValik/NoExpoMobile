import React from 'react';
import { View, Text, Platform, StatusBar, BackHandler, ScrollView, SafeAreaView } from 'react-native';
import colors from '../../styles/colors.json';
import Header from './Header';
import SynchronizationGroup from './SynchronizationGroup';
import SupportGroup from './SupportGroup';
import AppGroup from './AppGroup';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import iconConfig from '../../styles/selection.json';
import AppleHealthSynchronization from './AppleHealthSynchronization';

const Icon = createIconSetFromIcoMoon(iconConfig);

const SettingsScreen = (props) => {

    const handleBackButton = () => {
        BackHandler.exitApp();
        return true;
    }

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        });
        return unsubscribe;
    }, [props.navigation]);

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('blur', () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        });
        return unsubscribe;
    }, [props.navigation]);

    return (
        <View
            style={{
                flex: 1,
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                backgroundColor: '#FFF',
            }}>
            <SafeAreaView style={{backgroundColor: colors.mainColor + 'ee'}} />
            <SafeAreaView
                style={{
                    flex: 1,
                }}
                >
                <Header/>
                <ScrollView>
                    <SynchronizationGroup />
                    <SupportGroup />
                    <AppGroup />
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

export default SettingsScreen;

