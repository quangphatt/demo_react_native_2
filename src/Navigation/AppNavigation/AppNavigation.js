import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNavigation from '../DrawerNavigation/DrawerNavigation';
import BottomNavigation from '../BottomNavigation/BottomNavigation';
import Login from '~/components/Login';
import {withGlobalContext} from '~/provider/GlobalContext';

const Stack = createNativeStackNavigator();

class AppNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {this.props.global.isLogin ? (
            <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
          ) : (
            <Stack.Screen name="Login" component={Login} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default withGlobalContext(AppNavigation);
