import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
  } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {withGlobalContext} from '~/provider/GlobalContext';
import DrawerContent from './DrawerContent';

import HomeScreen from '~/components/Home/HomeScreen';
import AllProject from '~/components/Home/Project/AllProject';
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
        initialRouteName="My Home"
        screenOptions={{
          headerShown: false,
          drawerActiveBackgroundColor: '#aa18ea',
          drawerActiveTintColor: '#fff',
        }}
        drawerContent={(props)=><DrawerContent {...props} />}>
        <Drawer.Screen
          name="My Home"
          component={HomeScreen}
          style={styles.drawer_screen}
          options={{
            drawerLabel: ({color}) => (
              <View style={styles.drawer_item}>
                <View style={styles.icon_wrapper}>
                  <FontAwesome5
                    name="home"
                    style={styles.icon}
                    size={16}
                    color={color}
                  />
                </View>
                <Text style={{color: color, ...styles.drawer_txt}}>Home</Text>
              </View>
            ),
          }}
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
