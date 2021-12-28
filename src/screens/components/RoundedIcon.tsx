import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/FontAwesome';
import Box from '../../components/Box';
import {Theme} from '../../components/theme';

export interface RoundedIconProps {
  name: string;
  size: number;
  color: keyof Theme['colors'];
  backgroundColor: keyof Theme['colors'];
  iconRatio:number,
  align: 'center' | 'flex-start' | 'flex-end',
}

const RoundedIcon = ({
  name,
  size,
  color,
  backgroundColor,
  align,
  iconRatio
}: RoundedIconProps) => {
  const iconSize = size * iconRatio;
  return (
    <Box
      height={size}
      width={size}
      justifyContent="center"
      alignItems={align}
      style={{borderRadius: size / 2}}
      {...{backgroundColor}}>
      <Text style={{width: iconSize, height: iconSize}} {...{color}}></Text>
      <Icon
        size={size * 0.5}
        color="white"
        style={{textAlign: 'center'}}
        {...{name}}
      />
    </Box>
  );
};

RoundedIcon.defaultProps = {
    iconRatio:0.7
}

export default RoundedIcon;

const styles = StyleSheet.create({});
