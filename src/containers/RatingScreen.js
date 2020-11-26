import React from 'react';
import { View, ScrollView, Text, StyleSheet, Image, Dimensions } from 'react-native';
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

        return (
            <View style={{backgroundColor: colors.mainBgColor}}>
                <HeaderRatingScreen goBack={this.goBack}/>
                <Image
                    source={{uri: 'https://gesundheit-dev.teamworking.de/wp-content/uploads/B%C3%BCrolympics-Go-for-gold-challenge-1090.jpg'}}
                    style={styles.imageStyle}
                    resizeMode='contain'
                    />
                <Text style={styles.teamName}>{this.state.team.teamName.toUpperCase()}</Text>
                <View style={styles.columnNames}>
                    <Text style={[styles.column, {flex: 1}]}>№</Text>
                    <Text style={[styles.column, {flex: 3, textAlign: 'left', marginLeft: '5%'}]}>NAME</Text>
                    <Text style={[styles.column, {flex: 1.5}]}>SCORE</Text>
                </View>
                <RatingList participants={this.state.team.participants}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        height: Dimensions.get('screen').width / 4,
        marginTop: '15%',
        borderRadius: 20,
    },
    teamName: {
        textAlign: 'center',
        marginTop: '10%',
        fontSize: 20,
        color: colors.mainColor,
        fontWeight: '600',
    },
    column: {
        fontSize: 20,
        color: colors.mainColor,
        fontWeight: '700',
        textAlign: 'center',
    },
    columnNames: {
        flexDirection: 'row',
        marginTop: '15%',
        marginHorizontal: '5%',
        marginBottom: '3%',
    }
});

export default connect(mapStateToProps)(RatingScreen);
