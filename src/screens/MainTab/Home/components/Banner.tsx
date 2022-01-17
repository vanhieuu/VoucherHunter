import {useNavigation, NavigationProp} from '@react-navigation/native';
import {transform} from 'lodash';
import React from 'react';
import {
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {View, Image} from 'react-native-ui-lib';
import {useSelector} from 'react-redux';
import URL from '../../../../config/Api';

import {RootStackParamList} from '../../../../nav/RootStack';
import {RootState} from '../../../../redux/store';
import {IProduct} from '../../../../types/IProduct';

const widthScreen = Dimensions.get('window').width;

const widthCarousel = widthScreen - 32;
const heightCarousel = (widthCarousel / 344) * 242;

interface IRefDots {
  setIndexPageFocus: React.Dispatch<React.SetStateAction<number>>;
}

const Banner = () => {
  const [loading, setLoading] = React.useState(true);
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const [product, setProduct] = React.useState<IProduct[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);
  const [currentImage, setCurrentImage] = React.useState<number>(0);
  const [post,setPost] = React.useState(0)
  const token = useSelector<RootState, string>(state => state.auth.accessToken);
  const componentMounted = React.useRef(true);
  const refDots = React.useRef<IRefDots>(null);
  const refScrollView = React.useRef<ScrollView>(null);
  const onMomentumScrollEnd = React.useCallback(({nativeEvent}) => {
    const x = nativeEvent.contentOffset.x;
    let indexFocus = Math.round(x / widthScreen);
  

    refDots.current?.setIndexPageFocus(indexFocus);
  }, []);
      
  React.useEffect(() => {
    const process = () => {
      let y;
      y = currentIndex + 1;
     
      if (y > 4) y = 0;
      setCurrentIndex(y);
      setPost(y*widthCarousel);
      refScrollView.current?.scrollTo({
        x:y * widthCarousel,
        y:0,
        animated:true
      })
    };
    let timer = setTimeout(() => process(), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [post, currentIndex]);
  const handleScroll = React.useCallback(({nativeEvent}) => {
    if (nativeEvent && nativeEvent.contentOffset) {
      const currentOffset = nativeEvent.contentOffset.x;
      let imageIndex = 0;
      if (nativeEvent.contentOffset.x > 0) {
        imageIndex = Math.floor(
          (nativeEvent.contentOffset.x + widthCarousel / 2) / widthCarousel,
        );
      }
      setCurrentImage(imageIndex)
    }
  }, []);

  React.useEffect(() => {
    if (!token) return;
    const controller = new AbortController();
    const signal = controller.signal;
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
        return (componentMounted.current = false);
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
  }, [componentMounted]);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        style={{flex: 1}}
        horizontal
        scrollEventThrottle={16}
        onScroll={handleScroll}
        pagingEnabled
        onMomentumScrollEnd={onMomentumScrollEnd}
        showsHorizontalScrollIndicator={false}
        ref={refScrollView}>
        {product.map((item, index) => (
          <View key={index}>
            {item.in_slider === true ? (
              <View key={index.toString()}>
                <TouchableOpacity
                  onPress={() =>
                    navigate('DetailItems', {
                      item: item,
                    })
                  }>
                  <Image
                    source={{uri: item.img}}
                    style={{width: widthCarousel, aspectRatio: 16 / 12}}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  loopCarousel: {
    position: 'absolute',
    bottom: 15,
    left: 10,
  },
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: heightCarousel / 2 - 32,
    width: widthCarousel,
    height: heightCarousel,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  containerDots: {
    position: 'absolute',
    top: widthCarousel,
    height: heightCarousel,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  dot: {
    borderRadius: 5,
    marginHorizontal: 5,
    height: 20,
    width: 20,
  },
});
