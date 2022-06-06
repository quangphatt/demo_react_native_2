import React from 'react';
import {avatarURL} from '../service/configURL';

const GlobalContext = React.createContext({});

export class GlobalContextProvider extends React.Component {
  static componentInstance;

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
    GlobalContextProvider.componentInstance = this;
  }

  static _showAlert = () => {
    GlobalContextProvider.componentInstance.showAlert();
  };

  static _hideAlert = () => {
    GlobalContextProvider.componentInstance.hideAlert();
  };

  showAlert = () => {
    // Thực hiện mở Modal Alert tại đây
  };

  hideAlert = () => {
    // Thực hiện đóng Modal Alert tại đây
  };

  setLogin = value => {
    this.setState({
      isLogin: value,
    });
  };

  render() {
    return (
      <GlobalContext.Provider
        value={{
          ...this.state,
          setLogin: this.setLogin,
          showAlert: this.showAlert,
        }}>
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}

export default GlobalContextProvider;

export const withGlobalContext = ChildComponent =>
  React.forwardRef((props, ref) => (
    <GlobalContext.Consumer>
      {context => <ChildComponent {...props} global={context} ref={ref} />}
    </GlobalContext.Consumer>
  ));
