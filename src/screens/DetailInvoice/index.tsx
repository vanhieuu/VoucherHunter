import {RouteProp, useRoute} from '@react-navigation/native';
import React from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Colors,  Text, View} from 'react-native-ui-lib';
import * as Iconly from 'react-native-iconly';
import {RootStackParamList} from '../../nav/RootStack';
import ItemDetail from './componentsInvoice/ItemDetail';
import {ScrollView} from 'react-native-gesture-handler';
import dayjs from 'dayjs';
import {numberFormat} from '../../config/formatCurrency';
import {getAuthAsync, IAuth} from '../../redux/authSlice';
import {IAuthRegister} from '../../redux/authRegisterSlice';
import URL from '../../config/Api';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {onGetNumberCart} from '../../redux/authCartSlice';
import ShowModal from './componentsInvoice/Modal';

const {width, height} = Dimensions.get('window');

interface IRefDots {
  setIndexPageFocus: React.Dispatch<React.SetStateAction<number>>;
}

const DetailInvoice = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'DetailInvoice'>>();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const invoiceItem = route.params.item;
  const invoiceProps = invoiceItem.products;
  console.log(invoiceItem.logs);
  const productId = invoiceItem.products.map(item => item.product_id._id);

  const numberCart = useSelector<RootState, number>(
    state => state.cart.numberCart,
  );
  const dispatch = useDispatch();

  const onPress = React.useCallback(() => {
    setModalVisible(prev => !prev);
  }, []);


  const refDots = React.useRef<IRefDots>(null);
  const refScrollView = React.useRef<ScrollView>(null);
  const onMomentumScrollEnd = React.useCallback(({nativeEvent}) => {
    const x = nativeEvent.contentOffset.x;
    let indexFocus = Math.round(x / width);
    refDots.current?.setIndexPageFocus(indexFocus);
  }, []);

  const addItemCart = React.useCallback(async () => {
    const auth: IAuth | null = await getAuthAsync();
    const registerAuth: IAuthRegister | null = await getAuthAsync();
    setLoading(true);
    await fetch(URL.addItemCart, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          auth?.accessToken || registerAuth?.accessToken
        }`,
      },
      body: JSON.stringify({
        product_id: productId[0],
      }),
    })
      .then(response => response.json())
      .then(json => {
        Alert.alert(json.message);

        dispatch(onGetNumberCart({numberItemsCart: numberCart + 1}));
        setModalVisible(prev => !prev);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  if (invoiceItem.paymentStatus === 2) {
    return (
      <View centerV marginL-10>
        <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
          ????n h??ng ???? b??? hu???
        </Text>
      </View>
    );
  }
  console.log(invoiceItem.status);
  return (
    <ScrollView style={{flex: 1}}>
      <View
        backgroundColor="#e9707d"
        style={{
          height: 60,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View centerV marginL-10>
          <Text style={{fontSize: 15, fontWeight: 'bold', color: 'white'}}>
            ????n h??ng{' '}
            {invoiceItem.paymentStatus === 3
              ? '?????t h??ng th??nh c??ng'
              : '??ang x??? l??...'}
          </Text>
        </View>

        <View centerV marginR-10>
          <Iconly.TicketStar size={28} set="curved" color={'#fff'} />
        </View>
      </View>

      <View style={{backgroundColor: '#fff'}} row>
        <View>
          <Iconly.Buy size={22} set="curved" color={'#000'} />
        </View>
        <Text style={styles.itemStatusContainer}> Tr???ng th??i ????n h??ng</Text>
        <View flex centerV>
          <Text
            style={styles.txtDetails}
            onPress={() => setShow(prev => !prev)}>
            {' '}
            Xem{' '}
          </Text>
        </View>
      </View>
      <View style={{backgroundColor: '#fff'}}>
        {!!show && (
          <ScrollView
            pagingEnabled
            onMomentumScrollEnd={onMomentumScrollEnd}
            showsVerticalScrollIndicator
            ref={refScrollView}>
            {invoiceItem.logs?.map((item, index) => (
              <View key={index} marginH-20>
                {item.changeAction.map((items, index) => (
                  <View key={index} flex row>
                    <View
                      backgroundColor={
                        index === index ? Colors.primary : Colors.dark40
                      }
                      style={styles.dot}
                      centerH
                      centerV
                    />
                    <Text
                      flex
                      centerH
                      centerV
                      marginV-10
                      style={{fontSize: 15, fontWeight: 'bold'}}
                      color={
                        items === 'status'
                          ? 'black'
                          : items === 'pending'
                          ? '#f7ca02'
                          : items === 'failed'
                          ? 'red'
                          : 'green'
                      }>
                      {console.log(items)}
                      {items === 'status'
                        ? 'Tr???ng th??i ????n h??ng l??c'
                        : items === 'pending'
                        ? 'Ch??? thanh to??n l??c'
                        : items === 'failed'
                        ? '?????t h??ng th???t b???i l??c'
                        : items === ''
                        ? '?????t h??ng v??o l??c'
                        : '?????t h??ng th??nh c??ng l??c'}{' '}
                    </Text>
                   
                    <Text flex style={{alignSelf: 'center'}} centerH centerV>
                      {dayjs(item.updatedAt).format('MM/DD/YYYY - h:mm:ss A')}{' '}
                    </Text>
                    
                  </View>
                ))}
                <View height={2} bg-black marginT-10 />
              </View>
            ))}
          </ScrollView>
        )}
        <Text
          marginT-12
          marginL-28
          color={
            invoiceItem.status === 'done'
              ? 'green'
              : invoiceItem.status === 'failed'
              ? 'red'
              : '#F7CA02'
          }
          style={{fontSize: 15, fontWeight: 'bold'}}>
          {invoiceItem.status === 'done'
            ? '?????t h??ng th??nh c??ng '
            : invoiceItem.status === 'failed'
            ? '?????t h??ng th???t b???i '
            : '????n h??ng ??ang x??? l?? '}
        </Text>
      </View>
      <View height={1} style={{backgroundColor: '#f5f5f5'}} marginB-10 />
      <ScrollView>
        {invoiceItem?.products.map((items, index) => {
          return (
            <ItemDetail
              key={index}
              name={items.product_id.name}
              img={items.product_id.img}
              price={items.discountPrice}
              quantity={items.quantity}
            />
          );
        })}
        <View height={1} style={{backgroundColor: '#f5f5f5'}} marginB-10 />
        <View style={{backgroundColor: '#fff'}}>
          <View row>
            <Iconly.Buy size={22} set="curved" color={'#000'} />
            <Text style={styles.paymentInfo}> Ph????ng th???c thanh to??n</Text>
          </View>
          <View>
            <Text marginL-20 style={{fontSize: 15, fontWeight: 'bold'}}>
              COD
            </Text>
          </View>
        </View>
        <View height={1} style={{backgroundColor: '#f5f5f5'}} marginB-10 />
        <View style={{backgroundColor: '#fff'}}>
          <View row>
            <Text centerV marginR-15 marginL-5 style={styles.contentProduct}>
              M?? ????n h??ng
            </Text>
            <Text marginL-50 style={styles.contentProduct}>
              {invoiceItem._id}
            </Text>
          </View>
          <View row flex>
            <View
              style={{alignSelf: 'flex-start'}}
              marginV-5
              marginB-5
              marginT-15
              marginL-5>
              <Text marginB-10 style={styles.txtTimeStamp}>
                Th???i gian ?????t h??ng{' '}
              </Text>
              <Text marginB-10 style={styles.txtTimeStamp}>
                Th???i gian thanh to??n
              </Text>
              <Text marginB-10 style={styles.txtTimeStamp}>
                Th???i gian ho??n th??nh
              </Text>
            </View>
            <View
              style={{alignSelf: 'flex-end'}}
              flex
              right
              marginV-5
              marginB-10
              marginR-5>
              <Text marginB-10 style={styles.txtTimeStamp}>
                {dayjs(invoiceItem.createdAt).format('DD/MM/YYYY')}
              </Text>
              <Text marginB-10 style={styles.txtTimeStamp}>
                {dayjs(invoiceItem.createdAt).format('DD/MM/YYYY')}
              </Text>
              <Text
                marginB-10
                style={{
                  color:
                    invoiceItem.status === 'done'
                      ? 'green'
                      : invoiceItem.status === 'failed'
                      ? 'red'
                      : '#F7CA02',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                {invoiceItem.status === 'done'
                  ? dayjs(invoiceItem.createdAt).format('DD/MM/YYYY')
                  : invoiceItem.status === 'failed'
                  ? '?????t h??ng th???t b???i '
                  : '??ang x??? l?? '}
              </Text>
            </View>
          </View>
        </View>
        <View height={1} style={{backgroundColor: '#f5f5f5'}} marginB-10 />
        <View style={{backgroundColor: '#fff'}}>
          <View row flex>
            <View
              style={{alignSelf: 'flex-start'}}
              marginV-5
              marginB-10
              marginT-15
              marginL-5>
              <Text marginB-10 style={styles.txtTimeStamp}>
                T???ng ti???n{' '}
              </Text>
              <Text marginB-10 style={styles.txtTimeStamp}>
                Gi???m gi??
              </Text>
              <Text
                marginB-10
                style={[styles.txtTimeStamp, {color: '#e9707d'}]}>
                S??? ti???n thanh to??n
              </Text>
            </View>
            <View
              style={{alignSelf: 'flex-end'}}
              flex
              right
              marginV-5
              marginB-10
              marginR-5>
              <Text marginB-10 style={styles.txtTimeStamp}>
                {numberFormat.format(invoiceItem.totalListPrice)}
              </Text>
              <Text marginB-10 style={styles.txtTimeStamp}>
                -
                {numberFormat.format(
                  invoiceItem.totalListPrice - invoiceItem.totalDiscountPrice,
                )}
              </Text>
              <Text
                marginB-10
                style={[styles.txtTimeStamp, {color: '#e9707d'}]}>
                {numberFormat.format(invoiceItem.totalDiscountPrice)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View flex>
        <TouchableOpacity
          style={styles.btnCheckout}
          onPress={() => {
            setModalVisible(prev => !prev);
          }}>
          {modalVisible ? (
            <ShowModal
              onPress={addItemCart}
              visible={modalVisible}
              onRequestClose={onPress}
              items={invoiceProps}
            />
          ) : null}
          <Text style={styles.textStyle}>Mua l???i</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default DetailInvoice;

const styles = StyleSheet.create({
  imgStyle: {
    width: 100,
    height: 80,
    borderColor: '#000',
    flex: 1,
  },
  txtDetails: {
    textAlign: 'right',
    justifyContent: 'center',
    marginRight: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#e9707d',
  },
  itemStatusContainer: {fontSize: 18, fontWeight: 'bold', color: '#000'},
  btnCheckout: {
    backgroundColor: '#E9707D',
    height: 45,
    width: '100%',
    borderRadius: 5,
    marginBottom: 1,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
  },
  paymentInfo: {
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 16,
    color: '#000',
  },
  contentProduct: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  footerDetail: {
    marginVertical: 5,
    flex: 1,
    backgroundColor: 'blue',
  },
  txtTimeStamp: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 15,
  },
  modalView: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    width: width,
    height: height / 2 - 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: 'absolute',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  containerDots: {
    position: 'absolute',
    top: (width / 250) * 405,
    height: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  dot: {
    borderRadius: 5,
    marginHorizontal: 5,
    height: 5,
    width: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});