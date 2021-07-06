import React from 'react';
import { StyleSheet,
    ScrollView,
    Alert,
    Text,
    View,
    SafeAreaView,
    TouchableNativeFeedback,
    Platform,
    StatusBar,
    BackHandler,
} from 'react-native';
import colors from '../styles/colors.json';
import { connect } from 'react-redux';
import HeaderAccountScreen from '../components/atoms/HeaderAccountScreen';
import { toggleGoogleFit, logout } from '../redux/actions/ActionCreators';

const mapStateToProps = state => {
    return {
        consumer: state.consumer,
    };
};

const mapDispatchToProps = dispatch => ({
    toggleGoogleFit: () => dispatch(toggleGoogleFit()),
    logout: () => dispatch(logout()),
});

const AccountScreen = (props) => {

    const handleBackButton = () => {
        BackHandler.exitApp();
        return true;
    }

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        });
        return unsubscribe;
    }, [props.navigation]);

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('blur', () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        });
        return unsubscribe;
    }, [props.navigation]);

    const [companyName, setCompanyName] = React.useState(props.consumer.consumer.companyName);
    const [firstName, setFirstName] = React.useState(props.consumer.consumer.firstName);
    const [lastName, setLastName] = React.useState(props.consumer.consumer.lastName);
    const [email, setEmail] = React.useState(props.consumer.consumer.email);

    const logout = () => {
        props.logout();
    }

    return (
        <View
            style={{
                paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                flex: 1,
            }}>
            {/* <SafeAreaView style={{backgroundColor: colors.mainColor + 'ee'}}/> */}
            <ScrollView
                style={{
                    flex: 1,
                    backgroundColor: colors.mainBgColor,
                }}
                contentContainerStyle={{justifyContent: 'flex-start'}}
                >
                <SafeAreaView>
                    <HeaderAccountScreen
                        firstName={firstName || ''}
                        lastName={lastName || ''}
                        logout={logout}
                        avatar={props.consumer.consumer.avatar}
                        token={props.consumer.token}
                        />
                    <View style={styles.profileContainer}>
                            {/*<Text style={styles.textProfile}>
                                HAUPTPROFIL
                            </Text>
                            <Text style={styles.textYourData}>
                                Alle Daten - auf einen Blick
                            </Text>
                            <AuthGoogleFitButton/>
                            <Text style={styles.textPersonal}>
                                Persönliche Hauptdaten
                            </Text>*/}
                        <View
                            style={{
                                marginBottom: '7%',
                            }}>
                            <Text style={styles.labelStyle}>
                                VORNAME:
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 18,
                                    fontWeight: '700',
                                    color: colors.textColor,
                                }}>
                                {firstName}
                            </Text>
                        </View>
                        <View
                            style={{
                                marginBottom: '7%',
                            }}>
                            <Text style={styles.labelStyle}>
                                NACHNAME:
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 18,
                                    fontWeight: '700',
                                    color: colors.textColor,
                                }}>
                                {lastName}
                            </Text>
                        </View>
                        <View
                            style={{
                                marginBottom: '7%',
                            }}>
                            <Text style={styles.labelStyle}>
                                EMAIL:
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 18,
                                    fontWeight: '700',
                                    color: colors.textColor,
                                }}>
                                {email}
                            </Text>
                        </View>
                        <View
                            style={{
                                marginBottom: '7%',
                            }}>
                            <Text style={styles.labelStyle}>
                                UNTERNEHMEN:
                            </Text>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 18,
                                    fontWeight: '700',
                                    color: colors.textColor,
                                }}>
                                {companyName}
                            </Text>
                        </View>
                        {/* <Input
                            value={firstName}
                            label='VORNAME:'
                            inputContainerStyle={styles.inputContainerStyle}
                            labelStyle={styles.labelStyle}
                            inputStyle={{color: colors.textColor, textAlign: 'center'}}
                            style={{fontWeight: '700', fontSize: 20}}
                            onChangeText={(value) => setFirstName(value)}
                            editable={false}
                            />
                        <Input
                            value={lastName}
                            label='NACHNAME:'
                            inputContainerStyle={styles.inputContainerStyle}
                            labelStyle={styles.labelStyle}
                            inputStyle={{color: colors.textColor, textAlign: 'center'}}
                            style={{fontWeight: '700', fontSize: 20}}
                            onChangeText={(value) => setLastName(value)}
                            editable={false}
                            />
                        <Input
                            value={email}
                            label='EMAIL:'
                            inputContainerStyle={styles.inputContainerStyle}
                            labelStyle={styles.labelStyle}
                            inputStyle={{color: colors.textColor, textAlign: 'center'}}
                            keyboardType='email-address'
                            style={{fontWeight: '700', fontSize: 18}}
                            onChangeText={(value) => setEmail(value)}
                            editable={false}
                            />
                        <Input
                            value={companyName}
                            label='COMPANY NAME:'
                            inputContainerStyle={styles.inputContainerStyle}
                            labelStyle={styles.labelStyle}
                            inputStyle={{color: colors.textColor, textAlign: 'center'}}
                            keyboardType='email-address'
                            style={{fontWeight: '700', fontSize: 20}}
                            onChangeText={(value) => setCompanyName(value)}
                            editable={false}
                            /> */}
                        <TouchableNativeFeedback onPress={logout}>
                            <View
                                style={{
                                    backgroundColor: colors.pink,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    borderRadius: 10,
                                    width: '95%',
                                    marginBottom: '5%',
                                    height: 40,
                                    paddingHorizontal: 10,
                                }}>
                                <Text
                                    style={{
                                        fontSize: 16,
                                        color: '#FFF',
                                    }}>
                                    ABMELDEN
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </SafeAreaView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        alignItems: 'center',
        marginTop: '7%',
        backgroundColor: colors.mainBgColor,
    },
    inputContainerStyle: {
        // borderColor: colors.midgray,
        // borderRadius: 10,
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
    labelStyle: {
        fontSize: 14,
        color: colors.lightTextColor,
        alignSelf: 'center',
        fontWeight: 'normal',
        marginBottom: '1%',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen);
