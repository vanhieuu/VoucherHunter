import React from 'react';
import {
  StyleSheet,
  Dimensions,
  LayoutAnimation,
  TouchableOpacity,
} from 'react-native';
import {Carousel, Colors, View, Image} from 'react-native-ui-lib';
import {useSelector} from 'react-redux';
import URL from '../../../../config/Api';
import {RootState} from '../../../../redux/store';
import {IProduct} from '../../../../types/IProduct';

const widthScreen = Dimensions.get('window').width;

const widthCarousel = widthScreen - 32;
const heightCarousel = (widthCarousel / 344) * 242;

const IMAGES = [
  'https://images.pexels.com/photos/2529159/pexels-photo-2529159.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/2529146/pexels-photo-2529146.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/2529158/pexels-photo-2529158.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
];

const ItemBanner = ({image}: {image: string}) => {
  return (
    <View flex centerV>
      <Image
        overlayType={Image.overlayTypes.BOTTOM}
        style={{flex: 1}}
        source={{
          uri: image,
        }}
      />
    </View>
  );
};

const Banner = () => {
  const [loading, setLoading] = React.useState(true);
  const [product, setProduct] = React.useState<IProduct[]>([]);
  const token = useSelector<RootState, string>(state => state.auth.accessToken);
  const componentMounted = React.useRef(true);
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
      <Carousel
        autoplay={true}
        pageWidth={widthCarousel}
        containerStyle={{height: heightCarousel}}
        loop
        pageControlProps={{
          size: 10,
          containerStyle: styles.loopCarousel,
          color: Colors.primary,
          inactiveColor: Colors.white,
        }}
        pageControlPosition={Carousel.pageControlPositions.OVER}>
        {product.map((item, i) => {
          return (
            <View flex centerV key={i}>
              <TouchableOpacity onPress={() => {}}>
                {item.listphotos.map(image => (
                  <Image
                    overlayType={Image.overlayTypes.BOTTOM}
                    style={{flex: 1}}
                    source={{
                      uri: image,
                    }}
                  />
                ))}
              </TouchableOpacity>
            </View>
          );
        })}
      </Carousel>
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
});
