import React from 'react';
import {FlatList, ScrollView, SectionList, StyleSheet} from 'react-native';

import URL from '../../../../../config/Api';
import {View} from 'react-native-ui-lib';
import {getAuthAsync, IAuth} from '../../../../../redux/authSlice';
import {InvoiceProps} from '../../../../../types/InvoiceType';
import ItemInvoice from './ItemInvoice';
import Footer, { RefFooter } from './Footer';

interface Props {
  ListHeaderComponent:
    | React.ComponentType<any>
    | React.ReactElement
    | null
    | undefined;
}

const ListProduct = () => {
  const refFooter = React.useRef<RefFooter>(null);
  const refListOrder = React.useRef<FlatList>(null);
  const [loading, setLoading] = React.useState(false);
  const [invoice, setInvoice] = React.useState<InvoiceProps[]>([]);

  const fetchApi = React.useCallback(async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    setLoading(true);
    const auth: IAuth | null = await getAuthAsync();
    fetch(URL.getInvoice, {
      signal: signal,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth?.accessToken}`,
      },
    })
      .then(response => response.json())
      .then(json => {
        setInvoice(json.data);
        setLoading(false);
      });
  }, []);
  React.useEffect(() => {
    fetchApi();
  }, []);
  const renderListFooter = React.useCallback(() => {
    return <Footer ref={refFooter} />;
  }, []);
  return (
    
      <FlatList
        ref={refListOrder}
        data={invoice}
        horizontal={false}
        // scrollEnabled={true}
        renderItem={({item}) => {
          return <ItemInvoice items={item} />;
        }}
        keyExtractor={(item, index) => item._id.toString()}
      
      />
     
   
  );
};

export default ListProduct;

const styles = StyleSheet.create({});
