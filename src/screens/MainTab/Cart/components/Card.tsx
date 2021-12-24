import React, {ReactNode} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {BorderlessButton} from 'react-native-gesture-handler';
import {Text} from 'react-native-ui-lib';
import Box from '../../../../components/Box';
import CardLayOut from './CardLayOut';

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
  card: CardModel;
  selected: boolean;
  onSelected: () => void;
}

const visaLogo = require('./assets/visaLogo.png');
const codLogo = require('./assets/codIcon.png');

const Card = ({card, selected, onSelected}: CardProps) => {
  return (
    <CardLayOut
      onPress={onSelected}
      backgroundColor={selected ? 'primary' : 'background'}>
      <Image
        style={
          card.type === CardType.VISA
            ? {width: 39, height: 13}
            : {width: 32.5, height: 20}
        }
        source={card.type === CardType.VISA ? visaLogo : codLogo}
      />

      <Text
        style={{fontSize: 16, marginVertical: 15}}
        color={selected ? '#0C0D34' : 'primary'}>
        ****{card.last4Digits}
      </Text>
      <Text>
          
      </Text>
    </CardLayOut>
  );
};

export default Card;

const styles = StyleSheet.create({});
