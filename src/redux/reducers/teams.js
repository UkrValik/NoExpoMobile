import * as ActionTypes from '../actions/ActionTypes';

export const teams = (state = {
    loadingTeams: false,
    errMess: null,
    teams: [],
}, action) => {

    switch (action.type) {
        case ActionTypes.ADD_TEAMS:
            if (state.teams.length > 0) {
                for (let team of action.payload) {
                    if (state.teams.find(teamState => teamState.teamId === team.teamId) === undefined) {
                        state.teams.unshift(team);
                    } 
                }
                let i = 0;
                while (i < state.teams.length) {
                    if (action.payload.find(actionTeam => actionTeam.teamId === state.teams[i].teamId) === undefined) {
                        state.teams.splice(i, 1);
                    } else {
                        i++;
                    }
                }
                return state;
            } else {
                console.log(action.payload);
                if (action.payload)
                    return {...state, teams: action.payload};
                else {
                    return state;
                }
            }

        case ActionTypes.TEAMS_FAILED:
            return {...state, errMess: action.payload, teams: [] };

        case ActionTypes.UPDATE_TEAM:
            let teams = [];
            for (let i = 0; i < state.teams.length; ++i) {
                teams.push(state.teams[i]);
                if (teams[i].teamId === action.payload.team.teamId) {
                    teams[i] = action.payload.team;
                    teams[i].participants = action.payload.participants;
                    teams[i].scores = action.payload.scores;
                    teams[i].rank = action.payload.rank;
                }
            }
            return {...state, errMess: null, teams: teams};

        case ActionTypes.UPDATE_CONSUMER_SCORE:
            let currTeam = state.teams.find(team => team.teamId === action.payload.teamId);
            let currTeamIndex = state.teams.findIndex(team => team.teamId === action.payload.teamId);
            let currScore = currTeam.scores.find(day => day.date === action.payload.day.date);
            if (currScore === undefined) {
                currTeam.scores.push(action.payload.day);
            } else {
                let currScoreIndex = currTeam.scores.findIndex(day => day.date === action.payload.day.date);
                currScore.score = action.payload.day.score;
                currTeam.scores.splice(currScoreIndex, 1, currScore);
            }
            state.teams.splice(currTeamIndex, 1, currTeam);
            return {...state, errMess: null, teams: state.teams};
        
        case ActionTypes.UPDATE_CONSUMER_SCORES:
            currTeam = state.teams.find(team => team.teamId === action.payload.teamId);
            currTeamIndex = state.teams.findIndex(team => team.teamId === action.payload.teamId);
            let newScores = [];
            for (let step of action.payload.steps) {
                if (new Date(step.date).getTime() >= new Date(action.payload.startDate).getTime() &&
                    new Date(step.date).getTime() <= new Date(action.payload.endDate)) {
                    newScores.push({ 
                        date: step.date,
                        score: step.value,
                    });
                }
            }
            currTeam.scores = newScores;
            state.teams.splice(currTeamIndex, 1, currTeam);
            return state;

        case ActionTypes.LOADING_TEAMS:
            return {...state, loadingTeams: action.payload};

        default:
            return state;
    }
}