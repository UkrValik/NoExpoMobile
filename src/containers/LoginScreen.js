import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    ImageBackground,
    Dimensions
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
        };
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerShown: false,
        });
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
            <TouchableWithoutFeedback style={{flex: 1}} onPress={() => this.onOutPress()} accessible={false}>
                <ImageBackground
                    source={require('../assets/background-blue.png')}
                    resizeMode='cover'
                    style={{width: Dimensions.get('screen').width, height: Dimensions.get('screen').height}}
                    >
                <View style={styles.container}>
                    <Text style={styles.appName}>
                        GESUNDHEIT BEWEGT
                    </Text>
                    {this.state.wrongPassword ? (
                        <Tooltip style={{marginBottom: '4%'}}/>
                    ) : (
                        <Text style={styles.loginText}>
                            Login
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
                        placeholder='Password'
                        onChangeText={(password) => this.onPasswordChange(password)}
                        value={this.state.password}
                        textContentType='password'
                        secureTextEntry={!this.state.passwordVisible}
                        inputContainerStyle={styles.inputContainerStyle}
                        inputStyle={{fontSize: 16}}
                        ref={this.state.passwordInput}
                        autoCapitalize='none'
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
                            title='Sign in'
                            buttonStyle={styles.buttonStyle}
                            titleStyle={{color: colors.mainColor, fontSize: 20}}
                            containerStyle={{flex: 1}}
                            onPress={() => this.onSignIn()}
                            />
                    </View>
                    {/* <Text style={styles.forgotPassword}>
                        Forgot password?
                    </Text> */}
                </View>
                </ImageBackground>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: colors.mainColor
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
        marginBottom: 25,
        marginHorizontal: '3%'
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
