import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import AppNavigation from '../Navigation/AppNavigation/AppNavigation';
import {
  loginURL,
  logoutURL,
  userInfoURL,
  getAllProjectURL,
  avatarURL,
} from '../service/configURL';
import fetch_api from '../service/index';

class AuthProvider extends Component {
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
      allProject: [],
      showSuccessLoginModal: false,
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
    this.changeCompany = this.changeCompany.bind(this);
    this.changeLanguage = this.changeLanguage.bind(this);
    this.getProjectStatus = this.getProjectStatus.bind(this);
    this.getAllProject = this.getAllProject.bind(this);
    this.changeProjectIsfavorite = this.changeProjectIsfavorite.bind(this);
  }

  login = () => {
    this.setState({isLogin: true})
  };

  logout = () => {
    fetch_api({params: {}}, res => !res.data.error, logoutURL)
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
          allProject: [],
        });
      })
      .catch(() => {
        console.log('Log out Error!');
      });
  };

  getUserInfo = () => {
    fetch_api({params: {}}, res => true, userInfoURL).then(res => {
      this.setState({
        userInfo: {
          uid: res.data.result.uid,
          name: res.data.result.name,
          username: res.data.result.username,
          avatar: avatarURL + res.data.result.uid,
          lang: res.data.result.user_context.lang,
          currentCompany: res.data.result.user_companies.current_company,
          allowedCompany: res.data.result.user_companies.allowed_companies,
        },
      });
      // console.log(this.state.userInfo.lang);
      // console.log(this.state.userInfo.currentCompany);
      // console.log(this.state.userInfo.allowedCompany);
    });
  };
  changeCompany = newCompanyId => {
    var params = {
      args: [[this.state.userInfo.uid], {company_id: newCompanyId}],
      model: 'res.users',
      method: 'write',
      kwargs: {},
    };
    fetch_api({params: params}, res => !res.data.error)
      .then(res => {
        this.getUserInfo();
      })
      .catch(() => {
        console.log('Error while update company');
      });
  };
  changeLanguage = newLanguage => {
    var params = {
      args: [this.state.userInfo.uid, {lang: newLanguage}],
      model: 'res.users',
      method: 'write',
      kwargs: {},
    };
    fetch_api({params: params}, res => !res.data.error)
      .then(res => {
        this.getUserInfo();
      })
      .catch(() => {
        console.log('Error while update language');
      });
  };
  getProjectStatus = () => {
    var params = {
      args: [],
      kwargs: {
        context: {
          lang: this.state.userInfo.lang,
          tz: 'Asia/Ho_Chi_Minh',
          uid: this.state.userInfo.uid,
        },
        domain: [],
        fields: ['name', 'project_status'],
        groupby: ['project_status'],
        orderby: '',
      },
      method: 'read_group',
      model: 'project.project',
    };
    fetch_api({params: params}, res => !res.data.error)
      .then(res => {
        var arrres = res.data.result.map(item => ({
          status: item.project_status[0],
          status_name: item.project_status[1],
          count: item.project_status_count,
          projects: [],
        }));
        this.setState({
          allProject: arrres,
        });
      })
      .catch(() => {
        console.log('Error');
        return [];
      });
  };
  getAllProject = () => {
    var params = {
      context: {
        lang: this.state.userInfo.lang,
        tz: 'Asia/Ho_Chi_Minh',
        uid: this.state.userInfo.uid,
        params: {
          model: 'project.project',
        },
      },
      domain: [],
      fields: [
        'id',
        'name',
        'color',
        'project_status',
        'is_favorite',
        'user_id',
        'task_count',
      ],
      sort: '',
      limit: 80,
      model: 'project.project',
    };
    fetch_api({params: params}, res => !res.data.error, getAllProjectURL)
      .then(res => {
        var allProject = this.state.allProject;
        res.data.result.records.forEach(itemProject => {
          for (let i = 0; i < allProject.length; i++) {
            if (itemProject.project_status[0] === allProject[i].status) {
              allProject[i].projects.push(itemProject);
            }
          }
        });
        this.setState({
          allProject: allProject,
        });
        // console.log(this.state.allProject);
      })
      .catch(() => {
        console.log('Error while get all project');
      });
  };
  changeProjectIsfavorite = (project_id, project_status, is_favorite) => {
    var params = {
      args: [[project_id], {is_favorite: is_favorite}],
      kwargs: {
        context: {
          lang: this.state.userInfo.lang,
          tz: 'Asia/Ho_Chi_Minh',
          uid: this.state.userInfo.uid,
          params: {
            model: 'project.project',
          },
        },
      },
      method: 'write',
      model: 'project.project',
    };
    fetch_api(
      {params: params},
      res => !res.data.error,
      changeProjectIsfavoriteURL,
    )
      .then(res => {
        this.getProjectStatus();
        this.getAllProject();
      })
      .catch(() => {
        console.log('Error while change favorite');
      });
  };

  render() {
    const value = {
      ...this.state,
      login: this.login,
      showSuccessLoginModal: this.showSuccessLoginModal,
      logout: this.logout,
      getUserInfo: this.getUserInfo,
      changeCompany: this.changeCompany,
      changeLanguage: this.changeLanguage,
      getProjectStatus: this.getProjectStatus,
      getAllProject: this.getAllProject,
      changeProjectIsfavorite: this.changeProjectIsfavorite,
    };

    return (
      <AuthContext.Provider value={value}>
        <AppNavigation />
      </AuthContext.Provider>
    );
  }
}

export default AuthProvider;
