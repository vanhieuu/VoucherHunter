import {useTheme} from '@shopify/restyle';
import React from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import {Text, View, Colors} from 'react-native-ui-lib';
import {useSelector} from 'react-redux';
import {Theme} from 'react-toastify';
import Box from '../../../../components/Box';
import {numberFormat} from '../../../../config/formatCurrency';
import {IProduct} from '../../../../redux/authCartSlice';
import {RootState} from '../../../../redux/store';
import AddCard from './AddCard';
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

interface addressProps {
  number: string;
  city: string;
  street: string;
}

const initStateAddress: addressProps = {
  number: '23 ngách 17/2',
  city: 'Hà Nội',
  street: 'Nguyễn Văn Lộc',
};

interface ICart {
  quantity: number;
  label: string;
  totalPrice: number;
}
const LineItem = ({totalPrice, label}: ICart) => {
  return (
    <Box flexDirection="row" paddingVertical="m">
      <Box>
        <Text color="#fff" h20>
          ${label}
        </Text>
      </Box>
      <Box>
        <Text color={Colors.primary}>${numberFormat.format(totalPrice)}</Text>
      </Box>
    </Box>
  );
};

const CheckOut = ({minHeight}: CheckOutProps) => {
  const [selectedCard, setSelectedCard] = React.useState(cards[0].id);
  const [address, setAddress] = React.useState<addressProps>(initStateAddress);
  const quantity = useSelector<RootState, number>(state => state.cart.quantity);
  console.log(quantity);
  const totalPrice = useSelector<RootState, number>(
    state => state.cart.totalPrice,
  );
  const theme = useTheme<Theme>();
  return (
    <Box
      flex={1}
      backgroundColor="background"
      padding="m"
      style={{paddingTop: minHeight}}>
      <Box flex={1} padding="m">
        <Box height={160}>
          <ScrollView horizontal>
            <AddCard />
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
        <Box marginTop="l">
          <Text color="#fff" h16 bold marginB-10>
            Địa chỉ giao hàng
          </Text>
          <Box flexDirection="row" opacity={0.5}>
            <Box flex={1} paddingVertical="m" opacity={0.5}>
              <Text color="#fff" h13>
                {address.number}
              </Text>
              <Text color="#fff" h13>
                {address.street}
              </Text>
              <Text color="#fff" h13>
                {address.city}
              </Text>
            </Box>
            <Box
              justifyContent="center"
              alignItems="center"
              paddingVertical="m">
              <TouchableOpacity>
                <Text color="#fff">Change</Text>
              </TouchableOpacity>
            </Box>
          </Box>
          <LineItem
            quantity={quantity}
            label="Tổng tiền"
            totalPrice={totalPrice}
          />
          <LineItem quantity={quantity} label="Phí dịch vụ " totalPrice={0} />
          <LineItem
            quantity={quantity}
            label="Tổng tiền"
            totalPrice={totalPrice}
          />
        </Box>
        <Box
          paddingVertical="l"
          alignItems="center"
          flex={1}
          justifyContent="flex-end">
          <Button
            title={`Nhấn để thanh toán ${totalPrice} `}
            type="solid"
            onPress={() => true}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CheckOut;

const styles = StyleSheet.create({});
