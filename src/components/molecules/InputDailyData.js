import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback
} from 'react-native';
import { Input } from 'react-native-elements';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../../styles/selection.json';
import colors from '../../styles/colors.json';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import { postConsumerScore, sendChallengeData } from '../../redux/actions/ActionCreators';
import { Platform } from 'react-native';

const Icon = createIconSetFromIcoMoon(icomoonConfig);

const mapStateToProps = state => {
    return {
        consumer: state.consumer.consumer,
        teams: state.teams.teams,
        token: state.consumer.token,
        synchronizeGoogleFit: state.consumer.synchronizeGoogleFit,
    };
};

const mapDispatchToProps = dispatch => ({
    postConsumerScore: async (teamId, consumerId, day) => dispatch(postConsumerScore(teamId, consumerId, day)),
    sendChallengeData: (data, token) => dispatch(sendChallengeData(data, token)),
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
        if (!this.state.showDatePicker) {
            this.props.stopInterval();
        } else {
            this.props.startInterval();
        }
        this.setState({ showDatePicker: !this.state.showDatePicker });
    }

    async writeValue(){
        const day = {
            date: new Date(this.props.date).toISOString().split('T')[0],
            score: this.props.stepValue,
        };
        await this.props.postConsumerScore(this.props.teamId, day);

        const team = this.props.teams.filter(team => team.teamId === this.props.teamId)[0];
        const data = {
            id: team.challengeId,
            activities: team.scores,
        };
        await this.props.sendChallengeData(data, this.props.token);
        await this.props.onDataSent();
        this.props.buildDiagramRanges();
    }

    render() {

        return (
            <View>
                <Text style={styles.text}>Choose date</Text>
                <View>
                    <TouchableOpacity
                        onPress={() => this.toggleDatePicker()}
                        style={{flex: 1}}
                        >
                        <View style={styles.datePicker}>
                            <Icon
                                name='calendar'
                                size={30}
                                color={colors.midgray}
                                style={{marginLeft: 12}}
                                />
                            <Text style={styles.inputText}>
                                {this.props.date.toISOString().split('T')[0].split('-').reverse().join('.')}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {this.state.showDatePicker && <DateTimePicker
                        value={this.props.date}
                        mode='date'
                        maximumDate={new Date(this.props.endDate)}
                        minimumDate={new Date(this.props.startDate)}
                        onChange={(event, date) => this.onDateChange(event, date)}
                        display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                        style={{backgroundColor: '#FFF'}}
                        />
                    }
                </View>
                <Text style={styles.text}>{this.props.synchronizeGoogleFit ? 'Data' : 'Input data'}</Text>
                <Input
                    value={this.props.stepValue.toString()}
                    onChangeText={(value) => this.saveStepValue(value)}
                    inputStyle={styles.inputText}
                    inputContainerStyle={styles.inputContainerStyle}
                    leftIcon={
                        <Icon
                            name='conversation'
                            size={30}
                            color={colors.midgray}
                            style={{marginLeft: 12}}
                            />
                    }
                    />
                {!this.props.synchronizeGoogleFit &&
                    <TouchableNativeFeedback onPress={() => this.writeValue()}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                SEND
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                }
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
