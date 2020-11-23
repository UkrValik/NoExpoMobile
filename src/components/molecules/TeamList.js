import React from 'react';
import { ScrollView } from 'react-native';
import TeamListItem from '../atoms/TeamListItem';

class TeamList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView style={{marginTop: 0}}>
                {this.props.teams.map(team => (<TeamListItem key={team.teamId} team={team} navigation={this.props.navigation}/>))}
            </ScrollView>
        );
    }
}

export default TeamList;
