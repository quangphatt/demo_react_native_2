import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DropDownPicker from 'react-native-dropdown-picker';
import {withGlobalContext} from '~/provider/GlobalContext';
import authBusiness from '~/business/AuthBusiness';
import {userInfo} from '~/utils/config';
import {avatarURL} from '~/service/configURL';

const langList = [
  {
    value: 'vi_VN',
    label: 'Tiếng Việt',
    icon: () => (
      <Image
        source={require('~/assets/images/vie_icon.png')}
        style={styles.dropdown_icon}
      />
    ),
  },
  {
    value: 'en_US',
    label: 'English',
    icon: () => (
      <Image
        source={require('~/assets/images/eng_icon.png')}
        style={styles.dropdown_icon}
      />
    ),
  },
];

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCompanyId: userInfo.currentCompanyId,
      openCompany: false,
      currentLanguage: userInfo.lang,
      openLanguage: false,
    };

    this.setOpenCompany = this.setOpenCompany.bind(this);
    this.setOpenLanguage = this.setOpenLanguage.bind(this);
    this.updateLanguageValue = this.updateLanguageValue.bind(this);

    this.itemCompany = [];
    this.languageValue = '';
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

  openDrawerNavigation = () => {
    this.props.navigation.openDrawer();
  };

  onChangeLanguage = async newLang => {
    let result = await authBusiness.changeLang(userInfo.uid, newLang());
    if (result.status === 'success') {
      let getInfo = await authBusiness.checkSession();
      if (getInfo.status) {
        // If Get Info Success
        this.setState({
          currentLanguage: userInfo.lang,
        });
        this.updateLanguageValue();
      } else {
        // If Get Info Fail
      }
    }
  };

  onChangeCompany = async newCompany => {
    let result = await authBusiness.changeCompany(userInfo.uid, newCompany());
    if (result.status === 'success') {
      let getInfo = await authBusiness.checkSession();
      if (getInfo.status) {
        // If Get Info Success
        this.setState({
          currentCompanyId: userInfo.currentCompanyId,
        });
      } else {
        // If Get Info Fail
      }
    }
  };

  componentDidMount = () => {
    this.itemCompany = userInfo.allowedCompany.map(item => ({
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
            } || require('~/assets/images/user.png')
          }
          style={styles.dropdown_icon}
        />
      ),
    }));

    this.updateLanguageValue();
  };

  updateLanguageValue = () => {
    this.languageValue = langList.find(
      item => item.value === userInfo.lang,
    ).value;
  };

  onLogout = async () => {
    let result = await authBusiness.logout();
    if (result.status === 'success') {
      this.props.global.setLogin(false);

      //clear userInfo
      userInfo.uid = 0;
      userInfo.name = '';
      userInfo.username = '';
      userInfo.lang = '';
      userInfo.tz = '';
      userInfo.currentCompanyName = '';
      userInfo.currentCompanyId = 0;
      userInfo.allowedCompany = [];
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('~/assets/images/bg_profile.png')}
          style={{width: '100%'}}>
          <View style={styles.header}>
            <View style={styles.header_btn}>
              <TouchableOpacity onPress={this.openDrawerNavigation}>
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
                    {uri: avatarURL + userInfo.uid} ||
                    require('~/assets/images/user.png')
                  }
                />
              </View>
              <View>
                <Text style={styles.name}>{userInfo.name}</Text>
                <Text style={styles.username}>{userInfo.username}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.dropdown_wrapper}>
          <DropDownPicker
            items={this.itemCompany}
            value={this.state.currentCompanyId}
            open={this.state.openCompany}
            setOpen={this.setOpenCompany}
            setValue={this.onChangeCompany}
            style={styles.dropDownPicker}
            dropDownContainerStyle={styles.dropDownPicker_list}
            zIndex={3000}
            zIndexInverse={1000}
            labelStyle={styles.labelStyle}
            arrowIconStyle={styles.arrowIconStyle}
          />
          <DropDownPicker
            items={langList}
            value={this.languageValue}
            open={this.state.openLanguage}
            setOpen={this.setOpenLanguage}
            setValue={this.onChangeLanguage}
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
            onPress={this.onLogout}>
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
    height: 180,
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
  dropdown_wrapper: {},
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
    color:'#000',
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
