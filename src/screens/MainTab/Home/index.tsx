import React from 'react';
import {Alert, BackHandler, Dimensions,StyleSheet} from 'react-native';
import {View, Image,Colors} from 'react-native-ui-lib';

import Banner from './components/Banner';
import ListHorizontal from './components/ListHorizontal';
import ListProduct from './components/ListProduct';

const widthScreen = Dimensions.get('screen').width;
const heightScreen = Dimensions.get('screen').height;
const widthImg = widthScreen;
const heightImg = (widthImg / 375) * 256;

const Home = () => {

 


  return (
    <View flex backgroundColor={Colors.primary} marginT-40>
      <Image
        assetGroup="imgNewScreen"
        assetName="ic_bg"
        width={widthImg}
        height={heightImg}
        style={{position: 'absolute'}}
      />
      <ListProduct
        ListHeaderComponent={
          <>
            <Banner />
            <ListHorizontal />
          </>
        }
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
