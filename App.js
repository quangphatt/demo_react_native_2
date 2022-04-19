import React, {Component} from 'react';
import AppNav from './src/components/AppNav';
import {AuthContext} from './src/context/AuthContext';
// import { LogBox } from 'react-native';

// LogBox.ignoreLogs([
//   "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
// ]);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      logIn: () => {
        this.setState({isLogin: true});
      },
      logOut: () => {
        this.setState({isLogin: false});
      },
    };
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        <AppNav />
      </AuthContext.Provider>
    );
  }
}

export default App;