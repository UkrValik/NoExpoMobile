import React from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { Icon, Input, Button } from 'react-native-elements';
import colors from '../../styles/colors.json';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { postConsumerScore } from '../../redux/actions/ActionCreators';

const mapStateToProps = state => {
    return {
        consumer: state.consumer.consumer,
        teams: state.teams.teams,
    };
};

const mapDispatchToProps = dispatch => ({
    postConsumerScore: async (teamId, consumerId, day) => dispatch(postConsumerScore(teamId, consumerId, day)),
});

class InputDailyData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            stepValue: 0,
        };

        this.writeValue = this.writeValue.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.saveStepValue = this.saveStepValue.bind(this);
    }

    onDateChange(date) {
        this.props.onDateChange(date);
    }

    saveStepValue(value) {
        this.props.saveStepValue(value);
    }

    async writeValue(){
        const day = {
            date: new Date(this.props.date).toISOString().split('T')[0],
            score: this.props.stepValue,
        };
        await this.props.postConsumerScore(this.props.teamId, day);
        this.props.buildDiagramRanges();
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={{alignItems: 'center'}}>
                    <Text style={{color: colors.textColor}}>
                        Choose date
                    </Text>
                    <DatePicker
                        style={{backgroundColor: colors.mainBgColor}}
                        customStyles={{dateText: {color: colors.textColor, fontWeight: 'bold'}}}
                        showIcon={false}
                        date={this.props.date}
                        androidVariant='nativeAndroid'
                        mode='date'
                        maxDate={new Date()}
                        minDate={new Date(this.props.startDate)}
                        onDateChange={(date) => this.onDateChange(date)}
                        />
                </View>
                <View style={{alignItems: 'center'}}>
                    <Text style={{color: colors.textColor}}>
                        Input data
                    </Text>
                    
                    <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: colors.mainBgColor}}>
                        <Input
                            value={this.props.stepValue.toString()}
                            containerStyle={{width: Dimensions.get('screen').width / 24 * 7, height: Dimensions.get('screen').height / 14}}
                            onChangeText={(value) => this.saveStepValue(value)}
                            inputContainerStyle={{borderBottomWidth: 0}}
                            />
                        <Icon
                            type='material-community'
                            name='check-bold'
                            color={colors.textColor}
                            onPress={() => this.writeValue()}
                            />
                    </View>
                    {/* {!this.props.manualDataInput && ( }
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Icon
                                type='material-community'
                                name='chevron-left'
                                color={colors.textColor}
                                onPress={this.props.toggleDataInput}
                                />
                            <Button
                                style={{width: Dimensions.get('screen').width / 24 * 7, paddingVertical: 5}}
                                buttonStyle={{backgroundColor: colors.mainBgColor}}
                                titleStyle={{fontSize: 14, color: colors.textColor, fontWeight: '300'}}
                                title='Get data from tracker'
                                onPress={this.buttonPress}
                                />
                        </View>
                    )} */}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2, 
        borderColor: colors.altColor, 
        backgroundColor: colors.midgray,
        flexDirection: 'row', 
        width: '90%',
        // height: Dimensions.get('screen').height / 7,
        paddingVertical: Dimensions.get('screen').height / 28,
        alignItems: 'center', 
        justifyContent: 'space-around', 
        alignSelf: 'center',
        marginTop: 20,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(InputDailyData);
