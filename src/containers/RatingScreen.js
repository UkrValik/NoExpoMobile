import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors.json';

const rateList = [
    {
        name: 'Ilon Mask',
        score: '125',
    },
    {
        name: 'Johny Johnson',
        score: '112',
    },
    {
        name: 'My new Name',
        score: '100',
    },
    {
        name: 'No Name',
        score: '89',
    },
    {
        name: 'Real Name',
        score: '87',
    },
    {
        name: 'Simple Man Name',
        score: '84',
    },
    {
        name: 'Some Adorable Name',
        score: '65',
    },
    {
        name: 'Short Nm',
        score: '56',
    }
];

class RatingScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            title: 'Team rating',
            headerStyle: {
                backgroundColor: colors.mainBgColor,
                borderBottomColor: colors.mainColor,
                borderBottomWidth: 5,
                elevation: 0,
            },
            headerTintColor: colors.mainColor,
            headerTitleStyle: {
                flex: 1,
                marginRight: '20%',
                textAlign: 'center',
                color: colors.textColor,
            },
        });
    }

    render() {

        let i = 0;

        return (
            <ScrollView style={{backgroundColor: colors.mainBgColor}}>
                <View style={{flex: 20, flexDirection: 'row', backgroundColor: colors.mainBgColor, marginVertical: 1, paddingVertical: 3}}>
                    <Text style={{flex: 2, color: colors.textColor, fontSize: 16, textAlign: 'center'}}>
                        №
                    </Text>
                    <View style={{flex: 18, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10}}>
                        <Text style={{color: colors.textColor, fontSize: 16}}>
                            name
                        </Text>
                        <Text style={{color: colors.textColor, fontSize: 16}}>
                            score
                        </Text>
                    </View>
                </View>
                {rateList.map(rateLine => {
                    let backColor;
                    if (++i === 1) {
                        backColor = colors.pink;
                    } else if (i === 2) {
                        backColor = colors.mainColor;
                    } else if (i === 3) {
                        backColor = colors.altColor;
                    } else {
                        backColor = colors.midgray;
                    }
                    return (
                        <View key={i} style={{flex: 20, flexDirection: 'row', backgroundColor: backColor, marginVertical: 1, paddingVertical: 3}}>
                            <Text style={{flex: 2, color: colors.textColor, fontSize: 16, textAlign: 'center'}}>
                                {i.toString()}
                            </Text>
                            <View key={rateLine.name} style={{flex: 18, flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{color: colors.textColor, fontSize: 16}}>
                                    {rateLine.name}
                                </Text>
                                <Text style={{color: colors.textColor, fontSize: 16}}>
                                    {rateLine.score.toString()}
                                </Text>
                            </View>
                        </View>
                )})}
            </ScrollView>
        );
    }
}

export default RatingScreen;
