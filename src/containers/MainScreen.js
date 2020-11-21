import React from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import TeamList from '../components/organisms/TeamList';
import colors from '../styles/colors.json';
import { connect } from 'react-redux';
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
    }

    async componentDidMount() {
        this.props.navigation.setOptions({
            title: 'Main',
            headerStyle: {
                backgroundColor: colors.mainBgColor,
                borderBottomColor: colors.mainColor,
                borderBottomWidth: 5,
                elevation: 0,
            },
            headerTintColor: colors.textColor,
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center'
            },
            headerRight: () => (
                <Icon
                    type='material-community'
                    name='account'
                    containerStyle={{flex: 1, justifyContent: 'center',marginRight: 10}}
                    color={colors.mainColor}
                    size={26}
                    onPress={() => this.props.navigation.navigate('Account')}
                    />
            ),
            headerLeft: () => (
                <View></View>
            )
        });
        const teams = await this.props.fetchTeams(this.props.consumer.token);
        for (let team of teams.payload) {
            await this.props.fetchTeam(team.teamId, this.props.consumer.token);
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <TeamList teams={this.props.teams.teams} navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: colors.mainBgColor,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
