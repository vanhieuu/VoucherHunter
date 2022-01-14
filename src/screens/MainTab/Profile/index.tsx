import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import URL from '../../../config/Api';
import {IResUser, IUser} from '../../../redux/authSlice';
import {RootState} from '../../../redux/store';
import {Text, Image, View} from 'react-native-ui-lib';

import {
  IResUserRegister,
  IUserRegister,
} from '../../../redux/authRegisterSlice';
import {NavigationProp, useNavigation} from '@react-navigation/core';

import Box from '../../../components/Box';
import {RootStackParamList} from '../../../nav/RootStack';
import {useTheme} from '@shopify/restyle';
import Header from '../../components/Header';
import Tab from './components/Tab';
import GetInvoice from './components/GetInvoice';
import EditInfo from './components/EditInfo';

import * as ImagePicker from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
// import storage, { firebase } from '@react-native-firebase/storage';
import {firebaseConfig, app, storage} from '../../../../firebaseConfig';
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';

console.log(firebaseConfig);
const {width} = Dimensions.get('window');
const tabs = [
  {
    id: 'invoice',
    label: 'Đơn hàng đã mua ',
  },
  {
    id: 'info',
    label: 'Thông tin cá nhân',
  },
];
interface Action {
  title: string;
  type: 'capture' | 'library';
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}

const includeExtra = true;
const Profile = () => {
  const theme = useTheme();
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>();
  const token = useSelector<RootState, string>(state => state.auth.accessToken);
  const registerToken = useSelector<RootState, string>(
    state => state.register.accessToken,
  );

  const [user, setUsers] = React.useState<IUser | IUserRegister>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedImage, setSelectedImage] = React.useState<any>(null);
  const [uploading, setUploading] = React.useState<boolean>(false);
  const [status, setStatus] = React.useState('');
  React.useEffect(() => {
    let Timer1 = setTimeout(() => setLoading(true), 3000);
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(URL.ValidateToken, {
      signal: signal,
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
        setLoading(false);
        console.log(user?.photoUrl);
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
  }, [user?.photoUrl]);

  const choosePicture = React.useCallback(() => {
    launchImageLibrary({
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
      mediaType: 'photo',
      includeExtra,
    }).then(res => {
      const uri = res?.assets?.[0].uri;

      setSelectedImage(uri);
      console.log(selectedImage, 'set selected image');
      const uploadUri = res?.assets?.[0].fileName;

      console.log(uri, 'uri');
      let reference = ref(storage, uploadUri);
      setUploading(true);

      let task = uploadBytesResumable(reference, selectedImage);
      task.on(
        (err: 'err') => console.log(err),
        () => {
          console.log('Image uploaded to the bucket!');
          setLoading(false);
          getDownloadURL(task.snapshot.ref).then(downloadURL => {
            console.log(downloadURL, 'res');
            setSelectedImage(downloadURL);
          });
          setStatus('Image upload');
        },
      );
      // storage().ref(fileName).putFile(uploadUri);

      setUploading(false);
      Alert.alert('Done');
    });
  }, []);

  return (
    <Box flex={1} backgroundColor="background">
      <Box flex={0.15} backgroundColor="background">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderBottomRightRadius="xl"
          backgroundColor="secondary">
          <Header
            left={{
              icon: 'arrow-left',
              onPress: () => {
                console.log('click');
              },
            }}
            title="Cá nhân"
          />
        </Box>
      </Box>
      <Box flex={0.8}>
        <Box
          position="absolute"
          left={width / 2 - 50}
          top={-40}
          width={100}
          height={100}
          style={{borderRadius: 50}}>
          {selectedImage ? (
            <Image
              source={{uri: selectedImage}}
              resizeMode="cover"
              style={styles.img}
            />
          ) : (
            <ActivityIndicator size="small" color="#e9707d" />
          )}
          <TouchableOpacity onPress={choosePicture} style={{marginTop: 30}}>
            <Text center style={{fontSize: 14}}>
              Chọn ảnh{' '}
            </Text>
          </TouchableOpacity>
        </Box>
        <Box marginVertical="m" style={{marginTop: 50 + theme.spacing.m}}>
          <Text h16 black style={{textAlign: 'center'}}>
            {user?.email}
          </Text>
        </Box>
        <Tab tabs={tabs}>
          <GetInvoice />
          <EditInfo />
        </Tab>
      </Box>
      <TouchableOpacity onPress={() => {}}>
        <Text center style={{fontSize: 14}}>
          upload ảnh{' '}
        </Text>
      </TouchableOpacity>
    </Box>
  );
};

export default Profile;

const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 50,
  },
  container: {
    justifyContent: 'space-between',
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  container1: {
    flex: 1,
    backgroundColor: 'aliceblue',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },

  image: {
    marginVertical: 24,
    alignItems: 'center',
  },
});
const actions: Action[] = [
  {
    title: 'Select Image',
    type: 'library',
    options: {
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
      mediaType: 'photo',
      includeBase64: false,
      includeExtra,
    },
  },
  {
    title: `Select Image or Video\n(mixed)`,
    type: 'library',
    options: {
      selectionLimit: 0,
      mediaType: 'mixed',
      includeExtra,
    },
  },
];
