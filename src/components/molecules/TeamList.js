import React from 'react';
import { View } from 'react-native';
import TeamListItem from '../atoms/TeamListItem';

class TeamList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.teams) {
            return (
                <View style={{marginTop: 0}}>
                    {this.props.teams.map(team => (<TeamListItem key={team.teamId} team={team} navigation={this.props.navigation}/>))}
                </View>
            );
        } else {
            return (
                <></>
            );
        }
    }
}

export default TeamList;
