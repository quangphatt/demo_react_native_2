import React, {Component} from 'react';
import Provider from './src/provider/Provider';
import fetch_api from './src/service';

class App extends Component {
  // TODO: Đưa các hàm đăng nhập vào trong file Login
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
      logIn: (username, password) => { // TODO: Không đặt các function vào trong state
        // this.setState({isLogin: true});
        var params = {
          db: 'xboss_uat25052021',
          login: username,
          password: password,
        };
        fetch_api(
          {params: params},
          res => !res.data.error, // TODO: Dùng async await, không callback
          '/web/session/authenticate', // TODO: Đưa các subURL thành 1 file config riêng
        )
          .then(res => {
            this.state.getUserInfo();
            this.state.getProjectStatus();
            this.state.getAllProject();
            this.setState({isLogin: true});
          })
          .catch(() => {
            console.log('Incorrect Username or Password'); // TODO: Lỗi thì hiển thị Modal thông báo lên
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
              allProject: [],
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
      changeCompany: newCompanyId => {
        var params = {
          args: [[this.state.userInfo.uid], {company_id: newCompanyId}],
          model: 'res.users',
          method: 'write',
          kwargs: {},
        };
        fetch_api({params: params}, res => !res.data.error)
          .then(res => {
            this.state.getUserInfo();
          })
          .catch(() => {
            console.log('Error while update company');
          });
      },
      changeLanguage: newLanguage => {
        var params = {
          args: [this.state.userInfo.uid, {lang: newLanguage}],
          model: 'res.users',
          method: 'write',
          kwargs: {},
        };
        fetch_api({params: params}, res => !res.data.error)
          .then(res => {
            this.state.getUserInfo();
          })
          .catch(() => {
            console.log('Error while update language');
          });
      },
      getProjectStatus: () => {
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
            // console.log(arrres)
            this.setState({
              allProject: arrres,
            });
            // console.log(this.state.allProject);
            // return arrres;
          })
          .catch(() => {
            console.log('Error');
            return [];
          });
      },
      getAllProject: () => {
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
        fetch_api(
          {params: params},
          res => !res.data.error,
          '/web/dataset/search_read',
        )
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
            // console.log(this.state.allProject)
          })
          .catch(() => {
            console.log('Error while get all project');
          });
      },
      changeProjectIsfavorite: (project_id, project_status, is_favorite) => {
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
          '/web/dataset/call_kw/project.project/write',
        )
          .then(res => {
            this.state.getProjectStatus();
            this.state.getAllProject();
          })
          .catch(() => {
            console.log('Error while change favorite');
          });
      },
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
