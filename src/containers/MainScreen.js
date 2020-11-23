import React from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, View, Text } from 'react-native';
import { connect } from 'react-redux';
import HeaderMainScreen from '../components/atoms/HeaderMainScreen';
import TeamList from '../components/molecules/TeamList';
import colors from '../styles/colors.json';
import { fetchTeams, fetchTeam } from '../redux/actions/ActionCreators';

const mapDispatchToProps = dispatch => ({
    fetchTeams: async (token) => dispatch(fetchTeams(token)),
    fetchTeam: async (teamId, token) => dispatch(fetchTeam(teamId, token)),
});

const mapStateToProps = state => {
    console.log(state);
    return {
        teams: state.teams,
        consumer: state.consumer,
    };
};

class MainScreen extends React.Component {

    constructor(props) {
        super(props);

        this.navigateToAccount = this.navigateToAccount.bind(this);
    }

    async componentDidMount() {
        this.props.navigation.setOptions({
            headerShown: false,
        });
        const teams = await this.props.fetchTeams(this.props.consumer.token);
        for (let team of teams.payload) {
            await this.props.fetchTeam(team.teamId, this.props.consumer.token);
        }
    }

    navigateToAccount() {
        this.props.navigation.navigate('Account');
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderMainScreen navigateToAccount={this.navigateToAccount}/>
                <Text style={styles.textTeams}>
                    TEAMS
                </Text>
                <TeamList teams={this.props.teams.teams} navigation={this.props.navigation}/>
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
        alignSelf: 'center',
        paddingVertical: '3%',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
