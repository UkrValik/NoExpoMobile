import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    ImageBackground,
    Dimensions,
    Platform,
    StatusBar,
    ScrollView,
    Linking,
    SafeAreaView,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import { connect } from 'react-redux';
import icomoonConfig from '../styles/selection.json';
import colors from '../styles/colors.json';
import {
    fetchToken,
    fetchConsumer,
    fetchTeams,
    fetchTeam,
    setLoadingTeams,
} from '../redux/actions/ActionCreators';
import Tooltip from '../components/atoms/Tooltip';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';

const Icon = createIconSetFromIcoMoon(icomoonConfig);

const mapDispatchToProps = dispatch => ({
    fetchToken: (emailPass) => dispatch(fetchToken(emailPass)),
    fetchConsumer: (token) => dispatch(fetchConsumer(token)),
    fetchTeams: async (token) => dispatch(fetchTeams(token)),
    fetchTeam: async (teamId, token) => dispatch(fetchTeam(teamId, token)),
    setLoadingTeams: (value) => dispatch(setLoadingTeams(value)),
});

const mapStateToProps = state => {
    return {
        consumer: state.consumer,
    };
};

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            email: '',
            password: '',
            passwordVisible: false,
            wrongPassword: false,
            emailInput: React.createRef(),
            passwordInput: React.createRef(),
            buttonMargin: 0,
            orientation: Dimensions.get('screen').width < Dimensions.get('screen').height ? 'PORTRAIT' : 'LANDSCAPE',
        };
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerShown: false,
        });

        StatusBar.setTranslucent(true);
        StatusBar.setBackgroundColor('#00000000');

        Dimensions.addEventListener('change', ({window: {width, height}}) => {
            if (width < height) {
                this.setState({ orientation: 'PORTRAIT' });
            } else {
                this.setState({ orientation: 'LANDSCAPE'});
            }
        });
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change');
    }

    onEmailChange(email) {
        this.setState({ 
            email: email,
            wrongPassword: false,
        });
    }

    onPasswordChange(password) {
        this.setState({
            password: password,
            wrongPassword: false,
        });
    }

    onPasswordVisisble() {
        this.setState({ passwordVisible: !this.state.passwordVisible });
    }

    onOutPress() {
        this.state.emailInput.current.blur();
        this.state.passwordInput.current.blur();
    }

    async onSignIn() {
        this.state.emailInput.current.blur();
        this.state.passwordInput.current.blur();
        const emailPass = {
            "email": this.state.email,
            "password": this.state.password
        };
        const token = await this.props.fetchToken(emailPass);
        if (token.payload.success) {
            await this.props.setLoadingTeams(true);
            let consumer = await this.props.fetchConsumer(token.payload.data.token);
            let teams = await this.props.fetchTeams(token.payload.data.token);
            teams.payload.forEach((team) => {
                props.fetchTeam(team.teamId, props.consumer.token);
            });
            await this.props.setLoadingTeams(false);
            this.props.navigation.navigate('Main');
        } else {
            this.setState({
                wrongPassword: !this.state.wrongPassword,
            });
        }
    }

    render() {

        return (
            <SafeAreaView style={{backgroundColor: colors.mainColor}}>
            <ScrollView keyboardShouldPersistTaps='handled'>
            <TouchableWithoutFeedback onPress={() => this.onOutPress()} accessible={false}>
                <ImageBackground
                    source={require('../assets/background-blue.png')}
                    resizeMode='cover'
                    style={[
                        this.state.orientation === 'PORTRAIT' && 
                        {
                            width: '100%',
                            height: Dimensions.get('screen').height,
                        },
                        this.state.orientation === 'LANDSCAPE' &&
                        {
                            flex: 1,
                        }]}
                    >
                <View
                    style={[
                        styles.container,
                        {
                            flex: 1,
                            paddingTop: this.state.orientation === 'PORTRAIT' ? 0 : 50,
                            justifyContent: this.state.orientation === 'PORTRAIT' ? 'center' : 'flex-start',
                        }
                    ]}>
                    {this.state.buttonMargin === 0 && this.state.orientation === 'PORTRAIT' && <Text style={styles.appName}>
                        GESUNDHEIT BEWEGT
                    </Text>}
                    {this.state.wrongPassword ? (
                        <Tooltip style={{marginBottom: '4%'}}/>
                    ) : (
                        <Text style={styles.loginText}>
                            Anmelden
                        </Text>
                    )}
                    <Input
                        placeholder='Email'
                        onChangeText={(email) => this.onEmailChange(email)}
                        value={this.state.email}
                        textContentType='username'
                        keyboardType='email-address'
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={{fontSize: 16}}
                        ref={this.state.emailInput}
                        autoCapitalize='none'
                        onFocus={() => this.setState({buttonMargin: '60%'})}
                        onBlur={() => this.setState({buttonMargin: 0})}
                        leftIcon={
                            <Icon
                                name='mail'
                                color={colors.midgray}
                                size={24}
                                style={{marginLeft: 10}}
                                />
                        }
                        rightIcon={
                            this.state.wrongPassword ? 
                                <Icon
                                    name='info'
                                    size={24}
                                    color={colors.pink}
                                    style={{marginRight: 10}}
                                    />
                            :
                                <></>
                        }
                        />
                    <Input
                        placeholder='Passwort'
                        onChangeText={(password) => this.onPasswordChange(password)}
                        value={this.state.password}
                        textContentType='password'
                        secureTextEntry={!this.state.passwordVisible}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={{fontSize: 16}}
                        ref={this.state.passwordInput}
                        autoCapitalize='none'
                        onFocus={() => this.setState({buttonMargin: '60%'})}
                        onBlur={() => this.setState({buttonMargin: 0})}
                        leftIcon={
                            <Icon
                                name='lock'
                                color={colors.midgray}
                                size={24}
                                style={{marginLeft: 10}}
                                />
                        }
                        rightIcon={
                            this.state.wrongPassword ? 
                                <Icon
                                    name='info'
                                    size={24}
                                    color={colors.pink}
                                    style={{marginRight: 10}}
                                    />
                            :
                                <Icon
                                    name={this.state.passwordVisible ? 'minus' : 'plus'}
                                    size={24}
                                    color={colors.midgray}
                                    style={{marginRight: 10}}
                                    onPress={() => this.onPasswordVisisble()}
                                    />
                        }
                        />
                    <View style={styles.buttonView}>
                        <TouchableNativeFeedback onPress={() => this.onSignIn()}>
                            <View
                                style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#fff',
                                    borderRadius: 10,
                                    padding: 15,
                                }}>
                                <Text
                                    style={{
                                        color: colors.mainColor,
                                        fontSize: 20,
                                        fontWeight: '600',
                                    }}>
                                    Anmelden
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    <View
                        style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            width: '90%',
                            marginBottom: this.state.buttonMargin,
                            marginTop: '2%',
                        }}>
                        <TouchableWithoutFeedback
                            onPress={() => Linking.openURL('https://www.gesund.live/passwort-vergessen-reset/')}
                            >
                            <Text
                                style={{
                                    color: colors.mainBgColor,
                                    padding: 10,
                                    fontWeight: '200',
                                }}>
                                Passwort vergessen?
                            </Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            onPress={() => Linking.openURL('https://www.gesund.live/info/faqs-public/')}
                            >
                            <Text
                                style={{
                                    color: colors.mainBgColor,
                                    padding: 10,
                                    fontWeight: '200',
                                }}>
                                Hilfe
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                </ImageBackground>
            </TouchableWithoutFeedback>
            </ScrollView>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    landScapeImageContainer: {
        flex: 1,
    },
    portraitImageContainer: {
        width: '100%',
        height: Dimensions.get('screen').height,
    },
    container: {
        alignItems: 'center',
    },
    inputContainerStyle: {
        borderWidth: 1,
        borderColor: colors.mainColor,
        backgroundColor: colors.mainBgColor,
        borderRadius: 10,
    },
    appName: {
        fontSize: 24,
        color: colors.mainBgColor,
        fontWeight: "bold",
        marginBottom: '12%'
    },
    loginText: {
        fontSize: 20,
        color: colors.mainBgColor,
        fontWeight: '600',
        marginBottom: '9%',
    },
    forgotPassword: {
        color: colors.mainBgColor,
        fontSize: 14,
    },
    buttonStyle: {
        backgroundColor: colors.mainBgColor,
        paddingVertical: 12,
        borderRadius: 10
    },
    buttonView: {
        marginTop: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 11,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
