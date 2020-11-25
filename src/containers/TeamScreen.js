import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableHighlightBase } from 'react-native';
import { connect } from 'react-redux';
import TeamScreenIcons from '../components/molecules/TeamScreenIcons';
import MonthChallengeDiagram from '../components/molecules/MonthChallengeDiagram';
import HeaderTeamScreen from '../components/atoms/HeaderTeamScreen';
import InputDailyData from '../components/molecules/InputDailyData';
import RatingButton from '../components/atoms/RatingButton';
import colors from '../styles/colors.json';
import { sortScores } from '../utilities/index';
import { updateConsumerScores, sendChallengeData } from '../redux/actions/ActionCreators';

const mapStateToProps = state => {
    return {
        consumer: state.consumer,
        teams: state.teams,
    };
};

const mapDispatchToProps = dispatch => ({
    updateConsumerScores: (teamId, steps, startDate, endDate) => dispatch(updateConsumerScores(teamId, steps, startDate, endDate)),
    sendChallengeData: (data, token) => dispatch(sendChallengeData(data, token)),
});

class TeamScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            team: this.props.teams.teams.filter(team => team.teamId === this.props.route.params.teamId)[0],
            diagramData: [],
            date: new Date(),
            stepValue: 0,
            maximumScore: 0,
        };

        this.buildDiagramRanges = this.buildDiagramRanges.bind(this);
        this.saveStepValue = this.saveStepValue.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerShown: false,
        });
        this.interval = setInterval(() => {
            if (this.props.consumer.steps.length > 0 && this.props.consumer.synchronizeGoogleFit) {
                this.props.updateConsumerScores(this.state.team.teamId, this.props.consumer.steps, this.state.team.startDate, this.state.team.endDate);
                setTimeout(() => {
                    const data = {
                        id: this.state.team.challengeId,
                        activities: this.state.team.scores,
                    };
                    this.props.sendChallengeData(data, this.props.consumer.token);
                }, 2000);
            }
        }, 5000);
        this.buildDiagramRanges();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onDateChange(date) {
        this.setState({ date: date });
    }

    saveStepValue(value) {
        this.setState({ stepValue: value });
    }

    buildDiagramRanges() {
        const startDate = new Date(this.state.team.startDate);
        const endDate = new Date(this.state.team.endDate);
        const scores = sortScores(this.state.team.scores);
        let currDate = new Date(startDate);
        let currMonth = startDate.getMonth();
        let diagramData = [];
        let monthArray = [];
        let scoreIndex = 0;
        let maximumScore = 1;

        while (currDate.getFullYear() !== endDate.getFullYear() || 
            currDate.getMonth() !== endDate.getMonth() || 
            currDate.getDate() !== endDate.getDate()) {
                
            if (currDate.getMonth() === currMonth) {
                if (scores.length > 0) {
                    if (currDate.getFullYear() === new Date(scores[scoreIndex].date).getFullYear() && 
                        currDate.getMonth()    === new Date(scores[scoreIndex].date).getMonth() && 
                        currDate.getDate()     === new Date(scores[scoreIndex].date).getDate() &&
                        scores.length > 0) {
                        
                        monthArray.push({ date: new Date(scores[scoreIndex].date).toDateString(), score: scores[scoreIndex].score });
                        if (maximumScore < scores[scoreIndex].score) {
                            maximumScore = scores[scoreIndex].score;
                        }
                        if (scoreIndex < scores.length - 1) {
                            scoreIndex += 1;
                        }
                    } else {
                        monthArray.push({ date: currDate.toDateString(), score: 0 });
                    }
                } else {
                    monthArray.push({ date: currDate.toDateString(), score: 0 });
                }
                currDate.setDate(currDate.getDate() + 1);
            } else {
                currMonth = (currMonth + 1) % 12;
                diagramData.push(monthArray);
                monthArray = [];
            }
        }
        if (currDate.getMonth() === currMonth) {
            if (scores.length > 0) {
                if (currDate.getFullYear() === new Date(scores[scoreIndex].date).getFullYear() && 
                    currDate.getMonth()    === new Date(scores[scoreIndex].date).getMonth() && 
                    currDate.getDate()     === new Date(scores[scoreIndex].date).getDate()) {
                    
                    monthArray.push({ date: new Date(scores[scoreIndex].date).toDateString(), score: scores[scoreIndex].score });
                    if (maximumScore < scores[scoreIndex].score) {
                        maximumScore = scores[scoreIndex].score;
                    }
                    if (scoreIndex < scores.length - 1) {
                        scoreIndex += 1;
                    }
                } else {
                    monthArray.push({ date: currDate.toDateString(), score: 0 });
                }
            } else {
                monthArray.push({ date: currDate.toDateString(), score: 0 });
            }
            diagramData.push(monthArray);
        } else {
            diagramData.push(monthArray);
        }
        this.setState({ 
            diagramData: diagramData,
            maximumScore: maximumScore,
        });
    }

    goBack() {
        this.props.navigation.goBack();
    }

    render() {

        let monthKey = 0;
        const regex = /(<([^>]+)>)/ig;
        const endDate = new Date().getTime() > new Date(this.state.team.endDate).getTime() ? new Date(this.state.team.endDate) : new Date();

        return (
            <ScrollView style={{backgroundColor: colors.mainBgColor}}>
                <HeaderTeamScreen
                    teamName={this.state.team.teamName}
                    goBack={this.goBack}
                    />
                <Text style={styles.challengeDescription}>
                    {this.state.team.challengeDescription.replace(regex, '')}
                </Text>
                <TeamScreenIcons team={this.state.team}/>
                <Text style={styles.textStatistics}>
                    STATISTICS
                </Text>
                {this.state.diagramData.map(month => (
                    <MonthChallengeDiagram
                        key={(monthKey++).toString()}
                        consumer={this.props.consumer}
                        team={this.state.team}
                        month={month}
                        maximumScore={this.state.maximumScore}
                        />
                ))}
                <RatingButton navigate={this.props.navigation.navigate}/>
                <InputDailyData 
                    toggleDataInput={this.toggleDataInput} 
                    manualDataInput={this.state.manualDataInput}
                    teamId={this.state.team.teamId}
                    stepValue={this.state.stepValue}
                    date={this.state.date}
                    startDate={this.state.team.startDate}
                    endDate={endDate}
                    buildDiagramRanges={this.buildDiagramRanges}
                    onDateChange={this.onDateChange}
                    saveStepValue={this.saveStepValue}
                    />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    challengeDescription: {
        fontSize: 16,
        fontWeight: 'normal',
        color: colors.lightTextColor,
        marginTop: '7%',
        textAlign: 'center',
        marginHorizontal: '10%',
    },
    textStatistics: {
        color: colors.mainColor,
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: '30%',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamScreen);