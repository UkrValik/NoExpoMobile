import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TeamScreenIcon from '../atoms/TeamScreenIcon';
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

        return (
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '10%'}}>
                    <TeamScreenIcon
                        iconName='account-multiple'
                        label='Active participants'
                        value={activeParticipants}
                        />
                    <TeamScreenIcon
                        iconName='medal'
                        label='Your rank'
                        value={this.props.team.rank + '/' + activeParticipants}
                        />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '10%'}}>
                    <TeamScreenIcon
                        iconName='timelapse'
                        label='Duration'
                        value={this.props.team.activityDays}
                        />
                    <TeamScreenIcon
                        iconName='flag-outline'
                        label='End date'
                        value={this.props.team.endDate.split('-').join('.')}
                        />
                </View>
            </View>
        );
    }
}

export default TeamScreenIcons;
