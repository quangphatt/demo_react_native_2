import React from 'react';
import {avatarURL} from '../service/configURL';

const GlobalContext = React.createContext({});

export class GlobalContextProvider extends React.Component {
  static componentInstance;

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      uid: 0,
      name: '',
      username: '',
      avatar: '',
      lang: '',
      currentCompany: '',
      allowedCompany: [],
      allProject: [],
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

  setUid = value => {
    this.setState({
      uid: value,
    });
  };

  setUserInfo = value => {
    this.setState({
      uid: value.uid,
      name: value.name,
      username: value.username,
      avatar: avatarURL + value.uid,
      lang: value.user_context.lang,
      currentCompany: value.user_companies.current_company,
      allowedCompany: value.user_companies.allowed_companies,
    });
  };

  clearUserInfo = () => {
    this.setState({
      uid: 0,
      name: '',
      username: '',
      avatar: '',
      lang: '',
      currentCompany: '',
      allowedCompany: [],
      allProject: [],
    });
  };

  setCompany = value => {
    this.setState({
      currentCompany: value,
    });
  };

  setLanguage = value => {
    this.setState({
      lang: value,
    });
  };

  setAllProject = value => {
    this.setState({
      allProject: value,
    });
  };

  render() {
    return (
      <GlobalContext.Provider
        value={{
          ...this.state,
          setLogin: this.setLogin,
          setUserInfo: this.setUserInfo,
          setAllProject: this.setAllProject,
          setCompany: this.setCompany,
          setLanguage: this.setLanguage,
          clearUserInfo: this.clearUserInfo,
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
