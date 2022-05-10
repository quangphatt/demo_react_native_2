import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import SuccessModal from '../modal/SuccessModal';
import fetch_api from '../service';
import { loginURL } from '../service/configURL';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').witdh;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      username: 'longlam@hhdgroup.com',
      password: '1!@#Qqwe',
      showSuccessLoginModal: false,
      showFailLoginModal: false,
    };
  }

  showPass = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
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
              onChangeText={newUsername => {
                this.setState({
                  username: newUsername,
                });
              }}
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
              onChangeText={newPass => {
                this.setState({
                  password: newPass,
                });
              }}
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
          <AuthContext.Consumer>
            {context => {
              return (
                <TouchableOpacity
                  style={styles.btn_signin}
                  onPress={() => {
                    var params = {
                      db: 'xboss_uat25052021',
                      login: this.state.username,
                      password: this.state.password,
                    };
                    fetch_api(
                      {params: params},
                      res => !res.data.error,
                      loginURL,
                    )
                      .then((res) => {
                        this.setState({showSuccessLoginModal:true})
                        console.log('Login successfully');
                        context.getUserInfo();
                        context.getProjectStatus();
                        context.getAllProject();
                        this.setState({showSuccessLoginModal:true})
                        context.login();
                      })
                      .catch(() => {
                        console.log('Incorrect Username or Password'); // TODO: Lỗi thì hiển thị Modal thông báo lên
                      });
                  }}>
                  <Text style={styles.btn_text}>Sign In</Text>
                </TouchableOpacity>
              );
            }}
          </AuthContext.Consumer>

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
        <AuthContext.Consumer>
          {context => (
            <SuccessModal
              isVisible={this.state.showSuccessLoginModal}
              onBackdropPress={() =>
                this.setState({showSuccessLoginModal: false})
              }
              pressButton={() => this.setState({showSuccessLoginModal: false})}
            />
          )}
        </AuthContext.Consumer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  login_wrapper: {
    backgroundColor: 'white',
    height: screenHeight,
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

export default Login;
