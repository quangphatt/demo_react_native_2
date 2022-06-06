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

class DrawerContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  Menu = [
    {
      id: 1,
      title: 'Project',
      onPress: () => {
        this.props.navigation.navigate('MenuNavigation', {
          screen: 'ProjectNavigation',
          params: {
            screen: 'Project',
          },
        });
      },
    },
    {
      id: 2,
      title: 'All Task',
      onPress: () => {
        this.props.navigation.navigate('MenuNavigation', {
          screen: 'TaskNavigation',
          params: {
            screen: 'Task',
          },
        });
      },
    },
  ];

  render() {
    return (
      <View style={{flex: 1}}>
        <DrawerContentScrollView {...this.props}>
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
            {this.Menu.map(item => (
              <View style={styles.drawer_item}>
                <TouchableOpacity onPress={item.onPress}>
                  <Text style={styles.drawer_txt}>{item.title}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </DrawerContentScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawer_screen: {
    alignItems: 'center',
  },
  drawer_item: {
    height: 30,
    padding: 5,
    margin: 10,
    marginLeft: 20,
  },
  drawer_txt: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default withGlobalContext(DrawerContent);
