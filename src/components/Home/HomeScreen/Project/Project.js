import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> Project </Text>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Task')}>
          <Text>Task</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Project;
