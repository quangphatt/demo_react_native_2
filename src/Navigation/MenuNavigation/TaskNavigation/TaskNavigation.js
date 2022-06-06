import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Task from '~/components/Home/Project/Task';
import ProjectDetail from '~/components/Home/Project/ProjectDetail';
import TaskDetail from '~/components/Home/Project/TaskDetail';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

class TaskNavigation extends Component {
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
        <Stack.Screen name="Task" component={Task} />
        <Stack.Screen name="ProjectDetail" component={ProjectDetail} />
        <Stack.Screen name="TaskDetail" component={TaskDetail} />
      </Stack.Navigator>
    );
  }
}

export default TaskNavigation;
