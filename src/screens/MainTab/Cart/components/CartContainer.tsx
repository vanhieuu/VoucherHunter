import {backgroundColor, useTheme} from '@shopify/restyle';
import React, {ReactNode} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
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
import theme, {Theme} from '../../../../components/theme';

interface CartProps {
  children: ReactNode;
}
const {width} = Dimensions.get('window');
const height = (682 * width) / 375;
const minHeight = (228 * width) / 375;
const snapPoints = [-(height - minHeight), 0];

const CartContainer =  gestureHandlerRootHOC(({children}: CartProps) => {
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
      const dest = snapPoint(translateY.value, velocityY, snapPoints);
      translateY.value = withSpring(dest, {overshootClamping: true});
    },
  });
  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateY.value,
        },
      ],
    };
  });
  return (
    <Box flex={1} backgroundColor={'primary'}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height,
              backgroundColor: 'white',
              borderBottomLeftRadius: theme.borderRadii.m,
              borderBottomRightRadius: theme.borderRadii.m,
              borderTopLeftRadius: theme.borderRadii.m,
              borderTopRightRadius: theme.borderRadii.m,
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
                width: 60,
                marginBottom: Spacings.s4,
              }}
            />
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Box>
  );
});

export default CartContainer;

const styles = StyleSheet.create({});
