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
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import { connect } from 'react-redux';
import icomoonConfig from '../styles/selection.json';
import colors from '../styles/colors.json';
import { fetchToken, fetchConsumer } from '../redux/actions/ActionCreators';
import Tooltip from '../components/atoms/Tooltip';

const Icon = createIconSetFromIcoMoon(icomoonConfig);

const mapDispatchToProps = dispatch => ({
    fetchToken: (emailPass) => dispatch(fetchToken(emailPass)),
    fetchConsumer: (token) => dispatch(fetchConsumer(token)),
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
            orientation: 'PORTRAIT',
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
                this.setState({ orientation: 'LANDSCAPE '});
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
            let consumer = await this.props.fetchConsumer(token.payload.data.token);
            this.props.navigation.navigate('Main');
        } else {
            this.setState({
                wrongPassword: !this.state.wrongPassword,
            });
        }
    }

    render() {

        return (
            <ScrollView>
            <TouchableWithoutFeedback style={{flex: 1}} onPress={() => this.onOutPress()} accessible={false}>
                <ImageBackground
                    source={require('../assets/background-blue.png')}
                    resizeMode='cover'
                    style={{
                        width: '100%',
                        height: Dimensions.get('screen').height,
                    }}
                    >
                <View
                    style={[
                        styles.container,
                        {
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
                        <Button
                            title='Anmelden'
                            buttonStyle={styles.buttonStyle}
                            titleStyle={{color: colors.mainColor, fontSize: 20}}
                            containerStyle={{flex: 1}}
                            onPress={() => this.onSignIn()}
                            />
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
                    {/* <Text style={styles.forgotPassword}>
                        Forgot password?
                    </Text> */}
                </View>
                </ImageBackground>
            </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // backgroundColor: colors.mainColor,
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
        flexDirection: 'row',
        marginTop: 20,
        marginHorizontal: 11,
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
