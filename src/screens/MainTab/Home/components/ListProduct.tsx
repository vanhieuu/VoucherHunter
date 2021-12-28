import React from 'react';
import {FlatList, LayoutAnimation, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import URL from '../../../../config/Api';
import {RootState} from '../../../../redux/store';
import {IProduct} from '../../../../types/IProduct';
import ItemProduct from './ItemProduct';

interface Props {
  ListHeaderComponent:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;
}

const ListProduct = ({ListHeaderComponent}: Props) => {
  // const token = useSelector<RootState, string>(state => state.auth.accessToken);
  const [loading, setLoading] = React.useState(true);
  const [product, setProduct] = React.useState<IProduct[]>();
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
    <FlatList
      data={product}
      numColumns={2}
      key={2}
      renderItem={({item}) => {
        return <ItemProduct item={item} />;
      }}
      keyExtractor={(item, index) => item._id.toString()}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
};

export default ListProduct;

const styles = StyleSheet.create({});
