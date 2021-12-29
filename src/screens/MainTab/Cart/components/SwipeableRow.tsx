import React, {ReactNode} from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import Animated, {
  Transition,
  Transitioning,
  TransitioningView,
} from 'react-native-reanimated';

import {IProduct} from '../../../../types/IProduct';

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

const transition = (
  <Transition.Together>
    <Transition.Out type="fade" />
    <Transition.In type="fade" />
  </Transition.Together>
);

const SwipeableRow = ({children}: SwipeableRowProps) => {
  const ref = React.useRef<TransitioningView>(null);

  return (
    <Transitioning.View ref={ref} transition={transition}>
      <Animated.View>{children}</Animated.View>
    </Transitioning.View>
  );
};

export default SwipeableRow;

const styles = StyleSheet.create({});
