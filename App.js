/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { LogBox } from 'react-native';
import { Provider } from 'react-redux';
import { ConfigureStore } from './src/redux/store/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import Loading from './src/components/atoms/Loading';
import Main from './src/navigation/MainStackNavigator';

LogBox.ignoreAllLogs();

const { persistor, store } = ConfigureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate
          loading={<Loading/>}
          persistor={persistor}
        >
          <Main/>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
