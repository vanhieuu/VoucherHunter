import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import URL from '../../../config/Api';
import {IResUser, IUser} from '../../../redux/authSlice';
import {RootState} from '../../../redux/store';
import {Colors, Text, View, Image} from 'react-native-ui-lib';

import {
  IResUserRegister,
  IUserRegister,
} from '../../../redux/authRegisterSlice';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/core';
import {MainTabParamList} from '../../../nav/MainTab';
import Box from '../../../components/Box';
import {RootStackParamList} from '../../../nav/RootStack';
import {spacing, useTheme} from '@shopify/restyle';
import Header from '../../components/Header';
import Tab from './components/Tab';
import GetInvoice from './components/GetInvoice';


const {width}= Dimensions.get('window');
const tabs = [{
  id: 'invoice', label:'Đơn hàng đã mua '
},
{
  id:'info', label:'Thông tin cá nhân'
}
]
const Profile = () => {
  const theme = useTheme()
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const token = useSelector<RootState, string>(state => state.auth.accessToken);
  const registerToken = useSelector<RootState, string>(
    state => state.register.accessToken,
  );
  const [user, setUsers] = React.useState<IUser | IUserRegister>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const route = useRoute<RouteProp<MainTabParamList>>();

  React.useEffect(() => {
    let Timer1 = setTimeout(() => setLoading(true), 3000);
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(URL.ValidateToken, {
      signal:signal,
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || registerToken}`,
      },
    })
      .then(response => response.json())
      .then((json: IResUser | IResUserRegister) => {
        setUsers(json.user);
        console.log(json,'user');
        
        setLoading(false);
        return clearTimeout(Timer1);
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
  }, []);

  return (
    <Box flex={1} backgroundColor='background'>
      <Box flex={0.2} backgroundColor="background">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderBottomRightRadius="xl"
          backgroundColor="secondary">
        <Header left={{
          icon:'arrow-left',
          onPress:() => navigate('MainTab')
        }} 
        title='Cá nhân'        
        dark
        />
        </Box>
      </Box>
      <Box flex={0.8}>
        <Box
          position="absolute"
          left={width / 2 - 50}
          top={-50}
          width={100}
          height={100}
          style={{borderRadius: 50}}

          >
          <Image
            source={{uri: user?.photoUrl}}
            resizeMode="contain"
            style={styles.img}
          />
        </Box>
        <Box marginVertical="m" style={{marginTop: 50 +  theme.spacing.m}}>
          <Text h16 black style={{textAlign: 'center'}}>
            {user?.email}
          </Text>
        </Box>
        <Tab
        tabs={tabs}
        >
          <GetInvoice/>
        </Tab>
      </Box>
    </Box>
  );
};

export default Profile;

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
  },
  container: {
    justifyContent: 'space-between',
  },
});
