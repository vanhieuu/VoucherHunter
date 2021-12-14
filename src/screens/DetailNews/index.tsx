import {NavigationProp, RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  UIManager,
  useWindowDimensions,
} from 'react-native';
import {RootStackParamList} from '../../nav/RootStack';
import { Text, View} from 'react-native-ui-lib';
import {Header} from 'react-native-elements';
import RenderHTML from 'react-native-render-html';
import LinearGradient from 'react-native-linear-gradient';
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const DetailNews = () => {
  const {goBack} = useNavigation<NavigationProp<ReactNavigation.RootParamList>>()

  const {width} = useWindowDimensions();
  const widthImg = (width*240)/265
  const route = useRoute<RouteProp<RootStackParamList, 'DetailNews'>>();

  const detailNews = route.params?.item;
  const source = {
    html: `
    <p style="color:black;">${detailNews.content}</p>`,
  };
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
        <View style={{justifyContent: 'space-between', left: 1, padding: 15}} >
          <RenderHTML source={source} contentWidth={widthImg} />
          <Text>{detailNews?.creator}</Text>
        </View>
        <View height={5} bg-primary marginT-20 />
      </View>
    </ScrollView>
  );
};

export default DetailNews;

const styles = StyleSheet.create({});
