import {RouteProp, useRoute} from '@react-navigation/core';
import React from 'react';
import {Animated, Dimensions, StyleSheet} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {RootStackParamList} from '../../nav/RootStack';
import {Text, View, Colors, Image, Carousel} from 'react-native-ui-lib';
import * as Icon from 'react-native-iconly';
import dayjs from 'dayjs';
import {numberFormat} from '../../config/formatCurrency';
import HeaderDetail from './components/HeaderDetail';
import {FONTS} from '../../config/Typo';
import ShowModal from './components/ShowModal';
import LikeProductModal from './components/LikeProductModal';

const widthBanner = Dimensions.get('screen').width;
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

const DetailItems = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'DetailItems'>>();
  const product = route.params.item;
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [textShown, setTextShown] = React.useState(false); //Hiển thị phần text còn lại
  const [lengthMore, setLengthMore] = React.useState(false); //Hiển thị dòng đọc thêm và thu gọn
  const toggleNumberOfLines = () => {
    //Toggle show hoặc hide phần text đi
    setTextShown(!textShown);
  };
  const onTextLayout = React.useCallback(e => {
    setLengthMore(e.nativeEvent.lines.length >= 3); //kiểm tra xem phần text có nhiều hơn 4 dòng không
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <HeaderDetail scrollY={scrollY} title={product.name} />

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
            {product.listphotos.map((image, i) => {
              return <ItemBanner key={i.toString()} image={image} />;
            })}
          </Carousel>
        </View>

        <Text h28 marginH-16 marginV-5>
          {product.name}
        </Text>
        <View row centerV marginH-16 paddingV-4>
          <Icon.Calendar color={Colors.black} size={20} />
          <Text marginL-12>
            Hết hạn: {dayjs(product.deletedAt).format('DD/MM/YYYY')}
          </Text>
        </View>
        <View row centerV marginH-16 paddingV-3 marginB-5>
          <Icon.Discount color={Colors.black} size={20} />
          <Text marginL-12 color={Colors.primary}>
            Giá ưu đãi: {numberFormat.format(product.discountPrice)}
          </Text>
        </View>
        <View row centerV marginH-16 paddingV-4 marginB-5>
          <Icon.Ticket color={Colors.black} size={20} />
          <Text marginL-12>Giá gốc:</Text>
          <Text style={{textDecorationLine: 'line-through'}} marginL-12>
            {numberFormat.format(product.listedPrice)}
          </Text>
        </View>
        <View row centerV marginH-16 paddingV-4 marginB-5>
          <Icon.Ticket color={Colors.black} size={20} />
          <Text marginL-12>Số lượng: {product.quantity}</Text>
        </View>
        <View row centerV marginH-13 paddingV-6 marginB-5>
          <Icon.Filter color={Colors.black} size={20} />
          <Text marginL-2> </Text>
          {product.tags.map((item, index) => {
            return (
              <Text
                key={index}
                br15
                marginH-1
                color={Colors.blue30}
                style={{backgroundColor: '#f5f5f5', borderRadius: 10}}>
                {' '}
                {item}
              </Text>
            );
          })}
        </View>
        <View height={1} bg-dark80 marginT-12 />
        <View row centerV marginH-16 paddingR-15>
          <View>
            <Text
              marginL-12
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 3}>
              Mô tả: {product.description}
            </Text>
          </View>
        </View>
        <View style={{alignItems: 'flex-end'}} marginR-12>
          {lengthMore ? (
            <Text onPress={toggleNumberOfLines} style={styles.viewMoreText}>
              {textShown ? 'Thu gọn' : 'Đọc thêm'}
            </Text>
          ) : null}
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
  viewMoreText: {lineHeight: 21, fontSize: 12, fontFamily: FONTS.Heavy},
});
