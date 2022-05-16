import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DropDownPicker from 'react-native-dropdown-picker';
import {withGlobalContext} from '../../../provider/GlobalContext';
import {
  onLogout,
  onChangeCompany,
  onChangeLanguage,
} from '../../../business/AuthBusiness';

const langList = [
  {
    value: 'vi_VN',
    label: 'Tiếng Việt',
    icon: () => (
      <Image
        source={require('../../../assets/images/vie_icon.png')}
        style={styles.dropdown_icon}
      />
    ),
  },
  {
    value: 'en_US',
    label: 'English',
    icon: () => (
      <Image
        source={require('../../../assets/images/eng_icon.png')}
        style={styles.dropdown_icon}
      />
    ),
  },
];

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openCompany: false,
      openLanguage: false,
    };

    this.setOpenCompany = this.setOpenCompany.bind(this);
    this.setOpenLanguage = this.setOpenLanguage.bind(this);
  }

  setOpenCompany(openCompany) {
    this.setState({
      openCompany,
      openLanguage: false,
    });
  }

  setOpenLanguage(openLanguage) {
    this.setState({
      openLanguage,
      openCompany: false,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../../../assets/images/bg_profile.png')}
          style={{width: '100%'}}>
          <View style={styles.header}>
            <View style={styles.header_btn}>
              <TouchableOpacity
                onPress={() => this.props.navigation.openDrawer()}>
                <FontAwesome5 color="#fff" size={20} name={'arrow-left'} />
              </TouchableOpacity>
              <TouchableOpacity>
                <FontAwesome5 color="#fff" size={20} name={'cog'} />
              </TouchableOpacity>
            </View>
            <View style={styles.header_info}>
              <View>
                <Image
                  style={styles.avt}
                  source={
                    {uri: this.props.global.avatar} ||
                    require('../../../assets/images/user.png')
                  }
                />
              </View>
              <View>
                <Text style={styles.name}>{this.props.global.name}</Text>
                <Text style={styles.username}>
                  {this.props.global.username}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.dropdown_wrapper}>
          <DropDownPicker
            items={this.props.global.allowedCompany.map(item => ({
              value: item[0],
              label: item[1],
              icon: () => (
                <Image
                  source={
                    {
                      uri:
                        'https://uat.xboss.com/web/image/res.company/' +
                        item[0] +
                        '/logo/100x100',
                    } || require('../../../assets/images/user.png')
                  }
                  style={styles.dropdown_icon}
                />
              ),
            }))}
            value={this.props.global.currentCompany[0]}
            open={this.state.openCompany}
            setOpen={this.setOpenCompany}
            setValue={newCompany => {
              onChangeCompany(this.props.global, newCompany());
            }}
            style={styles.dropDownPicker}
            dropDownContainerStyle={styles.dropDownPicker_list}
            zIndex={3000}
            zIndexInverse={1000}
            labelStyle={styles.labelStyle}
            arrowIconStyle={styles.arrowIconStyle}
          />
          <DropDownPicker
            items={langList}
            value={
              langList.find(item => item.value === this.props.global.lang).value
            }
            open={this.state.openLanguage}
            setOpen={this.setOpenLanguage}
            setValue={newLang => {
              onChangeLanguage(this.props.global, newLang());
            }}
            style={styles.dropDownPicker}
            dropDownContainerStyle={styles.dropDownPicker_list}
            zIndex={2000}
            zIndexInverse={2000}
            labelStyle={styles.labelStyle}
            arrowIconStyle={styles.arrowIconStyle}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.logout_wrapper}
            onPress={() => onLogout(this.props.global)}>
            <View style={styles.logout_icon_wrapper}>
              <FontAwesome5
                name="power-off"
                size={24}
                color={'#ff0000'}
                style={styles.logout_icon}
              />
            </View>
            <Text style={styles.logout_text}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e3e1dc',
    height: '100%',
  },
  header: {
    padding: 20,
    height: 240,
  },
  header_btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  header_info: {
    flexDirection: 'row',
  },
  avt: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    marginTop: 2,
    marginBottom: 5,
  },
  username: {
    color: '#fff',
    fontSize: 12,
  },
  dropdown_wrapper: {
    marginTop: 20,
  },
  dropdown_icon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  dropDownPicker: {
    borderColor: '#fff',
    borderRadius: 0,
    height: 50,
  },
  dropDownPicker_list: {},
  labelStyle: {
    fontSize: 16,
    marginLeft: 5,
  },
  arrowIconStyle: {
    transform: [{rotate: '270deg'}],
  },
  logout_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  logout_icon_wrapper: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  logout_icon: {},
  logout_text: {
    color: '#ff0000',
    fontSize: 16,
    marginLeft: 15,
  },
});

export default withGlobalContext(Profile);
