import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import appleHealthKit from 'react-native-health';
import Loading from '../components/atoms/Loading';
import LoginScreen from '../containers/LoginScreen';
import MainTabNavigator from './MainTabNavigator';
import {
    fetchTokenValid,
    addSteps,
    updateConsumerScores,
    sendChallengeData,
    fetchTeam,
    receivedStepsFromGF,
    updateGDPRDate,
    checkGDPR,
} from '../redux/actions/ActionCreators';

const mapStateToProps = state => {
    return {
        consumer: state.consumer,
        teams: state.teams,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchTokenValid: async (token) => dispatch(fetchTokenValid(token)),
    addSteps: (steps) => dispatch(addSteps(steps)),
    updateConsumerScores: (teamId, steps, startDate, endDate) => dispatch(updateConsumerScores(teamId, steps, startDate, endDate)),
    sendChallengeData: (data, token) => dispatch(sendChallengeData(data, token)),
    fetchTeam: (teamId, token) => dispatch(fetchTeam(teamId, token)),
    receivedStepsFromGF: (value) => dispatch(receivedStepsFromGF(value)),
    updateGDPRDate: (date) => dispatch(updateGDPRDate(date)),
    checkGDPR: (params, token) => dispatch(checkGDPR(params, token)),
});

const MainStackNavigator = createStackNavigator();

class Main extends React.Component {
    constructor(props) {
        super(props);

        this._intervalDuration = 15000;
        this.intervalCallback = this.intervalCallback.bind(this);

        this.state = {
            tokenChecked: false,
        };
    }

    async componentDidMount() {
        const token = await this.props.fetchTokenValid(this.props.consumer.token);

        this.setState({ tokenChecked: true });

        if (this.props.consumer.synchronizeGoogleFit) {
            GoogleFit.checkIsAuthorized()
                .then(() => {
                    if (!GoogleFit.isAuthorized) {
                        const options = {
                            scopes: [
                                Scopes.FITNESS_BODY_READ,
                                Scopes.FITNESS_BODY_READ_WRITE,
                                Scopes.FITNESS_ACTIVITY_READ,
                                Scopes.FITNESS_ACTIVITY_READ_WRITE,
                            ]
                        }
                        GoogleFit.authorize(options)
                            .then(authResult => {
                                console.log(authResult);
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                });
        }
        this.intervalCallback();
        this._interval = setInterval(this.intervalCallback, this._intervalDuration);
    }

    async intervalCallback() {
        if (GoogleFit.isAuthorized && this.props.consumer.synchronizeGoogleFit) {
            const stepsFromGF = await GoogleFit.getDailyStepCountSamples({
                startDate: new Date('2018-05-05').toISOString(),
                endDate: new Date().toISOString(),
            });

            let steps = [];
            if (stepsFromGF[1].steps.length < stepsFromGF[2].steps.length) {
                steps = stepsFromGF[2].steps;
            } else {
                steps = stepsFromGF[1].steps;
            }

            if (steps.length === 0) {
                this.props.receivedStepsFromGF(false);
            } else {
                this.props.receivedStepsFromGF(true);
            }

            this.sendStepData(steps);
        }

        if (this.props.consumer.synchronizeAppleHealth) {
            const appleSteps = await this.getStepsFromAppleHealth();
            this.sendStepData(appleSteps);
        }
    }

    beautifyActivitiesForServer(steps, startDate, endDate) {
        startDate = new Date(startDate).getTime() - 10;
        endDate = new Date(endDate).getTime() + 10;
        if ((new Date()).getTime() < endDate) {
            endDate = (new Date()).getTime();
        }
        let activities = [];
        steps.forEach(day => {
            const dayDate = new Date(day.date).getTime();
            if (dayDate > startDate && dayDate < endDate) {
                const activity = {
                    date: day.date,
                    score: day.value,
                };
                activities.push(activity);
            }
        });
        return activities;
    }

    sendStepData(steps) {
        if (this.props.teams.teams.length > 0) {
            this.props.teams.teams.forEach(async team => {
                const activities = this.beautifyActivitiesForServer(steps, team.startDate, team.finishDate);
                const currentDate = (new Date()).getTime();
                const finishDate = (new Date(team.finishDate)).getTime();

                if (currentDate < finishDate && team.challengeType === 1) {
                    await this.props.sendChallengeData({
                        id: team.challengeId,
                        activities: activities,
                    }, this.props.consumer.token);
                    this.props.fetchTeam(team.teamId, this.props.consumer.token);
                }
            });
        }
    }

    getStepsFromAppleHealth() {
        return new Promise((resolve) => {
            appleHealthKit.getDailyStepCountSamples({
                startDate: new Date('2021-01-01').toISOString(),
                period: 24 * 60,
            },
            (err, results) => {
                if (err) {
                    resolve();
                }
                results = results.map(day => ({ date: day.startDate.split('T')[0], value: day.value }));
                resolve(results);
            });
        });
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    render() {

        if (this.state.tokenChecked) {
            return (
                <NavigationContainer>
                    <MainStackNavigator.Navigator screenOptions={{headerShown: false}}>
                        {this.props.consumer.token == null ? (
                            <>
                                <MainStackNavigator.Screen name='Login' component={LoginScreen}/>
                            </>
                        ) : (
                            <>
                                <MainStackNavigator.Screen name='Main' component={MainTabNavigator}/>
                            </>
                        )}
                    </MainStackNavigator.Navigator>
                </NavigationContainer>
            );
        } else {
            return (
                <Loading/>
            );
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
