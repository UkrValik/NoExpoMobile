import React from 'react';
import { 
    View,
    Text,
    TouchableNativeFeedback,
    Switch,
    Modal,
    ImageBackground,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import colors from '../../styles/colors.json';
import AuthGoogleFitButton from './AuthGoogleFitButton';
import { toggleGoogleFit } from '../../redux/actions/ActionCreators';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        consumer: state.consumer,
    };
}

const mapDispatchToProps = dispatch => ({
    toggleGoogleFit: () => dispatch(toggleGoogleFit()),
});

const SynchronizationGroup = (props) => {

    const [processingAuth, setProcessingAuth] = React.useState(false);
    const [authDone, setAuthDone] = React.useState(false);
    const [authResult, setAuthResult] = React.useState(null);

    const onSwitch = (value) => {
        if (!props.consumer.synchronizeGoogleFit && value) {
            setProcessingAuth(true);
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
                                setProcessingAuth(false);
                                setAuthDone(true);
                                setAuthResult(authResult.success ? 'success' : 'fail.\nDisabling Google Fit...');
                                if (!authResult.success) {
                                    props.toggleGoogleFit();
                                }
                            })
                            .catch(err => {
                                setProcessingAuth(false);
                                setAuthDone(true);
                                setAuthResult(JSON.stringify(err));
                            });
                    } else {
                        setProcessingAuth(false);
                    }
                });
        }
        props.toggleGoogleFit();
    }

    return (
        <View>
            <Modal visible={processingAuth || authDone}>
                {/* <ImageBackground
                    source={require('../../assets/background-white.png')}
                    style={{
                        width: '100%',
                        height: '100%',
                        // position: 'absolute',
                        // left: -15,
                        // justifyContent: 'center',
                        // alignItems: 'center',
                    }}
                    resizeMode='cover'
                    > */}
                    {authDone ?
                    <View style={{
                        justifyContent: 'space-around',
                        flex: 1,
                        }}>
                        <Text style={{
                            color: colors.mainBgColor,
                            backgroundColor: colors.mainColor,
                            paddingVertical: '5%',
                            marginHorizontal: '5%',
                            fontSize: 20,
                            borderRadius: 10,
                            textAlign: 'center',
                            }}>
                            Google Fit Auth Ergebnis: {authResult}
                        </Text>
                        <TouchableNativeFeedback onPress={() => setAuthDone(false)}>
                            <View style={{
                                backgroundColor: colors.altColor,
                                paddingVertical: '5%',
                                marginHorizontal: '5%',
                                borderRadius: 10,
                                elevation: 5,
                                }}>
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 16,
                                    color: colors.mainBgColor,
                                    }}>
                                    OK
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                    :
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <ActivityIndicator
                            color={colors.mainColor}
                            size={32}
                            />
                    </View>
                    }
                {/* </ImageBackground> */}
            </Modal>
            <View
                style={{
                    paddingTop: '5%',
                    paddingBottom: '3%',
                    borderBottomWidth: 1,
                    borderColor: colors.midgray,
                    backgroundColor: colors.lightgray,
                }}>
                <Text
                    style={{
                        marginHorizontal: '3%',
                        fontSize: 16,
                        fontWeight: '700',
                        color: colors.textColor,
                    }}>
                    SYNCHRONISATION
                </Text>
            </View>
            <View
                style={{
                    borderBottomWidth: 1,
                    borderColor: colors.lightgray,
                }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginHorizontal: '3%',
                        paddingVertical: '2%',
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            fontSize: 14,
                            color: colors.textColor,
                            fontWeight: '500',
                        }}>
                        Google Fit
                    </Text>
                    <Switch
                        value={props.consumer.synchronizeGoogleFit}
                        onValueChange={(v) => onSwitch(v)}
                        thumbColor={props.consumer.synchronizeGoogleFit ? colors.mainColor : colors.gray}
                        trackColor={colors.mainColor}
                        />
                </View>
            </View>
        </View>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SynchronizationGroup);
