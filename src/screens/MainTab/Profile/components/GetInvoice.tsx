import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native-ui-lib';
import {useSelector} from 'react-redux';
import Box from '../../../../components/Box';
import URL from '../../../../config/Api';
import {numberFormat} from '../../../../config/formatCurrency';
import {getAuthAsync, IAuth} from '../../../../redux/authSlice';
import {RootState} from '../../../../redux/store';
import {InvoiceProps} from '../../../../types/InvoiceType';
import ListProduct from './invoiceComponents/ListProduct';
import StatusInvoice from './invoiceComponents/StatusInvoice';

import TabInvoice from './TabInvoice';





const invoiceType = [
  {
    label:'Mã đơn hàng', id: 'products'
  },{
    label:'Trạng thái đơn hàng',id:'paymentStatus'
  }
]





const GetInvoice = () => {
  const [invoice, setInvoice] = React.useState<InvoiceProps[]>([]);
  const [loading, setLoading] = React.useState(false);
  const token = useSelector<RootState, string>(state => state.auth.accessToken);
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
      });
  }, []);
  React.useEffect(() => {
    fetchApi();
  }, []);
  console.log(
    invoice
    .map(item => item)
    ,'aaa'
  );

  return (
    <ScrollView>
      <Box padding="m">
        <Text>
          Tổng số tiền bạn đã chi:{' '}
          <Text
            style={{fontSize: 16, fontWeight: 'bold', color: Colors.primary}}>
            {numberFormat.format(
              invoice
                .map(item => item.totalDiscountPrice)
                .reduceRight((a, b) => a + b, 0),
            )}
          </Text>
        </Text>
      </Box>
      <Box padding="m">
        <TabInvoice  tabs={invoiceType}>
            <ListProduct ListHeaderComponent={undefined}/>
          </TabInvoice>
      </Box>
    </ScrollView>
  );
};

export default GetInvoice;

const styles = StyleSheet.create({
  txt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
