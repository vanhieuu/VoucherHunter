import {useTheme} from '@shopify/restyle';
import React, {FC, ReactNode} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  gestureHandlerRootHOC,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {clamp, snapPoint} from 'react-native-redash';
import {Colors, Spacings} from 'react-native-ui-lib';
import Box from '../../../../components/Box';
import {Theme} from '../../../../components/theme';
import {IProduct} from '../../../../types/IProduct';
interface ICart {
  _id: string;
  product_id: IProduct;
  quantity: number;
  totalPrice: number;
}
interface CartProps {
  children: ReactNode;
  CheckOutComponent: FC<{minHeight: number}>;
}
const {width} = Dimensions.get('window');
const height = (680 * width) / 375;
const minHeight = (200 * width) / 375;
const snapPoints = [-(height - minHeight), 0];

const CartContainer = gestureHandlerRootHOC(
  ({children, CheckOutComponent}: CartProps) => {
    const [items, setItems] = React.useState<ICart[]>([]);
    const theme = useTheme<Theme>();
    const translateY = useSharedValue(0);
    const onGestureEvent = useAnimatedGestureHandler<
      PanGestureHandlerGestureEvent,
      {x: number; y: number}
    >({
      onStart: (_, ctx) => {
        ctx.y = translateY.value;
      },

      onActive: ({translationY}, ctx) => {
        translateY.value = clamp(
          ctx.y + translationY,
          snapPoints[0],
          snapPoints[1],
        );
      },
      onEnd: ({velocityY}) => {
        const dest = snapPoint(translateY.value, velocityY, [
          -(height - minHeight),
          0,
        ]);
        translateY.value = withSpring(dest, {overshootClamping: true});
      },
    });
    const style = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: translateY.value,
          },
        ],
      };
    });
    return (
      <Box flex={1}>
        <CheckOutComponent minHeight={minHeight} />

        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height,
              backgroundColor: 'white',
              borderBottomLeftRadius: theme.borderRadii.xl,
              borderBottomRightRadius: theme.borderRadii.xl,
            },
            style,
          ]}>
          {children}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: theme.borderRadii.xl,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 5,
                backgroundColor: Colors.grey,
                width: (50 * width) / 375,
                borderRadius: (2.5 * width) / 375,
                marginBottom: Spacings.s2,
              }}
            />
          </View>
        </Animated.View>
      </Box>
    );
  },
);

export default CartContainer;

const styles = StyleSheet.create({});
