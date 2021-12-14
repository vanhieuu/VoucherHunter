import React from 'react';
import {
  FlatList,
  LayoutAnimation,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useSelector} from 'react-redux';
import URL from '../../config/Api';
import {RootState} from '../../redux/store';
import {Text, View, Colors, Image} from 'react-native-ui-lib';
import {IProduct} from '../../types/IProduct';
import Icon from 'react-native-vector-icons/FontAwesome';
const Search = () => {
  const [filterData, setFilterData] = React.useState<IProduct[]>([]);
  const [masterData, setMasterData] = React.useState<IProduct[]>([]);
  const [search, setSearch] = React.useState('');
  const productID = useSelector<RootState, string>(
    state => state.product.productId,
  );
  React.useEffect(() => {
    fetch(URL.item(productID), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setFilterData(json);
        setMasterData(json);
        return json;
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const searchFilter = React.useCallback(text => {
    if (text) {
      const newData = masterData.filter(item => {
        const itemData = item.name
          ? item.name.toUpperCase()
          : '.'.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(masterData);
      setSearch(text);
    }
  }, []);

  const renderItem = React.useCallback(({item}: {item: IProduct}) => {
    return (
      <View style={{justifyContent: 'space-between',backgroundColor:'red'}}>
        <Image
          source={{uri: item.listphotos.find(element => element !== undefined)}}
          width={120}
          style={{flexDirection:'row',justifyContent:'space-between'}}
          height={100}
        />
        <Text h10 paddingH-15 paddingV-15>
          {item.name.toUpperCase()}
          {`.`}
          {item.listedPrice}
        </Text>
      </View>
    );
  }, []);
  const ItemSeparatorView = () => {
    return (
      <View
        style={{height: 0.5, width: '100%', backgroundColor: '#c8c8c8'}}></View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View bg-red style={{backgroundColor: 'blue'}}>
        <Icon
          name="search"
          size={20}
          // color={'white'}
          style={{backgroundColor: 'white'}}
        />
        <TextInput
          style={styles.textInput}
          value={search}
          placeholder={'Tìm kiếm sản phẩm'}
          underlineColorAndroid="transparent"
          onChangeText={(text: string) => {
            searchFilter(text);
            // setSearch(text);
          }}
        />
      </View>
     <View style={{justifyContent: 'space-between'}}>
        <FlatList
          data={filterData}
          keyExtractor={(item, index) => item._id.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={renderItem}
          numColumns={2}
          key={2}
        />
     </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: Colors.primary,
    backgroundColor: '#fff',
    marginTop: 80,
    marginLeft: 30,
  },
});
