import Service from '~/service';
import {getAllProjectURL, getTaskURL} from '~/service/configURL';
import axios from 'axios';
import host from '~/service/host';
import {userInfo} from '~/utils/config';

class ProjectManageBusiness extends Service {
  getProjectStatus = (uid, lang, tz) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [],
        kwargs: {
          context: {
            lang: lang,
            tz: tz,
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

  getAllProject = (uid, lang, tz) => {
    return new Promise((resolve, reject) => {
      let params = {
        context: {
          lang: lang,
          tz: tz,
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

  changeProjectIsFavorite = (project_id, is_favorite, uid, lang, tz) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [[project_id], {is_favorite: is_favorite}],
        kwargs: {
          context: {
            lang: lang,
            tz: tz,
            uid: uid,
          },
        },
        method: 'write',
        model: 'project.project',
      };
      this.post(params).then(resolve).catch(reject);
    });
  };

  // Using domain
  getStage = (uid, lang, tz, domain) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [],
        kwargs: {
          context: {
            lang: lang,
            tz: tz,
            uid: uid,
          },
          domain: domain,
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

  getTasks = (uid, lang, tz, stage_id, domain) => {
    return new Promise((resolve, reject) => {
      let params = {
        context: {
          lang: lang,
          tz: tz,
          uid: uid,
        },
        domain: ['&', ['stage_id', '=', stage_id], ...domain],
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

  changeTaskPriority = (uid, lang, tz, task_id, newPriority) => {
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
            tz: tz,
            uid: uid,
          },
        },
        method: 'write',
        model: 'project.task',
      };
      this.post(params).then(resolve).catch(reject);
    });
  };

  getTaskInfomation = (uid, lang, tz, task_id) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [
          [task_id],
          [
            'task_number',
            'stage_id',
            'name',
            'project_id',
            'project_phase_id',
            'team_id',
            'user_id',
            'assigned_ids',
            'percent_done',
            'planned_date_begin',
            'planned_date_end',
            'effort',
            'supporter_id',
            'creator_id',
            'need_install',
            'milestone_id',
            'date_deadline',
            'task_level_id',
            'priority',
            'tag_ids',
            'scheduling_mode',
            'constraint_type',
            'constraint_date',
            'effort_driven',
            'manually_scheduled',
            'option',
            'product_backlog_id',
            'sprint_id',
            'release_id',
            'type_id',
            'date_finished',
          ],
        ],
        kwargs: {
          context: {
            lang: lang,
            tz: tz,
            uid: uid,
          },
        },
        method: 'read',
        model: 'project.task',
      };
      this.post(params).then(resolve).catch(reject);
    });
  };
}

const projectManageBusiness = new ProjectManageBusiness();

export default projectManageBusiness;
