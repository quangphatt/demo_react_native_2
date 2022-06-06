import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProjectNavigation from './ProjectNavigation/ProjectNavigation';
import TaskNavigation from './TaskNavigation/TaskNavigation';

const Stack = createNativeStackNavigator();

class MenuNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="ProjectNavigation" component={ProjectNavigation} />
        <Stack.Screen name="TaskNavigation" component={TaskNavigation} />
      </Stack.Navigator>
    );
  }
}

export default MenuNavigation;
