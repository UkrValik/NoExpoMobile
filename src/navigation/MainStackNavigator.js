import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import Loading from '../components/atoms/Loading';
import MainScreen from '../containers/MainScreen';
import AccountScreen from '../containers/AccountScreen';
import TeamScreen from '../containers/TeamScreen';
import RatingScreen from '../containers/RatingScreen';
import LoginScreen from '../containers/LoginScreen';
import {
    fetchTokenValid,
    addSteps,
    updateConsumerScores,
    sendChallengeData,
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
                                // console.log(authResult);
                            })
                            .catch(err => {
                                // console.log(err);
                            });
                    }
                });
        }
        this.intervalCallback();
        this._interval = setInterval(this.intervalCallback, this._intervalDuration);
    }

    async intervalCallback() {
        if (GoogleFit.isAuthorized && this.props.consumer.synchronizeGoogleFit) {
            const steps = await GoogleFit.getDailyStepCountSamples({
                startDate: new Date('2018-05-05').toISOString(),
                endDate: new Date().toISOString(),
            });
            await this.props.addSteps(steps[1].steps);
            if (this.props.teams.teams.length > 0) {
                for (let team of this.props.teams.teams) {
                    await this.props.updateConsumerScores(team.teamId, this.props.consumer.steps, team.startDate, team.endDate);
                }
                setTimeout(() => {
                    for (let team of this.props.teams.teams) {
                        const data = {
                            id: team.challengeId,
                            activities: team.scores,
                        };
                        this.props.sendChallengeData(data, this.props.consumer.token);
                    }
                });
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    render() {

        if (this.state.tokenChecked) {
            return (
                <NavigationContainer>
                    <MainStackNavigator.Navigator>
                        {this.props.consumer.token == null ? (
                            <>
                                <MainStackNavigator.Screen name='Login' component={LoginScreen}/>
                            </>
                        ) : (
                            <>
                                <MainStackNavigator.Screen name='Main' component={MainScreen}/>
                                <MainStackNavigator.Screen name='Account' component={AccountScreen}/>
                                <MainStackNavigator.Screen name='Team' component={TeamScreen}/>
                                <MainStackNavigator.Screen name='Rating' component={RatingScreen}/>
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
