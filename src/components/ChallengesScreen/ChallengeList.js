import React from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import colors from '../../styles/colors.json';
import ChallengeItem from './ChallengeItem';

class ChallengeList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.teams) {
            return (
                <ScrollView
                    ref={this.props.scrollRef}
                    style={{
                        width: '100%',
                    }}>
                    <View
                        style={{
                            marginTop: '3%',
                            // backgroundColor: colors.gray,
                        }}>
                        {this.props.teams.map(team => (
                            <ChallengeItem
                                key={team.teamId}
                                team={team}
                                navigation={this.props.navigation}
                                />
                        ))}
                    </View>
                </ScrollView>
            );
        } else {
            return (
                <></>
            );
        }
    }
}

export default ChallengeList;

