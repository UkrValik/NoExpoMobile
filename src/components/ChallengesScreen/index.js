import React from 'react';
import { View, Text, StatusBar, Platform, BackHandler, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import colors from '../../styles/colors.json';
import ChallengeList from './ChallengeList';
import Header from './Header';

const mapStateToProps = state => {
    return {
        teams: state.teams,
        consumer: state.consumer,
    };
};

const ChallengesScreen = (props) => {

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
                justifyContent: 'center',
                // alignItems: 'center',
                flex: 1,
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            }}>
            <SafeAreaView style={{backgroundColor: colors.mainColor + 'ee'}} />
            <SafeAreaView
                style={{
                    flex: 1,
                }}
                >
                <Header />
                <ChallengeList
                    teams={props.teams.teams}
                    navigation={props.navigation}
                    />
            </SafeAreaView>
        </View>
    );
}

export default connect(mapStateToProps)(ChallengesScreen);

