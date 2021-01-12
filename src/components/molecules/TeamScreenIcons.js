import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import TeamScreenIconText from '../atoms/TeamScreenIconText';
import colors from '../../styles/colors.json';

class TeamScreenIcons extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        let activeParticipants = 0;
        for (let consumer of this.props.team.participants) {
            if (consumer.status === 1) {
                activeParticipants++;
            }
        }

        const beatifyDate = (date) => {
            const dateParts = date.split('-').reverse();
            return dateParts.join('.');
        }

        return (
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '10%'}}>
                    <View>
                        <Image
                            source={require('../../assets/participants.png')}
                            resizeMode='contain'
                            style={{width: 130, height: 130}}
                            />
                        <TeamScreenIconText
                            label='Active participants'
                            value={activeParticipants}
                            />
                    </View>
                    {/* <TeamScreenIcon
                        iconName='rank.png'
                        label='Your rank'
                        value={this.props.team.rank + '/' + activeParticipants}
                        /> */}
                    <View>
                        <Image
                            source={require('../../assets/rank.png')}
                            resizeMode='contain'
                            style={{width: 130, height: 130}}
                            />
                        <TeamScreenIconText
                            label='Your rank'
                            value={this.props.team.rank + '/' + activeParticipants}
                            />
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '10%'}}>
                    <View>
                        <Image
                            source={require('../../assets/duration.png')}
                            resizeMode='contain'
                            style={{width: 130, height: 130}}
                            />
                        <TeamScreenIconText
                            label='Duration'
                            value={this.props.team.activityDays}
                            />
                    </View>
                    <View>
                        <Image
                            source={require('../../assets/end-date.png')}
                            resizeMode='contain'
                            style={{width: 130, height: 130}}
                            />
                        <TeamScreenIconText
                            label='End date'
                            value={beatifyDate(this.props.team.endDate)}
                            />
                    </View>
                </View>
            </View>
        );
    }
}

export default TeamScreenIcons;
