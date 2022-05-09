import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthContext} from '../context/AuthContext';
import Home from '../components/Home/Home';
import Login from '../components/Login';

const Stack = createNativeStackNavigator();

const AuthConsumer = () => (
  <AuthContext.Consumer>
    {context =>
      context.isLogin ? ( // TODO: Chỉ dùng 1 NavigationContainer
        <Stack.Screen name="Home" component={Home} />
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )
    }
  </AuthContext.Consumer>
);

class AppNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // TODO: Tách Context Provider + Consumer ra 1 file riêng, không để rời rạc như vậy
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
                  <Stack.Screen name="Home" component={Home} />
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

export default AppNav;
