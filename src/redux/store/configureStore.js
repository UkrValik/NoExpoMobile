import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { teams } from '../reducers/teams';
import { consumer } from '../reducers/consumer';
import { challenges } from '../reducers/challenges';
import AsyncStorage from '@react-native-community/async-storage';

export const ConfigureStore = () => {
    const config = {
        key: 'root',
        storage: AsyncStorage,
        debug: true,
    };

    const store = createStore(
        persistCombineReducers(config, {
            teams,
            consumer,
            challenges,
        }),
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store);
    return { persistor, store };
}
