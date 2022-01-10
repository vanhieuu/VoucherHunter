import React from 'react';
import RootStack from './src/nav/RootStack';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {ThemeProvider} from '@shopify/restyle';
import theme from './src/components/Theme';
import {NavigationContainer} from '@react-navigation/native';
const App = () => {
  return (
    <ThemeProvider {...{theme}}>
      <Provider store={store}>
        <RootStack />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
