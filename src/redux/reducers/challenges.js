import * as ActionTypes from '../actions/ActionTypes';

const updateChallengeById = (challengeArray, updatedChallenge) => {
    return challengeArray.map(
        challenge => 
        challenge.challengeId === updatedChallenge.challengeId ? 
        updatedChallenge : challenge
        );
}

const addChallenges = (challengeArray, addedChallenges) => {
    let newChallenges = [];
    for (let challenge of addedChallenges) {
        const oldChallenge = challengeArray.find(c => c.challengeId === challenge.challengeId);
        if (oldChallenge) {
            newChallenges.push(oldChallenge);
        } else {
            newChallenges.unshift(challenge);
        }
    }
    return newChallenges;
}

const initialState = {
    array: [],
    loadingChallenges: false,
    loadingError: null,
};

export const challenges = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.ADD_CHALLENGES:
            return { ...state, array: addChallenges(state.array, action.payload), loadingError: null }

        case ActionTypes.ADD_CHALLENGES_FAILED:
            return { ...state, array: [], loadingError: action.payload };

        case ActionTypes.SET_LOADING_CHALLENGES:
            return { ...state, loadingChallenges: action.payload };

        case ActionTypes.UPDATE_CHALLENGE:
            return { ...state, array: updateChallengeById(state.array, action.payload) };

        case ActionTypes.UPDATE_CHALLENGE_FAILED:
            return { ...state, loadingError: action.payload };

        default:
            return state;
    }
}
