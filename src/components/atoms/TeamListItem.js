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
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.setState({ loading: false });
        });
    }

    componentWillUnmount() {
        this._unsubscribe();
    }
    
    async moveToTeamScreen() {
        if (!this.props.team.participants) {
            this.setState({ loading: true });
            await this.props.fetchTeam(this.props.team.teamId, this.props.consumer.token);
        }
        this.props.navigation.navigate('Team', { teamId: this.props.team.teamId });
    }

    render() {

        const beatifyName = (teamName, category) => {
            teamName = AllHtmlEntities.decode(teamName);
            if (teamName.length > 20) {
                teamName = teamName.substr(0, 17) + '...';
            }
            if (teamName === '' && category === 'team') {
                teamName = 'Your team';
            }
            return teamName;
        }

        if (this.state.loading) {
            return (
                <Loading/>
            );
        } else if (this.props.team.status === 1) {

            const imageSize = Dimensions.get('screen').width / 3;

            if (this.props.listType === 1) {
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
                                    {beatifyName(this.props.team.teamName, 'team')}
                                </Text>
                                <Text style={styles.smallText}>
                                    {beatifyName(this.props.team.challengeName, 'challenge')}
                                </Text>
                                <Text style={styles.blueText}>
                                    {'LAUFZEIT: ' + (this.props.team.activityDays === undefined ?
                                        '?'
                                    :
                                        this.props.team.activityDays)
                                    }
                                </Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                );
            } else if (this.props.listType === 2) {

                const imageSize = Dimensions.get('screen').width / 20 * 9;

                return (
                    <TouchableNativeFeedback onPress={() => this.moveToTeamScreen()}>
                        <View style={styles.container2}>
                            <Image
                                style={[styles.image2, {width: imageSize, height: imageSize - 2}]}
                                source={{uri: 'https://gesundheit-dev.teamworking.de/wp-content/uploads/B%C3%BCrolympics-Go-for-gold-challenge-1090.jpg'}}
                                resizeMode='cover'
                                />
                            <View style={styles.textBlock2}>
                                <Text style={styles.teamName}>
                                    {beatifyName(this.props.team.teamName, 'team')}
                                </Text>
                                <Text style={styles.smallText}>
                                    {beatifyName(this.props.team.challengeName, 'challenge')}
                                </Text>
                                <Text style={styles.blueText}>
                                    {'LAUFZEIT: ' + (this.props.team.activityDays === undefined ?
                                        '?'
                                    :
                                        this.props.team.activityDays)
                                    }
                                </Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                );
            }
        } else {
            return (<></>);
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
        marginRight: 2,
        marginTop: 2,
    },
    image2: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
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
    container2: {
        margin: 4,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 3,
    },
    textBlock2: {
        marginLeft: '5%',
        marginVertical: '5%',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamListItem);
