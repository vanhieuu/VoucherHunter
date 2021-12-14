import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

import { Colors } from "react-native-ui-lib";

const  LikeProductModal = () => {
    const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Yêu thích</Text>
      </Pressable>
    </View>
    
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 22, 
   
  },
  modalView: {
    backgroundColor: Colors.primary,
    padding: 30,
    alignItems: "center",
    height:'45%',
    width:'95%'
  },
  button: {
    padding: 10,
    elevation: 2,
    alignSelf:'flex-start',
    width:'60%',
    marginTop: 50,
  },
  buttonOpen: {
    backgroundColor: Colors.primary,
    
  },
  buttonClose: {
    backgroundColor:Colors.primary,
    alignItems:'flex-start'
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center"
  }
});

export default LikeProductModal;