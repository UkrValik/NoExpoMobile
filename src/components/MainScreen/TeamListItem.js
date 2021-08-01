import React from 'react';
import {
    Text,
    View,
    Image,
    Dimensions,
    TouchableNativeFeedback,
    Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { AllHtmlEntities } from 'html-entities';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import colors from '../../styles/colors.json';
import { fetchTeam } from '../../redux/actions/ActionCreators';
import icomoonConfig from '../../styles/selection.json';

const Icon = createIconSetFromIcoMoon(icomoonConfig);

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
            if (teamName.length > 50) {
                teamName = teamName.substr(0, 50) + '...';
            }
            if (teamName === '' && category === 'team') {
                teamName = 'Your team';
            }
            return teamName;
        }

        let statusColor = colors.mainColor;
        if (this.props.team.statusCode === 'done') {
            statusColor = colors.altColor;
        } else if (this.props.team.statusCode === 'action') {
            statusColor = colors.actionColor;
        }

        return (
            <TouchableNativeFeedback
                onPress={() => this.moveToTeamScreen()}
                >
                <View
                    style={{
                        marginBottom: '5%',
                        //borderBottomWidth: 2,
                        paddingBottom: '1%',
                        borderColor: colors.gray,
                        backgroundColor: '#FFF',
                    }}>
                    <Image
                        source={{uri: this.props.team.challengeImage}}
                        resizeMode='cover'
                        style={{
                            width: '100%',
                            aspectRatio: this.props.team.challengeImage ? 2.8 : 100000,
                            justifyContent: 'flex-end',
                            backgroundColor: colors.midgray,
                        }}
                        >
                    </Image>
                    <View
                        style={{
                            backgroundColor: statusColor,
                            paddingVertical: '2%',
                            marginTop: -1,
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                color: colors.mainBgColor,
                            }}>
                            {this.props.team.statusText}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: '3%',
                        }}>
                        <Icon
                            name='end-date'
                            size={30}
                            color={colors.gray}
                            style={{
                                marginLeft: '3%',
                            }}
                            />
                        <Text
                            style={{
                                marginLeft: '3%',
                                fontSize: 18,
                                color: colors.textColor,
                            }}>
                            {beatifyName(this.props.team.teamName, 'team')}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: '3%',
                        }}>
                        <Icon
                            name='calendar'
                            size={30}
                            color={colors.gray}
                            style={{
                                marginLeft: '3%',
                            }}
                            />
                        <Text
                            style={{
                                fontSize: 18,
                                marginLeft: '3%',
                                color: colors.textColor,
                            }}>
                            {beatifyName(this.props.team.challengeName, 'challenge')}
                        </Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamListItem);
