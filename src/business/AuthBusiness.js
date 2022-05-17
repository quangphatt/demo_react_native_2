import Service from '../service';
import {loginURL, logoutURL, userInfoURL} from '../service/configURL';
import axios from 'axios';
import host from '../service/host';
import {getAllProject} from './ProjectManageBusiness';

class AuthBusiness extends Service {
  login = (username, password) => {
    return new Promise((resolve, reject) => {
      let params = {
        db: 'xboss_uat25052021',
        login: username,
        password: password,
      };
      this.post(params, loginURL).then(resolve).catch(reject);
    });
  };

  logout = () => {
    return new Promise((resolve, reject) => {
      new Promise(async (res, rej) => {
        let result = await axios.post(host + logoutURL, {params: {}});
        if (result) {
          res({
            status: 'success',
            data: '',
          });
        } else {
          res({
            status: 'error',
            data: '', // Tu bat ket qua
          });
        }
      })
        .then(resolve)
        .catch(reject);
    });
  };

  getUserInfomation = () => {
    return new Promise((resolve, reject) => {
      this.post({}, userInfoURL).then(resolve).catch(reject);
    });
  };

  changeLang = (uid, newLang) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [uid, {lang: newLang}],
        model: 'res.users',
        method: 'write',
        kwargs: {},
      };
      this.post(params).then(resolve).catch(reject);
    });
  };

  changeCompany = (uid, newCompany) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [[uid], {company_id: newCompany}],
        model: 'res.users',
        method: 'write',
        kwargs: {},
      };
      this.post(params).then(resolve).catch(reject);
    });
  };
}

const authBusiness = new AuthBusiness();

export const onLogin = async (global, username, password) => {
  let result = await authBusiness.login(username, password);
  if (result.status === 'success') {
    await getUserInfo(global);
    await getAllProject(global);
    global.setLogin(true);
  }
};

export const onLogout = async global => {
  let result = await authBusiness.logout();
  if (result.status === 'success') {
    global.setLogin(false);
    global.clearUserInfo();
  }
};

export const getUserInfo = async global => {
  let result = await authBusiness.getUserInfomation();
  if (result.status === 'success') {
    global.setUserInfo(result.data);
  }
};

export const onChangeCompany = async (global, newCompany) => {
  let result = await authBusiness.changeCompany(global.uid, newCompany);
  if (result.status === 'success') {
    await getUserInfo(global);
  }
};

export const onChangeLanguage = async (global, newLanguage) => {
  let result = await authBusiness.changeLang(global.uid, newLanguage);
  if (result.status === 'success') {
    await getUserInfo(global);
  }
};

export default authBusiness;
