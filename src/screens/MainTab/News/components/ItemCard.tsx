import {NavigationProp, useNavigation} from '@react-navigation/core';
import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {Card, Colors, Image, Text, View} from 'react-native-ui-lib';
import {RootStackParamList} from '../../../../nav/RootStack';
import {INewsData} from '../../../../redux/newSlice';
import RenderHTML from 'react-native-render-html';
const widthScreen = Dimensions.get('window').width;

const ItemCard = ({item}: {item: INewsData}) => {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();

  const onPressItem = React.useCallback(() => {
    navigate('DetailNews', {
      item,
    });
  }, []);
  const sourceTitle = {
    html: `<div 
    style="font-size: 1.3rem; padding: 0px 10px ; max-width:320px; padding-right:35px">${item.title}</div>`,
  };



  return (
    <View backgroundColor="#ffff" marginV-10>
      <TouchableOpacity onPress={onPressItem}>
        <View style={styles.container} padding-10>
          <View>
            <Image
              source={{uri: item.image }}
              style={{width: 100, height: 100, marginHorizontal: 10}}
              resizeMode="contain"
            />
          </View>
          <View>
            <View row marginV-15>
              <View
                br100
                marginL-10
                paddingH-8
                marginV-2
                marginB-10
                backgroundColor={Colors.black}>
                <Text h13 color={Colors.white} marginR-12>
                  {item.creator}
                </Text>
              </View>
            </View>
            <View marginB-12>
              <RenderHTML source={sourceTitle} contentWidth={widthScreen} />
              {/* <Text>{item.title}</Text> */}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  container: {
    width: widthScreen,
    backgroundColor: '#f5f5f5',
    elevation: 1,
    alignSelf: 'center',
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: widthScreen - 280,
  },
  contentItem: {
    overflow: 'hidden',
    backgroundColor: 'white',
    height: 20,
    width: 60,
  },
});
