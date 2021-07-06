import React from 'react';
import { View, Text, Switch } from 'react-native';
import { connect } from 'react-redux';
import appleHealthKit from 'react-native-health';
import { synchronizeAppleHealth,  } from '../../redux/actions/ActionCreators';
import colors from '../../styles/colors.json';

const mapStateToProps = state => {
    return {
        consumer: state.consumer,
    };
};

const mapDispatchToProps = dispatch => ({
    synchronizeAppleHealth: (value) => dispatch(synchronizeAppleHealth(value)),
});

const AppleHealthSynchronization = (props) => {

    const onSwitch = (value) => {
        props.synchronizeAppleHealth(value);
        if (value) {
            const permissions = {
                permissions: {
                    read: [appleHealthKit.Constants.Permissions.Steps],
                },
            };

            appleHealthKit.initHealthKit(permissions, (error) => {
                if (error) {
                    props.synchronizeAppleHealth(false);
                }
            });
        }
    }

    return (
        <View
            style={{
                borderBottomWidth: 1,
                borderColor: colors.lightgray,
            }}>
            {/* <Modal visible={processingAuth || authDone}>
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
            </Modal> */}
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
                    Apple Health
                </Text>
                <Switch
                    value={props.consumer.synchronizeAppleHealth}
                    onValueChange={(value) => onSwitch(value)}
                    trackColor={colors.mainColor}
                    />
            </View>
        </View>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(AppleHealthSynchronization);
