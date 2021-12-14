import { Platform } from 'react-native';
import {Spacings} from 'react-native-ui-lib';

Spacings.loadSpacings({
    page: Platform.OS ==='android' ? 16 : 20
  });