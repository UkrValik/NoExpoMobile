import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, Dimensions } from 'react-native';
import colors from '../../styles/colors.json';

class VerticalStatusBar extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            scoreVisible: false,
        };
    }

    onPress() {
        this.setState({ scoreVisible: true });
        setTimeout(() => {
            this.setState({ scoreVisible: false });
        }, 3000);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this.state.scoreVisible ? <View style={{position: 'absolute', left: -20, top: -35, width: Dimensions.get('screen').width / 100 * 17}}>
                    <Text style={{backgroundColor: colors.pink, color: colors.lightgray, fontSize: 12, alignSelf: 'center', padding: 3, borderRadius: 5, transform: [{rotateZ: "-90deg"}]}}>
                        {this.props.value.toString()}
                    </Text>
                </View> : null}
                <View style={{
                    height: this.props.percent.toString() + '%', 
                    backgroundColor: colors.mainBgColor,
                    // width: (100 / this.props.days).toString() + '%',
                    alignItems: 'center',
                    borderRadius: 5,
                    }}>
                    <TouchableNativeFeedback onPress={() => this.onPress()}>
                        <View style={{
                            height: '100%',
                            backgroundColor: this.props.color,
                            width: '90%',
                            borderRadius: 5,
                        }}>
                        </View>
                    </TouchableNativeFeedback>
                    <Text style={{fontSize: 18 - this.props.days / 3, color: colors.lightTextColor, marginTop: '25%'}}>
                        {this.props.day.toString()}
                    </Text>
                </View>
            </View>
        );
    }
}

export default VerticalStatusBar;
