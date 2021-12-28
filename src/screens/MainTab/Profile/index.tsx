import React from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import URL from '../../../config/Api';
import {IResUser, IUser} from '../../../redux/authSlice';
import {RootState} from '../../../redux/store';
import {Colors, Text, View, Image} from 'react-native-ui-lib';
import {Header} from 'react-native-elements';
import {
  IResUserRegister,
  IUserRegister,
} from '../../../redux/authRegisterSlice';
import { RouteProp, useRoute } from '@react-navigation/core';
import { MainTabParamList } from '../../../nav/MainTab';
const Profile = () => {
  
  const token = useSelector<RootState, string>(state => state.auth.accessToken);
  const registerToken = useSelector<RootState, string>(state => state.register.accessToken)
  const [user, setUsers] = React.useState<IUser | IUserRegister>();
  const [loading,setLoading] = React.useState<boolean>(false)
  const route = useRoute<RouteProp<MainTabParamList>>()
  console.log(route.name,route.key)

  React.useEffect(() => {
    let Timer1 = setTimeout(() =>setLoading(true),3000)
    fetch(URL.ValidateToken, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token||registerToken}`,
      },
    })
      .then(response => response.json())
      .then((json: IResUser | IResUserRegister) => {
        console.log(json.message);
        setUsers(json.user);
        // console.log(user,'user');
        // dispatch(users)
        setLoading(false)
        return clearTimeout(Timer1)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View backgroundColor={Colors.primary}>
      <Header
        placement="center"
        leftComponent={{icon: 'menu', color: Colors.bgApp}}
        centerComponent={{
          text: 'VoucherHunter',
          style: {color: Colors.primary, fontSize: 20},
        }}
        rightComponent={{icon: 'search', color: Colors.bgApp}}
        containerStyle={{
          backgroundColor: 'white',
          justifyContent: 'space-around',
        }}
        barStyle="light-content"
        statusBarProps={{barStyle: 'light-content'}}
      />
      <View
        row
        marginH-12
        marginV-20
        backgroundColor={Colors.onBoard3}
        style={styles.container}>
        <View style={styles.img}>
          <Image
            source={{uri: user?.photoUrl}}
            resizeMode="contain"
            style={styles.img}
          />
        </View>
        <View>
          <Text h16 black marginV-12 marginH-5>
            {user?.email}
          </Text>
        </View>
      </View>
    </View>
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
