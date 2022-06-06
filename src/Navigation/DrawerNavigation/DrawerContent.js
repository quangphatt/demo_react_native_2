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
import {withGlobalContext} from '~/provider/GlobalContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {userInfo} from '~/utils/config';
import {avatarURL} from '~/service/configURL';

const DrawerContent = props => (
  <View style={{flex: 1}}>
    <DrawerContentScrollView {...props}>
      <ImageBackground
        source={require('~/assets/images/menu-bg.jpeg')}
        style={{padding: 20}}>
        <View>
          <Image
            source={
              {uri: avatarURL + userInfo.uid} ||
              require('~/assets/images/user.png')
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
            {userInfo.name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#fff',
              marginRight: 5,
            }}>
            {userInfo.username}
          </Text>
        </View>
      </ImageBackground>
      <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
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
