import React from 'react';
import { Platform } from 'react-native';
import { View, Image, ImageBackground } from 'react-native';
import TeamScreenIconText from '../atoms/TeamScreenIconText';

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

        const paddingTop = Platform.OS === 'ios' ? 60 : 50;

        return (
            <ImageBackground
                source={require('../../assets/background-white-small.png')}
                resizeMode='cover'
                style={{flex: 1, marginHorizontal: '-5%', paddingTop: '25%', paddingBottom: '40%'}}
                >
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
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
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '20%'}}>
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
            </ImageBackground>
        );
    }
}

export default TeamScreenIcons;
