import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text style={{color:'#000'}}>{this.props.route.params.task_name}</Text>
      </View>
    );
  }
}

export default Task;
