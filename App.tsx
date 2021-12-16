import React from 'react';
import RootStack from './src/nav/RootStack';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {enableFreeze} from 'react-native-screens';

const App = () => {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  );
};

export default App;
