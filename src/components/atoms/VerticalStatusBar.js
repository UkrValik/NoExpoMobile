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

    componentDidUpdate() {
        if (this.props.pressedScoreBar !== this && this.state.scoreVisible) {
            this.setState({ scoreVisible: false });
            clearTimeout(this._timeout);
        }
    }

    onPress() {
        this.props.setPressedScoreBar(this);
        this.setState({ scoreVisible: true });
        this._timeout = setTimeout(() => {
            this.setState({ scoreVisible: false });
        }, 3000);
    }

    render() {

        const textStyles = {
            
        }
        
        return (
            <View style={{flex: 1}}>
                {this.state.scoreVisible ? 
                <View style={{position: 'absolute', left: -52 - this.props.days, bottom: 248}}>
                    <View style={[styles.tooltip, this.props.style]}>
                        <View style={{borderRadius: 10, backgroundColor: this.props.color}}>
                            <Text style={styles.text}>
                                {this.props.value.toString() + ' POINTS'}
                            </Text>
                        </View>
                        <View style={[styles.arrow, {borderTopColor: this.props.color,}]}>
                            <View style={[styles.halfCircle, {borderBottomColor: this.props.color}]}></View>
                        </View>
                    </View>
                </View> : null}
                <View style={[styles.barContainer, {height: this.props.percent.toString() + '%'} ]}>
                    <TouchableNativeFeedback onPress={() => this.onPress()}>
                        <View style={[styles.bar, {backgroundColor: this.props.color} ]}/>
                    </TouchableNativeFeedback>
                    <Text style={{
                        fontSize: 18 - this.props.days / 3,
                        color: this.props.color === colors.pink ? colors.pink : colors.lightTextColor,
                        marginTop: '25%'
                        }}>
                        {this.props.day.toString()}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tooltip: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    arrow: {
        width: 15,
        height: 7,
        borderStyle: 'solid',
        borderBottomWidth: 0,
        borderRightWidth: 5,
        borderTopWidth: 9,
        borderLeftWidth: 5,
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
    },
    halfCircle: {
        width: 5,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    text: {
        width: 150,
        color: colors.mainBgColor,
        padding: 10,
        fontSize: 14,
        textAlign: 'center',
    },
    barContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: 5,
    },
    bar: {
        height: '100%',
        width: '90%',
        borderRadius: 5,
    }
});

export default VerticalStatusBar;
