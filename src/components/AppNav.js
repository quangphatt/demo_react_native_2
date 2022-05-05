import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthContext} from '../context/AuthContext';
import Home from '../components/Home/Home';
import Login from '../components/Login';

const Stack=createNativeStackNavigator();

class AppNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    // TODO: Tách Context Provider + Consumer ra 1 file riêng, không để rời rạc như vậy
    return (
        <AuthContext.Consumer> 
        {context =>
          context.isLogin ? ( // TODO: Chỉ dùng 1 NavigationContainer
            <NavigationContainer> 
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}>
                <Stack.Screen name="Home" component={Home} />
              </Stack.Navigator>
            </NavigationContainer>
          ) : (
            <NavigationContainer> 
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                }}>
                <Stack.Screen name="Login" component={Login} />
              </Stack.Navigator>
            </NavigationContainer>
          )
        }
      </AuthContext.Consumer>
    );
  }
}

export default AppNav;
