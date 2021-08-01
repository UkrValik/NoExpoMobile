import React from 'react';
import { View, Text, StatusBar, Platform, BackHandler, SafeAreaView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import colors from '../../styles/colors.json';
import ChallengeList from './ChallengeList';
import Header from './Header';
import {
    fetchChallenges,
} from '../../redux/actions/ActionCreators';

const mapStateToProps = state => {
    return {
        teams: state.teams,
        consumer: state.consumer,
        challenges: state.challenges,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchChallenges: (token) => dispatch(fetchChallenges(token)),
});

const ChallengesScreen = (props) => {

    const scrollRef = React.createRef();

    const handleBackButton = () => {
        BackHandler.exitApp();
        return true;
    }

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
            scrollRef?.current?.scrollTo({x: 0, y: 0, animated: true});
            props.fetchChallenges(props.consumer.token);
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
                    challenges={props.challenges.array}
                    navigation={props.navigation}
                    scrollRef={scrollRef}
                    />
            </SafeAreaView>
        </View>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(ChallengesScreen);

