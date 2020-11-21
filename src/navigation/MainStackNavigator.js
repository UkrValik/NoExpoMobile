import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import MainScreen from '../containers/MainScreen';
import AccountScreen from '../containers/AccountScreen';
import TeamScreen from '../containers/TeamScreen';
import RatingScreen from '../containers/RatingScreen';
import LoginScreen from '../containers/LoginScreen';
import { fetchTokenValid, addSteps } from '../redux/actions/ActionCreators';

const mapStateToProps = state => {
    return {
        consumer: state.consumer,
    };
};

const mapDispatchToProps = dispatch => ({
    fetchTokenValid: async (token) => dispatch(fetchTokenValid(token)),
    addSteps: (steps) => dispatch(addSteps(steps)),
});

const MainStackNavigator = createStackNavigator();

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const token = await this.props.fetchTokenValid(this.props.consumer.token);

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
        this.interval = setInterval(async () => {
            if (GoogleFit.isAuthorized && this.props.consumer.synchronizeGoogleFit) {
                const steps = await GoogleFit.getDailyStepCountSamples({
                    startDate: new Date('2018-05-05').toISOString(),
                    endDate: new Date().toISOString(),
                });
                this.props.addSteps(steps[1].steps);
            }
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
