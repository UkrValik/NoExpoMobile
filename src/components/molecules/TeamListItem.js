import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import Loading from '../atoms/Loading';
import colors from '../../styles/colors.json';
import { fetchTeam } from '../../redux/actions/ActionCreators';

const mapStateToProps = (state) => {
    return {
        teams: state.teams,
        consumer: state.consumer,
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchTeam: async (teamId, token) => dispatch(fetchTeam(teamId, token)),
});

class TeamListItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };
    }

    componentDidMount() {
        this._unsibscribe = this.props.navigation.addListener('focus', () => {
            this.setState({ loading: false });
        });
    }

    componentWillUnmount() {
        this._unsibscribe();
    }
    
    async moveToTeamScreen() {
        if (!this.props.team.participants) {
            this.setState({ loading: true });
            await this.props.fetchTeam(this.props.team.teamId, this.props.consumer.token);
        }
        this.props.navigation.navigate('Team', { teamId: this.props.team.teamId });
    }

    render() {
        if (this.state.loading) {
            return (
                <Loading/>
            );
        } else {
            return (
                <View style={styles.container}>
                    <Icon
                        containerStyle={styles.iconContainer}
                        type='material-community'
                        name='food-apple-outline'
                        size={30}
                        color={colors.yellowgreen}
                        />
                    <View style={styles.textGroup1}>
                        <Text style={styles.smallText}>
                            {this.props.team.challengeName}
                        </Text>
                        <Text style={styles.bigText}>
                            {this.props.team.teamName}
                        </Text>
                    </View>
                    <View style={styles.textGroup2}>
                        <Text style={styles.smallText}>
                            Laufzeit
                        </Text>
                        <Text style={styles.bigText}>
                            {this.props.team.activityDays}
                        </Text>
                    </View>
                    <Icon
                        containerStyle={styles.iconContainer}
                        type='material-community'
                        name='chevron-right'
                        size={30}
                        color={colors.yellowgreen}
                        onPress={() => this.moveToTeamScreen()}
                        />
                </View>
            );
        }
    }
}

const styles=StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'row', 
        // marginHorizontal: '3%',
        marginVertical: '1%', 
        backgroundColor: colors.lightgray, 
        padding: '1%', 
        borderTopColor: colors.yellowgreen, 
        borderTopWidth: 5,
    },
    iconContainer: {
        justifyContent: 'center', 
        flex: 1,
    },
    textGroup1: {
        flex: 5, 
        flexDirection: 'column', 
        justifyContent: 'center'
    },
    textGroup2: {
        flex: 2, 
        flexDirection: 'column', 
        justifyContent: 'center',
    },
    smallText: {
        fontSize: 12,
        color: colors.textColor,
    },
    bigText: {
        fontSize: 16,
        color: colors.textColor,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamListItem);
