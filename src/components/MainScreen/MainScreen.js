import React from 'react';
import { StyleSheet,
    View,
    Text,
    Modal,
    TouchableOpacity,
    RefreshControl,
    SafeAreaView,
    Dimensions,
    TouchableNativeFeedback,
    Platform,
    StatusBar,
    BackHandler,
    TouchableWithoutFeedback,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import HeaderMainScreen from './HeaderMainScreen';
import TeamList from './TeamList';
import colors from '../../styles/colors.json';
import {
    fetchTeams,
    fetchTeam,
    makeFirstLogin,
    toggleGoogleFit,
    addSteps,
    fetchConsumer,
} from '../../redux/actions/ActionCreators';
import selection from '../../styles/selection.json';
import { ActivityIndicator } from 'react-native';

const Icon = createIconSetFromIcoMoon(selection);

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

class MainScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            refresh: false,
            listType: this.props.consumer.listType,
            processingAuth: false,
            authDone: false,
            authResult: null,
            showReceivedStepsModal: false,
            receivedStepsModalAlreadyShown: false,
            fetchingTeams: false,
        };

        this.ref = React.createRef();
        this.onRefresh = this.onRefresh.bind(this);
    }

    async componentDidMount() {
        this.props.navigation.setOptions({
            headerShown: false,
        });

        this._unsubscribe = this.props.navigation.addListener('focus', async () => {
            this.props.fetchConsumer(this.props.consumer.token);
            this.setState({ fetchingTeams: true });
            const teams = await this.props.fetchTeams(this.props.consumer.token);
            this.setState({ fetchingTeams: false });
            for (let team of teams.payload) {
                this.props.fetchTeam(team.teamId, this.props.consumer.token);
            }

            if (!this.props.consumer.receivedStepsFromGF && this.props.consumer.synchronizeGoogleFit && !this.state.receivedStepsModalAlreadyShown) {
                this.setState({
                    showReceivedStepsModal: true,
                    receivedStepsModalAlreadyShown: true,
                });
            }

            // BackHandler.addEventListener('hardwareBackPress', () => BackHandler.exitApp());
        });

        // this.unsubscribeBlur = this.props.navigation.addListener('blur', () => {
        //     BackHandler.removeEventListener('hardwareBackPress');
        // });

        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor(colors.mainColor+'ee');
    }

    componentWillUnmount() {
        this._unsubscribe();
        // this.unsubscribeBlur();
    }

    async onRefresh() {
        this.setState({ refresh: true });
        const teams = await this.props.fetchTeams(this.props.consumer.token);
        for (let team of teams.payload) {
            this.props.fetchTeam(team.teamId, this.props.consumer.token);
        }
        this.setState({ refresh: false });
    }

    render() {

        const compareDates = (d1, d2) => {
            return d1.getTime() < d2.getTime();
        }

        let paddingTop = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
        const activeTeams = this.props.teams.teams.filter(team => 
            compareDates(new Date(team.startDate), new Date()) && compareDates(new Date(), new Date(team.endDate))
        );

        return (
            <View style={styles.container}>
                <SafeAreaView style={{backgroundColor: colors.mainColor + 'ee'}} />
                <SafeAreaView
                    style={{
                        paddingTop: paddingTop,
//                         backgroundColor: colors.mainColor,
                        borderBottomRightRadius: 15,
                        borderBottomLeftRadius: 15,
                    }}>
                    <HeaderMainScreen/>
                </SafeAreaView>
                {(this.state.fetchingTeams || this.props.teams.loadingTeams) && activeTeams.length === 0 ? 
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
                    activeTeams.length === 0 ? 
                    (
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    fontSize: 20,
                                    marginBottom: '10%',
                                    color: colors.textColor,
                                }}>
                                Sie haben derzeit keine aktiven Challenges.
                            </Text>
                            <TouchableWithoutFeedback
                                onPress={() => this.props.navigation.navigate('Challenges')}
                                >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        padding: 10,
                                        marginBottom: '10%',
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            marginRight: 10,
                                            color: colors.textColor,
                                        }}>
                                        Alle Challenges
                                    </Text>
                                    <Icon
                                        name='arrow-right'
                                        size={14}
                                        color={colors.textColor}
                                        />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    ) : (
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refresh}
                                    onRefresh={this.onRefresh}
                                    colors={[colors.mainColor]}
                                    />
                            }>
                            <TeamList
                                teams={this.props.teams.teams}
                                navigation={this.props.navigation}
                                />
                        </ScrollView>
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.lightgray,
    },
    textTeams: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.mainColor,
        paddingVertical: '3%',
        flex: 10,
        textAlign: 'center',
    },
    modal: {
        width: Dimensions.get('screen').width + 30,
        height: Dimensions.get('screen').height - 20,
        position: 'absolute',
        left: -15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    teamsHeaderContainer: {
        marginHorizontal: '3.5%',
        flexDirection: 'row',
        marginVertical: '5%',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: colors.mainBgColor,
    },
    button: {
        color: colors.mainBgColor,
        backgroundColor: colors.mainColor,
        borderRadius: 10,
        elevation: 5,
        marginTop: 20,
        padding: 10,
        fontSize: 14,
        marginHorizontal: 50,
    },
    text: {
        color: colors.mainBgColor,
        fontSize: 16,
        padding: 10,
        backgroundColor: colors.altColor,
        borderRadius: 10,
    },
    modalButton: {
        backgroundColor: colors.altColor,
        paddingVertical: '5%',
        marginHorizontal: '5%',
        borderRadius: 10,
        elevation: 5,
    },
    modalButtonText: {
        textAlign: 'center',
        fontSize: 16,
        color: colors.mainBgColor,
    },
    modalLabel: {
        color: colors.mainBgColor,
        backgroundColor: colors.mainColor,
        paddingVertical: '5%',
        marginHorizontal: '5%',
        fontSize: 20,
        borderRadius: 10,
        textAlign: 'center',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
