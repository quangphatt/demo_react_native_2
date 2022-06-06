import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {withGlobalContext} from '~/provider/GlobalContext';
import DrawerContent from './DrawerContent';
import BottomNavigation from '../BottomNavigation/BottomNavigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Drawer = createDrawerNavigator();

class DrawerNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Drawer.Navigator
        initialRouteName="BottomNavigation"
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: '#aa18ea',
          drawerActiveTintColor: '#fff',
        }}
        drawerContent={props => <DrawerContent {...props} />}>
        <Drawer.Screen
          name="BottomNavigation"
          component={BottomNavigation}
        />
      </Drawer.Navigator>
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

export default withGlobalContext(DrawerNavigation);
