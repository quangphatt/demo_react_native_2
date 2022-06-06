import Service from '~/service';
import {getAllProjectURL, getTaskURL} from '~/service/configURL';
import axios from 'axios';
import host from '~/service/host';
import {userInfo} from '~/utils/config';

class ProjectManageBusiness extends Service {
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

  getProjects=()=>{
    
  }

  changeProjectIsFavorite = (project_id, is_favorite, uid, lang) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [[project_id], {is_favorite: is_favorite}],
        kwargs: {
          context: {
            lang: lang,
            tz: 'Asia/Ho_Chi_Minh',
            uid: uid,
          },
        },
        method: 'write',
        model: 'project.project',
      };
      this.post(params).then(resolve).catch(reject);
    });
  };

  getTasks=()=>{
    
  }

  getTaskStage = (uid, lang, project_id) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [],
        kwargs: {
          context: {
            lang: lang,
            tz: 'Asia/Ho_Chi_Minh',
            uid: uid,
          },
          domain: [['project_id', '=', project_id]],
          fields: ['stage_id', 'name'],
          groupby: ['stage_id'],
          orderby: '',
        },
        method: 'read_group',
        model: 'project.task',
      };
      this.post(params).then(resolve).catch(reject);
    });
  };

  getTaskByStage = (uid, lang, project_id, stage_id) => {
    return new Promise((resolve, reject) => {
      let params = {
        context: {
          lang: lang,
          tz: 'Asia/Ho_Chi_Minh',
          uid: uid,
        },
        domain: [
          '&',
          ['stage_id', '=', stage_id],
          ['project_id', '=', project_id],
        ],
        fields: [
          'color',
          'priority',
          'name',
          'date_deadline',
          'creator_id',
          'user_id',
          'kanban_state_label',
        ],
        limit: 10,
        model: 'project.task',
        sort: '',
      };
      this.post(params, getTaskURL).then(resolve).catch(reject);
    });
  };

  getAllTaskStage = (uid, lang) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [],
        kwargs: {
          context: {
            lang: lang,
            tz: 'Asia/Ho_Chi_Minh',
            uid: uid,
          },
          domain: [
            '|',
            ['user_id', '=', uid],
            ['contributor_ids.id', '=', uid],
          ],
          fields: ['stage_id', 'name'],
          groupby: ['stage_id'],
          orderby: '',
        },
        method: 'read_group',
        model: 'project.task',
      };
      this.post(params).then(resolve).catch(reject);
    });
  };

  getAllTaskByStage = (uid, lang, stage_id) => {
    return new Promise((resolve, reject) => {
      let params = {
        context: {
          lang: lang,
          tz: 'Asia/Ho_Chi_Minh',
          uid: uid,
        },
        domain: [
          '&',
          ['stage_id', '=', stage_id],
          '|',
          ['user_id', '=', uid],
          ['contributor_ids.id', '=', uid],
        ],
        fields: [
          'color',
          'priority',
          'name',
          'date_deadline',
          'creator_id',
          'user_id',
          'kanban_state_label',
        ],
        limit: 10,
        model: 'project.task',
      };
      this.post(params, getTaskURL).then(resolve).catch(reject);
    });
  };

  changeTaskPriority = (uid, lang, task_id, newPriority) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [
          [task_id],
          {
            priority: newPriority.toString(),
          },
        ],
        kwargs: {
          context: {
            lang: lang,
            tz: 'Asia/Ho_Chi_Minh',
            uid: uid,
          },
        },
        method: 'write',
        model: 'project.task',
      };
      this.post(params).then(resolve).catch(reject);
    });
  };
}

const projectManageBusiness = new ProjectManageBusiness();

export default projectManageBusiness;
