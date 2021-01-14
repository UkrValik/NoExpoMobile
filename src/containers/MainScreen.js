import React from 'react';
import { StyleSheet,
    View,
    Text,
    Modal,
    TouchableOpacity,
    RefreshControl,
    ImageBackground
} from 'react-native';
import { connect } from 'react-redux';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import HeaderMainScreen from '../components/atoms/HeaderMainScreen';
import TeamList from '../components/molecules/TeamList';
import Loading from '../components/atoms/Loading';
import ListTypeButton from '../components/atoms/ListTypeButton';
import colors from '../styles/colors.json';
import {
    fetchTeams,
    fetchTeam,
    makeFirstLogin,
    toggleGoogleFit,
    addSteps,
    fetchConsumer,
    chooseListType,
} from '../redux/actions/ActionCreators';
import { ScrollView } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

const mapDispatchToProps = dispatch => ({
    fetchTeams: async (token) => dispatch(fetchTeams(token)),
    fetchTeam: async (teamId, token) => dispatch(fetchTeam(teamId, token)),
    makeFirstLogin: () => dispatch(makeFirstLogin()),
    toggleGoogleFit: () => dispatch(toggleGoogleFit()),
    addSteps: (steps) => dispatch(addSteps(steps)),
    fetchConsumer: (token) => dispatch(fetchConsumer(token)),
    chooseListType: (type) => dispatch(chooseListType(type)),
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
        };

        this.ref = React.createRef();
        this.navigateToAccount = this.navigateToAccount.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.setListType = this.setListType.bind(this);
    }

    async componentDidMount() {
        this.props.navigation.setOptions({
            headerShown: false,
        });
        this._unsubscribe = this.props.navigation.addListener('focus', async () => {
            this.props.fetchConsumer(this.props.consumer.token);
            const teams = await this.props.fetchTeams(this.props.consumer.token);
            console.log(teams);
            for (let team of teams.payload) {
                this.props.fetchTeam(team.teamId, this.props.consumer.token);
            }
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    navigateToAccount() {
        this.props.navigation.navigate('Account');
    }

    modalButtonNo() {
        this.props.makeFirstLogin();
    }

    setListType(type) {
        this.setState({ listType: type });
        this.props.chooseListType(type);
    }

    async modalButtonYes() {
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
                    if (authResult.success) {
                        this.setState({ authorized: true });
                    }
                })
                .then(async () => {
                    const steps = await GoogleFit.getDailyStepCountSamples({
                        startDate: new Date('2018-05-05').toISOString(),
                        endDate: new Date().toISOString(),
                    });
                    this.props.addSteps(steps[1].steps);
                    this.props.makeFirstLogin();
                    this.props.toggleGoogleFit();
                })
                .catch(err => {
                    // console.log(err);
                });
        }
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
        return (
            <View style={styles.container}>
                <Modal
                    visible={this.props.consumer.firstLogin}
                    presentationStyle='fullScreen'
                    >
                    <ImageBackground
                        source={require('../assets/background-white.png')}
                        style={styles.modal}
                        resizeMode='cover'
                        >
                        <Text style={styles.text}>
                            Collect your google fit data automatically?
                        </Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <TouchableOpacity onPress={() => this.modalButtonNo()}>
                                <Text style={styles.button}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.modalButtonYes()}>
                                <Text style={styles.button}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </Modal>
                <HeaderMainScreen navigateToAccount={this.navigateToAccount}/>
                <View style={{marginHorizontal: '3.5%', flexDirection: 'row', marginVertical: '5%', alignItems: 'center', justifyContent: 'space-around'}}>
                    <View style={{flex: 4}}>
                        <ListTypeButton 
                            style={{flex: 10}}
                            buttonType={1} 
                            listType={this.state.listType} 
                            setListType={this.setListType}
                            />
                    </View>
                    <View style={{flex: 4}}>
                        <ListTypeButton 
                            style={{flex: 10}}
                            buttonType={2} 
                            listType={this.state.listType} 
                            setListType={this.setListType}
                            />
                    </View>
                    <Text style={styles.textTeams}>
                        TEAMS
                    </Text>
                    <View style={{flex: 4}}/>
                    <View style={{flex: 4}}/>
                </View>
                {this.props.teams.teams && this.props.teams.teams.length === 0 ? (<Loading/>) : (
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refresh}
                                onRefresh={this.onRefresh}
                                colors={[colors.mainColor]}
                                />
                        }
                        >
                        <TeamList
                            teams={this.props.teams.teams}
                            navigation={this.props.navigation}
                            listType={this.state.listType}
                            />
                    </ScrollView>
                )}
                {/* <View style={{padding: 10, margin: 10, elevation: 3, alignSelf: 'center', backgroundColor: colors.mainBgColor}}>
                    <Text>
                        Hello
                    </Text>
                </View> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: colors.mainBgColor,
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
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
