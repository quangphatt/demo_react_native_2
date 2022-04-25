import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {AuthContext} from '../../context/AuthContext';

import HomeScreen from './HomeScreen/HomeScreen';
import Setting from './Setting';
import About from './About';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Drawer = createDrawerNavigator();

class Home extends Component {
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
        drawerContent={props => {
          return (
            <View style={{flex: 1}}>
              <DrawerContentScrollView {...props}>
                <ImageBackground
                  source={require('../../assets/images/menu-bg.jpeg')}
                  style={{padding: 20}}>
                  <AuthContext.Consumer>
                    {context => (
                      <View>
                        <Image
                          source={
                            context.userInfo.avatar === ''
                              ? require('../../assets/images/user.png')
                              : {uri: context.userInfo.avatar}
                          }
                          style={{
                            height: 80,
                            width: 80,
                            borderRadius: 40,
                            marginBottom: 10,
                          }}
                        />
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 20,
                            marginBottom: 5,
                          }}>
                          {context.userInfo.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#fff',
                            marginRight: 5,
                          }}>
                          {context.userInfo.username}
                        </Text>
                      </View>
                    )}
                  </AuthContext.Consumer>
                </ImageBackground>
                <View
                  style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
                  <DrawerItemList {...props} />
                </View>
              </DrawerContentScrollView>
              <View
                style={{
                  padding: 20,
                  borderTopWidth: 1,
                  borderTopColor: '#ccc',
                }}>
                <AuthContext.Consumer>
                  {context => (
                    <TouchableOpacity onPress={context.logOut}>
                      <View style={styles.drawer_item}>
                        <View style={styles.icon_wrapper}>
                          <FontAwesome5
                            name="sign-out-alt"
                            style={styles.icon}
                            size={16}
                            color={'#000'}
                          />
                        </View>
                        <Text style={{...styles.drawer_txt, color: '#000'}}>
                          Log out
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </AuthContext.Consumer>
              </View>
            </View>
          );
        }}>
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
        <Drawer.Screen
          name="Setting"
          component={Setting}
          style={styles.drawer_screen}
          options={{
            drawerLabel: ({color}) => (
              <View style={styles.drawer_item}>
                <View style={styles.icon_wrapper}>
                  <FontAwesome5
                    name="cog"
                    style={styles.icon}
                    size={16}
                    color={color}
                  />
                </View>
                <Text style={{color: color, ...styles.drawer_txt}}>
                  Setting
                </Text>
              </View>
            ),
          }}
        />
        <Drawer.Screen
          name="About"
          component={About}
          style={styles.drawer_screen}
          options={{
            drawerLabel: ({color}) => (
              <View style={styles.drawer_item}>
                <View style={styles.icon_wrapper}>
                  <FontAwesome5
                    name="info"
                    style={styles.icon}
                    size={16}
                    color={color}
                  />
                </View>

                <Text style={{color: color, ...styles.drawer_txt}}>
                  About Us
                </Text>
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

export default Home;