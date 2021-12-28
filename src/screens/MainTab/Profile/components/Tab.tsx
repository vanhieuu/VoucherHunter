import React, { Children, ReactNode } from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {Colors, Text} from 'react-native-ui-lib';
import Box from '../../../../components/Box';
import {spacing, useTheme} from '@shopify/restyle';
import Animated from 'react-native-reanimated';
import {mix} from 'react-native-redash'
interface Tab {
  id: string;
  label: string;
}
interface TabProps {
  tabs: Tab[];
  children: ReactNode;
}
const {width} = Dimensions.get('window')
const Tab = ({tabs,children}: TabProps) => {
//   const [selectedTab, setSelectedTab] = React.useState(tabs[0]);
  const [index,setIndex] = React.useState(0)
  const ScrollX = React.useRef(new Animated.Value(0)).current;
  const selectedTab = tabs[index]
  const theme = useTheme()


  const inputRange = React.useMemo(
    () => [index,width*0.25,width*0.75],
    [index]
  );
  const translateX = mix(index,width*0.25,width*0.75)
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
        {tabs.map((tab,index) => (
          <TouchableOpacity
            key={tab.id}
            style={{flex: 1}}
            onPress={() => setIndex(index)}>
            <Box paddingBottom="xl" padding="m" style={{paddingBottom:theme.spacing.m +10}}>
              <Text style={styles.txtStyle}>{tab.label}</Text>
            </Box>
          </TouchableOpacity>
        ))}
      <Animated.View style={[styles.container,{transform:[{ translateX}]}]}/>
     
      </Box>
            <Animated.View style={{width:width * tabs.length, flexDirection:'row'}}>
                {children}
            </Animated.View>
    </Box>
  );
};

export default Tab;

const styles = StyleSheet.create({
  txtStyle: {
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  container:{
      position: 'absolute',
      bottom: 0,
      left:0,
      backgroundColor: Colors.primary,
      width:10,
      height:10,
      borderRadius: 5,
      
  },
 
});
