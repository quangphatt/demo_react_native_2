import React from 'react';
import {avatarURL} from '../service/configURL';
import ComponentModal from '~/modal/ComponentModal';

const GlobalContext = React.createContext({});

export class GlobalContextProvider extends React.Component {
  static componentInstance;

  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
    this.componentModalRef = React.createRef();
    GlobalContextProvider.componentInstance = this;
  }

  static _showAlert = () => {
    GlobalContextProvider.componentInstance.showAlert();
  };

  static _hideAlert = () => {
    GlobalContextProvider.componentInstance.hideAlert();
  };

  static _showModal = params => {
    GlobalContextProvider.componentInstance.showModal(params);
  };

  static _hideModal = params => {
    GlobalContextProvider.componentInstance.hideModal(params);
  };

  showAlert = () => {
    // Thực hiện mở Modal Alert tại đây
  };

  hideAlert = () => {
    // Thực hiện đóng Modal Alert tại đây
  };

  showModal = ({content}) => {
    this.componentModalRef.current.open({content});
  };

  hideModal = ({callback}) => {
    this.componentModalRef.current.close({callback});
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
        }}>
        {this.props.children}
        <ComponentModal ref={this.componentModalRef} />
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
