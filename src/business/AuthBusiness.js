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

  changeProjectIsFavorite = async (project_id, is_favorite, uid, lang) => {
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

export const getAllProject = async global => {
  let result = await authBusiness.getProjectStatus(global.uid, global.lang);
  if (result.status === 'success') {
    var arrres = result.data.map(item => ({
      status: item.project_status[0],
      status_name: item.project_status[1],
      count: item.project_status_count,
      projects: [],
    }));
    global.setAllProject(arrres);
    let res = await authBusiness.getAllProject(global.uid, global.lang);
    if (res.status === 'success') {
      res.data.records.forEach(itemProject => {
        for (let i = 0; i < arrres.length; i++) {
          if (itemProject.project_status[0] === arrres[i].status) {
            arrres[i].projects.push(itemProject);
          }
        }
      });
      global.setAllProject(arrres);
    }
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

export const onChangeProjectIsFavorite = async (
  global,
  project_id,
  is_favorite,
) => {
  let result = await authBusiness.changeProjectIsFavorite(
    project_id,
    is_favorite,
    global.uid,
    global.lang,
  );
  if (result.status === 'success') {
    await getAllProject(global);
  }
};

export default authBusiness;
