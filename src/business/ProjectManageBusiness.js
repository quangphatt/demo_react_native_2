import Service from '~/service';
import {getAllProjectURL, getTaskURL} from '~/service/configURL';
import axios from 'axios';
import host from '~/service/host';

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

export const getAllProject = async global => {
  let result = await projectManageBusiness.getProjectStatus(
    global.uid,
    global.lang,
  );
  if (result.status === 'success') {
    var arrres = result.data.map(item => ({
      status: item.project_status[0],
      status_name: item.project_status[1],
      count: item.project_status_count,
      fold: item.__fold,
      projects: [],
    }));
    global.setAllProject(arrres);
    let res = await projectManageBusiness.getAllProject(
      global.uid,
      global.lang,
    );
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

export const onChangeProjectIsFavorite = async (
  global,
  project_id,
  is_favorite,
) => {
  let result = await projectManageBusiness.changeProjectIsFavorite(
    project_id,
    is_favorite,
    global.uid,
    global.lang,
  );
  if (result.status === 'success') {
    await getAllProject(global);
  }
};

export const getAllTask = async (uid, lang, project_id) => {
  let result = await projectManageBusiness.getTaskStage(uid, lang, project_id);
  if (result.status === 'success') {
    let allTask = result.data.map(item => ({
      stage_id: item.stage_id[0],
      stage_name: item.stage_id[1],
      stage_count: item.stage_id_count,
      tasks: [],
    }));

    for (let i = 0; i < allTask.length; i++) {
      let res = await projectManageBusiness.getTaskByStage(
        uid,
        lang,
        project_id,
        allTask[i].stage_id,
      );
      if (res.status === 'success') {
        allTask[i].tasks = res.data.records;
      }
    }
    return allTask;
  }
};

export const onChangeTaskPriority = async (
  uid,
  lang,
  project_id,
  task_id,
  newPriority,
) => {
  let result = await projectManageBusiness.changeTaskPriority(
    uid,
    lang,
    task_id,
    newPriority,
  );
  if (result.status === 'success') {
    return await getAllTask(uid, lang, project_id);
  }
};

export default projectManageBusiness;
