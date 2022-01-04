import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native-ui-lib';

export interface ListButtonProps {
  label: string;
  value: string;
}
interface Props extends ListButtonProps {
  items: ListButtonProps;
  onPress: () => void;
}

const ListedButton = ({items, onPress}: Props) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <View style={{flex: 1}}>
            <View key={items.label}>
              <Text style={styles.txt} color="#E9707D" marginV-10 marginL-10>
                {items.label}
              </Text>
              <View height={3} bg-dark80 marginT-5 />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ListedButton;

const styles = StyleSheet.create({
  txt: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  txtId: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    // elevation: 0.5,
    flexDirection: 'row',
    borderRadius: 0,
    // backgroundColor: '#fff',
  },
  imgStyle: {
    width: 80,
    height: 80,
    borderRightWidth: 1,
    marginLeft: 20,
    marginHorizontal: 20,
    borderColor: '#000',

    flex: 1,
  },
});
