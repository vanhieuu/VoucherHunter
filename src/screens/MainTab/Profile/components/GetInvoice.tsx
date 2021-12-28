import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux';
import URL from '../../../../config/Api';
import { getAuthAsync, IAuth } from '../../../../redux/authSlice';
import { RootState } from '../../../../redux/store';

const GetInvoice = () => {
    const [invoice,setInvoice]= React.useState([]);
    const [loading,setLoading] = React.useState(false);
    const token = useSelector<RootState,string>( state=> state.auth.accessToken)
    const fetchApi = React.useCallback(async ()=>{
        const controller = new AbortController();
    const signal = controller.signal;
        setLoading(true)
        const auth:IAuth | null = await getAuthAsync();
        fetch(URL.getInvoice,{
            signal: signal,
            method:'GET',
            headers:{
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth?.accessToken}`
            }   
        }).then(response =>response.json())
        .then(json => {
            setInvoice(json.data);
            
        })

    },[])
React.useEffect(()=>{
    fetchApi()
},[])
        console.log(invoice.map((item)=>item),'AAAA')
        
    return (
        <View>
           {invoice.map((item,index)=>{
               <View key={index}>
                    <Text>
                        
                    </Text>
               </View>
           })}
          
           
        </View>
    )
}

export default GetInvoice

const styles = StyleSheet.create({})
