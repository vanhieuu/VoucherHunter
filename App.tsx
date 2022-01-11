import React from 'react';
import RootStack from './src/nav/RootStack';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {ThemeProvider} from '@shopify/restyle';
import theme, { darkTheme } from './src/components/Theme';

const App = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : theme}>
      <Provider store={store}>
        <RootStack />
      </Provider>
    </ThemeProvider>
  );
};

export default App;
