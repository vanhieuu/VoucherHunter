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
import {numberFormat} from '../../config/formatCurrency';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../nav/RootStack';
import {Input} from 'react-native-elements';

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
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();

  const [filterData, setFilterData] = React.useState<IProduct[]>([]);
  // const [dataFilter, setDataFilter] = React.useState(dataFilterFood);
  const [masterData, setMasterData] = React.useState<IProduct[]>([]);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(URL.item(''), {
      signal: signal,
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
  }, [filterData]);

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

  return (
    <View marginB-80 bg-white>
      <Input
        style={styles.inputSearch}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.inputText}
        placeholder="Tìm kiếm sản phẩm"
        placeholderTextColor="#e9707d"
        onChangeText={(text: string) => {
          searchFilter(text);
          // setSearch(text);
        }}
        leftIcon={
          <Icon
            name="search"
            size={20}
            color='#E9707d'
          />
        }
        autoCompleteType={undefined}
      />

  

      <FlatList
        data={filterData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={item => (
          <View backgroundColor="#fff" style={styles.container} flex>
            <TouchableOpacity
              onPress={() => {
                navigate('DetailItems', {
                  item: item.item,
                });
                console.log(item);
              }}>
              <View style={styles.contentItem}>
                <Image
                  style={{
                    height: 100,
                    width: 150,
                    alignSelf: 'center',
                    borderRadius:3
                  }}
                  source={{uri: item.item.img}}
                  resizeMode="contain"
                />
              </View>
              <View>
                <View>
                  <View  marginB-11 marginL-20  >
                    <Text
                      style={{fontSize: 15,fontWeight: 'bold'}}
                      marginT-10
                      numberOfLines={2}
                      color={'#6f6f6f'}
                      marginL-20>
                      {item.item.name}
                    </Text>
                    <Text style={{fontSize: 14,fontWeight: 'bold'}} color={'#E9707d'} marginL-20>
                     Giá tiền:{numberFormat.format(item.item.listedPrice)}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
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
  containerInput: {
    width: '90%',
    height: 58,
    borderRadius: 100,
    marginVertical: 10,
    borderWidth: 3.5,
  },
  inputText: {
    color: '#0779e4',
    fontWeight: 'bold',
    marginLeft: 8,
    marginVertical: 0,
  },
  inputContainer: {
    borderBottomWidth: 0,
    
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
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth:0.5,
    marginTop:5,
    borderColor:'#E9707D'
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
  contentItem: {
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    alignItems: 'center',
    height: 100,
    width: 200,
  },
});
