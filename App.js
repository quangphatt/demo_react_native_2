import React, {Component} from 'react';
import AppNav from './src/components/AppNav';
import {AuthContext} from './src/context/AuthContext';
import fetch_api from './src/service';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      userInfo: {
        uid: 0,
        name: '',
        username: '',
        avatar: '',
        lang: '',
        currentCompany: '',
        allowedCompany: [],
      },
      logIn: (username, password) => {
        // this.setState({isLogin: true});
        var params = {
          db: 'xboss_uat25052021',
          login: username,
          password: password,
        };
        fetch_api(
          {params: params},
          res => !res.data.error,
          '/web/session/authenticate',
        )
          .then(res => {
            this.state.getUserInfo();
            this.setState({isLogin: true});
          })
          .catch(() => {
            console.log('Incorrect Username or Password');
          });
      },
      logOut: () => {
        // this.setState({isLogin: false});
        fetch_api({params: {}}, res => !res.data.error, '/web/session/destroy')
          .then(res => {
            this.setState({
              isLogin: false,
              userInfo: {
                uid: 0,
                name: '',
                username: '',
                avatar: '',
                lang: '',
                currentCompany: '',
                allowedCompany: [],
              },
            });
          })
          .catch(() => {
            console.log('Log out Error!');
          });
      },
      getUserInfo: () => {
        fetch_api(
          {params: {}},
          res => true,
          '/web/session/get_session_info',
        ).then(res => {
          this.setState({
            userInfo: {
              uid: res.data.result.uid,
              name: res.data.result.name,
              username: res.data.result.username,
              avatar:
                'https://uat.xboss.com/web/image?model=res.users&field=image&id=' +
                res.data.result.uid,
              lang: res.data.result.user_context.lang,
              currentCompany: res.data.result.user_companies.current_company,
              allowedCompany: res.data.result.user_companies.allowed_companies,
            },
          });
          // console.log(this.state.userInfo.lang);
          // console.log(this.state.userInfo.currentCompany);
          // console.log(this.state.userInfo.allowedCompany);
        });
      },
      changeCompany:(newCompanyId)=>{
        var params={
          args:[[this.state.userInfo.uid],{"company_id":newCompanyId}],
          model:"res.users",
          method:"write",
          kwargs:{}
        }
        fetch_api(
          {params: params},
          res => !res.data.error,
        )
          .then(res => {
            this.state.getUserInfo();
          })
          .catch(() => {
            console.log('Error while update company');
          });
      },
      changeLanguage:(newLanguage)=>{
        var params={
          args:[this.state.userInfo.uid,{lang:newLanguage}],
          model:"res.users",
          method:"write",
          kwargs:{}
        }
        fetch_api(
          {params: params},
          res => !res.data.error,
        )
          .then(res => {
            this.state.getUserInfo();
          })
          .catch(() => {
            console.log('Error while update language');
          });
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
