import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Feather from 'react-native-vector-icons/Feather';

class WarningModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Modal
        backdropOpacity={0.3}
        isVisible={true}
        onBackdropPress={this.props.onBackdropPress}
        style={styles.modal}>
        <Feather name={'alert-triangle'} size={50} color={'#dede2a'} />
        <Text style={styles.title}>Warning</Text>
        <Text style={styles.message}>Some thing went wrong!!!</Text>
        <TouchableOpacity style={styles.button} onPress={this.props.pressButton}>
          <Text style={styles.button_text}>Try Again</Text>
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
		color: '#dede2a',
		fontSize: 20,
	},
	message: {
		color: '#000',
		fontSize: 13,
		marginTop:10,
		marginBottom: 20,
	},
	button: {
		backgroundColor: '#dede2a',
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

export default WarningModal;