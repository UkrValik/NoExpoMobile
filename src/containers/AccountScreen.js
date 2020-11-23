import React from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import colors from '../styles/colors.json';
import { connect } from 'react-redux';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import AccountHeader from '../components/molecules/AccountHeader';
import AccountBlock from '../components/atoms/AccountBlock';
import AutomationCheckbox from '../components/atoms/AutomationCheckbox';
import HeaderAccountScreen from '../components/atoms/HeaderAccountScreen';
import { toggleGoogleFit } from '../redux/actions/ActionCreators';
import HeaderMainScreen from '../components/atoms/HeaderMainScreen';

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
            <ScrollView style={{flex: 1, backgroundColor: colors.mainBgColor}} contentContainerStyle={{justifyContent: 'flex-start'}}>
                <HeaderAccountScreen goBack={this.goBack} firstName={this.state.firstName || ''} lastName={this.state.lastName || ''}/>
                <AutomationCheckbox
                    synchronizeCheckbox={this.props.consumer.synchronizeGoogleFit}
                    saveSynchronizeCheckbox={this.saveSynchronizeCheckbox}
                    authorized={this.state.authorized}
                    authorizeGoogleFit={this.authorizeGoogleFit}
                    />
                <AccountBlock 
                    title='Main personal data' 
                    saveBlock={this.saveConsumerBlock} 
                    blockRotated={this.state.consumerBlockRotated}
                    />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
