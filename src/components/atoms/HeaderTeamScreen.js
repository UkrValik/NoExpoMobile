import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
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
            <View>
                <View style={styles.container}>
                    <Icon
                        name='arrow-left'
                        color={colors.mainBgColor}
                        size={16}
                        style={{marginLeft: '3%'}}
                        onPress={() => this.props.goBack()}
                        />
                    <Text style={styles.text}>
                        {this.props.teamName ? this.props.teamName : 'Dein Team'}
                    </Text>
                    <View style={{paddingHorizontal: '3%'}}/>
                </View>
                <Image
                    source={{uri: this.props.team.challengeImage}}
                    style={{ 
                        width: '100%',
                        aspectRatio: this.props.team.challengeImage ? 2.8 : 100000,
                        backgroundColor: colors.midgray,
                    }}
                    resizeMode='stretch'
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.mainColor,
        // borderBottomLeftRadius: 12,
        // borderBottomRightRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        color: colors.mainBgColor,
        fontSize: 20,
        fontWeight: '400',
        paddingVertical: '3%',
    }
});

export default HeaderTeamScreen;
