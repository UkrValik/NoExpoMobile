import React from 'react';
import { StyleSheet,
    View,
    Text,
    RefreshControl,
    SafeAreaView,
    Dimensions,
    Platform,
    StatusBar,
    BackHandler,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import HeaderMainScreen from './HeaderMainScreen';
import TeamList from './TeamList';
import NoTeams from './NoTeams';
import colors from '../../styles/colors.json';
import {
    fetchTeams,
    fetchTeam,
    makeFirstLogin,
    toggleGoogleFit,
    addSteps,
    fetchConsumer,
} from '../../redux/actions/ActionCreators';

const mapDispatchToProps = dispatch => ({
    fetchTeams: async (token) => dispatch(fetchTeams(token)),
    fetchTeam: async (teamId, token) => dispatch(fetchTeam(teamId, token)),
    makeFirstLogin: () => dispatch(makeFirstLogin()),
    toggleGoogleFit: () => dispatch(toggleGoogleFit()),
    addSteps: (steps) => dispatch(addSteps(steps)),
    fetchConsumer: (token) => dispatch(fetchConsumer(token)),
});

const mapStateToProps = state => {
    return {
        teams: state.teams,
        consumer: state.consumer,
    };
};

const MainScreen = (props) => {

    const [refresh, setRefresh] = React.useState(false);
    const [fetchingTeams, setFetchingTeams] = React.useState(false);
    const [showInactiveTeams, setShowInactiveTeams] = React.useState(false);

    const handleBackButton = () => {
        BackHandler.exitApp();
        return true;
    }

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', async () => {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
            props.fetchConsumer(props.consumer.token);
            setFetchingTeams(true);
            const teams = await props.fetchTeams(props.consumer.token);
            setFetchingTeams(false);
            for (let team of teams.payload) {
                props.fetchTeam(team.teamId, props.consumer.token);
            }
        });
        props.navigation.setOptions({
            headerShown: false,
        });

        return unsubscribe;
    }, [props.navigation]);

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('blur', () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
            setRefresh(false);
        });
        return unsubscribe;
    }, [props.navigation]);

    const onRefresh = async () => {
        setRefresh(true);
        const teams = await props.fetchTeams(props.consumer.token);
        for (let team of teams.payload) {
            props.fetchTeam(team.teamId, props.consumer.token);
        }
        setRefresh(false);
    }

    const navigateToChallenges = () => {
        props.navigation.navigate('Challenges');
    }

    //render

    let paddingTop = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
    const activeTeams = props.teams.teams.filter(team => 
        team.statusCode === 'action' || team.statusCode === 'done'
    );

    const inactiveTeams = props.teams.teams.filter(team => 
        team.statusCode === 'finished'
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={{backgroundColor: colors.mainColor + 'ee'}} />
            <SafeAreaView
                style={{
                    paddingTop: paddingTop,
                    borderBottomRightRadius: 15,
                    borderBottomLeftRadius: 15,
                }}>
                <HeaderMainScreen/>
            </SafeAreaView>
            <SafeAreaView
                style={{
                    flex: 1,
                }}>
            {(fetchingTeams || props.teams.loadingTeams) && activeTeams.length === 0 ? 
                (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                        }}>
                        <ActivityIndicator
                            size={24}
                            color={colors.mainColor}
                            />
                    </View>
                )
                :
                (
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refresh}
                                onRefresh={onRefresh}
                                colors={[colors.mainColor]}
                                />
                        }>
                        <TeamList
                            teams={activeTeams.concat(showInactiveTeams ? inactiveTeams : [])}
                            navigation={props.navigation}
                            />
                        {
                            !showInactiveTeams && 
                            <NoTeams
                                navigateToChallenges={navigateToChallenges}
                                setShowInactiveTeams={setShowInactiveTeams}
                                activeTeams={activeTeams}
                                inactiveTeams={inactiveTeams}
                                />
                        }
                    </ScrollView>
            )}
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightgray,
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
