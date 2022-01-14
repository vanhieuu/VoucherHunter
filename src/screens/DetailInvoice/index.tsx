import { RouteProp, useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from 'react-native-ui-lib'
import { RootStackParamList } from '../../nav/RootStack';


type Props = NativeStackScreenProps<RootStackParamList, 'DetailInvoice'>;

const DetailInvoice = ({navigation}:Props) => {
    const route =useRoute<RouteProp<RootStackParamList, 'DetailInvoice'>>();
    const invoiceItem = route.params.item;
    console.log(invoiceItem?.products.map((item) => item.product_id.name))
    return (
        <View>
            <Text>
                {invoiceItem?.products.map((items,index) => {
                    return (
                        <View key={index}>
                            <Text>
                                {items.product_id.name}
                            </Text>
                        </View>
                    )
                })}
            </Text>
        </View>
    )
}

export default DetailInvoice

const styles = StyleSheet.create({})
