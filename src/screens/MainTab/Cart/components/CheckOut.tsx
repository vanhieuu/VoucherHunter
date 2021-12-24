import {useTheme} from '@shopify/restyle';
import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Theme} from 'react-toastify';
import Box from '../../../../components/Box';
import Card, {CardType} from './Card';

interface CheckOutProps {
  minHeight: number;
}

const cards = [
  {
    id: 0,
    type: CardType.VISA,
    last4Digits: '9012',
    expiration: '01/30',
  },

  {
    id: 1,
    type: CardType.COD,
    last4Digits: '∞',
    expiration: '∞',
  },
];

const CheckOut = ({minHeight}: CheckOutProps) => {
  const [selectedCard, setSelectedCard] = React.useState(cards[0].id);
  const theme = useTheme<Theme>();
  return (
    <Box
      flex={1}
      backgroundColor="background"
      padding="m"
      style={{paddingTop: minHeight}}>
      <Box flex={1} padding="m">
        <ScrollView horizontal>
          {cards.map(card => {
            return (
              <Card
                key={card.id}
                card={card}
                selected={selectedCard === card.id}
                onSelected={() => setSelectedCard(card.id)}
              />
            );
          })}
        </ScrollView>
      </Box>
    </Box>
  );
};

export default CheckOut;

const styles = StyleSheet.create({});
