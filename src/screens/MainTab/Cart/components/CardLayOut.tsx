import { backgroundColor, BoxProps } from '@shopify/restyle';
import React, {ReactNode} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
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

const visaLogo = require('./assets/visaLogo.png');
const codLogo = require('./assets/codIcon.png');

const CardLayOut = ({ onPress, children,backgroundColor}: CardProps) => {
  return (
    <BorderlessButton onPress={onPress}>
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
    </BorderlessButton>
  );
};

export default CardLayOut;

const styles = StyleSheet.create({});
