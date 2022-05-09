import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AuthProvider from './AuthProvider';

class Provider extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <AuthProvider />
    );
  }
}

export default Provider;
