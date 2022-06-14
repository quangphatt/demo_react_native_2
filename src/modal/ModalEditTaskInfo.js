import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

class ModalEditTaskInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text_value: this.props.value,
    };
  }

  onChangeValue = value => {
    this.setState({
      text_value: value,
    });
  };

  onClose = () => {
    this.props.hideModal();
  };

  onUpdate = () => {};

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Edit Task Infomation</Text>
        <Text style={styles.message}>{this.props.label}</Text>
        <TextInput
          style={styles.text_input}
          placeholder={'Enter ' + this.props.label}
          placeholderTextColor="#94abb3"
          value={this.state.text_value}
          onChangeText={this.onChangeValue}
        />
        <View style={styles.button_wrapper}>
          <TouchableOpacity style={styles.button_close} onPress={this.onClose}>
            <Text style={styles.button_close_text}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button_update}
            onPress={this.onUpdate}>
            <Text style={styles.button_update_text}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 240,
    padding: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  title: {
    color: '#000',
    fontSize: 18,
  },
  message: {
    color: '#a60d0d',
    fontSize: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  text_input: {
    borderColor: '#b5b5b5',
    borderWidth: 1,
    borderRadius: 10,
    width: '70%',
    height: 40,
    marginBottom: 15,
    padding: 10,
  },
  button_wrapper: {
    flexDirection: 'row',
  },
  button_close: {
    backgroundColor: '#dbd9d3',
    height: 40,
    width: 100,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  button_close_text: {
    color: '#000',
    fontSize: 15,
  },
  button_update: {
    backgroundColor: '#4248b8',
    height: 40,
    width: 100,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  button_update_text: {
    color: '#fff',
    fontSize: 15,
  },
});

export default ModalEditTaskInfo;
