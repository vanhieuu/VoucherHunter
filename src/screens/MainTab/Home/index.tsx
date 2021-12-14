import React from 'react';
import {Alert, BackHandler, Dimensions, Platform, StyleSheet, UIManager} from 'react-native';
import {View, Image,Colors} from 'react-native-ui-lib';

import Banner from './components/Banner';
import ListHorizontal from './components/ListHorizontal';
import ListProduct from './components/ListProduct';

const widthScreen = Dimensions.get('window').width;
const widthImg = widthScreen;
const heightImg = (widthImg / 375) * 256;

const Home = () => {

  React.useEffect(() => {
    const backAction = () => {
      Alert.alert("Chờ đã ", "Bạn có chắc là muốn thoát App 😭?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  return (
    <View flex backgroundColor={Colors.primary}>
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
