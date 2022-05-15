import React, {Component} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
} from 'react-native';
import {withGlobalContext} from '../../provider/GlobalContext';
import authBusiness from '../../business/AuthBusiness';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const onLogout = async (global) => {
  let result = await authBusiness.onLogout();
  if (result.status === 'success') {
    global.setLogin(false);
    global.clearUserInfo();
  }
};

const DrawerContent = props => (
  <View style={{flex: 1}}>
    <DrawerContentScrollView {...props}>
      <ImageBackground
        source={require('../../assets/images/menu-bg.jpeg')}
        style={{padding: 20}}>
        <View>
          <Image
            source={
              props.global.avatar === ''
                ? require('../../assets/images/user.png')
                : {uri: props.global.avatar}
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
            {props.global.name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#fff',
              marginRight: 5,
            }}>
            {props.global.username}
          </Text>
        </View>
      </ImageBackground>
      <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
    <View
      style={{
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
      }}>
      <TouchableOpacity onPress={()=>{onLogout(props.global)}}>
        <View style={styles.drawer_item}>
          <View style={styles.icon_wrapper}>
            <FontAwesome5
              name="sign-out-alt"
              style={styles.icon}
              size={16}
              color={'#000'}
            />
          </View>
          <Text style={{...styles.drawer_txt, color: '#000'}}>Log out</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

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

export default withGlobalContext(DrawerContent);
