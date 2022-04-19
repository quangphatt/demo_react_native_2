import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AllProject from './AllProject';
import Project from './Project';
import Task from './Task';

const Stack = createNativeStackNavigator();

class ProjectManage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Stack.Navigator
        initialRouteName="All Project"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="All Project" component={AllProject} />
        <Stack.Screen name="ProjectScreen" component={Project} />
        <Stack.Screen name="Task" component={Task} />
      </Stack.Navigator>
    );
  }
}

export default ProjectManage;
