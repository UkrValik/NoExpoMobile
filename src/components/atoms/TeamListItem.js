import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    TouchableNativeFeedback
} from 'react-native';
import { connect } from 'react-redux';
import Loading from '../atoms/Loading';
import colors from '../../styles/colors.json';
import { fetchTeam } from '../../redux/actions/ActionCreators';
import { AllHtmlEntities } from 'html-entities';

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

        const imageSize = Dimensions.get('screen').width / 3;

        if (this.state.loading) {
            return (
                <Loading/>
            );
        } else {
            return (
                <TouchableNativeFeedback onPress={() => this.moveToTeamScreen()}>
                    <View style={[styles.container, {height: imageSize}]}>
                        <Image
                            style={[styles.image, {width: imageSize, height: imageSize - 2}]}
                            source={{uri: 'https://gesundheit-dev.teamworking.de/wp-content/uploads/B%C3%BCrolympics-Go-for-gold-challenge-1090.jpg'}}
                            resizeMode='cover'
                            />
                        <View style={{marginLeft: '5%'}}>
                            <Text style={styles.teamName}>
                                {AllHtmlEntities.decode(this.props.team.teamName)}
                            </Text>
                            <Text style={styles.smallText}>
                                {AllHtmlEntities.decode(this.props.team.challengeName)}
                            </Text>
                            <Text style={styles.blueText}>
                                {'LAUFZEIT: ' + this.props.team.activityDays}
                            </Text>
                        </View>
                    </View>
                </TouchableNativeFeedback>
            );
        }
    }
}

const styles=StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 7,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 3,
    },
    image: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        marginLeft: 2,
        marginTop: 2,
    },
    blueText: {
        color: colors.mainColor,
        fontSize: 14,
        marginVertical: '2%',
    },
    smallText: {
        fontSize: 14,
        color: colors.textColor,
        marginVertical: '2%',
    },
    teamName: {
        fontSize: 16,
        fontWeight: '700',
        marginVertical: '2%',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamListItem);
