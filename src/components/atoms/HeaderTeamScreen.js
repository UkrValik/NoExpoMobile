import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, Image } from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import icomoonConfig from '../../styles/selection.json';
import colors from '../../styles/colors.json';

const Icon = createIconSetFromIcoMoon(icomoonConfig);

class HeaderTeamScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const imageWidth = Dimensions.get('screen').width;
        const imageHeight = Dimensions.get('screen').width / 5 * 4;

        return (
            <ImageBackground
                source={{uri: 'https://gesundheit-dev.teamworking.de/wp-content/uploads/B%C3%BCrolympics-Go-for-gold-challenge-1090.jpg'}}
                style={{ height: imageHeight, marginTop: '-13%'}}
                resizeMode='contain'
                >
                <View style={styles.container}>
                    <Icon
                        name='arrow-left'
                        color={colors.mainBgColor}
                        size={16}
                        style={{marginLeft: '3%'}}
                        onPress={() => this.props.goBack()}
                        />
                    <Text style={styles.text}>
                        {this.props.teamName}
                    </Text>
                    <View style={{paddingHorizontal: '3%'}}/>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.mainColor,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '13%',
    },
    text: {
        color: colors.mainBgColor,
        fontSize: 20,
        fontWeight: '700',
        paddingVertical: '3%',
    }
});

export default HeaderTeamScreen;
