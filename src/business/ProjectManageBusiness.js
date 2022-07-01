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

  getAssignedResource = (uid, lang, tz, assigned_ids) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [assigned_ids, ['display_name']],
        kwargs: {
          context: {
            lang: lang,
            tz: tz,
            uid: uid,
          },
        },
        method: 'read',
        model: 'res.users',
      };
      this.post(params).then(resolve).catch(reject);
    });
  };

  getTaskTags = (uid, lang, tz, tag_ids) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [tag_ids, ['display_name', 'color']],
        kwargs: {
          context: {
            lang: lang,
            tz: tz,
            uid: uid,
          },
        },
        method: 'read',
        model: 'project.tags',
      };
      this.post(params).then(resolve).catch(reject);
    });
  };

  changeTaskName = (uid, lang, tz, task_id, task_name) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [
          [task_id],
          {
            name: task_name,
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

  changeTaskProject = (uid, lang, tz, task_id, project_id) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [
          [task_id],
          {
            project_id: project_id,
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

  changeTaskProjectPhase = (uid, lang, tz, task_id, project_phase_id) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [
          [task_id],
          {
            project_phase_id: project_phase_id,
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

  getProjectPhase = (uid, lang, tz, project_id) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [],
        kwargs: {
          args: [['project_id', '=', project_id]],
          context: {
            lang: lang,
            tz: tz,
            uid: uid,
          },
        },
        method: 'name_search',
        model: 'project.phase',
      };
      this.post(params).then(resolve).catch(reject);
    });
  };

  getListAssignedTeam = (uid, lang, tz) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [],
        kwargs: {
          args: [],
          context: {
            lang: lang,
            tz: tz,
            uid: uid,
          },
          limit: 10,
        },
        method: 'name_search',
        model: 'project.scrum.devteam',
      };
      this.post(params).then(resolve).catch(reject);
    });
  };

  getAssignedTeamMember = (uid, lang, tz, team_id) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [[team_id], ['name', 'code', 'developer_ids']],
        kwargs: {
          context: {
            lang: lang,
            tz: tz,
            uid: uid,
          },
        },
        method: 'read',
        model: 'project.scrum.devteam',
      };
      this.post(params).then(resolve).catch(reject);
    });
  };

  getUserName = (uid, lang, tz, user_list) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [],
        kwargs: {
          args: [['id', 'in', user_list]],
          context: {
            lang: lang,
            tz: tz,
            uid: uid,
          },
          limit: 10,
        },
        method: 'name_search',
        model: 'res.users',
      };
      this.post(params).then(resolve).catch(reject);
    });
  };

  changeTaskAssignedTeam = (uid, lang, tz, task_id, team_id) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [
          [task_id],
          {
            team_id: team_id,
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

  changeTaskAssignedUser = (uid, lang, tz, task_id, user_id) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [
          [task_id],
          {
            user_id: user_id,
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

  changeTaskDone = (uid, lang, tz, task_id, percent_done) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [
          [task_id],
          {
            percent_done: percent_done,
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

  changeTaskPlanningDate = (
    uid,
    lang,
    tz,
    task_id,
    planned_date_begin,
    planned_date_end,
  ) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [
          [task_id],
          {
            planned_date_begin: planned_date_begin,
            planned_date_end: planned_date_end,
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

  changeTaskEffort = (uid, lang, tz, task_id, effort) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [
          [task_id],
          {
            effort: effort,
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

  getTaskSupporter = (uid, lang, tz) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [],
        kwargs: {
          args: [],
          context: {
            lang: lang,
            tz: tz,
            uid: uid,
          },
          limit: 10,
        },
        method: 'name_search',
        model: 'res.partner',
      };
      this.post(params).then(resolve).catch(reject);
    });
  };

  changeTaskSupporter = (uid, lang, tz, task_id, supporter_id) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [
          [task_id],
          {
            supporter_id: supporter_id,
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

  changeTaskDeadline = (uid, lang, tz, task_id, date_deadline) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [
          [task_id],
          {
            date_deadline: date_deadline,
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

  getTaskLevel = (uid, lang, tz) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [],
        kwargs: {
          args: [],
          context: {
            lang: lang,
            tz: tz,
            uid: uid,
          },
          limit: 10,
        },
        method: 'name_search',
        model: 'task.level',
      };
      this.post(params).then(resolve).catch(reject);
    });
  };

  changeTaskLevel = (uid, lang, tz, task_id, task_level_id) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [
          [task_id],
          {
            task_level_id: task_level_id,
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

  changeTaskSchedulingMode = (uid, lang, tz, task_id, scheduling_mode) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [
          [task_id],
          {
            scheduling_mode: scheduling_mode,
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

  changeTaskContraintType = (uid, lang, tz, task_id, constraint_type) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [
          [task_id],
          {
            constraint_type: constraint_type,
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

  changeTaskConstraintDate = (uid, lang, tz, task_id, constraint_date) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [
          [task_id],
          {
            constraint_date: constraint_date,
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

  changeTaskEffortDriven = (uid, lang, tz, task_id, effort_driven) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [
          [task_id],
          {
            effort_driven: effort_driven,
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

  changeTaskManuallyScheduled = (
    uid,
    lang,
    tz,
    task_id,
    manually_scheduled,
  ) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [
          [task_id],
          {
            manually_scheduled: manually_scheduled,
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

  changeTaskOption = (uid, lang, tz, task_id, option) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [
          [task_id],
          {
            option: option,
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

  getTaskType = (uid, lang, tz) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [],
        kwargs: {
          args: [['task_ok', '=', true]],
          context: {
            lang: lang,
            tz: tz,
            uid: uid,
          },
          limit: 10,
        },
        method: 'name_search',
        model: 'project.type',
      };
      this.post(params).then(resolve).catch(reject);
    });
  };

  changeTaskType = (uid, lang, tz, task_id, type_id) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [
          [task_id],
          {
            type_id: type_id,
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

  changeTaskFinishDate = (uid, lang, tz, task_id, date_finished) => {
    return new Promise((resolve, reject) => {
      let params = {
        args: [
          [task_id],
          {
            date_finished: date_finished,
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
}

const projectManageBusiness = new ProjectManageBusiness();

export default projectManageBusiness;
