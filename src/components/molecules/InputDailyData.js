import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Alert,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';
import { Icon, Input, Button } from 'react-native-elements';
import colors from '../../styles/colors.json';
import DateTimePicker from '@react-native-community/datetimepicker';
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
            showDatePicker: false,
            stepValue: 0,
        };

        this.writeValue = this.writeValue.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.saveStepValue = this.saveStepValue.bind(this);
    }

    onDateChange(event, date) {
        if (event.type === 'set') {
            this.props.onDateChange(date);
            this.toggleDatePicker();
        }
    }

    saveStepValue(value) {
        this.props.saveStepValue(value);
    }

    toggleDatePicker() {
        this.setState({ showDatePicker: !this.state.showDatePicker });
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
            // <View style={styles.container}>
            //     <View style={{alignItems: 'center'}}>
            //         <Text style={{color: colors.textColor}}>
            //             Choose date
            //         </Text>
            //         <DatePicker
            //             style={{backgroundColor: colors.mainBgColor}}
            //             customStyles={{dateText: {color: colors.textColor, fontWeight: 'bold'}}}
            //             showIcon={false}
            //             date={this.props.endDate}
            //             androidVariant='nativeAndroid'
            //             mode='date'
            //             maxDate={new Date(this.props.endDate)}
            //             minDate={new Date(this.props.startDate)}
            //             onDateChange={(date) => this.onDateChange(date)}
            //             />
            //     </View>
            //     <View style={{alignItems: 'center'}}>
            //         <Text style={{color: colors.textColor}}>
            //             Input data
            //         </Text>
                    
            //         <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: colors.mainBgColor}}>
            //             <Input
            //                 value={this.props.stepValue.toString()}
            //                 containerStyle={{width: Dimensions.get('screen').width / 24 * 7, height: Dimensions.get('screen').height / 14}}
            //                 onChangeText={(value) => this.saveStepValue(value)}
            //                 inputContainerStyle={{borderBottomWidth: 0}}
            //                 />
            //             <Icon
            //                 type='material-community'
            //                 name='check-bold'
            //                 color={colors.textColor}
            //                 onPress={() => this.writeValue()}
            //                 />
            //         </View>
            //         {/* {!this.props.manualDataInput && ( }
            //             <View style={{flexDirection: 'row', alignItems: 'center'}}>
            //                 <Icon
            //                     type='material-community'
            //                     name='chevron-left'
            //                     color={colors.textColor}
            //                     onPress={this.props.toggleDataInput}
            //                     />
            //                 <Button
            //                     style={{width: Dimensions.get('screen').width / 24 * 7, paddingVertical: 5}}
            //                     buttonStyle={{backgroundColor: colors.mainBgColor}}
            //                     titleStyle={{fontSize: 14, color: colors.textColor, fontWeight: '300'}}
            //                     title='Get data from tracker'
            //                     onPress={this.buttonPress}
            //                     />
            //             </View>
            //         )} */}
            //     </View>
            // </View>
            <View>
                <Text style={styles.text}>Choose date</Text>
                <View>
                    <TouchableOpacity
                        onPress={() => this.toggleDatePicker()}
                        style={{flex: 1}}
                        >
                        <View style={styles.datePicker}>
                            <Icon
                                type='material-community'
                                name='calendar-range'
                                size={30}
                                color={colors.midgray}
                                containerStyle={{marginLeft: 12}}
                                />
                            <Text style={styles.inputText}>
                                {this.props.date.toISOString().split('T')[0].split('-').join('.')}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {this.state.showDatePicker && <DateTimePicker
                        value={this.props.date}
                        mode='date'
                        maximumDate={new Date(this.props.endDate)}
                        minimumDate={new Date(this.props.startDate)}
                        onChange={(event, date) => this.onDateChange(event, date)}
                        display='calendar'
                        style={{backgroundColor: colors.pink}}
                        />
                    }
                </View>
                <Text style={styles.text}>Input data</Text>
                <Input
                    value={this.props.stepValue.toString()}
                    onChangeText={(value) => this.saveStepValue(value)}
                    inputStyle={styles.inputText}
                    inputContainerStyle={styles.inputContainerStyle}
                    leftIcon={
                        <Icon
                            type='material-community'
                            name='forum-outline'
                            size={30}
                            color={colors.midgray}
                            style={{marginLeft: 12}}
                            />
                    }
                    />
                <TouchableNativeFeedback onPress={() => this.writeValue()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            SEND
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        color: colors.textColor,
        fontSize: 20,
        marginBottom: '5%',
    },
    datePicker: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderColor: colors.midgray,
        borderRadius: 10,
        paddingVertical: '3%',
        marginHorizontal: '5%',
        marginBottom: '10%',
    },
    inputText: {
        fontSize: 20,
        textAlignVertical: 'center',
        color: colors.lightTextColor,
        marginLeft: 17,
    },
    inputContainerStyle: {
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderRadius: 10,
        borderColor: colors.midgray,
        marginHorizontal: '3%',
    },
    button: {
        backgroundColor: colors.altColor,
        paddingVertical: '5%',
        marginHorizontal: '5%',
        borderRadius: 10,
        marginBottom: '40%',
        elevation: 5,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        color: colors.mainBgColor,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(InputDailyData);
