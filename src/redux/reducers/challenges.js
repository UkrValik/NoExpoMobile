import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    array: [],
    loadingChallenges: false,
    loadingError: null,
};

export const challenges = (state = initialState, action) => {
    switch (action.type) {

        case ActionTypes.ADD_CHALLENGES:
            return { ...state, array: action.payload.success ? action.payload.challenges : [], loadingError: null }

        case ActionTypes.ADD_CHALLENGES_FAILED:
            return { ...state, array: [], loadingError: action.payload };

        case ActionTypes.SET_LOADING_CHALLENGES:
            return { ...state, loadingChallenges: action.payload };

        default:
            return state;
    }
}
