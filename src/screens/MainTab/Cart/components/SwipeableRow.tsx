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
} from 'react-native-reanimated';
import {snapPoint} from 'react-native-redash';
import {Colors} from 'react-native-ui-lib';
import Box from '../../../../components/Box';
import {Theme} from '../../../../components/theme';
import * as Icon from 'react-native-iconly';
import {IProduct} from '../../../../types/IProduct';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../../redux/store';
import {onUpdateQuantity} from '../../../../redux/authCartSlice';
import axios from 'axios';
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
}

const {width} = Dimensions.get('window');
const aspectRatio = width / 375;
const editWidth = 85 * aspectRatio;
const snapPoints = [-85 * aspectRatio, 0, width];
const finalDes = width;

const transition = (
  <Transition.Together>
    <Transition.Out type="fade" />
    <Transition.In type="fade" />
  </Transition.Together>
);

const SwipeableRow = gestureHandlerRootHOC(
  ({children, onDelete, items}: SwipeableRowProps) => {
    const token = useSelector<RootState, string>(
      state => state.auth.accessToken,
    );
    const [loading, setLoading] = React.useState(false);
    const header = `Authorization: Bearer ${token}`;

    const ref = React.useRef<TransitioningView>(null);
    const [quantity, setQuantity] = React.useState<number>(1);
    const deleteItem = React.useCallback(() => {
      ref.current?.animateNextTransition();
      onDelete();
    }, [onDelete]);
    const theme = useTheme<Theme>();
    //   const [translationX, setTranslationX] = React.useState(1);
    const translateX = useSharedValue(0);
    const putQuantity = React.useCallback(
      debounce(() => {
        setLoading(true);
        fetch(URL.addQuantity, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id: items._id,
            quantity: quantity,
          }),
        });
      }, 1000),
      [],
    );

    const onGestureEvent = useAnimatedGestureHandler<
      PanGestureHandlerGestureEvent,
      {x: number}
    >(
      {
        onStart: (_, ctx) => {
          ctx.x = translateX.value;
        },

        onActive: ({translationX}, ctx) => {
          translateX.value = ctx.x + translationX;
        },
        onEnd: ({velocityX}) => {
          const dest = snapPoint(translateX.value, velocityX, snapPoints);
          translateX.value = withSpring(
            snapPoint(translateX.value, velocityX, snapPoints),
            {
              overshootClamping: true,
            },
            () => {
              if (dest === finalDes) {
                deleteItem();
              }
            },
          );
        },
      },
      [],
    );
    const style = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: translateX.value,
          },
        ],
      };
    });

    const deleteStyle = useAnimatedStyle(() => {
      return {
        opacity: translateX.value > 0 ? 1 : 0,
      };
    });
    const addStyle = useAnimatedStyle(() => {
      return {
        opacity: translateX.value < 0 ? 1 : 0,
      };
    });

    return (
      <Transitioning.View ref={ref} transition={transition}>
        <Animated.View style={[StyleSheet.absoluteFill, , deleteStyle]}>
          <LinearGradient
            style={StyleSheet.absoluteFill}
            colors={[theme.colors.danger, theme.colors.white]}
            start={{x: 0, y: 1}}
            end={{x: 0.5, y: 1}}
          />
          <Box
            justifyContent="space-evenly"
            flex={1}
            width={editWidth}
            alignItems="center">
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>Xoá sản phẩm</Text>
          </Box>
        </Animated.View>
        <Animated.View style={[StyleSheet.absoluteFill, , addStyle]}>
          <LinearGradient
            style={StyleSheet.absoluteFill}
            colors={[theme.colors.lightBlue, theme.colors.white]}
            start={{x: 1, y: 0.5}}
            end={{x: 0.7, y: 0.5}}
          />
          <Box
            justifyContent="space-evenly"
            flex={1}
            width={editWidth}
            alignSelf="flex-end"
            alignItems="center">
            <Icon.ChevronUpCircle
              size={26}
              color={theme.colors.orange}
              style={{borderRadius: 100}}
              onPress={() => setQuantity(prevQuantity => prevQuantity + 1)}
            />

            <Icon.ChevronDownCircle
              size={26}
              color={theme.colors.orange}
              style={{borderRadius: 100}}
              onPress={() => setQuantity(prevQuantity => prevQuantity - 1)}
            />
          </Box>
        </Animated.View>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={style}>{children}</Animated.View>
        </PanGestureHandler>
      </Transitioning.View>
    );
  },
);

export default SwipeableRow;

const styles = StyleSheet.create({});
