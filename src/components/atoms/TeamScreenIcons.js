import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../styles/colors.json';

class TeamScreenIcons extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 0.3}}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginVertical: 10}}>
                    <View style={{flex: 0.4, flexDirection: 'row', alignItems: 'center'}}>
                        <Icon
                            type='material-community'
                            name='account-multiple'
                            size={60}
                            />
                        <View style={{flex: 1, marginLeft: 5}}>
                            <Text style={{color: colors.mainColor}}>
                                {this.props.team.participants.length}
                            </Text>
                            <Text>
                                Active participants
                            </Text>
                        </View>
                    </View>
                    <View style={{flex: 0.4, flexDirection: 'row', alignItems: 'center'}}>
                        <Icon
                            type='material-community'
                            name='star-circle'
                            size={60}
                            />
                        <View style={{flex: 1, flexDirection: 'column', marginLeft: 5}}>
                            <Text style={{color: colors.mainColor}}>
                                {this.props.team.rank} from {this.props.team.participants.length}
                            </Text>
                            <Text>
                                Your rank
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginVertical: 10}}>
                    <View style={{flex: 0.4, flexDirection: 'row', alignItems: 'center'}}>
                        <Icon
                            type='material-community'
                            name='timer'
                            size={60}
                            />
                        <View style={{flex: 1, flexDirection: 'column', marginLeft: 5}}>
                            <Text style={{color: colors.mainColor}}>
                                {this.props.team.durationDays}
                            </Text>
                            <Text>
                                Duration
                            </Text>
                        </View>
                    </View>
                    <View style={{flex: 0.4, flexDirection: 'row', alignItems: 'center'}}>
                        <Icon
                            type='material-community'
                            name='flag-outline'
                            size={60}
                            />
                        <View style={{flex: 1, flexDirection: 'column', marginLeft: 5}}>
                            <Text style={{color: colors.mainColor}}>
                                {this.props.team.endDate}
                            </Text>
                            <Text>
                                End date
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default TeamScreenIcons;
