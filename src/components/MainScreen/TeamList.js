import React from 'react';
import { View, Dimensions } from 'react-native';
import TeamListItem from './TeamListItem';

class TeamList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const compareDates = (d1, d2) => {
            d1 = new Date(d1.toDateString());
            d2 = new Date(d2.toDateString());
            return d1.getTime() <= d2.getTime();
        }

        if (this.props.teams) {
            return (
                <View style={{marginTop: '3%',}}>
                    {this.props.teams.map(team =>
                        compareDates(new Date(team.startDate), new Date()) &&
                        compareDates(new Date(), new Date(team.endDate)) ? (
                        <TeamListItem
                            key={team.teamId}
                            team={team}
                            navigation={this.props.navigation}
                            listType={this.props.listType}
                            />
                    ) : (
                        <View key={team.teamId}></View>
                    ))}
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
