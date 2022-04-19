import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class AllProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> AllProject </Text>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('ProjectScreen')}>
          <Text>Project</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AllProject;
