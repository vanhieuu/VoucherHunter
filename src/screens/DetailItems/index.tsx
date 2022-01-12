import { RouteProp, useRoute} from '@react-navigation/core';
import React from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  UIManager,
} from 'react-native';

import {RootStackParamList} from '../../nav/RootStack';
import {Text, View, Colors, Image, Carousel, Card} from 'react-native-ui-lib';
import * as Icon from 'react-native-iconly';
import dayjs from 'dayjs';
import {numberFormat} from '../../config/formatCurrency';
import HeaderDetail from './components/HeaderDetail';
import {FONTS} from '../../config/Typo';
import ShowModal from './components/ShowModal';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import RenderHTML from 'react-native-render-html';
import {IProduct} from '../../types/IProduct';

import URL from '../../config/Api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const widthBanner = Dimensions.get('window').width;
const heightBanner = (widthBanner / 1200) * 1000;

const ItemBanner = ({image}: {image: string}) => {
  return (
    <View flex centerV backgroundColor={Colors.black}>
      <Image
        overlayType={Image.overlayTypes.BOTTOM}
        style={{
          width: widthBanner,
          height: heightBanner,
        }}
        source={{uri: image}}
      />
    </View>
  );
};
type Props = NativeStackScreenProps<RootStackParamList, 'DetailItems'>;
const DetailItems = ({navigation}:Props) => {
  const route = useRoute<RouteProp<RootStackParamList, 'DetailItems'>>();
  const product = route.params.item;
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const tagItem = product?.tags!.map(item => item);
  const firstItem = tagItem!.shift();
  const [relatedItems, setRelatedItems] = React.useState<IProduct[]>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [tag, setTag] = React.useState(firstItem.replace('#', '%23'));



  const source = {
    html: ` 
    <p style="color:black;">${product?.description}</p>`,
  };
  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    fetch(URL.getItemByTag(tag.replace('#', '%23'), 1), {
      signal: signal,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        setRelatedItems(json.data);
     
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('successfully aborted');
        } else {
          // handle error
        }
      });
    return () => {
      // cancel the request before component unmounts

      controller.abort();
    };
  }, [tag]);

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <HeaderDetail scrollY={scrollY} title={''} />
      <Animated.ScrollView
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          },
        )}>
        <View
          style={{
            height: heightBanner,
            width: widthBanner,
          }}>
          <Carousel
            autoplay={false}
            pageWidth={widthBanner}
            containerStyle={{height: '100%'}}
            loop
            pageControlProps={{
              size: 10,
              color: Colors.primary,
              inactiveColor: Colors.white,
            }}
            pageControlPosition={Carousel.pageControlPositions.OVER}>
            {product?.listphotos.map((image, i) => {
              return <ItemBanner key={i.toString()} image={image} /> || null;
            })}
          </Carousel>
        </View>

        <Text style={{fontSize: 26, fontWeight: 'bold'}} marginH-16 marginV-5>
          {product?.name}
        </Text>
        <View row centerV marginH-16 paddingV-4>
          <Icon.Calendar color={Colors.black} size={20} />
          <Text marginL-12>
            Hết hạn: {dayjs(product?.deletedAt).format('DD/MM/YYYY')}
          </Text>
        </View>
        <View row centerV marginH-16 paddingV-3 marginB-5>
          <Icon.Discount color={Colors.black} size={20} />
          <Text marginL-12 color={Colors.primary}>
            Giá ưu đãi: {numberFormat.format(product?.discountPrice)}
          </Text>
        </View>
        <View row centerV marginH-16 paddingV-4 marginB-5>
          <Icon.Ticket color={Colors.black} size={20} />
          <Text marginL-12>Giá gốc:</Text>
          <Text style={{textDecorationLine: 'line-through'}} marginL-12>
            {numberFormat.format(product?.listedPrice)}
          </Text>
        </View>
        <View row centerV marginH-16 paddingV-4 marginB-5>
          <Icon.Ticket color={Colors.black} size={20} />
          <Text marginL-12>Số lượng: {product?.quantity}</Text>
        </View>
        <View
          row
          centerV
          marginH-10
          paddingV-6
          marginB-5
          paddingH-12
          style={{maxWidth: 120}}>
          <Icon.Filter color={Colors.black} size={20} />
          {product.tags.map((item, index) => {
            return (
              <TouchableOpacity
                style={{paddingHorizontal: 5}}
                key={index}
                onPress={() => {
                  setTag(item);
                }}>
                <Text
                  br15
                  flex
                  paddingR-10
                  color={Colors.blue30}
                  style={{backgroundColor: '#f5f5f5', borderRadius: 10}}>
                  {' '}
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View height={1} bg-dark80 marginT-12 />
        <View row centerV marginH-16 paddingR-15>
          <View>
            <Text>Mô tả:</Text>
            <RenderHTML source={source} contentWidth={widthBanner - 60} />
          </View>
        </View>
        <View flex centerV marginL-20 marginH-5>
          <View marginT-20>
            <Text style={{fontSize: 20, fontWeight: 'bold'}} black>
              Sản phẩm liên quan
            </Text>
          </View>
          <FlatList
            data={relatedItems}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <Card style={styles.containerItem} onPress={() =>{
                  navigation.setParams({item:item})

              }}>
                <View paddingL-16 paddingR-6 marginB-11>
                  <Image
                    source={{
                      uri: item.listphotos.find(item => item !== undefined),
                    }}
                    style={{
                      width: 150,
                      height: 150,
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                    resizeMode="contain"
                  />
                  <View height={1} bg-grey50 marginT-2 />
                  <Text m15 marginT-10 numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text b13 color={Colors.black}>
                    Price:
                    {''} {numberFormat.format(item.listedPrice)} {`\n`}
                    <Text b13 color={Colors.red}>
                      Giảm: {''}{' '}
                      {Math.round(
                        (item.discountPrice / item.listedPrice) * 100,
                      )}{' '}
                      %
                    </Text>
                  </Text>
                </View>
              </Card>
            )}
          />
        </View>
      </Animated.ScrollView>
      <View row spread bottom backgroundColor={'#fff'}>
        <ShowModal item={product} />
      </View>
    </View>
  );
};

export default DetailItems;

const styles = StyleSheet.create({
  viewMoreText: {lineHeight: 21, fontSize: 12, fontFamily: FONTS.Medium},
  HeaderContainer: {
    paddingBottom: 12,
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 1,
    height: getStatusBarHeight(false),
    width: '100%',
  },
  HeaderTitle: {
    backgroundColor: '#FFF',
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey60,
    paddingBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerItem: {
    width: 190,
    marginRight: 12,
    backgroundColor: '#f5f5f5f5',
    elevation: 2,
    marginBottom: 20,
  },
  text: {fontSize: 24, fontWeight: 'bold', lineHeight: 26},
});
function useNavigation<T>(): {navigate: any} {
  throw new Error('Function not implemented.');
}
function NavigationProp<T, U>() {
  throw new Error('Function not implemented.');
}

