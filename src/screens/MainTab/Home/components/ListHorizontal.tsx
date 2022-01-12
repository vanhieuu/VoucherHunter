import {NavigationProp, useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  FlatList,
  Image,
  LayoutAnimation,
  Platform,
  StyleSheet,
  UIManager,
} from 'react-native';
import {Colors, Card, Text, View} from 'react-native-ui-lib';
import {useSelector} from 'react-redux';
import URL from '../../../../config/Api';
import {numberFormat} from '../../../../config/formatCurrency';
import {RootStackParamList} from '../../../../nav/RootStack';
import {RootState} from '../../../../redux/store';
import {IProduct} from '../../../../types/IProduct';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const ItemList = ({item}: {item: IProduct}) => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const onPressItem = React.useCallback(() => {
    navigate('DetailItems', {
      item,
    });
  }, []);
  return (
    <Card style={styles.containerItem} onPress={onPressItem}>
      {item.is_hot === true ? (
        <View paddingL-16 paddingR-6 marginB-11>
          <Image
            source={{uri: item.img}}
            style={{height: 160, width: 160, borderRadius: 10}}
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
      ) : undefined}
    </Card>
  );
};

const ListHorizontal = () => {
  const [product, setProduct] = React.useState<IProduct[]>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const token = useSelector<RootState, string>(state => state.auth.accessToken);
  const componentMounted = React.useRef(true);
  const controller = new AbortController();
  const signal = controller.signal;
  React.useEffect(() => {
    setLoading(true);
    if (!token) return;
    fetch(URL.Products, {
      signal: signal,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(json => {
        if (componentMounted.current) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
          setProduct(json);
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
        <Text style={styles.text}>Sản phẩm nổi bật</Text>
      </View>
      {loading ? (
        <View row paddingH-16 paddingV-12>
          <Card
            style={[
              styles.containerItem,
              {height: 251, backgroundColor: Colors.dark40},
            ]}
          />
          <Card
            style={[
              styles.containerItem,
              {height: 251, backgroundColor: Colors.dark40},
            ]}
          />
          <Card
            style={[
              styles.containerItem,
              {height: 210, backgroundColor: Colors.dark40},
            ]}
          />
        </View>
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={true}
          data={product}
          initialNumToRender={5}
          keyExtractor={item => item._id.toString()}
          contentContainerStyle={{paddingHorizontal: 16, paddingVertical: 12}}
          renderItem={({item}) => {
            if (item.is_hot === true) {
              return <ItemList item={item} />;
            } else {
              return <View></View>;
            }
          }}
        />
      )}
      <View paddingH-16 centerV>
        <Text style={styles.text}> Sản phẩm</Text>
      </View>
    </View>
  );
};

export default ListHorizontal;

const styles = StyleSheet.create({
  containerItem: {
    width: 190,
    marginRight: 12,
    backgroundColor: Colors.white,
    elevation: 2,
  },
  text: {fontSize: 24, fontWeight: 'bold', lineHeight: 26},
});
