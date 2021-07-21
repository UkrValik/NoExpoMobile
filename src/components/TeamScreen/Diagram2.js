import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import colors from '../../styles/colors.json';
import months from '../../styles/months.json';

const Diagram2 = (props) => {

    const equalDates = (date1, date2) => {
        return new Date(date1).toDateString() === new Date(date2).toDateString();
    }

    const monthName = props.month[0].date.split(' ')[1];
    const rowHeight = Dimensions.get('screen').width / 9;
    const width = Dimensions.get('screen').width;

    return (
        <View
            style={{
                marginTop: '9%',
            }}>
            <View
                style={{
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: '700',
                        color: colors.textColor,
                    }}>
                    {months[monthName]}
                </Text>
            </View>
            <View
                style={{
                    marginTop: '5%',
                    marginHorizontal: 15,
                    height: 2.5 * rowHeight,
                }}>
                <View
                    style={{
                        flex: 1,
                        borderTopWidth: 0.5,
                    }}>
                    <Text
                        style={{
                            color: colors.lightTextColor,
                        }}>
                        JA
                    </Text>
                </View>
                <View
                    style={{
                        height: rowHeight / 2,
                        borderTopWidth: 0.5,
                        borderBottomWidth: 0.5,
                    }}>

                </View>
                <View
                    style={{
                        flex: 1,
                        borderBottomWidth: 0.5,
                        justifyContent: 'flex-end',
                    }}>
                    <Text
                        style={{
                            color: colors.lightTextColor,
                        }}>
                        NEIN
                    </Text>
                </View>
                <View
                    style={{
                        width: width - 80,
                        height: 2.5 * rowHeight - 1,
                        position: 'absolute',
                        left: 45,
                        top: 0.5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    {
                        props.month.map(day => {
                            let backgroundColor = day.score === 1 ? colors.altColor : colors.pink;
                            if (!props.scores.filter(d => equalDates(d.date, day.date))[0]) {
                                backgroundColor = 'transparent';
                            }
                            return (
                            <View
                                key={day.date}
                                style={{
                                    height: rowHeight - 0.5,
                                    width: (width - 80) / props.month.length - 2,
                                    backgroundColor: backgroundColor,
                                    borderRadius: 3,
                                    top: day.score === 1 ? 0.2 : 1.5 * rowHeight - 0.5,
                                }}
                                />)
                        })
                    }
                </View>
                <View
                    style={{
                        width: width - 80,
                        height: 0.5 * rowHeight - 1,
                        position: 'absolute',
                        left: 45,
                        top: rowHeight + 0.5,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                    {
                        props.month.map(day => 
                            <View
                                key={day.date}
                                style={{
                                    height: 0.5 * rowHeight - 1,
                                    width: (width - 80) / props.month.length - 2,
                                    borderRadius: 3,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text
                                    style={{
                                        color: equalDates(day.date, new Date().toDateString()) ? colors.pink : colors.lightTextColor,
                                        fontSize: 12,
                                    }}>
                                    {day.date.split(' ')[2]}
                                </Text>
                            </View>
                        )
                    }
                </View>
            </View>
        </View>
    );
}

export default Diagram2;
