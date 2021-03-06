import React from 'react';
import {
  FlatList,
  LayoutAnimation,
  Platform,
  StyleSheet,
  UIManager,
} from 'react-native';
import {View} from 'react-native-ui-lib';
import {useDispatch, useSelector} from 'react-redux';
import URL from '../../../../config/Api';
import {INewsData, onUpdatePageNumber} from '../../../../redux/newSlice';
import {RootState} from '../../../../redux/store';
import Footer, {RefFooter} from '../../Cart/components/Footer';

import ItemCard from './ItemCard';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}



const ListHorizontal = () => {
  // const [stateNews,dispatch] = React.useReducer(reducerCart,initStateNews)
  const [news, setNews] = React.useState<INewsData[]>([]);
  const [loading, setLoading] = React.useState(false);
  const refFooter = React.useRef<RefFooter>(null);
  const [totalPage,setTotalPage] = React.useState(0)

  // const [pageNumber, setPageNumber] = React.useState(1);
  const token = useSelector<RootState, string>(state => state.auth.accessToken);
  const page = useSelector<RootState, number>(state => state.news.page);
  const componentMounted = React.useRef(true);

  const dispatch = useDispatch();



 
  const onEndReached = React.useCallback(() => {
    dispatch(onUpdatePageNumber({page: page + 1}));
    if(page > totalPage ){
      dispatch(onUpdatePageNumber({page:1}))
    }else if(page < totalPage ){
      setNews(prev => prev.concat());
      refFooter.current?.setIsLoadmore(true);
    }
  
  }, [page]);

  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    fetch(URL.News(page), {
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
          setNews([...news, ...json.data]);
          setTotalPage(json.totalPage)
          
          setLoading(false);
        }
        return () => {
          // This code runs when component is unmounted
          componentMounted.current = false; // (4) set it to false when we leave the page
        };
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('Success Abort');
        } else {
          console.error(err);
        }
      });
    return () => {
      // cancel the request before component unmounts
      controller.abort();
    };
  }, [page]);

  const renderListFooter = React.useCallback(() => {
    return <Footer ref={refFooter} />;
  }, []);

  return (
    <View paddingV-20 style={{alignSelf: 'center'}} >
      <FlatList
        showsHorizontalScrollIndicator={true}
        data={news}
        renderItem={({item}) => {
          return <ItemCard item={item} totalPage={totalPage}/>;
        }}
        // numColumns={2}
        // key={2}
        ListFooterComponent={renderListFooter}
        initialNumToRender={7}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ListHorizontal;

const styles = StyleSheet.create({});
