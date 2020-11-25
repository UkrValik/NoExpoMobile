import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TeamScreenIcon from '../atoms/TeamScreenIcon';
import colors from '../../styles/colors.json';

class TeamScreenIcons extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            // <View style={{flex: 0.3}}>
            //     <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginVertical: 10}}>
            //         <View style={{flex: 0.4, flexDirection: 'row', alignItems: 'center'}}>
            //             <Icon
            //                 type='material-community'
            //                 name='account-multiple'
            //                 size={60}
            //                 />
            //             <View style={{flex: 1, marginLeft: 5}}>
            //                 <Text style={{color: colors.mainColor}}>
            //                     {this.props.team.participants.length}
            //                 </Text>
            //                 <Text>
            //                     Active participants
            //                 </Text>
            //             </View>
            //         </View>
            //         <View style={{flex: 0.4, flexDirection: 'row', alignItems: 'center'}}>
            //             <Icon
            //                 type='material-community'
            //                 name='star-circle'
            //                 size={60}
            //                 />
            //             <View style={{flex: 1, flexDirection: 'column', marginLeft: 5}}>
            //                 <Text style={{color: colors.mainColor}}>
            //                     {this.props.team.rank} from {this.props.team.participants.length}
            //                 </Text>
            //                 <Text>
            //                     Your rank
            //                 </Text>
            //             </View>
            //         </View>
            //     </View>
            //     <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginVertical: 10}}>
            //         <View style={{flex: 0.4, flexDirection: 'row', alignItems: 'center'}}>
            //             <Icon
            //                 type='material-community'
            //                 name='timer'
            //                 size={60}
            //                 />
            //             <View style={{flex: 1, flexDirection: 'column', marginLeft: 5}}>
            //                 <Text style={{color: colors.mainColor}}>
            //                     {this.props.team.durationDays}
            //                 </Text>
            //                 <Text>
            //                     Duration
            //                 </Text>
            //             </View>
            //         </View>
            //         <View style={{flex: 0.4, flexDirection: 'row', alignItems: 'center'}}>
            //             <Icon
            //                 type='material-community'
            //                 name='flag-outline'
            //                 size={60}
            //                 />
            //             <View style={{flex: 1, flexDirection: 'column', marginLeft: 5}}>
            //                 <Text style={{color: colors.mainColor}}>
            //                     {this.props.team.endDate}
            //                 </Text>
            //                 <Text>
            //                     End date
            //                 </Text>
            //             </View>
            //         </View>
            //     </View>
            // </View>
            <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '10%'}}>
                    <TeamScreenIcon
                        iconName='account-multiple'
                        label='Active participants'
                        value={this.props.team.participants.length}
                        />
                    <TeamScreenIcon
                        iconName='medal'
                        label='Your rank'
                        value={this.props.team.rank + '/' + this.props.team.participants.length}
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
