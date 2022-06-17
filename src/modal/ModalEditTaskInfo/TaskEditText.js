import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';

class TaskEditText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.value,
    };
  }

  onChangeText = newText => {
    this.setState({
      text: newText,
    });
  };

  value = () => this.state.text;

  render() {
    return (
      <TextInput
        style={{
          borderColor: '#b5b5b5',
          borderWidth: 1,
          borderRadius: 10,
          width: '70%',
          height: 40,
          marginBottom: 15,
          padding: 10,
          color: '#000',
        }}
        placeholder={'Enter ' + this.props.label}
        placeholderTextColor="#94abb3"
        value={this.state.text}
        onChangeText={this.onChangeText}
      />
    );
  }
}

export default TaskEditText;
