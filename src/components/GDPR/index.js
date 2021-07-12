import React from 'react';
import { 
    View,
    SafeAreaView,
    Text,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    Platform,
    StatusBar,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';
import {
    logout,
    makeFirstLogin,
    updateGDPRDate,
    checkGDPRSuccess,
} from '../../redux/actions/ActionCreators';
import colors from '../../styles/colors.json';

const mapStateToProps = state => {
    return {
        consumer: state.consumer,
        teams: state.teams,
    };
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    makeFirstLogin: () => dispatch(makeFirstLogin()),
    updateGDPRDate: (date) => dispatch(updateGDPRDate(date)),
    checkGDPRSuccess: (gdprData) => dispatch(checkGDPRSuccess(gdprData)),
});

const GDPRView = (props) => {

    const agree = () => {
        props.updateGDPRDate(new Date().toISOString());
        props.makeFirstLogin();
        props.checkGDPRSuccess({success: true, dataPrivacy: ''});
    }

    const disagree = () => {
        props.logout();
    }

    const html = '<html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body>' + props.consumer.gdprData.dataPrivacy + '</body></html>';

    return (
        <View
            style={{
                flex: 1,
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            }}>
            <SafeAreaView style={{backgroundColor: colors.mainColor + 'ee'}} />
            <SafeAreaView style={{flex: 1}}>
                <WebView 
                    source={{html: html}}
                    />
                <View
                    style={{
                        flexDirection: 'row',
                        backgroundColor: colors.lightgray,
                        borderTopWidth: 1,
                        borderTopColor: colors.gray,
                        paddingVertical: 10,
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}>
                    <TouchableNativeFeedback
                        onPress={agree}
                        >
                        <View
                            style={{
                                height: 40,
                                width: '30%',
                                backgroundColor: colors.altColor,
                                borderWidth: 1,
                                borderColor: colors.mainBgColor,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 7,
                            }}>
                            <Text
                                style={{
                                    color: colors.mainBgColor,
                                }}>
                                Agree
                            </Text>        
                        </View>
                    </TouchableNativeFeedback>
                    <TouchableWithoutFeedback
                        onPress={disagree}
                        >
                        <View
                            style={{
                                height: 40,
                                width: '30%',
                                backgroundColor: colors.mainBgColor,
                                borderWidth: 1,
                                borderColor: colors.pink,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 7,
                            }}>
                            <Text
                                style={{
                                    color: colors.pink,
                                }}>
                                Disagree
                            </Text>        
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </SafeAreaView>
        </View>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(GDPRView);
