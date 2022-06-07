import Service from '~/service';
import {loginURL, logoutURL, userInfoURL} from '~/service/configURL';
import axios from 'axios';
import host from '~/service/host';
import {getAllProject, getAllTask} from './ProjectManageBusiness';
import {userInfo} from '~/utils/config';

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
            data: '',
          });
        }
      })
        .then(resolve)
        .catch(reject);
    });
  };

  checkSession = () => {
    return new Promise(async (resolve, reject) => {
      let result = await this.post({}, userInfoURL);
      if (result.status === 'success') {
        this.setUserInfo(result.data)
        resolve({status: true});
      } else {
        resolve({status: false});
      }
    });
  };

  setUserInfo = data => {
    let user = data;
    let currentCompany = user.user_companies.current_company;

    userInfo.uid = user.uid;
    userInfo.name = user.name;
    userInfo.username = user.username;
    userInfo.lang = user.user_context.lang;
    userInfo.tz = user.user_context.tz;
    userInfo.currentCompanyName = currentCompany?.[1] ?? '';
    userInfo.currentCompanyId = currentCompany?.[0] ?? 0;
    userInfo.allowedCompany = user.user_companies.allowed_companies;
  };

  changeLang = (uid, newLang) => {
    return new Promise(async (resolve, reject) => {
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

export default authBusiness;
