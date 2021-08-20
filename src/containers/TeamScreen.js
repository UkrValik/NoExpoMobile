import React from 'react';
import { ScrollView, Text, StyleSheet, SafeAreaView, View, StatusBar, Platform } from 'react-native';
import { connect } from 'react-redux';
import TeamScreenIcons from '../components/molecules/TeamScreenIcons';
import MonthChallengeDiagram from '../components/molecules/MonthChallengeDiagram';
import HeaderTeamScreen from '../components/atoms/HeaderTeamScreen';
import InputDailyData from '../components/molecules/InputDailyData';
import RatingButton from '../components/atoms/RatingButton';
import colors from '../styles/colors.json';
import { sortScores } from '../utilities/index';
import { fetchTeam } from '../redux/actions/ActionCreators';
import Diagram from '../components/TeamScreen/Diagram';
import Diagram2 from '../components/TeamScreen/Diagram2';

const mapDispatchToProps = dispatch => ({
    fetchTeam: async (teamId, token) => dispatch(fetchTeam(teamId, token)),
});

const mapStateToProps = state => {
    return {
        consumer: state.consumer,
        teams: state.teams,
    };
};

class TeamScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            team: this.props.teams.teams.filter(team => team.teamId === this.props.route.params.teamId)[0],
            diagramData: [],
            date: new Date(),
            stepValue: 0,
            maximumScore: 0,
            pressedScoreBar: null,
        };

        this.scoreBarTimeout = undefined;

        this.buildDiagramRanges = this.buildDiagramRanges.bind(this);
        this.saveStepValue = this.saveStepValue.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.goBack = this.goBack.bind(this);
        this.onDataSent = this.onDataSent.bind(this);
        this.setPressedScoreBar = this.setPressedScoreBar.bind(this);
        this.intervalCallback = this.intervalCallback.bind(this);
        this.stopInterval = this.stopInterval.bind(this);
        this.startInterval = this.startInterval.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setOptions({
            headerShown: false,
        });
        this.buildDiagramRanges();
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.buildDiagramRanges();
        });
        this.setStepValueFromLocalStore(this.state.date);
        this._interval = setInterval(() => this.intervalCallback(), 7500);
    }

    componentWillUnmount() {
        this._unsubscribe();
        clearInterval(this._interval);
    }

    onDateChange(date) {
        this.setState({ date: date });
        this.setStepValueFromLocalStore(date);
    }

    async intervalCallback() {
        this.setState({ team: this.props.teams.teams.filter(team => team.teamId === this.props.route.params.teamId)[0] });
        this.buildDiagramRanges();
    }

    stopInterval() {
        clearInterval(this._interval);
    }

    startInterval() {
        this._interval = setInterval(() => this.intervalCallback(), 7500);
    }

    async onDataSent() {
        await this.props.fetchTeam(this.state.team.teamId, this.props.consumer.token);
        this.setState({ team: this.props.teams.teams.filter(team => team.teamId === this.props.route.params.teamId)[0] });
        this.setStepValueFromLocalStore(this.state.date);
    }

    saveStepValue(value) {
        this.setState({ stepValue: value });
    }

    setPressedScoreBar(component) {
        this.setState({ pressedScoreBar: component });
        clearTimeout(this.scoreBarTimeout);
        this.scoreBarTimeout = setTimeout(() => {
            if (this.state.pressedScoreBar === component) {
                this.setState({ pressedScoreBar: '' });
            }
        }, 2000);
    }

    setStepValueFromLocalStore(date) {
        const scores = sortScores(this.state.team.scores);
        const dateScore = scores.find(day => 
            new Date(day.date).getFullYear() === date.getFullYear() &&
            new Date(day.date).getMonth() === date.getMonth() &&
            new Date(day.date).getDate() === date.getDate());
        if (dateScore) {
            this.setState({ stepValue: dateScore.score });
        } else {
            this.setState({ stepValue: '' });
        }
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
                        monthArray.push({ date: currDate.toDateString(), score: '' });
                    }
                } else {
                    monthArray.push({ date: currDate.toDateString(), score: '' });
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
                    monthArray.push({ date: currDate.toDateString(), score: '' });
                }
            } else {
                monthArray.push({ date: currDate.toDateString(), score: '' });
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

        const showInputDataSection = (startDate) => {
            startDate = new Date(startDate.toDateString());
            const currDate = new Date(new Date().toDateString());
            return (currDate.getTime() >= startDate.getTime()) && this.state.team.statusCode !== 'finished';
        }

        const daysToStart = (startDate) => {
            return new Date(new Date(startDate).getTime() - new Date().getTime()).getDate();
        }

        return (
            <View 
                style={{
                    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                    flex: 1,
                }}>
                <SafeAreaView style={{backgroundColor: colors.mainColor + 'ee'}} />
                <ScrollView keyboardShouldPersistTaps='handled'>
                    <SafeAreaView style={{backgroundColor: colors.mainBgColor}}>    
                        <HeaderTeamScreen
                            teamName={this.state.team.teamName}
                            team={this.state.team}
                            goBack={this.goBack}
                            />
                        <Text style={styles.challengeDescription}>
                            {this.state.team.challengeDescription.replace(regex, '')}
                        </Text>
                        {new Date(this.state.team.startDate).getTime() > new Date().getTime() &&
                            <View>
                                <Text
                                    style={{
                                        color: colors.pink,
                                        fontSize: 24,
                                        fontWeight: '600',
                                        textAlign: 'center',
                                        marginTop: daysToStart(this.state.team.startDate) > 0 ? '5%' : 0,
                                    }}>
                                    {daysToStart(this.state.team.startDate) + ' Tage zu starten'}
                                </Text>
                            </View>
                        }
                        <TeamScreenIcons team={this.state.team}/>
                        <Text style={styles.textStatistics}>
                            DEINE ERFOLGE
                        </Text>
                        {this.state.diagramData.map(month => 
                            this.state.team.challengeType === 1 ? 
                                <Diagram
                                    key={(monthKey++).toString()}
                                    consumer={this.props.consumer}
                                    team={this.state.team}
                                    month={month}
                                    maximumScore={this.state.maximumScore}
                                    setPressedScoreBar={this.setPressedScoreBar}
                                    pressedScoreBar={this.state.pressedScoreBar}
                                    />
                            :
                                <Diagram2
                                    key={(monthKey++).toString()}
                                    month={month}
                                    scores={this.state.team.scores}
                                    />
                        )}
                        <RatingButton
                            navigate={this.props.navigation.navigate}
                            teamId={this.state.team.teamId}
                            />
                        {showInputDataSection(new Date(this.state.team.startDate)) &&
                        <InputDailyData 
                            team={this.state.team}
                            teamId={this.state.team.teamId}
                            stepValue={this.state.stepValue}
                            date={this.state.date}
                            startDate={this.state.team.startDate}
                            endDate={endDate}
                            buildDiagramRanges={this.buildDiagramRanges}
                            onDateChange={this.onDateChange}
                            saveStepValue={this.saveStepValue}
                            onDataSent={this.onDataSent}
                            stopInterval={this.stopInterval}
                            startInterval={this.startInterval}
                            />}
                        {/* <Diagram/> */}
                    </SafeAreaView>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    challengeDescription: {
        fontSize: 16,
        fontWeight: 'normal',
        color: colors.lightTextColor,
        marginTop: '3%',
        textAlign: 'center',
        marginHorizontal: '10%',
    },
    textStatistics: {
        color: colors.mainColor,
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        marginTop: '-10%',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamScreen);
