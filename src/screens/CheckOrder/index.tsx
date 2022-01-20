import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../nav/RootStack';
import * as Iconly from 'react-native-iconly';
import {Text, View} from 'react-native-ui-lib';
import {Input} from 'react-native-elements';
import {numberFormat} from '../../config/formatCurrency';
import {CardType} from '../MainTab/Cart/components/CardLayOut';
import AddCard from '../MainTab/Cart/components/AddCard';
import Card from '../MainTab/Cart/components/Card';
import {createStructuredSelector} from 'reselect';
import {Button} from 'react-native-ui-lib/generatedTypes/src/components/button';
import Box from '../../components/Box';
import URL from '../../config/Api';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface addressProps {
  number: string;
  city: string;
  street: string;
}

const cards = [
  {
    id: 0,
    type: CardType.VISA,
    last4Digits: '5467',
    expiration: '05/24',
  },
  {
    id: 1,
    type: CardType.COD,
    last4Digits: 'COD',
    expiration: '05/24',
  },
];

const CheckOder = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'CheckOrder'>>();
  const [address, setAddress] = React.useState<addressProps>({
    number: '23 ngách 17/2',
    city: 'Hà Nội',
    street: 'Nguyễn Văn Lộc',
  });
  const [selectedCard, setSelectedCard] = React.useState(cards[1].id);
  const [show, setShow] = React.useState<boolean>(false);
const [loading,setLoading] = React.useState<boolean>(false)
  const items = route.params.item;
  const token = useSelector<RootState, string>(state => state.auth.accessToken);
  const onPressCheckOut = async () => {
    setLoading(true);
    const controller = new AbortController();
    const signal = controller.signal;

    await  items.forEach(item => {
      item.product_id = item.product_id._id
    });
    
    fetch(URL.createInvoice, {
      signal: signal,
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        note: 'NOthing',
        deliveryAddress: `${address.number}, ${address.street}, ${address.city} `,
        paymentMethod: selectedCard === 0 ? 'VISA' : 'COD',
        items: items,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (items.length === 0) {
          Alert.alert('Vui lòng chọn sản phẩm');
          return json
        } else {
          Alert.alert(json.message, 'Alert');
        }
      });
  };


  return (
    <ScrollView>
      <View row marginT-10 marginL-5>
        <Iconly.Location size={25} color="#e97070" set="curved" />
        <Text marginH-5 style={styles.txtLocationContainer}>
          {' '}
          Địa chỉ giao hàng{' '}
        </Text>
      </View>

      <View>
        <TouchableOpacity
          style={styles.containerLocation}
          onPress={() => setShow(!show)}>
          <View marginL-35>
            <Text style={styles.txtLocationContainer}>{address.number}</Text>
            <Text style={styles.txtLocationContainer}>{address.street}</Text>
            <Text style={styles.txtLocationContainer}>{address.city}</Text>
          </View>
          <View marginR-20>
            <Iconly.ArrowRight size={22} color="#e97070" set="curved" />
          </View>
        </TouchableOpacity>
      </View>
      {!!show && (
        <View>
          <Input
            placeholder={address.city}
            autoCompleteType={undefined}
            onChangeText={(city: string) =>
              setAddress(prev => {
                return {
                  ...prev,
                  city,
                };
              })
            }
          />
          <Input
            placeholder={address.number}
            autoCompleteType={undefined}
            onChangeText={(number: string) =>
              setAddress(prev => {
                return {
                  ...prev,
                  number,
                };
              })
            }
          />
          <Input
            placeholder={address.street}
            autoCompleteType={undefined}
            onChangeText={(street: string) =>
              setAddress(prev => {
                return {
                  ...prev,
                  street,
                };
              })
            }
          />
        </View>
      )}
      <View height={3} bg-dark80 marginT-12 />
      <View>
        {items.map((item, index) => {
          return (
            <View key={index}>
              <View row centerV marginH-15>
                <Image
                  source={{uri: item.product_id.img}}
                  style={{width: 100, height: 100}}
                  resizeMode="contain"
                />
                <View>
                  <Text b17 marginL-20>
                    {' '}
                    {item.product_id.name}
                  </Text>
                  <View row>
                    <Text
                      style={{textDecorationLine: 'line-through'}}
                      marginH-20>
                      {' '}
                      {numberFormat.format(item.product_id.listedPrice)}
                    </Text>
                    <Text style={styles.discountPrice}>
                      {' '}
                      {numberFormat.format(
                        item.product_id.discountPrice * item.quantity,
                      )}
                    </Text>
                  </View>

                  <View marginH-20>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>
                      {' '}
                      Số lượng: {item.quantity}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
        <View marginH-20>
          <View row>
            <Iconly.Buy size={20} color="#e9707d" set="curved" />
            <Text marginL-10 style={{fontSize: 15, fontWeight: 'bold'}}>
              Phương thức thanh toán{' '}
            </Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <AddCard />
            {cards.map(card => (
              <Card
                key={card.id}
                card={card}
                selected={selectedCard === card.id}
                onSelected={() => setSelectedCard(card.id)}
              />
            ))}
          </ScrollView>
        </View>
        <View marginT-20>
          <View
            marginT-20
            flex
            style={{justifyContent: 'space-between'}}
            row
            marginH-10>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}> Tổng tiền hàng</Text>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#e9707d'}}>
              {' '}
              {numberFormat.format(
                items
                  .map(item => item.product_id.listedPrice * item.quantity)
                  .reduceRight((a, b) => a + b, 0) ,
              )}
            </Text>
          </View>
          <View
            marginT-20
            flex
            style={{justifyContent: 'space-between'}}
            row
            marginH-10>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}> Giảm giá </Text>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#e9707d'}}>
              {' '}
              {numberFormat.format(
                items
                  .map(item => item.product_id.discountPrice * item.quantity)
                  .reduceRight((a, b) => a + b, 0) -
                  items
                    .map(item => item.product_id.listedPrice * item.quantity)
                    .reduceRight((a, b) => a + b, 0),
              )}
            </Text>
          </View>
          <View
            marginT-20
            flex
            style={{justifyContent: 'space-between'}}
            row
            marginH-10>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}> Tổng thanh toán</Text>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#e9707d'}}>
              {' '}
              {numberFormat.format(
                items
                  .map(item => item.product_id.discountPrice * item.quantity)
                  .reduceRight((a, b) => a + b, 0),
              )}
            </Text>
          </View>
        </View>
      </View>

      <View width-120 center marginT-20>
        <TouchableOpacity style={styles.btnCheckout} onPress={onPressCheckOut}>
          <Text style={{fontSize: 20, lineHeight: 22}}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CheckOder;

const styles = StyleSheet.create({
  txtLocationContainer: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  containerLocation: {justifyContent: 'space-between', flexDirection: 'row'},
  discountPrice: {
    color: '#e9707d',
    fontSize: 16,
    fontWeight: 'bold',
  },
  minus: {
    backgroundColor: 'grey',
    paddingLeft: 10,
    paddingRight: 10,

    fontSize: 15,
    color: '#fff',
  },
  quantityContainer: {
    justifyContent: 'space-between',
    marginHorizontal: 25,
    flexDirection: 'row',
    borderRadius: 1,
    borderWidth: 0.5,
    marginTop: 10,
    width: 100,
  },
  btnCheckout: {
    backgroundColor: '#E9707D',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    borderRadius: 10,
    width: '100%',
    marginVertical: 5,
    borderWidth: 0,
    marginHorizontal: 10,
  },
});
