import * as ActionTypes from './ActionTypes';
import shared from '../../styles/shared.json';

export const fetchTeams = (token) => (dispatch) => {
    return fetch(shared.baseURL + shared.fetchTeamsPATH, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                let error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            let errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(teams => dispatch(addTeams(teams.teams)))
        .catch(error => dispatch(teamsFailed(error.message)));
}

export const fetchTeam = (teamId, token) => (dispatch) => {
    return fetch(shared.baseURL + shared.fetchSingleTeamPATH + teamId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                let error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            let errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(team => dispatch(updateTeam(team)))
        .catch(error => dispatch(teamsFailed(error)));
}

export const addTeams = (teams) => ({
    type: ActionTypes.ADD_TEAMS,
    payload: teams,
});

export const teamsFailed = (errMess) => ({
    type: ActionTypes.TEAMS_FAILED,
    payload: errMess,
});

export const updateTeam = (team) => ({
    type: ActionTypes.UPDATE_TEAM,
    payload: team,
});

export const postConsumerScore = (teamId, day) => dispatch => {
    return dispatch(updateConsumerScore(teamId, day));
}

export const updateConsumerScore = (teamId, day) => ({
    type: ActionTypes.UPDATE_CONSUMER_SCORE,
    payload: {
        teamId: teamId,
        day: day,
    },
});

export const fetchToken = (namePass) => dispatch => {
    return fetch(shared.baseURL + shared.fetchTokenPATH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(namePass),
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                let error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            let errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(token => dispatch(addConsumerToken(token)))
        .catch(error => dispatch(tokenFailed(error)));
}

export const fetchConsumer = (token) => dispatch => {
    return fetch(shared.baseURL + shared.fetchConsumerPATH, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                let error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            let errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(consumer => dispatch(addConsumer(consumer)))
        .catch(error => dispatch(consumerFailed(error)));
}

export const fetchTokenValid = (token) => dispatch => {
    return fetch(shared.baseURL + shared.validateTokenPATH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                let error = new Error('Error' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            let errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(consumer => dispatch(validateToken(consumer)))
        .catch(error => dispatch(tokenFailed(error)));
}

export const addConsumer = (consumer) => ({
    type: ActionTypes.ADD_CONSUMER,
    payload: consumer,
});

export const addConsumerToken = (token) => ({
    type: ActionTypes.ADD_CONSUMER_TOKEN,
    payload: token,
});

export const validateToken = (token) => ({
    type: ActionTypes.VALIDATE_TOKEN,
    payload: token,
});

export const consumerFailed = (errMess) => ({
    type: ActionTypes.CONSUMER_FAILED,
    payload: errMess,
});

export const tokenFailed = (errMess) => ({
    type: ActionTypes.TOKEN_FAILED,
    payload: errMess,
});

export const clearConsumer = () => ({
    type: ActionTypes.CLEAR_CONSUMER,
});

export const toggleGoogleFit = () => dispatch => dispatch({
    type: ActionTypes.TOGGLE_GOOGLE_FIT,
});

export const addSteps = (steps) => dispatch => dispatch({
    type: ActionTypes.ADD_STEPS,
    payload: steps,
});

export const updateConsumerScores = (teamId, steps, startDate, endDate) => dispatch => dispatch({
    type: ActionTypes.UPDATE_CONSUMER_SCORES,
    payload: {
        teamId: teamId,
        steps: steps,
        startDate: startDate,
        endDate: endDate,
    },
});

export const sendChallengeData = (data, token) => dispatch => {
    return fetch(shared.baseURL + shared.sendChallengeDataPATH, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            let error = new Error('Error' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        let errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(result => dispatch(updateSynchronizationResult(result)))
    .catch(error => dispatch(updateSynchronizationResult(error)));
}

export const updateSynchronizationResult = (result) => ({
    type: ActionTypes.SEND_CHALLENGE_DATA,
    payload: result,
});

export const makeFirstLogin = () => dispatch => dispatch({
    type: ActionTypes.MAKE_FIRST_LOGIN,
});

export const chooseListType = (type) => dispatch => dispatch({
    type: ActionTypes.CHOOSE_LIST_TYPE,
    payload: type,
});

export const logout = () => dispatch => dispatch({
    type: ActionTypes.LOGOUT,
});

export const receivedStepsFromGF = (value) => dispatch => dispatch({
    type: ActionTypes.RECEIVED_STEPS_FROM_GF,
    payload: value,
});

export const checkGDPR = (params, token) => dispatch => {
    return fetch(shared.baseURL + shared.checkGDPRPath, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(params),
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            let error = new Error('Error' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        let errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(result => dispatch(checkGDPRSuccess(result)))
    .catch(error => dispatch(checkGDPRFailed(error)));
}

export const checkGDPRSuccess = (gdprData) => dispatch => dispatch({
    type: ActionTypes.CHECK_GDPR_SUCCESS,
    payload: gdprData,
});

export const checkGDPRFailed = (error) => dispatch => dispatch({
    type: ActionTypes.CHECK_GDPR_FAILED,
    payload: error,
});

export const updateGDPRDate = (date) => dispatch => dispatch({
    type: ActionTypes.UPDATE_GDPR_DATE,
    payload: date,
});

export const synchronizeAppleHealth = (value) => dispatch => dispatch({
    type: ActionTypes.SYNCHRONIZE_APPLE_HEALTH,
    payload: value,
});

export const setLoadingTeams = (value) => dispatch => dispatch({
    type: ActionTypes.LOADING_TEAMS,
    payload: value,
});

/**
 * CHALLENGES *****************************************************************
 */

export const fetchChallenges = (token) => dispatch => {
    return fetch(shared.baseURL + shared.addChallengesPath, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            let error = new Error('Error' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        let errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(result => dispatch(addChallenges(result)))
    .catch(error => dispatch(addChallengesFailed(error)));
}

export const addChallenges = (result) => ({
    type: ActionTypes.ADD_CHALLENGES,
    payload: result,
});

export const addChallengesFailed = (error) => ({
    type: ActionTypes.ADD_CHALLENGES_FAILED,
    payload: error,
});

export const setLoadingChallenges = (value) => dispatch => dispatch({
    type: ActionTypes.SET_LOADING_CHALLENGES,
    payload: value,
});
