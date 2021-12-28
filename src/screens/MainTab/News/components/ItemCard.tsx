import {
  NavigationProp,
  useNavigation,
} from '@react-navigation/core';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
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
    html: `<span 
    style="text-Color:'#000';
    ">${item.title}</span>`,
  };

  return (
    <View backgroundColor="#ffff">
      <TouchableOpacity onPress={onPressItem} style={{flexDirection: 'column'}}>
        <View style={styles.container}>
          <View>
            <View flex marginH-12 marginL-60>
              <Image
              source={{uri:item.image}}
              style={{width:100,height: 80 }}
              resizeMode="contain"
              />
            </View>
            <View row marginV-15 marginR-20>
              <View
                br100
                marginL-10
                paddingH-8
                marginV-2
                marginB-20
                backgroundColor={Colors.black}>
                <Text h8 color={Colors.white} marginR-12>
                  {item.created_at}
                </Text>
              </View>
            </View>
            <View>
              <RenderHTML source={sourceTitle} contentWidth={widthScreen} />
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
    width: widthScreen - 195,
    backgroundColor: '#f5f5f5',
    elevation: 1,
    alignSelf: 'center',
    marginBottom: 5,
    flexDirection: 'column',
    justifyContent: 'center',
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
