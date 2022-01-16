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
import * as Icon from 'react-native-iconly'



import storage from '@react-native-firebase/storage';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

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
  const [transferred, setTransferred] = React.useState<any>(null);
  

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

  const choosePicture = async () => {
    await launchImageLibrary({
      maxHeight: 200,
      maxWidth: 200,
      selectionLimit: 0,
      mediaType: 'photo',
      includeExtra,
    }).then(res => {
      const uri = res?.assets?.[0].uri;
      const imageUri =
        Platform.OS === 'ios' ? uri :  uri;
      setSelectedImage(imageUri);
      console.log(selectedImage, 'set selected image');
    firebase
        .auth()
        .signInAnonymously()
        .then(() => {
          return firebase.firestore().collection('Hello').doc('hello').set({
            id: 'fadsa',
          });
        })
        .catch(err => {
          console.log(err);
        });

      setUploading(false);
      // setUsers({
      //   photoUrl:imageUri
      // })
      // uploadImage();
    
    });
  };

  const uploadImage = async () => {
    const uploadImage = selectedImage;
    const fileName = selectedImage?.substring(
      selectedImage.lastIndexOf('/') + 1,
    );
    setUploading(true);
    setTransferred(0);
    console.log(uploadImage,'Upload image')
    const task = storage().ref(`anh/`).putFile(`anh/${uploadImage}`);
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
     taskSnapshot.ref.getDownloadURL().then(downloadURL => {
        console.log(downloadURL,'res');
        setSelectedImage(downloadURL)
      })
    });

    try {
    await task;
    console.log(task,'task')
    } catch (e) {
      console.log(e);
    }
  }
  React.useEffect(() =>{
    uploadImage();
  },[selectedImage])

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
            <Image
              source={{uri: user?.photoUrl}}
              resizeMode="cover"
              style={styles.img}
            />
          )}
          <TouchableOpacity onPress={() => choosePicture()} style={{marginTop: 30,flexDirection:'row'}}>
            <Icon.Edit set='bold' size={14} color={'#e9707d'}  />
            <Text center style={{fontSize: 14}}>
              Thay ảnh đại diện{' '} {transferred? <Text> {transferred} %</Text> : null}
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
