import {useTheme} from '@shopify/restyle';
import React, {ReactNode} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  gestureHandlerRootHOC,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  Transition,
  Transitioning,
  TransitioningView,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {snapPoint} from 'react-native-redash';
import {Colors} from 'react-native-ui-lib';
import Box from '../../../../components/Box';
import {Theme} from '../../../../components/theme';
import * as Icon from 'react-native-iconly';
import {IProduct} from '../../../../types/IProduct';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';

import URL from '../../../../config/Api';
import {debounce} from 'lodash';

interface ICart {
  _id: string;
  product_id: IProduct;
  quantity: number;
  totalPrice: number;
}
interface SwipeableRowProps {
  children: ReactNode;
  onDelete: () => void;
  items: ICart;
  height: number;
}

const {width} = Dimensions.get('window');
const aspectRatio = width / 375;
const editWidth = 85 * aspectRatio;
const finalDes = width / 375;
const snapPoints = [-85 * aspectRatio, 0, finalDes];

const transition = (
  <Transition.Together>
    <Transition.Out type="fade" />
    <Transition.In type="fade" />
  </Transition.Together>
);

const SwipeableRow = ({
  children
}: SwipeableRowProps) => {
  const ref = React.useRef<TransitioningView>(null);

  return (
    <Transitioning.View ref={ref} transition={transition}>
      <Animated.View>{children}</Animated.View>
    </Transitioning.View>
  );
};

export default SwipeableRow;

const styles = StyleSheet.create({});
