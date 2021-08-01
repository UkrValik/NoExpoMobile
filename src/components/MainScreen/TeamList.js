import React from 'react';
import { View, Dimensions } from 'react-native';
import TeamListItem from './TeamListItem';

class TeamList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.teams) {
            return (
                <View style={{marginTop: '3%'}}>
                    {this.props.teams.map(team =>
                        <TeamListItem
                            key={team.teamId}
                            team={team}
                            navigation={this.props.navigation}
                            listType={this.props.listType}
                            />
                    )}
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
