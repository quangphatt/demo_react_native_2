import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Project from '~/components/Home/Project/Project';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

class ProjectNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Project" component={Project} />
      </Stack.Navigator>
    );
  }
}

export default ProjectNavigation;
