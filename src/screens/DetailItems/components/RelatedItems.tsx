import React from 'react';
import {
  Dimensions,
  FlatList,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Card, Colors, Image, Text, View} from 'react-native-ui-lib';
import URL from '../../../config/Api';
import {numberFormat} from '../../../config/formatCurrency';

import {IProduct} from '../../../types/IProduct';

const widthScreen = Dimensions.get('window').width;

const ItemList = ({item}: {item: IProduct}) => {
  return (
    <Card style={styles.containerItem}>
      <View paddingL-16 paddingR-6 marginB-11>
        <Image
          source={{uri: item.img}}
          style={{width: 160, height: 160}}
          resizeMode="contain"
        />
        <Text m15 marginT-10 numberOfLines={1}>
          {item.name}
        </Text>
        <Text b13 color={Colors.black}>
          Price:
          {''} {numberFormat.format(item.discountPrice)} {`\n`}
          <Text b13 color={Colors.red}>
            Giảm: {''}{' '}
            {Math.round((item.discountPrice / item.listedPrice) * 100)} %
          </Text>
        </Text>
      </View>
    </Card>
  );
};

const RelatedItems = ({tag}: {tag: string}) => {
  const [product, setProduct] = React.useState<IProduct[]>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const componentMounted = React.useRef(true);
  const onMomentumScrollEnd = React.useCallback(({nativeEvent}) => {
    const x = nativeEvent.contentOffset.x;
    let indexFocus = Math.round(x / widthScreen);
    console.log(indexFocus);
  }, []);
  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    fetch(URL.getItemByTag(tag, 1), {
      signal: signal,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => {
        if (componentMounted.current) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          setProduct(json);
          console.log(json)
          setLoading(false);
          
        }
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
  }, []);

  return (
    <View paddingV-12 backgroundColor="#fff">
      <View row spread paddingH-16 centerV>
        <Text style={styles.text}>Sản phẩm liên quan</Text>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={true}
        data={product}
        initialNumToRender={5}
        keyExtractor = {(item, index) => index.toString()}
        contentContainerStyle={{paddingHorizontal: 16, paddingVertical: 12}}
        renderItem={({item}) => {
          return <ItemList item={item} />;
        }}
      />
    </View>
  );
};

export default RelatedItems;

const styles = StyleSheet.create({
  containerItem: {
    width: 190,
    marginRight: 12,
    backgroundColor: Colors.white,
    elevation: 2,
  },
  text: {fontSize: 24, fontWeight: 'bold', lineHeight: 26},
});
function useSelector<T, U>(arg0: (state: any) => any) {
  throw new Error('Function not implemented.');
}
