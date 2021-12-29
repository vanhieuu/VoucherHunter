import React, {Children, ReactNode} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {Colors, Text} from 'react-native-ui-lib';
import Box from '../../../../components/Box';
import {spacing, useTheme} from '@shopify/restyle';
import Animated from 'react-native-reanimated';
import {mix} from 'react-native-redash';
import {multiply} from 'lodash';
interface Tab {
  id: string;
  label: string;
}
interface TabProps {
  tabs: Tab[];
  children: ReactNode;
}
const {width} = Dimensions.get('window');
const TabInvoice = ({tabs, children}: TabProps) => {
  //   const [selectedTab, setSelectedTab] = React.useState(tabs[0]);
  const [index, setIndex] = React.useState(0);
  const ScrollX = React.useRef(new Animated.Value(0)).current;
  const selectedTab = tabs[index];
  const theme = useTheme();

  const inputRange = React.useMemo(
    () => [index, width * 0.25, width * 0.75],
    [index],
  );
//   const translateX = mix(index, width * 0.15, width * 0.45);
const translateX = mix(index, width * 0.23, width * 0.70);
  const scale = ScrollX.interpolate({
    inputRange,
    outputRange: [0.75, 1, 0.75],
  });
  const opacity = ScrollX.interpolate({
    inputRange,
    outputRange: [0.5, 1, 0.5],
  });

  return (
    <Box flex={1}>
      <Box flexDirection="row">
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.id}
            style={{flex: 1}}
            onPress={() => setIndex(index)}>
            <Box
              paddingBottom="l"
              padding="s"
              style={{paddingBottom: 5 }}>
              <Text style={styles.txtStyle}>{tab.label}</Text>
            </Box>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[styles.container, {transform: [{translateX}]}]}
        />
      </Box>
      <Animated.View
        style={{
          width: width * tabs.length,
          flexDirection: 'row',
          transform: [{translateX: multiply(width, index)}],
        }}>
        {Children.map(children, (child, index) => (
          <Box flex={1} key={index} width={width}>
            {child}
          </Box>
        ))}
      </Animated.View>
    </Box>
  );
};

export default TabInvoice;

const styles = StyleSheet.create({
  txtStyle: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: Colors.primary,
    width: 4,
    height: 4,
    borderRadius: 5,
  },
});
