import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text} from 'react-native';
import {Colors, View} from 'react-native-ui-lib';
import {useSelector} from 'react-redux';
import Box from '../../../../components/Box';
import URL from '../../../../config/Api';
import {numberFormat} from '../../../../config/formatCurrency';
import {getAuthAsync, IAuth} from '../../../../redux/authSlice';
import {RootState} from '../../../../redux/store';
import {InvoiceProps} from '../../../../types/InvoiceType';
import ItemInvoice from './invoiceComponents/ItemInvoice';

const GetInvoice = () => {
  const [invoice, setInvoice] = React.useState<InvoiceProps[]>([]);
  const [loading, setLoading] = React.useState(false);
const numberCart = useSelector<RootState, number>(state => state.cart.numberCart)

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
  }, [numberCart]);

  return (
    <ScrollView>
      <Box padding="m">
        <Text>
          Tổng số tiền bạn đã chi:{' '}
          {loading ? (
            <View>
              <ActivityIndicator size="small" color="#e9707d" />
            </View>
          ) : (
            <Text style={styles.txt}>
              {numberFormat.format(
                invoice
                  .map(item => item.totalDiscountPrice)
                  .reduceRight((a, b) => a + b, 0),
              ) || 0}
            </Text>
          )}
        </Text>
      </Box>
      <Box padding="m">
        {loading ? (
          <View>
            <ActivityIndicator size="small" color="#e9707d" />
          </View>
        ) : (
          <ScrollView>
            {invoice.map((item, index) => {
              return <ItemInvoice items={item} key={index} />;
            })}
          </ScrollView>
        )}
      </Box>
    </ScrollView>
  );
};

export default GetInvoice;

const styles = StyleSheet.create({
  txt: {fontSize: 16, fontWeight: 'bold', color: '#e9707d'},
});
