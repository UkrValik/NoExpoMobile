import React from 'react';
import { View, ScrollView, Text, StyleSheet, Image, Dimensions, StatusBar, Platform } from 'react-native';
import { connect } from 'react-redux';
import HeaderRatingScreen from '../components/atoms/HeaderRatingScreen';
import RatingList from '../components/atoms/RatingList';
import colors from '../styles/colors.json';

const mapStateToProps = (state) => {
    return {
        teams: state.teams.teams,
    };
}

class RatingScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            team: this.props.teams.filter(team => team.teamId === this.props.route.params.teamId)[0],
        };

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

    render() {

        const teamName = this.state.team.teamName ? this.state.team.teamName : 'Dein Team';

        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: colors.mainBgColor,
                    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                }}>
                <HeaderRatingScreen goBack={this.goBack}/>
                <Image
                    source={{uri: this.state.team.challengeImage}}
                    style={{
                        width: '100%',
                        aspectRatio: this.state.team.challengeImage ? 2.8 : 100000,
                        backgroundColor: colors.midgray,
                    }}
                    resizeMode='cover'
                    />
                <Text style={styles.teamName}>{teamName.toUpperCase()}</Text>
                <View style={styles.columnNames}>
                    <Text style={[styles.column, {flex: 1}]}>№</Text>
                    <Text style={[styles.column, {flex: 3, textAlign: 'left', marginLeft: '5%'}]}>NAME</Text>
                    <Text style={[styles.column, {flex: 2}]}>ERGEBNIS</Text>
                </View>
                <RatingList participants={this.state.team.participants}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    teamName: {
        textAlign: 'center',
        marginTop: '5%',
        fontSize: 20,
        color: colors.mainColor,
        fontWeight: '600',
    },
    column: {
        fontSize: 16,
        color: colors.mainColor,
        fontWeight: '400',
        textAlign: 'center',
    },
    columnNames: {
        flexDirection: 'row',
        marginTop: '7%',
        marginHorizontal: '2%',
        marginBottom: '3%',
    }
});

export default connect(mapStateToProps)(RatingScreen);
