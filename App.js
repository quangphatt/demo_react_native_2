import React, {Component} from 'react';
import Provider from './src/provider/Provider';

class App extends Component {
  // TODO: Đưa các hàm đăng nhập vào trong file Login
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    // TODO: Tách Context Provider + Consumer ra 1 file riêng và quản lý state ở đó, không để rời rạc như vậy
    return (
      <Provider />
    );
  }
}

export default App;
