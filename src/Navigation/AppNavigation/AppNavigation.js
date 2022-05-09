import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthContext} from '../../context/AuthContext';
import DrawerNavigation from '../DrawerNavigation/DrawerNavigation';
import Login from '../../components/Login';

class AppNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NavigationContainer>
        <AuthContext.Consumer>
          {context => {
            return (
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}>
                {context.isLogin ? ( // TODO: Chỉ dùng 1 NavigationContainer
                  <Stack.Screen name="Home" component={DrawerNavigation} />
                ) : (
                  <Stack.Screen name="Login" component={Login} />
                )}
              </Stack.Navigator>
            );
          }}
        </AuthContext.Consumer>
      </NavigationContainer>
    );
  }
}

export default AppNavigation;
