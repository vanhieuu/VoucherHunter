import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {Text} from 'react-native-ui-lib';

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
      <View style={{height: 20}}>
        <Image
          style={
            card.type === CardType.VISA
              ? {width: 39, height: 13}
              : {width: 32.5, height: 20}
          }
          source={card.type === CardType.VISA ? visaLogo : codLogo}
        />
      </View>
      <Text
        marginB-10
        marginT-10
        style={{fontSize: 16, marginVertical: 15}}
       >
        ****{card.last4Digits}
      </Text>
      <Text opacity={true}>Expiration</Text>
      <Text opacity={true}>{card.expiration}</Text>
    </CardLayOut>
  );
};

export default Card;

const styles = StyleSheet.create({});
