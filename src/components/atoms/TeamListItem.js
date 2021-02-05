import React from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    TouchableNativeFeedback,
    Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { AllHtmlEntities } from 'html-entities';
import { BoxShadow } from 'react-native-shadow';
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

            const imageSize = Dimensions.get('screen').width / 31 * 10;

            const shadowOpt = {
                width: imageSize * 3 - 20,
                height: imageSize,
                color: '#eee',
                border: 8,
                radius: 10,
                opacity: 0.65,
                x: 2,
                y: 3.5,
                style: {alignSelf: 'center', justifyContent: 'center', marginVertical: 8.5},
            };

            if (this.props.listType === 1) {
                return (
                    <BoxShadow setting={shadowOpt}>
                        <TouchableNativeFeedback onPress={() => this.moveToTeamScreen()} style={{width: shadowOpt.width, height: shadowOpt.height}}>
                            <View style={[styles.topContainer, Platform.OS === 'ios' ? {backgroundColor: colors.mainBgColor} : {width: shadowOpt.width, height: shadowOpt.height, borderBottomWidth: 0.7, borderBottomColor: '#ededed', borderBottomRightRadius: 10, borderRightColor: '#eee', borderRightWidth: 0.6} ]}>
                                <View style={[styles.container]}>
                                    <Image
                                        style={[styles.image, {width: imageSize, height: imageSize}]}
                                        source={{uri: 'https://gesundheit-dev.teamworking.de/wp-content/uploads/B%C3%BCrolympics-Go-for-gold-challenge-1090.jpg'}}
                                        resizeMode='cover'
                                        />
                                    <View style={{marginLeft: '5%', flex: 1}}>
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
                            </View>
                        </TouchableNativeFeedback>
                    </BoxShadow>
                );
            } else if (this.props.listType === 2) {

                const imageSize = Dimensions.get('screen').width / 20 * 9;

                const shadowOpt = {
                    width: imageSize - 5,
                    height: imageSize * 100 / 59,
                    color: '#eee',
                    border: 8,
                    radius: 10,
                    opacity: 0.65,
                    x:0,
                    y:3.5,
                    style: {alignSelf: 'center', justifyContent: 'center', marginVertical: 8.5},
                };

                return (
                    <BoxShadow setting={shadowOpt}>
                        <TouchableNativeFeedback onPress={() => this.moveToTeamScreen()}>
                            <View style={[styles.topContainer2, Platform.OS === 'ios' ? {backgroundColor: colors.mainBgColor} : {width: shadowOpt.width, height: shadowOpt.height, borderColor: '#ededed', borderBottomWidth: 0.5, borderLeftWidth: 0.5, borderRightWidth: 0.5, borderBottomRightRadius: 10, borderBottomLeftRadius: 10} ]}>
                                <View style={styles.container2}>
                                    <Image
                                        style={[styles.image2, {width: imageSize, height: imageSize}]}
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
                            </View>
                        </TouchableNativeFeedback>
                    </BoxShadow>
                );
            }
        } else {
            return (<></>);
        }
    }
}

const styles = StyleSheet.create({
    topContainer: {
        alignSelf: 'center',
        // elevation: 3,
        marginVertical: 5,
        marginHorizontal: 10,
        borderTopLeftRadius: 10.1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        shadowOffset: {
            width: 2,
            height: 3,
            
        },
        shadowOpacity: 0.5,
        shadowColor: '#000',
        shadowRadius: 4,
        backgroundColor: colors.mainBgColor,
        overflow: 'hidden',
    },
    container: {
        flexDirection: 'row',
        margin: 1.5,
        alignItems: 'center',
    },
    image: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        margin: Platform.OS === 'ios' ? -2 : -1,
        marginTop: Platform.OS === 'ios' ? -2 : -1,
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
    topContainer2: {
        // elevation: 3,
        marginVertical: 4,
        borderTopLeftRadius: 10.1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        shadowOffset: {
            width: 2,
            height: 3,
            
        },
        shadowOpacity: 0.5,
        shadowColor: '#000',
        shadowRadius: 4,
        backgroundColor: colors.mainBgColor,
        overflow: 'hidden',
    },
    container2: {
        margin: 1.5,
        alignItems: 'center',
    },
    image2: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        margin: Platform.OS === 'ios' ? -2 : 0,
        marginRight: Platform.OS === 'ios' ? -2 : 1,
        marginTop: Platform.OS === 'ios' ? -2 : -1,
    },
    textBlock2: {
        marginLeft: '5%',
        marginVertical: '5%',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamListItem);
