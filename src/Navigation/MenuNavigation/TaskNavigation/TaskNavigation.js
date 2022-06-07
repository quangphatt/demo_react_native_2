import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Task from '~/components/Home/Project/Task';
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
        <Stack.Screen name="TaskDetail" component={TaskDetail} />
      </Stack.Navigator>
    );
  }
}

export default TaskNavigation;
