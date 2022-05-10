import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';

class SuccessModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Modal
        backdropOpacity={0.3}
        isVisible={this.props.isVisible}
        onBackdropPress={this.props.onBackdropPress}
        style={styles.modal}>
        <Feather name={'check-circle'} size={50} color={'#0f0'} />
        <Text style={styles.title}>Successfully</Text>
        <Text style={styles.message}>Login Successfully Login Successfully Login Successfully</Text>
        <TouchableOpacity style={styles.button} onPress={this.props.pressButton}>
          <Text style={styles.button_text}>Close</Text>
        </TouchableOpacity>
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
		color: '#0f0',
		fontSize: 20,
	},
	message: {
		color: '#000',
		fontSize: 13,
		marginTop:10,
		marginBottom: 20,
	},
	button: {
		backgroundColor: '#0f0',
		height: 40,
		width: 120,
		borderRadius: 6,
		alignItems: 'center',
		justifyContent:'center',
	},
	button_text: {	
		color: '#fff',
		fontSize: 15,
	},
});

export default SuccessModal;
