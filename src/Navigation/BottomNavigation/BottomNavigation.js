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

import TodoList from '~/components/Home/HomeScreen/TodoList';
import Activity from '~/components/Home/HomeScreen/Activity';
import ProjectNavigation from '../ProjectNavigation/ProjectNavigation';
import Bookmark from '~/components/Home/HomeScreen/Bookmark';
import Profile from '~/components/Home/HomeScreen/Profile';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

class BottomNavigation extends Component {
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
                  color={focused ? '#35239e' : '#595959'}
                />
                <Text
                  style={{
                    color: focused ? '#35239e' : '#595959',
                    fontSize: 10,
                  }}>
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
                  color={focused ? '#35239e' : '#595959'}
                />
                <Text
                  style={{
                    color: focused ? '#35239e' : '#595959',
                    fontSize: 10,
                  }}>
                  Activity
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Project"
          component={ProjectNavigation}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.center_icon_wrapper}>
                <Image
                  style={styles.center_icon}
                  source={require('../../assets/images/logo_xboss.png')}
                />
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
                  color={focused ? '#35239e' : '#595959'}
                />
                <Text
                  style={{
                    color: focused ? '#35239e' : '#595959',
                    fontSize: 10,
                  }}>
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
                  color={focused ? '#35239e' : '#595959'}
                />
                <Text
                  style={{
                    color: focused ? '#35239e' : '#595959',
                    fontSize: 10,
                  }}>
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
  center_icon_wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#462cd4',
    height: 60,
    width: 60,
    borderRadius: 30,
    position: 'absolute',
    bottom: 15,
  },
  center_icon: {
    width: 30,
    height: 30,
  },
});

export default BottomNavigation;
