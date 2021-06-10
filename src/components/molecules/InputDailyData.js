import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableNativeFeedback,
    Modal,
    Platform,
    ImageBackground,
    Dimensions,
    ActivityIndicator,
    Button,
} from 'react-native';
import { Input, ThemeConsumer } from 'react-native-elements';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import icomoonConfig from '../../styles/selection.json';
import colors from '../../styles/colors.json';
import { postConsumerScore, sendChallengeData } from '../../redux/actions/ActionCreators';

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
            sendingData: false,
            receivedResponse: false,
            sendDataResponse: null,
        };

        this.valueRef = React.createRef();

        this.writeValue = this.writeValue.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.saveStepValue = this.saveStepValue.bind(this);
    }

    onDateChange(event, date) {
        if (event.type === 'set') {
            this.toggleDatePicker();
            this.props.onDateChange(date);
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

    async writeValue(value) {
        this.setState({ sendingData: true });
        const day = {
            date: new Date(this.props.date).toISOString().split('T')[0],
            score: typeof value === 'number' ? value : this.props.stepValue,
        };
        await this.props.postConsumerScore(this.props.teamId, day);

        const team = this.props.teams.filter(team => team.teamId === this.props.teamId)[0];
        const data = {
            id: team.challengeId,
            activities: team.scores,
        };
        const sendDataResponse = await this.props.sendChallengeData(data, this.props.token);
        this.setState({
            receivedResponse: true,
            sendingData: false,
            sendDataResponse: sendDataResponse.payload.success ? 
            'Daten wurden erfolgreich hinzugefügt' : 
            'Error. Daten wurden nicht hinzugefügt',
        });
        await this.props.onDataSent();
        this.props.buildDiagramRanges();
    }

    render() {

        return (
            <View>
                <Modal visible={this.state.sendingData}>
                    <ImageBackground
                        source={require('../../assets/background-white.png')}
                        style={styles.modal}
                        resizeMode='cover'
                        >
                        <ActivityIndicator
                            size={32}
                            color={colors.mainColor}
                            />
                    </ImageBackground>
                </Modal>
                <Modal visible={this.state.receivedResponse}>
                    <ImageBackground
                        source={require('../../assets/background-white.png')}
                        style={styles.modal}
                        resizeMode='cover'
                        >
                        <View style={{flex: 1, justifyContent: 'space-around'}}>
                            <Text style={styles.modalLabel}>
                                {this.state.sendDataResponse}
                            </Text>
                            <TouchableNativeFeedback onPress={() => this.setState({receivedResponse: false})}>
                                <View style={[styles.button, {marginBottom: 0, marginHorizontal: '20%'}]}>
                                    <Text style={styles.buttonText}>
                                        OK
                                    </Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </ImageBackground>
                </Modal>
                <Text style={styles.text}>Datum auswählen</Text>
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
                <Text style={styles.text}>{this.props.synchronizeGoogleFit && this.props.team.challengeType === 1 ? 'Daten' : this.props.team.challengeQuestion}</Text>
                
                {this.props.team.challengeType === 1 && <View>
                    <Input
                        ref={this.valueRef}
                        value={this.props.stepValue.toString()}
                        onChangeText={(value) => this.saveStepValue(value)}
                        inputStyle={styles.inputText}
                        inputContainerStyle={styles.inputContainerStyle}
                        keyboardType='decimal-pad'
                        onFocus={() => this.props.stepValue === 0 && this.saveStepValue('')}
                        onBlur={() => this.props.stepValue === '' && this.props.saveStepValue(0)}
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
                                    BESTÄTIGEN
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                    }
                </View>}
                {this.props.team.challengeType === 2 &&
                <View
                    style={{
                        justifyContent: 'space-around',
                        flexDirection: 'row',
                        marginBottom: '5%',
                    }}>
                    <TouchableNativeFeedback
                        onPress={() => this.writeValue(1)}
                        >
                        <View
                            style={{
                                flex: 0.4,
                                elevation: 4,
                                borderRadius: 10,
                            }}>
                            <Text
                                style={{
                                    height: 40,
                                    backgroundColor: colors.altColor,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    color: colors.mainBgColor,
                                    borderRadius: 10,
                                }}>
                                Ja
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        onPress={() => this.writeValue(0)}
                        >
                        <View
                            style={{
                                flex: 0.4,
                                elevation: 4,
                                borderRadius: 10,
                            }}>
                            <Text
                                style={{
                                    height: 40,
                                    backgroundColor: colors.pink,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    color: colors.mainBgColor,
                                    borderRadius: 10,
                                }}>
                                Nein
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        color: colors.textColor,
        fontSize: 18,
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
        marginBottom: '5%',
        elevation: 5,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        color: colors.mainBgColor,
    },
    modalLabel: {
        color: colors.textColor,
        paddingVertical: '5%',
        paddingHorizontal: '5%',
        fontSize: 20,
        borderRadius: 10,
        textAlign: 'center',
    },
    modal: {
        width: Dimensions.get('screen').width + 30,
        height: Dimensions.get('screen').height - 20,
        position: 'absolute',
        left: -15,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(InputDailyData);
