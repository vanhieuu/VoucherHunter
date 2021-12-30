import React from 'react';
import {
  FlatList,
  LayoutAnimation,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import URL from '../../config/Api';

import {Text, View, Colors, Image} from 'react-native-ui-lib';
import {IProduct} from '../../types/IProduct';
import Icon from 'react-native-vector-icons/FontAwesome';
import {debounce} from 'lodash';
import LinearGradient from 'react-native-linear-gradient';

interface ISection {
  title: string;
  data: any[];
}

const Section = ({title, data}: ISection) => {
  return (
    <View style={{marginHorizontal: 25}}>
      <Text style={styles.txtTitleSection}>{title}</Text>
      <View style={styles.gridListSection}>
        {data.map((item, index) => {
          return (
            <View style={styles.containerItem} key={index}>
              <Text style={styles.txtFilter}>{item}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const Search = () => {
  const dataFilterFood = [
    'Cake',
    'Soup',
    'Main Course',
    'Appetizer',
    'Dessert',
  ];

  const [filterData, setFilterData] = React.useState<IProduct[]>([]);
  // const [dataFilter, setDataFilter] = React.useState(dataFilterFood);
  const [masterData, setMasterData] = React.useState<IProduct[]>([]);
  const [search, setSearch] = React.useState('');
  filterData.map(item => item.tags);

  React.useEffect(() => {
    fetch(URL.item(''), {
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
  }, [filterData]);

  // const onchangeText = React.useCallback(
  //   debounce(() => {
  //     let result = filterData.filter((item) => item.name);
  //     setFilterData(result);
  //   }, 1000),
  //   [filterData]//
  // );
  const searchFilter = React.useCallback(
    debounce(text => {
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
      }
      // } else {
      //   setFilterData(masterData);
      //   setSearch(text);
      // }
    }, 1000),
    [filterData],
  );

  const renderItem = React.useCallback(({item}: {item: IProduct}) => {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          flex: 1,
          alignSelf: 'center',
        }}
        marginV-20>
        <Image
          source={{uri: item.listphotos.find(element => element !== undefined)}}
          width={120}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}
          height={100}
        />
        <Text h10 paddingH-15 paddingV-15 style={{maxWidth: 150}}>
          {item.name.toUpperCase()}
        </Text>
        <Text h10 paddingH-15 paddingV-15>
          {item.listedPrice}
        </Text>
      </View>
    );
  }, []);

  return (
    <View>
      <TextInput
        style={styles.inputSearch}
        placeholder="Tìm kiếm sản phẩm"
        placeholderTextColor="#e9707d"
        onChangeText={(text: string) => {
          searchFilter(text);
          // setSearch(text);
        }}
      />

      <View style={styles.spaceFlex} />

      <FlatList
        data={filterData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => (
          <View
            style={{
              justifyContent: 'space-between',
              flex: 1,
              alignSelf: 'center',
            }}
            marginV-20>
            <Image
              source={{
                uri: item.item.listphotos.find(
                  element => element !== undefined,
                ),
              }}
              width={120}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
              }}
              height={100}
            />
            <Text h10 paddingH-15 paddingV-15 style={{maxWidth: 150}}>
              {item.item.name.toUpperCase()}
            </Text>
            <Text h10 paddingH-15 paddingV-15>
              {item.item.listedPrice}
            </Text>
          </View>
        )}
        numColumns={2}
        key={2}
        onEndReachedThreshold={0.5}
        bounces={true}
      />
    </View>
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
  },
  txtTitleSection: {
    fontSize: 15,
    lineHeight: 20,
    color: '#09051C',
    fontWeight: '700',
    marginBottom: 20,
  },
  gridListSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  containerItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 15,
    backgroundColor: 'rgba(254, 173, 29, 0.1)',
    marginRight: 20,
    marginBottom: 20,
  },
  txtFilter: {
    fontSize: 12,
    lineHeight: 12,
    color: 'rgba(218, 99, 23, 1)',
  },
  spaceFlex: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  inputSearch: {
    fontSize: 15,
    color: '#000',
    lineHeight: 14,
    marginLeft: 19,
  },
  linearButton: {
    marginHorizontal: 25,
    height: 57,
    borderRadius: 15,
    backgroundColor: 'red',
    marginBottom: 16,
  },
  btnSearch: {
    flex: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtSearch: {
    color: '#FEFEFF',
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '700',
  },
});
