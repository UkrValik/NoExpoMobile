import React from 'react';
import { View, Dimensions } from 'react-native';
import TeamListItem from '../atoms/TeamListItem';

class TeamList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.teams) {
            if (this.props.listType === 1) {
                return (
                    <View style={{marginBottom: 10}}>
                        {this.props.teams.map(team => (
                            <TeamListItem 
                                key={team.teamId} 
                                team={team} 
                                navigation={this.props.navigation}
                                listType={this.props.listType}
                                />
                        ))}
                    </View>
                );
            } else if (this.props.listType === 2) {

                const teamPairs = [];
                for (let i = 0; i < this.props.teams.length; i += 2) {
                    if (i + 1 < this.props.teams.length) {
                        teamPairs.push([this.props.teams[i], this.props.teams[i + 1]]);
                    } else {
                        teamPairs.push([this.props.teams[i]]);
                    }
                } 

                return (
                    <View>
                        {teamPairs.map(pair => (
                            <View key={pair[0].teamId} style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                <TeamListItem
                                    team={pair[0]} 
                                    navigation={this.props.navigation}
                                    listType={this.props.listType}
                                    />
                                {pair.length === 2 ? 
                                    <TeamListItem
                                        team={pair[1]} 
                                        navigation={this.props.navigation}
                                        listType={this.props.listType}
                                        /> 
                                : 
                                    <View style={{width: Dimensions.get('screen').width / 20 * 9 + 7}}/>
                                }
                            </View>
                        ))}
                    </View>
                );
            }
        } else {
            return (
                <></>
            );
        }
    }
}

export default TeamList;
