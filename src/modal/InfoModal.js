import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

class InfoModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Modal
        backdropOpacity={0.3}
        isVisible={true}
        onBackdropPress={this.props.onBackdropPress}
        style={styles.modal}>
        <Text style={styles.title}>Info</Text>
        <Text style={styles.message}>Do you want to delete this group?</Text>
        <View style={styles.button_wrapper}>
          <TouchableOpacity
            style={styles.button1}
            onPress={this.props.pressButton1}>
            <Text style={styles.button1_text}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={this.props.pressButton2}>
            <Text style={styles.button2_text}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    marginLeft: '12%',
    marginRight: '12%',
    marginTop: '45%',
    marginBottom: '45%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    color: '#000',
    fontSize: 20,
  },
  message: {
    color: '#000',
    fontSize: 13,
    marginTop: 10,
    marginBottom: 20,
  },
  button_wrapper:{
    flexDirection: 'row',
  },
  button1: {
    backgroundColor: '#dbd9d3',
    height: 40,
    width: 100,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  button1_text: {
    color: '#000',
    fontSize: 15,
  },
  button2: {
    backgroundColor: '#4248b8',
    height: 40,
    width: 100,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  button2_text: {
    color: '#fff',
    fontSize: 15,
  },
});

export default InfoModal;
