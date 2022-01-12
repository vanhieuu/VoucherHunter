import React from 'react';
import {Animated} from 'react-native';

const useAniTransX = (cbFinish?: () => void) => {
  const transX = React.useRef(new Animated.Value(30)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(transX, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
      delay: 300,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
      delay: 300,
    }).start(({finished}) => {
      if (finished) {
        cbFinish && cbFinish();
      }
    });
  }, []);

  const styleAni = {
    transform: [{translateX: transX}],
    opacity,
  };
  return [styleAni];
};

export default useAniTransX;
