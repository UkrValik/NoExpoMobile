import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableNativeFeedback,
    Modal,
    Dimensions,
    ImageBackground,
} from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import { connect } from 'react-redux';
import colors from '../../styles/colors.json';
import { toggleGoogleFit } from '../../redux/actions/ActionCreators';
import Loading from './Loading';

const mapStateToProps = (state) => {
    return {
        consumer: state.consumer,
    };
}

const mapDispatchToProps = dispatch => ({
    toggleGoogleFit: () => dispatch(toggleGoogleFit()),
});

class AuthGoogleFitButton extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            processingAuth: false,
            authDone: false,
            authResult: null,
        };

        this.onPress = this.onPress.bind(this);
    }

    onPress() {
        if (!this.props.consumer.synchronizeGoogleFit) {
            this.setState({ processingAuth: true });
            GoogleFit.checkIsAuthorized()
                .then(() => {
                    if (!GoogleFit.isAuthorized) {
                        const options = {
                            scopes: [
                                Scopes.FITNESS_BODY_READ,
                                Scopes.FITNESS_BODY_READ_WRITE,
                                Scopes.FITNESS_ACTIVITY_READ,
                                Scopes.FITNESS_ACTIVITY_READ_WRITE,
                            ]
                        }
                        GoogleFit.authorize(options)
                            .then(authResult => {
                                this.setState({
                                    processingAuth: false,
                                    authDone: true,
                                    authResult: authResult.success ? 'success' : 'fail.\nDisabling Google Fit...',
                                });
                                if (!authResult.success) {
                                    this.props.toggleGoogleFit();
                                }
                            })
                            .catch(err => {
                                this.setState({
                                    processingAuth: false,
                                    authDone: true,
                                    authResult: JSON.stringify(err),
                                });
                            });
                    } else {
                        this.setState({ processingAuth: false });
                    }
                });
        }
        this.props.toggleGoogleFit();
    }

    render() {
        return (
            <TouchableNativeFeedback onPress={() => this.onPress()}>
                <View style={styles.container}>
                    <Modal visible={this.state.processingAuth || this.state.authDone}>
                        <ImageBackground
                            source={require('../../assets/background-white.png')}
                            style={styles.modal}
                            resizeMode='cover'
                            >
                            {this.state.authDone ?
                            <View style={{justifyContent: 'space-around', flex: 1}}>
                                <Text style={styles.modalLabel}>
                                    Google Fit auth result: {this.state.authResult}
                                </Text>
                                <TouchableNativeFeedback onPress={() => this.setState({ authDone: false })}>
                                    <View style={styles.button}>
                                        <Text style={styles.buttonText}>
                                            OK
                                        </Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                            :
                            <Loading/>
                            }
                        </ImageBackground>
                    </Modal>
                    <Text style={styles.text}>
                        {this.props.consumer.synchronizeGoogleFit ?
                        'Disable Google Fit synchronization' :
                        'Enable Google Fit synchronization'}
                    </Text>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: '3%',
        backgroundColor: colors.mainColor,
        borderRadius: 10,
        marginTop: '5%',
    },
    text: {
        color: colors.mainBgColor,
        fontSize: 16,
        fontWeight: '600',
    },
    button: {
        backgroundColor: colors.altColor,
        paddingVertical: '5%',
        marginHorizontal: '5%',
        borderRadius: 10,
        elevation: 5,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16,
        color: colors.mainBgColor,
    },
    modalLabel: {
        color: colors.mainBgColor,
        backgroundColor: colors.mainColor,
        paddingVertical: '5%',
        marginHorizontal: '5%',
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthGoogleFitButton);
