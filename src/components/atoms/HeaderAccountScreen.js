import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../styles/colors.json';

class HeaderAccountScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Icon
                        type='material-community'
                        name='chevron-left'
                        size={30}
                        color={colors.mainBgColor}
                        containerStyle={{marginLeft: '2%'}}
                        onPress={() => this.props.goBack()}
                        />
                    <Text style={styles.textAccount}>
                        Account
                    </Text>
                    <Icon
                        type='material-community'
                        name='exit-to-app'
                        size={30}
                        color={colors.mainBgColor}
                        style={{marginRight: '5%'}}
                        />
                </View>
                <View style={styles.bottom}>
                    <Image
                        style={styles.image}
                        source={{uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'}}
                        />
                    <Text style={styles.textHello}>
                        Hello!
                    </Text>
                    <Text style={styles.textName}>
                        {this.props.firstName + ' ' + this.props.lastName}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.mainColor,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: '3%',
    },
    bottom: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textAccount: {
        color: colors.mainBgColor,
        fontSize: 20,
        fontWeight: '600',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginVertical: '3%',
    },
    textHello: {
        color: colors.mainBgColor,
        fontSize: 14,
        fontWeight: '600',
    },
    textName: {
        color: colors.mainBgColor,
        fontSize: 20,
        fontWeight: '600',
        marginBottom: '4%',
    }
});

export default HeaderAccountScreen;
