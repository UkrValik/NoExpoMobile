import React from 'react';
import { StyleSheet, ScrollView, Alert, Text, View, SafeAreaView } from 'react-native';
import { Input } from 'react-native-elements';
import colors from '../styles/colors.json';
import { connect } from 'react-redux';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import AuthGoogleFitButton from '../components/atoms/AuthGoogleFitButton';
import HeaderAccountScreen from '../components/atoms/HeaderAccountScreen';
import { toggleGoogleFit } from '../redux/actions/ActionCreators';

const mapStateToProps = state => {
    return {
        consumer: state.consumer,
    };
};

const mapDispatchToProps = dispatch => ({
    toggleGoogleFit: () => dispatch(toggleGoogleFit()),
});

class AccountScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            authorized: GoogleFit.isAuthorized,
            consumerBlockRotated: false,
            firstName: this.props.consumer.consumer.firstName,
            lastName: this.props.consumer.consumer.lastName,
            sex: this.props.consumer.consumer.sex,
            email: this.props.consumer.consumer.email,
            description: this.props.consumer.consumer.description,
        };

        this.authorizeGoogleFit = this.authorizeGoogleFit.bind(this);
        this.saveSynchronizeCheckbox = this.saveSynchronizeCheckbox.bind(this);
        this.saveConsumerBlock = this.saveConsumerBlock.bind(this);
        this.saveEmail = this.saveEmail.bind(this);
        this.saveFirstName = this.saveFirstName.bind(this);
        this.saveLastName = this.saveLastName.bind(this);
        this.saveSex = this.saveSex.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerShown: false,
        });
    }

    goBack() {
        this.props.navigation.goBack();
    }

    async saveSynchronizeCheckbox() {
        this.props.toggleGoogleFit();
    }

    authorizeGoogleFit() {
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
                    console.log(authResult);
                    if (authResult.success) {
                        this.setState({ authorized: true });
                    }
                    // Alert.alert(
                    //     'Auth result',
                    //     JSON.stringify(authResult),
                    //     [
                    //         {
                    //             text: 'Ok',
                    //         }
                    //     ],
                    //     { cancelable: false }
                    // );
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    saveConsumerBlock() {
        this.setState({ consumerBlockRotated: !this.state.consumerBlockRotated });
    }

    saveEmail(email) {
        this.setState({ email: email });
    }

    saveFirstName(firstName) {
        this.setState({ firstName: firstName });
    }

    saveLastName(lastName) {
        this.setState({ lastName: lastName });
    }

    saveSex(sex) {
        this.setState({ sex: sex });
    }

    render() {

        return (
            <ScrollView 
                style={{flex: 1, backgroundColor: colors.mainBgColor}}
                contentContainerStyle={{justifyContent: 'flex-start'}}
                >
                <SafeAreaView style={{backgroundColor: colors.mainColor}}/>
                <SafeAreaView>
                    <HeaderAccountScreen
                        goBack={this.goBack}
                        firstName={this.state.firstName || ''}
                        lastName={this.state.lastName || ''}
                        />
                    <View style={styles.profileContainer}>
                        <Text style={styles.textProfile}>
                            MAIN PROFILE
                        </Text>
                        <Text style={styles.textYourData}>
                            Your data - at a glance
                        </Text>
                        <AuthGoogleFitButton/>
                        <Text style={styles.textPersonal}>
                            Main personal data
                        </Text>
                        <Input
                            value={this.state.email}
                            label='EMAIL:'
                            inputContainerStyle={styles.inputContainerStyle}
                            labelStyle={styles.labelStyle}
                            inputStyle={{color: colors.textColor, textAlign: 'center'}}
                            keyboardType='email-address'
                            onChangeText={(value) => this.saveEmail(value)}
                            />
                        <Input
                            value={this.state.firstName}
                            label='FIRST NAME:'
                            inputContainerStyle={styles.inputContainerStyle}
                            labelStyle={styles.labelStyle}
                            inputStyle={{color: colors.textColor, textAlign: 'center'}}
                            onChangeText={(value) => this.saveFirstName(value)}
                            />
                        <Input
                            value={this.state.lastName}
                            label='LAST NAME:'
                            inputContainerStyle={styles.inputContainerStyle}
                            labelStyle={styles.labelStyle}
                            inputStyle={{color: colors.textColor, textAlign: 'center'}}
                            onChangeText={(value) => this.saveLastName(value)}
                            />
                    </View>
                </SafeAreaView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        marginTop: '7%',
        backgroundColor: colors.mainBgColor,
    },
    textProfile: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.mainColor,
    },
    textYourData: {
        fontSize: 20,
        color: colors.lightTextColor,
        marginTop: '3%',
    },
    textPersonal: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.textColor,
        marginTop: '10%',
        marginBottom: '5%',
    },
    inputContainerStyle: {
        borderColor: colors.midgray,
        borderRadius: 10,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
    },
    labelStyle: {
        fontSize: 16,
        color: colors.lightTextColor,
        alignSelf: 'center',
        fontWeight: 'normal',
        marginBottom: '3%',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
