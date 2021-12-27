import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  LayoutAnimation,
  Platform,
  StyleSheet,
  UIManager,
} from 'react-native';
import {View, Text, Colors} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';

import URL from '../../../../config/Api';

import {
  INewsData,
  onGetNews,
  onUpdatePageNumber,
} from '../../../../redux/newSlice';
import {RootState} from '../../../../redux/store';

import ItemCard from './ItemCard';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const ListHorizontal = () => {
  const [news, setNews] = React.useState<INewsData[]>([]);
  const [loading, setLoading] = React.useState(false);

  // const [pageNumber, setPageNumber] = React.useState(1);
  const token = useSelector<RootState, string>(state => state.auth.accessToken);
  const page = useSelector<RootState, number>(state => state.news.page);
  const componentMounted = React.useRef(true);

  const dispatch = useDispatch();
  const onEndReached = React.useCallback(() => {
    setLoading(true);
      dispatch(onUpdatePageNumber({page: page + 1}));
      console.log(onUpdatePageNumber({page: page + 1}))
      setNews(news.concat())
      setLoading(false)
    
    console.log(page);
  }, [page]);

  React.useEffect(() => {
    setLoading(true);
    fetch(URL.News(page), {
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
          setNews([...news, ...json.data]);
          setLoading(false);
        }
        return () => {
          // This code runs when component is unmounted
          componentMounted.current = false; // (4) set it to false when we leave the page
        };
      })
      .catch(error => {
        console.error(error);
      });
  }, [page]);

  const renderLoader = React.useCallback(() => {
    return loading ? (
      <View>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    ) : null;
  }, []);

  return (
    <View paddingV-20 style={{alignSelf: 'center'}}>
      <FlatList
        showsHorizontalScrollIndicator={true}
        data={news}
        renderItem={({item}) => {
          return <ItemCard item={item} />;
        }}
        numColumns={2}
        key={2}
        ListFooterComponent={renderLoader}
        onEndReached={onEndReached}
        onEndReachedThreshold={0}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ListHorizontal;

const styles = StyleSheet.create({});
