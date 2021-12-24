/**
 * @format
 */
 import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './src/config/Colors';
import './src/config/Spacings';
import './src/config/Typo';
import './src/config/Assets'
AppRegistry.registerComponent(appName, () => App);
