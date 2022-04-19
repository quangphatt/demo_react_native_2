import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TodoList from './TodoList';
import Activity from './Activity';
import ProjectManage from './Project/ProjectManage';
import Bookmark from './Bookmark';
import Profile from './Profile';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
        initialRouteName="Project">
        <Tab.Screen
          name="Todo List"
          component={TodoList}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <FontAwesome5
                  name={'list-ul'}
                  size={21}
                  color={focused ? '#000' : '#9c9c9c'}
                />
                <Text
                  style={{color: focused ? '#000' : '#9c9c9c', fontSize: 9}}>
                  Todo List
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Activity"
          component={Activity}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <FontAwesome5
                  name={'clock'}
                  size={21}
                  color={focused ? '#000' : '#9c9c9c'}
                />
                <Text
                  style={{color: focused ? '#000' : '#9c9c9c', fontSize: 9}}>
                  Activity
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Project"
          component={ProjectManage}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <FontAwesome5
                  name={'comment-dots'}
                  size={21}
                  color={focused ? '#000' : '#9c9c9c'}
                />
                <Text
                  style={{color: focused ? '#000' : '#9c9c9c', fontSize: 9}}>
                  PROJECT
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Bookmark"
          component={Bookmark}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <FontAwesome5
                  name={'star'}
                  size={21}
                  color={focused ? '#000' : '#9c9c9c'}
                />
                <Text
                  style={{color: focused ? '#000' : '#9c9c9c', fontSize: 9}}>
                  Bookmark
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <FontAwesome5
                  name={'user-circle'}
                  size={21}
                  color={focused ? '#000' : '#9c9c9c'}
                />
                <Text
                  style={{color: focused ? '#000' : '#9c9c9c', fontSize: 9}}>
                  Profile
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  drawer_screen: {
    alignItems: 'center',
  },
  drawer_item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon_wrapper: {
    alignItems: 'center',
    width: '20%',
  },
  icon: {},
  drawer_txt: {
    fontSize: 16,
  },
});

export default HomeScreen;