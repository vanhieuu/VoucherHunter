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
const initDataNews: INewsData[] = [
  {
    _id: '',
    title: '',
    creator: '',
    content: '',
    created_at: '',
    updated_at: '',
    image: '',
  },
];

interface IStateNews {
  dataNews: INewsData[];
  refreshing: boolean;
}
interface IActionCart {
  type: string;
}
const initStateNews = {
  dataNews: initDataNews,
  refreshing: false,
};
const reducerCart = (state: IStateNews, action: IActionCart): IStateNews => {
  switch (action.type) {
    case 'onEndReached':
      return {
        ...state,
        dataNews: state.dataNews.concat(initDataNews),
      };
    case 'onRefreshLoading':
      return {
        ...state,
        refreshing: true,
      };
    case 'onRefresh':
      return initStateNews;
    default:
      return initStateNews;
  }
};

const ListHorizontal = () => {
  // const [stateNews,dispatch] = React.useReducer(reducerCart,initStateNews)
  const [news, setNews] = React.useState<INewsData[]>([]);
  const [loading, setLoading] = React.useState(false);
  const refFooter = React.useRef<RefFooter>(null);
  const refListOrder = React.useRef<FlatList>(null);

  // const [pageNumber, setPageNumber] = React.useState(1);
  const token = useSelector<RootState, string>(state => state.auth.accessToken);
  const page = useSelector<RootState, number>(state => state.news.page);
  const componentMounted = React.useRef(true);

  const dispatch = useDispatch();
  const onRefresh = React.useCallback(() => {
    dispatch({type: 'onRefreshLoading'});
    setTimeout(() => {
      dispatch({type: 'onRefresh'});
    }, 2000);
  }, []);

  // const onEndReached = React.useCallback(() =>{
  //   refFooter.current?.setIsLoadmore(true);
  //    setTimeout(() => {
  //        setNews(prev => prev.concat(initDataNews));
  //        refFooter.current?.setIsLoadmore(false)
  //    },500)
  // },[])

  const onEndReached = React.useCallback(() => {
    dispatch(onUpdatePageNumber({page: page + 1}));
    console.log(onUpdatePageNumber({page: page + 1}));
    setNews(prev => prev.concat());
    refFooter.current?.setIsLoadmore(false);
    console.log(page);
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
    <View paddingV-20 style={{alignSelf: 'center'}} flex>
      <FlatList
        showsHorizontalScrollIndicator={true}
        data={news}
        renderItem={({item}) => {
          return <ItemCard item={item} />;
        }}
        numColumns={2}
        key={2}
        ListFooterComponent={renderListFooter}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        onRefresh={onRefresh}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ListHorizontal;

const styles = StyleSheet.create({});
