import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableNativeFeedback } from 'react-native';
import colors from '../../styles/colors.json';
import months from '../../styles/months.json';

const Diagram = (props) => {

    const equalDates = (date1, date2) => {
        return new Date(date1).toDateString() === new Date(date2).toDateString();
    }

    const barPress = (date) => {
        props.setPressedScoreBar(date);
    }

    const monthName = props.month[0].date.split(' ')[1];
    const maximum = props.maximumScore < 10 ? 10 : props.maximumScore;
    const month = props.month;
    
    const topYvalue = (maximum) => {
        const zeros = maximum.toString().length - 2;
        let power10 = 1;
        let topValue = maximum;
        for (let i = 0; i < zeros; ++i) {
            topValue = Math.floor(topValue / 10);
            power10 *= 10;
        }
        topValue *= power10;
        if (power10 / 2 < maximum - topValue) {
            topValue += power10;
        }
        
        return topValue;
    }

    const yaxis = [0, 0, 0, 0, 0];
    yaxis[0] = topYvalue(maximum);
    for (let i = 1; i < 5; ++i) {
        yaxis[i] = yaxis[i - 1] - Math.floor(yaxis[0] / 5);
    }

    return (
        <View
            style={{
                marginTop: '7%',
            }}>
            <Text
                style={{
                    textAlign: 'center',
                    color: colors.lightTextColor,
                    fontSize: 18,
                    fontWeight: '700',
                    marginBottom: '2%',
                }}>
                {months[monthName]}
            </Text>
            <View
                style={{
                    height: Dimensions.get('screen').width * 2 / 3 + 20,
                    marginHorizontal: 15,
                }}>
                <View style={styles.line}><Text style={styles.yaxis}>{yaxis[0]}</Text></View>
                <View style={styles.line}><Text style={styles.yaxis}>{yaxis[1]}</Text></View>
                <View style={styles.line}><Text style={styles.yaxis}>{yaxis[2]}</Text></View>
                <View style={styles.line}><Text style={styles.yaxis}>{yaxis[3]}</Text></View>
                <View style={styles.line}><Text style={styles.yaxis}>{yaxis[4]}</Text></View>
                <View style={styles.line}><Text style={styles.yaxis}>0</Text></View>


                <View
                    style={{
                        height: 20,
                        width: Dimensions.get('screen').width - 80,
                        marginLeft: 45,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    {month.map(day => (
                        <Text
                            key={day.date}
                            style={{
                                fontSize: 12,
                                width: (Dimensions.get('screen').width - 80) / month.length - 2,
                                textAlign: 'center',
                                color: equalDates(day.date, new Date().toDateString()) ? colors.pink : colors.lightTextColor,
                            }}>
                            {day.date.split(' ')[2]}
                        </Text>
                    ))}
                </View>

                <View
                    style={{
                        width: Dimensions.get('screen').width - 80,
                        height: Dimensions.get('screen').width * 5 / 9,
                        position: 'absolute',
                        left: 45,
                        top: Dimensions.get('screen').width / 9,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                    }}>
                    {month.map(day => (
                        <TouchableNativeFeedback
                            onPress={() => barPress(day.date)}
                            key={day.date}
                            >
                            <View
                                style={{
                                    backgroundColor: equalDates(day.date, new Date().toDateString()) ? colors.pink : colors.mainColor,
                                    height: day.score * 100 / topYvalue(maximum) + '%',
                                    width: (Dimensions.get('screen').width - 80) / month.length - 2,
                                    borderRadius: 3,
                                    marginBottom: 0.3,
                                }}>
                                {props.pressedScoreBar === day.date && <View
                                    style={{
                                        position: 'absolute',
                                        alignItems: 'center',
                                        top: Dimensions.get('screen').width * 5 / 9 * day.score / topYvalue(maximum) - Dimensions.get('screen').width * 5 / 9 - 40,
                                        left: ((Dimensions.get('screen').width - 80) / month.length - 2) / 2 - 40,
                                    }}>
                                    <View
                                        style={{
                                            width: 80,
                                            height: 20,
                                            backgroundColor: equalDates(day.date, new Date().toDateString()) ? colors.pink : colors.mainColor,
                                            justifyContent: 'center',
                                            borderRadius: 3,
                                        }}>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                color: '#FFF',
                                                fontSize: 12,
                                            }}>
                                            {day.score} points
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            marginTop: -1,
                                            width: 15,
                                            height: 7,
                                            borderStyle: 'solid',
                                            borderTopWidth: 9,
                                            borderLeftColor: 'transparent',
                                            borderLeftWidth: 5,
                                            borderBottomColor: 'transparent',
                                            borderRightWidth: 5,
                                            borderRightColor: 'transparent',
                                            borderTopColor: equalDates(day.date, new Date().toDateString()) ? colors.pink : colors.mainColor,
                                        }}
                                        />
                                    <View
                                        style={{
                                            width: 5,
                                            height: 0,
                                            backgroundColor: 'transparent',
                                            borderStyle: 'solid',
                                            borderBottomWidth: 2,
                                            borderBottomLeftRadius: 20,
                                            borderBottomRightRadius: 20,
                                            borderColor: equalDates(day.date, new Date().toDateString()) ? colors.pink : colors.mainColor,
                                        }}/>
                                </View>}
                            </View>
                        </TouchableNativeFeedback>
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    line: {
        flex: 1,
        borderBottomWidth: 0.5,
        justifyContent: 'flex-end'
    },
    yaxis: {
        fontSize: 14,
        fontWeight: '200',
        marginBottom: 3,
        color: colors.lightTextColor,
    }
});

export default Diagram;
