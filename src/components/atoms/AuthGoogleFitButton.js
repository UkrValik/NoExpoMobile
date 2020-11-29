import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import { connect } from 'react-redux';
import colors from '../../styles/colors.json';
import { toggleGoogleFit } from '../../redux/actions/ActionCreators';

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
    }

    onPress() {
        if (!this.props.consumer.synchronizeGoogleFit) {
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
                                // console.log(authResult);
                            })
                            .catch(err => {
                                // console.log(err);
                            });
                    }
                });
        }
        this.props.toggleGoogleFit();
    }

    render() {
        return (
            <TouchableNativeFeedback onPress={() => this.onPress()}>
                <View style={styles.container}>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthGoogleFitButton);
