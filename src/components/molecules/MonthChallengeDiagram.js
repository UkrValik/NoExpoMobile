import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import VerticalStatusBar from '../atoms/VerticalStatusBar';
import colors from '../../styles/colors.json';
import months from '../../styles/months.json';

class MonthChallengeDiagram extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        
        const monthName = this.props.month[0].date.split(' ')[1];
        const maximum = this.props.maximumScore;

        let upperLine = 10;
        while (upperLine < maximum) {
            upperLine *= 10;
        }
        const div10 = upperLine > 1000 ? upperLine / 50 : 50;
        while (upperLine - div10 >= maximum) {
            upperLine -= div10;
        }
        const step = upperLine / 5;

        const barColor = (date) => {
            const currentDate = new Date();
            const barDate = new Date(date);
            if (barDate.getFullYear() === currentDate.getFullYear() &&
                barDate.getMonth() === currentDate.getMonth() &&
                barDate.getDate() === currentDate.getDate()) {
                return colors.pink;
            } else {
                return colors.mainColor;
            }
        }

        return (
            <View style={styles.container}>
                <Text style={styles.monthName}>
                    {months[monthName]}
                </Text>
                <View>
                    <Text style={styles.line}>{Math.round(step * 5)}</Text>
                    <Text style={styles.line}>{Math.round(step * 4)}</Text>
                    <Text style={styles.line}>{Math.round(step * 3)}</Text>
                    <Text style={styles.line}>{Math.round(step * 2)}</Text>
                    <Text style={styles.line}>{Math.round(step * 1)}</Text>
                    <Text style={styles.line}>0</Text>
                </View>
                <View style={styles.bars}>
                    {this.props.month.map(day => (
                        <VerticalStatusBar
                            key={day.date}
                            percent={upperLine >= day.score ? 100 * day.score / upperLine : 100}
                            color={barColor(day.date)}
                            days={this.props.month.length}
                            day={day.date.split(' ')[2]}
                            value={day.score}
                            setPressedScoreBar={this.props.setPressedScoreBar}
                            pressedScoreBar={this.props.pressedScoreBar}
                            />
                    ))}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: '7%',
        marginHorizontal: '5%',
        marginBottom: '8%',
    },
    monthName: {
        color: colors.lightTextColor,
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: '2%',
    },
    line: {
        borderBottomWidth: 0.7,
        borderColor: colors.midgray,
        paddingTop: 15,
        paddingBottom: 5,
        color: colors.lightTextColor,
    },
    bars: {
        top: '26.9%',
        left: '13%',
        borderColor: colors.borderColor,
        width: '80%',
        height: 198,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        position: 'absolute',
    }
});

export default MonthChallengeDiagram;
