import * as ActionTypes from '../actions/ActionTypes';

const initialState = {
    errMess: null,
    token: null,
    consumer: {},
    synchronizeGoogleFit: false,
    steps: [],
    synchronizationResult: null,
};

export const consumer = (state = initialState, action) => {

    switch (action.type) {
        case ActionTypes.ADD_CONSUMER:
            return {...state, errMess: null, token: state.token, consumer: action.payload.consumer, synchronizeGoogleFit: false};

        case ActionTypes.ADD_CONSUMER_TOKEN:
            return {...state, errMess: null, token: action.payload.data.token, consumer: state.consumer};

        case ActionTypes.VALIDATE_TOKEN:
            if (action.payload.success) {
                return state;
            } else {
                return {...state, errMess: null, token: null, consumer: null};
            }

        case ActionTypes.UPDATE_CONSUMER:
            return {...state, errMess: null, token: state.token, consumer: action.payload};

        case ActionTypes.CONSUMER_FAILED:
            return {...state, errMess: action.payload, token: state.token, consumer: state.consumer};

        case ActionTypes.TOKEN_FAILED:
            return {...state, errMess: action.payload, token: state.token, consumer: state.consumer};

        case ActionTypes.TOGGLE_GOOGLE_FIT:
            return {...state, synchronizeGoogleFit: !state.synchronizeGoogleFit};

        case ActionTypes.ADD_STEPS:
            return {...state, steps: action.payload};

        case ActionTypes.SEND_CHALLENGE_DATA:
            return {...state, synchronizationResult: action.payload};

        default:
            return state;
    }
}
