import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
interface Props {
  icon: string;
  color: string;
  title: string;
}

const Account = ({icon, color, title}: Props) => {
  return (
    <TouchableOpacity style={[styles.container, {backgroundColor: color}]}>
      <Icon style={styles.accIcon} name={icon} />
      <Text style={styles.txtTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: 135,
    height: 45,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  accIcon: {
    color: 'white',
    fontSize: 20,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  txtTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 10,
    marginHorizontal: 5,
  },
});
