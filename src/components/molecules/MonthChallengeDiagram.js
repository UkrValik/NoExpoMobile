import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import VerticalStatusBar from '../atoms/VerticalStatusBar';
import colors from '../../styles/colors.json';

class MonthChallengeDiagram extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        
        const monthName = this.props.month[0].date.split(' ')[1];
        const maximum = this.props.maximumScore;

        return (
            <View style={{flex: 0.2, marginTop: 10}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                    <Text style={{marginLeft: -30, marginTop: -10, alignSelf: 'flex-start', color: colors.midgray}}>
                        {monthName}-
                    </Text>
                    <View style={{ borderWidth: 1, borderColor: colors.borderColor, width: '80%', height: Dimensions.get('screen').height / 5, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end'}}>
                        {this.props.month.map(day => (
                            <VerticalStatusBar
                                key={day.date}
                                percent={maximum >= day.score ? 100 * day.score / maximum : 100}
                                color={colors.altColor}
                                days={this.props.month.length}
                                day={day.date.split(' ')[2]}
                                value={day.score}
                                />
                        ))}
                    </View>
                    {/* <Text style={{flex: 1, marginLeft: 0, marginTop: -10, alignSelf: 'flex-start', color: colors.midgray, fontSize: 10}}>
                        {maximum}
                    </Text> */}
                </View>
            </View>
        );
    }
}

export default MonthChallengeDiagram;
