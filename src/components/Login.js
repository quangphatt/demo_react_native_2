import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Global, {withGlobalContext} from '~/provider/GlobalContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import authBusiness from '~/business/AuthBusiness';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      username: '',
      password: '',
    };
  }

  showPass = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  onChangeUsername = newUsername => {
    this.setState({
      username: newUsername,
    });
  };

  onChangePassword = newPass => {
    this.setState({
      password: newPass,
    });
  };

  onLogin = async () => {
    let loginInfo = await authBusiness.login(
      this.state.username,
      this.state.password,
    );
    if (loginInfo.status === 'success') {
      let userInfo = await authBusiness.checkSession();
      if (userInfo.status) {
        this.props.global.setLogin(true);
      } else {
        // If Get Info Fail
      }
    } else {
      // If login fail
    }
  };

  render() {
    return (
      <View style={styles.login_wrapper}>
        <View style={styles.logo_wrapper}>
          <Image
            style={styles.logo}
            source={require('../assets/images/logo.png')}
          />
        </View>

        <View>
          <View style={styles.text_input_wrapper}>
            <TextInput
              style={styles.text_input}
              placeholder="Email"
              placeholderTextColor="#94abb3"
              value={this.state.username}
              onChangeText={this.onChangeUsername}
            />
            <TouchableOpacity style={styles.icon_wrapper}>
              <FontAwesome5 style={styles.icon} name={'user-plus'} />
            </TouchableOpacity>
          </View>

          <View style={styles.text_input_wrapper}>
            <TextInput
              style={styles.text_input}
              placeholder="Password"
              placeholderTextColor="#94abb3"
              secureTextEntry={!this.state.showPassword}
              value={this.state.password}
              onChangeText={this.onChangePassword}
            />
            <TouchableOpacity
              style={styles.icon_wrapper}
              onPress={this.showPass}>
              <FontAwesome5
                style={styles.icon}
                name={this.state.showPassword ? 'eye-slash' : 'eye'}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgot_pass_wrapper}>
            <Text style={{fontSize: 12, color: 'black', right: '12%'}}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center'}}>
          <TouchableOpacity style={styles.btn_signin} onPress={this.onLogin}>
            <Text style={styles.btn_text}>Sign In</Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10,
            }}>
            <Text
              style={{
                position: 'absolute',
                color: '#000',
                backgroundColor: 'white',
                padding: 10,
                zIndex: 1,
                fontSize: 12,
              }}>
              OR
            </Text>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: '#94abb3',
                width: 200,
              }}></View>
          </View>

          <TouchableOpacity style={styles.btn_scan_qr}>
            <Text style={{fontSize: 17, color: '#1C75BC'}}>Scan QR Code</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn_signin_google}>
            <FontAwesome5 style={styles.btn_text} name={'google-plus-g'} />
            <Text style={styles.btn_text}> Sign In With Google</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  login_wrapper: {
    backgroundColor: 'white',
    height: '100%',
  },
  logo_wrapper: {
    alignItems: 'center',
    margin: 30,
  },
  logo: {
    height: 160,
    width: 300,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
  },
  text_input_wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_wrapper: {
    position: 'absolute',
    right: '15%',
  },
  icon: {
    height: 15,
    width: 15,
    color: 'black',
  },
  text_input: {
    width: '76%',
    fontSize: 14,
    color: 'black',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#94abb3',
    marginTop: 7,
    marginBottom: 7,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 45,
  },
  forgot_pass_wrapper: {
    alignItems: 'flex-end',
  },
  btn_text: {
    color: 'white',
    fontSize: 17,
  },
  btn_signin: {
    height: 45,
    width: '76%',
    borderRadius: 5,
    backgroundColor: '#1C75BC',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  btn_scan_qr: {
    height: 45,
    width: '76%',
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: '#1C75BC',
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  btn_signin_google: {
    height: 45,
    width: '76%',
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: '#D04A4A',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
});

export default withGlobalContext(Login);
