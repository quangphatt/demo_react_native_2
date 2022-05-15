import Service from '../service';
import {
  loginURL,
  logoutURL,
  userInfoURL,
  getAllProjectURL,
} from '../service/configURL';
import axios from 'axios';
import host from '../service/host';

class AuthBusiness extends Service {
  onLogin = (username, password) => {
    return new Promise((resolve, reject) => {
      let params = {
        db: 'xboss_uat25052021',
        login: username,
        password: password,
      };
      this.post(params, loginURL).then(resolve).catch(reject);
    });
  };

  onLogout = () => {
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

  getUserInfo = () => {
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

  getProjectStatus = (uid, lang) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [],
        kwargs: {
          context: {
            lang: lang,
            tz: 'Asia/Ho_Chi_Minh',
            uid: uid,
          },
          domain: [],
          fields: ['name', 'project_status'],
          groupby: ['project_status'],
          orderby: '',
        },
        method: 'read_group',
        model: 'project.project',
      };
      this.post(params).then(resolve).catch(reject);
    });
  };

  getAllProject = (uid, lang) => {
    return new Promise((resolve, reject) => {
      let params = {
        context: {
          lang: lang,
          tz: 'Asia/Ho_Chi_Minh',
          uid: uid,
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
      this.post(params, getAllProjectURL).then(resolve).catch(reject);
    });
  };

  changeProjectIsFavorite = async () => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [[project_id], {is_favorite: is_favorite}],
        kwargs: {
          context: {
            lang: lang,
            tz: 'Asia/Ho_Chi_Minh',
            uid: uid,
            params: {
              model: 'project.project',
            },
          },
        },
        method: 'write',
        model: 'project.project',
      };
      this.post(params).then(resolve).catch(reject);
    });
  };
}

const authBusiness = new AuthBusiness();

export default authBusiness;
