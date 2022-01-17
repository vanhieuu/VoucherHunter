import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/core';
import React from 'react';
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  useWindowDimensions,
  Animated,
} from 'react-native';
import {RootStackParamList} from '../../nav/RootStack';
import {Text, View} from 'react-native-ui-lib';
import {Header} from 'react-native-elements';
import RenderHTML from 'react-native-render-html';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import URL from '../../config/Api';
import {INewsData} from '../../redux/newSlice';
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

type Props = NativeStackScreenProps<RootStackParamList, 'DetailNews'>;
const DetailNews = ({navigation}: Props) => {
  const {goBack} =
    useNavigation<NavigationProp<ReactNavigation.RootParamList>>();
  const {width} = useWindowDimensions();
  const widthImg = (width * 240) / 265;
  const route = useRoute<RouteProp<RootStackParamList, 'DetailNews'>>();
  const detailNews = route.params?.item;
  const tagItem = detailNews?.tags!.map(item => item);
  const [loading, setLoading] = React.useState<boolean>(false);
 
  const [news, setNews] = React.useState<INewsData[]>();
  const textAni = React.useRef(new Animated.Value(0)).current;


React.useEffect(() =>{
  Animated.timing(textAni,{
      toValue:1,
      duration:3000,
      useNativeDriver:true
  }).start();
  Animated.timing(textAni,{
    toValue:0,
    duration: 3000,
    useNativeDriver:true
  }).start()
},[])





  const componentMounted = React.useRef(true);
  const source = {
    html: `
    <p style="color:black;">${detailNews.content}</p>`,
  };
  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    fetch(URL.getNewByTag('%23do', 1), {
      signal: signal,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        if (componentMounted.current) {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
   
          setNews(json.data);
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
  }, []);
  return (
    <ScrollView>
      <Header
        placement="center"
        containerStyle={{
          backgroundColor: '#f5f5f5',
          justifyContent: 'space-around',
        }}
        barStyle="light-content"
        statusBarProps={{barStyle: 'light-content'}}
        leftComponent={{onPress: () => goBack()}}
      />
      <View>
        <View style={{justifyContent: 'space-between', left: 1, padding: 15}}>
          <RenderHTML source={source} contentWidth={widthImg} />
          <Text>{detailNews?.creator}</Text>
        </View>
        <View height={5} bg-primary marginT-20 />
      </View>
      <View marginT-20 marginB-20 padding-10 marginH-15>
        {news?.map((item, index) => {
          return (
            <TouchableOpacity
            key={index}
              onPress={() => {
                navigation.setParams({item: item});
              }}>
              <Animated.Text
                key={index}
                style={{fontWeight: 'bold', color: 'blue', fontSize: 20,transform: [{translateX:textAni}]}}>
                {' '}
                {'>>>'} {item.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default DetailNews;

const styles = StyleSheet.create({});
