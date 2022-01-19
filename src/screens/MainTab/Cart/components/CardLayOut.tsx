import { BoxProps } from '@shopify/restyle';
import React, {ReactNode} from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';

import Box from '../../../../components/Box';
import { Theme } from '../../../../components/theme';

export enum CardType {
  VISA,
  COD,
}
export interface CardModel {
  id: number;
  type: CardType;
  last4Digits: string;
  expiration: string;
}
interface CardProps {

  onPress: () => void;
  children: ReactNode;
  backgroundColor: BoxProps<Theme>["backgroundColor"]
}


const CardLayOut = ({ onPress, children,backgroundColor}: CardProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        marginLeft="m"
        borderRadius="m"
        padding="m"
        width={120}
        height={160}
        backgroundColor={backgroundColor}
        >
        {children}
      </Box>
    </TouchableOpacity>
  );
};

export default CardLayOut;

const styles = StyleSheet.create({});
