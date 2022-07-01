import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Global, {withGlobalContext} from '~/provider/GlobalContext';
import ModalEditTaskInfo from '~/modal/ModalEditTaskInfo/ModalEditTaskInfo';
import TaskEditText from '~/modal/ModalEditTaskInfo/TaskEditText';
import TaskEditDropdownPicker from '~/modal/ModalEditTaskInfo/TaskEditDropdownPicker';
import TaskEditDatetime from '~/modal/ModalEditTaskInfo/TaskEditDatetime';
import TaskEditDate from '~/modal/ModalEditTaskInfo/TaskEditDate';
import StarRating from 'react-native-star-rating';
import projectManageBusiness from '~/business/ProjectManageBusiness';
import {userInfo} from '~/utils/config';
import moment from 'moment';
import 'moment-timezone';

const tagColor = {
  0: '#fff',
  1: '#f06050',
  2: '#f4a460',
  3: '#f7cd1f',
  4: '#6cc1ed',
  5: '#814968',
  6: '#eb7e7f',
  7: '#2c8397',
  8: '#475577',
  9: '#d6145f',
  10: '#30c381',
  11: '#9365b8',
};

class TaskDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task_id: this.props.route.params.task_id,
      task_infomation: {},
    };
  }

  componentDidMount = async () => {
    // Get Task info
    let result = await projectManageBusiness.getTaskInfomation(
      userInfo.uid,
      userInfo.lang,
      userInfo.tz,
      this.props.route.params.task_id,
    );
    if (result.status === 'success') {
      let taskInfo = result.data[0] ?? {};

      this.setState({
        task_infomation: {
          ...taskInfo,
          scheduling_mode_list: [
            [false, '(None)'],
            ['Normal', 'Normal'],
            ['FixedDuration', 'Fixed Duration'],
            ['FixedEffort', 'Fixed Effort'],
            ['FixedUnits', 'Fixed Units'],
          ],
          constraint_type_list: [
            [false, '(None)'],
            ['muststarton', 'Must start on'],
            ['mustfinishon', 'Must finish on'],
            ['startnoearlierthan', 'Start no earlier than'],
            ['startnolaterthan', 'Start no later than'],
            ['finishnoearlierthan', 'Finish no earlier than'],
            ['finishnolaterthan', 'Finish no later than'],
          ],
          option_list: [
            ['task', 'Task'],
            ['issue', 'Issue'],
          ],
        },
      });
    }

    // Get Assigned Team Member
    await this.getAssignedTeamMember();

    // Get Assigned Resource
    if (this.state.task_infomation.assigned_ids) {
      let getAssignedResource = await projectManageBusiness.getAssignedResource(
        userInfo.uid,
        userInfo.lang,
        userInfo.tz,
        this.state.task_infomation.assigned_ids,
      );
      if (getAssignedResource.status === 'success') {
        let assigned_items = getAssignedResource.data;
        this.setState({
          task_infomation: {
            ...this.state.task_infomation,
            assigned_items: assigned_items,
          },
        });
      }
    }

    // Get Tags
    if (this.state.task_infomation.tag_ids) {
      let getTags = await projectManageBusiness.getTaskTags(
        userInfo.uid,
        userInfo.lang,
        userInfo.tz,
        this.state.task_infomation.tag_ids,
      );
      if (getTags.status === 'success') {
        let tag_items = getTags.data;
        this.setState({
          task_infomation: {
            ...this.state.task_infomation,
            tag_items: tag_items,
          },
        });
      }
    }

    //Scheduling Mode List
    this.setState({
      task_infomation: {
        ...this.state.task_infomation,
        scheduling_mode_label:
          this.state.task_infomation.scheduling_mode_list.find(
            item => item[0] === this.state.task_infomation.scheduling_mode,
          )[1] || false,
        constraint_type_label:
          this.state.task_infomation.constraint_type_list.find(
            item => item[0] === this.state.task_infomation.constraint_type,
          )[1] || false,
        option_label:
          this.state.task_infomation.option_list.find(
            item => item[0] === this.state.task_infomation.option,
          )[1] || false,
      },
    });
  };

  BackToTaskScreen = () => {
    this.props.navigation.navigate('Task', this.props.route.params.task_params);
  };

  getAssignedTeamMember = async () => {
    if (this.state.task_infomation.team_id) {
      let getTeamMember = await projectManageBusiness.getAssignedTeamMember(
        userInfo.uid,
        userInfo.lang,
        userInfo.tz,
        this.state.task_infomation.team_id[0],
      );
      if (getTeamMember.status === 'success') {
        let getTeamMemberName = await projectManageBusiness.getUserName(
          userInfo.uid,
          userInfo.lang,
          userInfo.tz,
          getTeamMember.data[0].developer_ids,
        );
        if (getTeamMemberName.status === 'success') {
          this.setState({
            task_infomation: {
              ...this.state.task_infomation,
              team_member: getTeamMemberName.data,
            },
          });
        } else {
          this.setState({
            task_infomation: {
              ...this.state.task_infomation,
              team_member: false,
            },
          });
        }
      }
    } else {
      this.setState({
        task_infomation: {
          ...this.state.task_infomation,
          team_member: false,
        },
      });
    }
  };

  onChangeTaskStage = async stage_id => {
    let changeTaskStage = await projectManageBusiness.changeTaskStage(
      userInfo.uid,
      userInfo.lang,
      userInfo.tz,
      this.state.task_id,
      stage_id[0],
    );
    if (changeTaskStage.status === 'success') {
      this.setState({
        task_infomation: {
          ...this.state.task_infomation,
          stage_id: stage_id,
        },
      });
    }
  };

  onEditTaskName = () => {
    let task_name_ref = React.createRef();
    Global._showModal({
      content: (
        <ModalEditTaskInfo
          hideModal={() => {
            Global._hideModal({callback: null});
          }}
          updateInfo={async () => {
            let changeTaskName = await projectManageBusiness.changeTaskName(
              userInfo.uid,
              userInfo.lang,
              userInfo.tz,
              this.state.task_id,
              task_name_ref.current.value().trim(),
            );
            if (changeTaskName.status === 'success') {
              this.setState({
                task_infomation: {
                  ...this.state.task_infomation,
                  name: task_name_ref.current.value().trim(),
                },
              });
            }
          }}
          modalContent={
            <TaskEditText
              label="Task Name"
              value={this.state.task_infomation.name}
              ref={task_name_ref}
            />
          }
          label={'Task Name'}
        />
      ),
    });
  };

  onEditTaskProject = () => {
    let task_project_ref = React.createRef();
    Global._showModal({
      content: (
        <ModalEditTaskInfo
          hideModal={() => {
            Global._hideModal({callback: null});
          }}
          updateInfo={async () => {
            if (
              !this.state.task_infomation.project_id ||
              task_project_ref.current.value()[0] !==
                this.state.task_infomation.project_id[0]
            ) {
              let changeTaskProject =
                await projectManageBusiness.changeTaskProject(
                  userInfo.uid,
                  userInfo.lang,
                  userInfo.tz,
                  this.state.task_id,
                  task_project_ref.current.value()[0],
                );
              if (changeTaskProject.status === 'success') {
                this.setState({
                  task_infomation: {
                    ...this.state.task_infomation,
                    project_id: task_project_ref.current.value(),
                  },
                });
              }
            }
          }}
          modalContent={
            <TaskEditDropdownPicker
              label={'Task Project'}
              ref={task_project_ref}
              currentValue={
                this.state.task_infomation.project_id
                  ? this.state.task_infomation.project_id?.[0]
                  : false
              }
              getListItem={async () => {
                let getListProject = await projectManageBusiness.getAllProject(
                  userInfo.uid,
                  userInfo.lang,
                  userInfo.tz,
                );
                if (getListProject.status === 'success') {
                  return getListProject.data.records.map(item => ({
                    value: item.id,
                    label: item.name,
                  }));
                } else {
                  return [
                    {
                      value: this.state.task_infomation.project_id
                        ? this.state.task_infomation.project_id?.[0]
                        : false,
                      label: 'Error!!!',
                    },
                  ];
                }
              }}
            />
          }
          label={'Task Project'}
        />
      ),
    });
  };

  onEditTaskProjectPhase = () => {
    if (this.state.task_infomation.project_id) {
      let task_project_phase_ref = React.createRef();

      Global._showModal({
        content: (
          <ModalEditTaskInfo
            hideModal={() => {
              Global._hideModal({callback: null});
            }}
            updateInfo={async () => {
              if (
                !this.state.task_infomation.project_phase_id ||
                task_project_phase_ref.current.value()[0] !==
                  this.state.task_infomation.project_phase_id[0]
              ) {
                let changeTaskProjectPhase =
                  await projectManageBusiness.changeTaskProjectPhase(
                    userInfo.uid,
                    userInfo.lang,
                    userInfo.tz,
                    this.state.task_id,
                    task_project_phase_ref.current.value()[0],
                  );
                if (changeTaskProjectPhase.status === 'success') {
                  this.setState({
                    task_infomation: {
                      ...this.state.task_infomation,
                      project_phase_id: task_project_phase_ref.current.value(),
                    },
                  });
                }
              }
            }}
            modalContent={
              <TaskEditDropdownPicker
                label={'Task Project Phase'}
                ref={task_project_phase_ref}
                currentValue={
                  this.state.task_infomation.project_phase_id
                    ? this.state.task_infomation.project_phase_id?.[0]
                    : false
                }
                getListItem={async () => {
                  let getListProjectPhase =
                    await projectManageBusiness.getProjectPhase(
                      userInfo.uid,
                      userInfo.lang,
                      userInfo.tz,
                      this.state.task_infomation.project_id?.[0],
                    );
                  if (getListProjectPhase.status === 'success') {
                    let listItem = getListProjectPhase.data.map(item => ({
                      value: item[0],
                      label: item[1],
                    }));
                    listItem.unshift({value: false, label: '(None)'});
                    return listItem;
                  } else {
                    return [
                      {
                        value: this.state.task_infomation.project_phase_id
                          ? this.state.task_infomation.project_phase_id?.[0]
                          : false,
                        label: 'Error!!!',
                      },
                    ];
                  }
                }}
              />
            }
            label={'Task Project Phase'}
          />
        ),
      });
    }
  };

  onEditTaskAssignedTeam = () => {
    let task_assigned_team_ref = React.createRef();

    Global._showModal({
      content: (
        <ModalEditTaskInfo
          hideModal={() => {
            Global._hideModal({callback: null});
          }}
          updateInfo={async () => {
            if (
              !this.state.task_infomation.team_id ||
              task_assigned_team_ref.current.value()[0] !==
                this.state.task_infomation.team_id[0]
            ) {
              let changeTaskAssignedTeam =
                await projectManageBusiness.changeTaskAssignedTeam(
                  userInfo.uid,
                  userInfo.lang,
                  userInfo.tz,
                  this.state.task_id,
                  task_assigned_team_ref.current.value()[0],
                );
              if (changeTaskAssignedTeam.status === 'success') {
                this.setState({
                  task_infomation: {
                    ...this.state.task_infomation,
                    team_id: task_assigned_team_ref.current.value(),
                  },
                });
                await this.getAssignedTeamMember();
              }
            }
          }}
          modalContent={
            <TaskEditDropdownPicker
              label={'Task Assigned Team'}
              ref={task_assigned_team_ref}
              currentValue={
                this.state.task_infomation.team_id
                  ? this.state.task_infomation.team_id?.[0]
                  : false
              }
              getListItem={async () => {
                let getListAssignedTeam =
                  await projectManageBusiness.getListAssignedTeam(
                    userInfo.uid,
                    userInfo.lang,
                    userInfo.tz,
                  );
                if (getListAssignedTeam.status === 'success') {
                  let listItem = getListAssignedTeam.data.map(item => ({
                    value: item[0],
                    label: item[1],
                  }));
                  listItem.unshift({value: false, label: '(None)'});
                  return listItem;
                } else {
                  return [
                    {
                      value: this.state.task_infomation.team_id
                        ? this.state.task_infomation.team_id?.[0]
                        : false,
                      label: 'Error!!!',
                    },
                  ];
                }
              }}
            />
          }
          label={'Task Assigned Team'}
        />
      ),
    });
  };

  onEditAssignedUser = () => {
    if (this.state.task_infomation.team_id) {
      let task_assigned_user_ref = React.createRef();

      Global._showModal({
        content: (
          <ModalEditTaskInfo
            hideModal={() => {
              Global._hideModal({callback: null});
            }}
            updateInfo={async () => {
              if (
                this.state.task_infomation.team_member.find(
                  item => item[0] === task_assigned_user_ref.current.value()[0],
                ) &&
                (!this.state.task_infomation.user_id ||
                  task_assigned_user_ref.current.value()[0] !==
                    this.state.task_infomation.user_id[0])
              ) {
                let changeTaskAssignedUser =
                  await projectManageBusiness.changeTaskAssignedUser(
                    userInfo.uid,
                    userInfo.lang,
                    userInfo.tz,
                    this.state.task_id,
                    task_assigned_user_ref.current.value()[0],
                  );
                if (changeTaskAssignedUser.status === 'success') {
                  this.setState({
                    task_infomation: {
                      ...this.state.task_infomation,
                      user_id: task_assigned_user_ref.current.value(),
                    },
                  });
                }
              }
            }}
            modalContent={
              <TaskEditDropdownPicker
                label={'Task Assigned User'}
                ref={task_assigned_user_ref}
                currentValue={
                  this.state.task_infomation.user_id
                    ? this.state.task_infomation.user_id?.[0]
                    : this.state.task_infomation.team_member[0][0]
                }
                getListItem={() => {
                  let listItem = this.state.task_infomation.team_member;
                  if (
                    !listItem.find(
                      item => item[0] === this.state.task_infomation.user_id[0],
                    )
                  ) {
                    listItem.unshift(this.state.task_infomation.user_id);
                  }

                  return listItem.map(item => ({
                    value: item[0],
                    label: item[1],
                  }));
                }}
              />
            }
            label={'Task Assigned User'}
          />
        ),
      });
    }
  };

  onEditTaskDone = () => {
    let task_done_ref = React.createRef();
    Global._showModal({
      content: (
        <ModalEditTaskInfo
          hideModal={() => {
            Global._hideModal({callback: null});
          }}
          updateInfo={async () => {
            let num = parseInt(task_done_ref.current.value());
            if (num && num >= 0) {
              let changeTaskDone = await projectManageBusiness.changeTaskDone(
                userInfo.uid,
                userInfo.lang,
                userInfo.tz,
                this.state.task_id,
                num,
              );
              if (changeTaskDone.status === 'success') {
                this.setState({
                  task_infomation: {
                    ...this.state.task_infomation,
                    percent_done: num,
                  },
                });
              }
            }
          }}
          modalContent={
            <TaskEditText
              label="Percent Done"
              value={this.state.task_infomation.percent_done.toString()}
              ref={task_done_ref}
            />
          }
          label={'Percent Done'}
        />
      ),
    });
  };

  onEditPlanningDate = () => {
    let task_planning_start_date_ref = React.createRef();
    let task_planning_end_date_ref = React.createRef();

    Global._showModal({
      content: (
        <ModalEditTaskInfo
          hideModal={() => {
            Global._hideModal({callback: null});
          }}
          updateInfo={async () => {
            let start_date = task_planning_start_date_ref.current.value();
            let end_date = task_planning_end_date_ref.current.value();

            if (start_date && end_date) {
              if (start_date.getTime() <= end_date.getTime()) {
                let changeTaskPlanningDate =
                  await projectManageBusiness.changeTaskPlanningDate(
                    userInfo.uid,
                    userInfo.lang,
                    userInfo.tz,
                    this.state.task_id,
                    start_date,
                    end_date,
                  );
                if (changeTaskPlanningDate.status === 'success') {
                  this.setState({
                    task_infomation: {
                      ...this.state.task_infomation,
                      planned_date_begin: start_date,
                      planned_date_end: end_date,
                    },
                  });
                }
              }
            }
          }}
          modalContent={
            <View>
              <Text style={{color: '#000', fontSize: 14}}>Start Date</Text>
              <TaskEditDatetime
                label={'Start Date'}
                currentValue={
                  this.state.task_infomation.planned_date_begin &&
                  moment
                    .utc(this.state.task_infomation.planned_date_begin)
                    .tz(userInfo.tz)
                    .toDate()
                }
                ref={task_planning_start_date_ref}
              />
              <Text style={{color: '#000', fontSize: 14}}>End Date</Text>
              <TaskEditDatetime
                label={'End Date'}
                currentValue={
                  this.state.task_infomation.planned_date_end &&
                  moment
                    .utc(this.state.task_infomation.planned_date_end)
                    .tz(userInfo.tz)
                    .toDate()
                }
                ref={task_planning_end_date_ref}
              />
            </View>
          }
          label={'Planned Date'}
        />
      ),
    });
  };

  onEditTaskEffort = () => {
    let task_effort_ref = React.createRef();
    Global._showModal({
      content: (
        <ModalEditTaskInfo
          hideModal={() => {
            Global._hideModal({callback: null});
          }}
          updateInfo={async () => {
            let num = parseInt(task_effort_ref.current.value());
            if (num && num >= 0) {
              let changeTaskEffort =
                await projectManageBusiness.changeTaskEffort(
                  userInfo.uid,
                  userInfo.lang,
                  userInfo.tz,
                  this.state.task_id,
                  num,
                );
              if (changeTaskEffort.status === 'success') {
                this.setState({
                  task_infomation: {
                    ...this.state.task_infomation,
                    effort: num,
                  },
                });
              }
            }
          }}
          modalContent={
            <TaskEditText
              label="Effort (Hours)"
              value={this.state.task_infomation.effort.toString()}
              ref={task_effort_ref}
            />
          }
          label={'Effort (Hours)'}
        />
      ),
    });
  };

  onEditTaskSupporter = () => {
    let task_supporter_ref = React.createRef();

    Global._showModal({
      content: (
        <ModalEditTaskInfo
          hideModal={() => {
            Global._hideModal({callback: null});
          }}
          updateInfo={async () => {
            if (
              !this.state.task_infomation.supporter_id ||
              task_supporter_ref.current.value()[0] !==
                this.state.task_infomation.supporter_id[0]
            ) {
              let changeTaskSupporter =
                await projectManageBusiness.changeTaskSupporter(
                  userInfo.uid,
                  userInfo.lang,
                  userInfo.tz,
                  this.state.task_id,
                  task_supporter_ref.current.value()[0],
                );
              if (changeTaskSupporter.status === 'success') {
                this.setState({
                  task_infomation: {
                    ...this.state.task_infomation,
                    supporter_id: task_supporter_ref.current.value(),
                  },
                });
              }
            }
          }}
          modalContent={
            <TaskEditDropdownPicker
              label={'Task Supporter'}
              ref={task_supporter_ref}
              currentValue={
                this.state.task_infomation.supporter_id
                  ? this.state.task_infomation.supporter_id?.[0]
                  : false
              }
              getListItem={async () => {
                let getListSupporter =
                  await projectManageBusiness.getTaskSupporter(
                    userInfo.uid,
                    userInfo.lang,
                    userInfo.tz,
                  );
                if (getListSupporter.status === 'success') {
                  let listItem = getListSupporter.data.map(item => ({
                    value: item[0],
                    label: item[1],
                  }));
                  listItem.unshift({value: false, label: '(None)'});
                  return listItem;
                } else {
                  return [
                    {
                      value: this.state.task_infomation.supporter_id
                        ? this.state.task_infomation.supporter_id?.[0]
                        : false,
                      label: 'Error!!!',
                    },
                  ];
                }
              }}
            />
          }
          label={'Task Supporter'}
        />
      ),
    });
  };

  onEditTaskDeadline = () => {
    let task_deadline_date_ref = React.createRef();

    Global._showModal({
      content: (
        <ModalEditTaskInfo
          hideModal={() => {
            Global._hideModal({callback: null});
          }}
          updateInfo={async () => {
            let changeTaskDeadline =
              await projectManageBusiness.changeTaskDeadline(
                userInfo.uid,
                userInfo.lang,
                userInfo.tz,
                this.state.task_id,
                task_deadline_date_ref.current.value(),
              );

            if (changeTaskDeadline.status === 'success') {
              this.setState({
                task_infomation: {
                  ...this.state.task_infomation,
                  date_deadline: task_deadline_date_ref.current.value(),
                },
              });
            }
          }}
          modalContent={
            <TaskEditDatetime
              label={'Deadline Date'}
              currentValue={
                this.state.task_infomation.date_deadline &&
                moment
                  .utc(this.state.task_infomation.date_deadline)
                  .tz(userInfo.tz)
                  .toDate()
              }
              ref={task_deadline_date_ref}
            />
          }
          label={'Deadline Date'}
        />
      ),
    });
  };

  onEditTaskLevel = () => {
    let task_level_ref = React.createRef();

    Global._showModal({
      content: (
        <ModalEditTaskInfo
          hideModal={() => {
            Global._hideModal({callback: null});
          }}
          updateInfo={async () => {
            if (
              !this.state.task_infomation.task_level_id ||
              task_level_ref.current.value()[0] !==
                this.state.task_infomation.task_level_id[0]
            ) {
              let changeTaskLevel = await projectManageBusiness.changeTaskLevel(
                userInfo.uid,
                userInfo.lang,
                userInfo.tz,
                this.state.task_id,
                task_level_ref.current.value()[0],
              );
              if (changeTaskLevel.status === 'success') {
                this.setState({
                  task_infomation: {
                    ...this.state.task_infomation,
                    task_level_id: task_level_ref.current.value(),
                  },
                });
              }
            }
          }}
          modalContent={
            <TaskEditDropdownPicker
              label={'Task Level'}
              ref={task_level_ref}
              currentValue={
                this.state.task_infomation.task_level_id
                  ? this.state.task_infomation.task_level_id?.[0]
                  : false
              }
              getListItem={async () => {
                let getListTaskLevel = await projectManageBusiness.getTaskLevel(
                  userInfo.uid,
                  userInfo.lang,
                  userInfo.tz,
                );
                if (getListTaskLevel.status === 'success') {
                  let listItem = getListTaskLevel.data.map(item => ({
                    value: item[0],
                    label: item[1],
                  }));
                  listItem.unshift({value: false, label: '(None)'});
                  return listItem;
                } else {
                  return [
                    {
                      value: this.state.task_infomation.task_level_id
                        ? this.state.task_infomation.task_level_id?.[0]
                        : false,
                      label: 'Error!!!',
                    },
                  ];
                }
              }}
            />
          }
          label={'Task Level'}
        />
      ),
    });
  };

  onEditTaskPriority = async rating => {
    let result = await projectManageBusiness.changeTaskPriority(
      userInfo.uid,
      userInfo.lang,
      userInfo.tz,
      this.state.task_id,
      rating,
    );
    if (result.status === 'success') {
      this.setState({
        task_infomation: {
          ...this.state.task_infomation,
          priority: rating,
        },
      });
    }
  };

  onEditTaskSchedulingMode = () => {
    let task_scheduling_mode_ref = React.createRef();
    Global._showModal({
      content: (
        <ModalEditTaskInfo
          hideModal={() => {
            Global._hideModal({callback: null});
          }}
          updateInfo={async () => {
            if (
              !this.state.task_infomation.scheduling_mode ||
              task_scheduling_mode_ref.current.value()[0] !==
                this.state.task_infomation.scheduling_mode
            ) {
              let changeTaskSchedulingMode =
                await projectManageBusiness.changeTaskSchedulingMode(
                  userInfo.uid,
                  userInfo.lang,
                  userInfo.tz,
                  this.state.task_id,
                  task_scheduling_mode_ref.current.value()[0],
                );
              if (changeTaskSchedulingMode.status === 'success') {
                this.setState({
                  task_infomation: {
                    ...this.state.task_infomation,
                    scheduling_mode:
                      task_scheduling_mode_ref.current.value()[0],
                    scheduling_mode_label:
                      task_scheduling_mode_ref.current.value()[1],
                  },
                });
              }
            }
          }}
          modalContent={
            <TaskEditDropdownPicker
              label={'Task Scheduling Mode'}
              ref={task_scheduling_mode_ref}
              currentValue={this.state.task_infomation.scheduling_mode}
              getListItem={() => {
                return this.state.task_infomation.scheduling_mode_list.map(
                  item => ({
                    value: item[0],
                    label: item[1],
                  }),
                );
              }}
            />
          }
          label={'Task Scheduling Mode'}
        />
      ),
    });
  };

  onEditConstraintType = () => {
    let task_constraint_type_ref = React.createRef();
    Global._showModal({
      content: (
        <ModalEditTaskInfo
          hideModal={() => {
            Global._hideModal({callback: null});
          }}
          updateInfo={async () => {
            if (
              !this.state.task_infomation.constraint_type ||
              task_constraint_type_ref.current.value()[0] !==
                this.state.task_infomation.constraint_type
            ) {
              let changeTaskContraintType =
                await projectManageBusiness.changeTaskContraintType(
                  userInfo.uid,
                  userInfo.lang,
                  userInfo.tz,
                  this.state.task_id,
                  task_constraint_type_ref.current.value()[0],
                );
              if (changeTaskContraintType.status === 'success') {
                this.setState({
                  task_infomation: {
                    ...this.state.task_infomation,
                    constraint_type:
                      task_constraint_type_ref.current.value()[0],
                    constraint_type_label:
                      task_constraint_type_ref.current.value()[1],
                  },
                });
              }
            }
          }}
          modalContent={
            <TaskEditDropdownPicker
              label={'Task Constraint Type'}
              ref={task_constraint_type_ref}
              currentValue={this.state.task_infomation.constraint_type}
              getListItem={() => {
                return this.state.task_infomation.constraint_type_list.map(
                  item => ({
                    value: item[0],
                    label: item[1],
                  }),
                );
              }}
            />
          }
          label={'Task Constraint Type'}
        />
      ),
    });
  };

  onEditTaskConstraintDate = () => {
    let task_constraint_date_ref = React.createRef();

    Global._showModal({
      content: (
        <ModalEditTaskInfo
          hideModal={() => {
            Global._hideModal({callback: null});
          }}
          updateInfo={async () => {
            let changeTaskConstraintDate =
              await projectManageBusiness.changeTaskConstraintDate(
                userInfo.uid,
                userInfo.lang,
                userInfo.tz,
                this.state.task_id,
                task_constraint_date_ref.current.value(),
              );

            if (changeTaskConstraintDate.status === 'success') {
              this.setState({
                task_infomation: {
                  ...this.state.task_infomation,
                  constraint_date: task_constraint_date_ref.current.value(),
                },
              });
            }
          }}
          modalContent={
            <TaskEditDate
              label={'Constraint Date'}
              currentValue={
                this.state.task_infomation.constraint_date &&
                moment(this.state.task_infomation.constraint_date).toDate()
              }
              ref={task_constraint_date_ref}
            />
          }
          label={'Constraint Date'}
        />
      ),
    });
  };

  onEditTaskEffortDriven = async () => {
    let changeTaskEffortDriven =
      await projectManageBusiness.changeTaskEffortDriven(
        userInfo.uid,
        userInfo.lang,
        userInfo.tz,
        this.state.task_id,
        !this.state.task_infomation.effort_driven,
      );
    if (changeTaskEffortDriven.status === 'success') {
      this.setState({
        task_infomation: {
          ...this.state.task_infomation,
          effort_driven: !this.state.task_infomation.effort_driven,
        },
      });
    }
  };

  onEditTaskManuallyScheduled = async () => {
    let changeTaskManuallyScheduled =
      await projectManageBusiness.changeTaskManuallyScheduled(
        userInfo.uid,
        userInfo.lang,
        userInfo.tz,
        this.state.task_id,
        !this.state.task_infomation.manually_scheduled,
      );
    if (changeTaskManuallyScheduled.status === 'success') {
      this.setState({
        task_infomation: {
          ...this.state.task_infomation,
          manually_scheduled: !this.state.task_infomation.manually_scheduled,
        },
      });
    }
  };

  onEditTaskOption = () => {
    let task_option_ref = React.createRef();
    Global._showModal({
      content: (
        <ModalEditTaskInfo
          hideModal={() => {
            Global._hideModal({callback: null});
          }}
          updateInfo={async () => {
            if (
              !this.state.task_infomation.option ||
              task_option_ref.current.value()[0] !==
                this.state.task_infomation.option
            ) {
              let changeTaskOption =
                await projectManageBusiness.changeTaskOption(
                  userInfo.uid,
                  userInfo.lang,
                  userInfo.tz,
                  this.state.task_id,
                  task_option_ref.current.value()[0],
                );
              if (changeTaskOption.status === 'success') {
                this.setState({
                  task_infomation: {
                    ...this.state.task_infomation,
                    option: task_option_ref.current.value()[0],
                    option_label: task_option_ref.current.value()[1],
                  },
                });
              }
            }
          }}
          modalContent={
            <TaskEditDropdownPicker
              label={'Task Option'}
              ref={task_option_ref}
              currentValue={this.state.task_infomation.option}
              getListItem={() => {
                return this.state.task_infomation.option_list.map(item => ({
                  value: item[0],
                  label: item[1],
                }));
              }}
            />
          }
          label={'Task Option'}
        />
      ),
    });
  };

  onEditTaskType = () => {
    let task_type_ref = React.createRef();

    Global._showModal({
      content: (
        <ModalEditTaskInfo
          hideModal={() => {
            Global._hideModal({callback: null});
          }}
          updateInfo={async () => {
            if (
              !this.state.task_infomation.type_id ||
              task_type_ref.current.value()[0] !==
                this.state.task_infomation.type_id[0]
            ) {
              let changeTasktype = await projectManageBusiness.changeTaskType(
                userInfo.uid,
                userInfo.lang,
                userInfo.tz,
                this.state.task_id,
                task_type_ref.current.value()[0],
              );
              if (changeTasktype.status === 'success') {
                this.setState({
                  task_infomation: {
                    ...this.state.task_infomation,
                    type_id: task_type_ref.current.value(),
                  },
                });
              }
            }
          }}
          modalContent={
            <TaskEditDropdownPicker
              label={'Task Type'}
              ref={task_type_ref}
              currentValue={
                this.state.task_infomation.type_id
                  ? this.state.task_infomation.type_id?.[0]
                  : false
              }
              getListItem={async () => {
                let getListType = await projectManageBusiness.getTaskType(
                  userInfo.uid,
                  userInfo.lang,
                  userInfo.tz,
                );
                if (getListType.status === 'success') {
                  let listItem = getListType.data.map(item => ({
                    value: item[0],
                    label: item[1],
                  }));
                  listItem.unshift({value: false, label: '(None)'});
                  return listItem;
                } else {
                  return [
                    {
                      value: this.state.task_infomation.type_id
                        ? this.state.task_infomation.type_id?.[0]
                        : false,
                      label: 'Error!!!',
                    },
                  ];
                }
              }}
            />
          }
          label={'Task Type'}
        />
      ),
    });
  };

  onEditTaskFinishDate = () => {
    let task_finish_date_ref = React.createRef();

    Global._showModal({
      content: (
        <ModalEditTaskInfo
          hideModal={() => {
            Global._hideModal({callback: null});
          }}
          updateInfo={async () => {
            let changeTaskFinishDate =
              await projectManageBusiness.changeTaskFinishDate(
                userInfo.uid,
                userInfo.lang,
                userInfo.tz,
                this.state.task_id,
                task_finish_date_ref.current.value(),
              );

            if (changeTaskFinishDate.status === 'success') {
              this.setState({
                task_infomation: {
                  ...this.state.task_infomation,
                  date_finished: task_finish_date_ref.current.value(),
                },
              });
            }
          }}
          modalContent={
            <TaskEditDatetime
              label={'Done Date'}
              currentValue={
                this.state.task_infomation.date_finished &&
                moment
                  .utc(this.state.task_infomation.date_finished)
                  .tz(userInfo.tz)
                  .toDate()
              }
              ref={task_finish_date_ref}
            />
          }
          label={'Done Date'}
        />
      ),
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={this.BackToTaskScreen}>
            <FontAwesome5
              style={styles.header_icon}
              size={20}
              name={'arrow-left'}
            />
          </TouchableOpacity>

          <View style={styles.header_icon_left}>
            <TouchableOpacity onPress={() => {}}>
              <FontAwesome5
                style={styles.header_icon}
                size={18}
                name={'location-arrow'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <FontAwesome5
                style={styles.header_icon}
                size={18}
                name={'print'}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.status_bar}>
          <ScrollView horizontal={true}>
            {this.props.route.params.stage_list.map(item =>
              item.stage_id ===
              (this.state.task_infomation.stage_id?.[0] ?? 0) ? (
                <View style={styles.status_bar_stage_wrapper_current}>
                  <Text style={styles.status_bar_stage_text_current}>
                    {item.stage_name}
                  </Text>
                </View>
              ) : (
                <View style={styles.status_bar_stage_wrapper}>
                  <TouchableOpacity
                    onPress={() => this.onChangeTaskStage([item.stage_id,item.stage_name])}
                    style={styles.status_bar_stage}>
                    <Text style={styles.status_bar_stage_text}>
                      {item.stage_name}
                    </Text>
                  </TouchableOpacity>
                </View>
              ),
            )}
          </ScrollView>
        </View>

        <View style={styles.task_info}>
          <TouchableOpacity onPress={this.onEditTaskName}>
            <Text style={styles.task_name}>
              {this.state.task_infomation.name}
            </Text>
          </TouchableOpacity>
          {this.state.task_infomation ? (
            <ScrollView style={styles.info_wrapper}>
              <View style={styles.task_info_item}>
                <Text style={styles.task_info_item_label}>Task Number</Text>
                <View style={styles.task_info_item_value}>
                  <Text style={styles.task_info_item_value_text}>
                    {this.state.task_infomation.task_number}
                  </Text>
                </View>
              </View>
              <View style={styles.task_info_item}>
                <Text
                  style={
                    this.state.task_infomation.project_id
                      ? styles.task_info_item_label
                      : styles.task_info_item_label_disabled
                  }>
                  Project
                </Text>
                <TouchableOpacity
                  style={styles.task_info_item_value}
                  onPress={this.onEditTaskProject}>
                  <Text style={styles.task_info_item_value_text_blue}>
                    {this.state.task_infomation.project_id?.[1] ?? ''}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.task_info_item}>
                <Text
                  style={
                    this.state.task_infomation.project_phase_id
                      ? styles.task_info_item_label
                      : styles.task_info_item_label_disabled
                  }>
                  Project Phase
                </Text>
                <TouchableOpacity
                  style={styles.task_info_item_value}
                  onPress={this.onEditTaskProjectPhase}>
                  <Text style={styles.task_info_item_value_text_blue}>
                    {this.state.task_infomation.project_phase_id?.[1] ?? ''}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.task_info_item}>
                <Text
                  style={
                    this.state.task_infomation.team_id
                      ? styles.task_info_item_label
                      : styles.task_info_item_label_disabled
                  }>
                  Assigned Team
                </Text>
                <TouchableOpacity
                  style={styles.task_info_item_value}
                  onPress={this.onEditTaskAssignedTeam}>
                  <Text style={styles.task_info_item_value_text_blue}>
                    {this.state.task_infomation.team_id?.[1] ?? ''}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.task_info_item}>
                <Text
                  style={
                    this.state.task_infomation.user_id
                      ? styles.task_info_item_label
                      : styles.task_info_item_label_disabled
                  }>
                  Assigned To
                </Text>
                <TouchableOpacity
                  style={styles.task_info_item_value}
                  onPress={this.onEditAssignedUser}>
                  <Text style={styles.task_info_item_value_text_blue}>
                    {this.state.task_infomation.user_id?.[1] ?? ''}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.task_info_item}>
                <Text
                  style={
                    this.state.task_infomation.assigned_ids
                      ? styles.task_info_item_label
                      : styles.task_info_item_label_disabled
                  }>
                  Assigned Resources
                </Text>
                <TouchableOpacity style={styles.task_info_item_value_multy}>
                  {this.state.task_infomation.assigned_items?.map(item => (
                    <View style={styles.assigned_item}>
                      <Text style={styles.assigned_item_text}>
                        {item.display_name}
                      </Text>
                    </View>
                  ))}
                </TouchableOpacity>
              </View>
              <View style={styles.task_info_item}>
                <Text style={styles.task_info_item_label}>Done %</Text>
                <TouchableOpacity
                  style={styles.task_info_item_value}
                  onPress={this.onEditTaskDone}>
                  <Text style={styles.task_info_item_value_text}>
                    {this.state.task_infomation.percent_done ?? ''}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.task_info_item}>
                <Text
                  style={
                    this.state.task_infomation.planned_date_begin
                      ? styles.task_info_item_label
                      : styles.task_info_item_label_disabled
                  }>
                  Start Date
                </Text>
                <TouchableOpacity
                  style={styles.task_info_item_value}
                  onPress={this.onEditPlanningDate}>
                  <Text style={styles.task_info_item_value_text}>
                    {this.state.task_infomation.planned_date_begin
                      ? moment
                          .utc(this.state.task_infomation.planned_date_begin)
                          .tz(userInfo.tz)
                          .format('DD/MM/YYYY HH:mm:ss')
                      : ''}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.task_info_item}>
                <Text
                  style={
                    this.state.task_infomation.planned_date_end
                      ? styles.task_info_item_label
                      : styles.task_info_item_label_disabled
                  }>
                  End Date
                </Text>
                <TouchableOpacity
                  style={styles.task_info_item_value}
                  onPress={this.onEditPlanningDate}>
                  <Text style={styles.task_info_item_value_text}>
                    {this.state.task_infomation.planned_date_end
                      ? moment
                          .utc(this.state.task_infomation.planned_date_end)
                          .tz(userInfo.tz)
                          .format('DD/MM/YYYY HH:mm:ss')
                      : ''}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.task_info_item}>
                <Text style={styles.task_info_item_label}>Effort (Hours)</Text>
                <TouchableOpacity
                  style={styles.task_info_item_value}
                  onPress={this.onEditTaskEffort}>
                  <Text style={styles.task_info_item_value_text}>
                    {this.state.task_infomation.effort ?? ''}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.task_info_item}>
                <Text
                  style={
                    this.state.task_infomation.supporter_id
                      ? styles.task_info_item_label
                      : styles.task_info_item_label_disabled
                  }>
                  Supporter
                </Text>
                <TouchableOpacity
                  style={styles.task_info_item_value}
                  onPress={this.onEditTaskSupporter}>
                  <Text style={styles.task_info_item_value_text_blue}>
                    {this.state.task_infomation.supporter_id?.[1] ?? ''}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.task_info_item}>
                <Text
                  style={
                    this.state.task_infomation.creator_id
                      ? styles.task_info_item_label
                      : styles.task_info_item_label_disabled
                  }>
                  Reported By
                </Text>
                <TouchableOpacity style={styles.task_info_item_value}>
                  <Text style={styles.task_info_item_value_text_blue}>
                    {this.state.task_infomation.creator_id?.[1] ?? ''}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.task_info_item}>
                <Text
                  style={
                    this.state.task_infomation.date_deadline
                      ? styles.task_info_item_label
                      : styles.task_info_item_label_disabled
                  }>
                  Deadline
                </Text>
                <TouchableOpacity
                  style={styles.task_info_item_value}
                  onPress={this.onEditTaskDeadline}>
                  <Text style={styles.task_info_item_value_text}>
                    {this.state.task_infomation.date_deadline
                      ? moment
                          .utc(this.state.task_infomation.date_deadline)
                          .tz(userInfo.tz)
                          .format('DD/MM/YYYY HH:mm:ss')
                      : ''}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.task_info_item}>
                <Text
                  style={
                    this.state.task_infomation.task_level_id
                      ? styles.task_info_item_label
                      : styles.task_info_item_label_disabled
                  }>
                  Task Level
                </Text>
                <TouchableOpacity
                  style={styles.task_info_item_value}
                  onPress={this.onEditTaskLevel}>
                  <Text style={styles.task_info_item_value_text_blue}>
                    {this.state.task_infomation.task_level_id?.[1] ?? ''}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.task_info_item}>
                <Text style={styles.task_info_item_label}>Priority</Text>
                <View style={styles.task_info_item_value}>
                  <StarRating
                    disabled={false}
                    maxStars={3}
                    rating={parseInt(this.state.task_infomation.priority)}
                    starSize={18}
                    fullStarColor={'#f0c735'}
                    selectedStar={rating => this.onEditTaskPriority(rating)}
                  />
                </View>
              </View>
              <View style={styles.task_info_item}>
                <Text
                  style={
                    this.state.task_infomation.tag_ids
                      ? styles.task_info_item_label
                      : styles.task_info_item_label_disabled
                  }>
                  Tags
                </Text>
                <TouchableOpacity style={styles.task_info_item_value_multy}>
                  {this.state.task_infomation.tag_items?.map(item => (
                    <View
                      style={{
                        ...styles.tag_item,
                        backgroundColor: tagColor[item.color] || '#000',
                      }}>
                      <Text style={styles.tag_item_text}>
                        {item.display_name}
                      </Text>
                    </View>
                  ))}
                </TouchableOpacity>
              </View>
              <View style={styles.task_info_item}>
                <Text
                  style={
                    this.state.task_infomation.scheduling_mode
                      ? styles.task_info_item_label
                      : styles.task_info_item_label_disabled
                  }>
                  Scheduling Mode
                </Text>
                <TouchableOpacity
                  style={styles.task_info_item_value}
                  onPress={this.onEditTaskSchedulingMode}>
                  <Text style={styles.task_info_item_value_text}>
                    {this.state.task_infomation.scheduling_mode
                      ? this.state.task_infomation.scheduling_mode_label
                      : ''}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.task_info_item}>
                <Text
                  style={
                    this.state.task_infomation.constraint_type
                      ? styles.task_info_item_label
                      : styles.task_info_item_label_disabled
                  }>
                  Constraint Type
                </Text>
                <TouchableOpacity
                  style={styles.task_info_item_value}
                  onPress={this.onEditConstraintType}>
                  <Text style={styles.task_info_item_value_text}>
                    {this.state.task_infomation.constraint_type
                      ? this.state.task_infomation.constraint_type_label
                      : ''}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.task_info_item}>
                <Text
                  style={
                    this.state.task_infomation.constraint_date
                      ? styles.task_info_item_label
                      : styles.task_info_item_label_disabled
                  }>
                  Constraint Date
                </Text>
                <TouchableOpacity
                  style={styles.task_info_item_value}
                  onPress={this.onEditTaskConstraintDate}>
                  <Text style={styles.task_info_item_value_text}>
                    {this.state.task_infomation.constraint_date
                      ? moment
                          .utc(this.state.task_infomation.constraint_date)
                          .tz(userInfo.tz)
                          .format('DD/MM/YYYY')
                      : ''}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.task_info_item}>
                <Text style={styles.task_info_item_label}>Effort Driven</Text>
                <View style={styles.task_info_item_value}>
                  <TouchableOpacity onPress={this.onEditTaskEffortDriven}>
                    {this.state.task_infomation.effort_driven ? (
                      <Feather name={'check-square'} size={15} color={'#00f'} />
                    ) : (
                      <Feather name={'square'} size={15} color={'#000'} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.task_info_item}>
                <Text style={styles.task_info_item_label}>
                  Manually Scheduled
                </Text>
                <View style={styles.task_info_item_value}>
                  <TouchableOpacity onPress={this.onEditTaskManuallyScheduled}>
                    {this.state.task_infomation.manually_scheduled ? (
                      <Feather name={'check-square'} size={15} color={'#00f'} />
                    ) : (
                      <Feather name={'square'} size={15} color={'#000'} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.task_info_item}>
                <Text
                  style={
                    this.state.task_infomation.option
                      ? styles.task_info_item_label
                      : styles.task_info_item_label_disabled
                  }>
                  Option
                </Text>
                <TouchableOpacity
                  style={styles.task_info_item_value}
                  onPress={this.onEditTaskOption}>
                  <Text style={styles.task_info_item_value_text}>
                    {this.state.task_infomation.option_label}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.task_info_item}>
                <Text
                  style={
                    this.state.task_infomation.type_id
                      ? styles.task_info_item_label
                      : styles.task_info_item_label_disabled
                  }>
                  Type
                </Text>
                <TouchableOpacity
                  style={styles.task_info_item_value}
                  onPress={this.onEditTaskType}>
                  <Text style={styles.task_info_item_value_text_blue}>
                    {this.state.task_infomation.type_id?.[1] ?? ''}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.task_info_item}>
                <Text
                  style={
                    this.state.task_infomation.date_finished
                      ? styles.task_info_item_label
                      : styles.task_info_item_label_disabled
                  }>
                  Done Date
                </Text>
                <TouchableOpacity
                  style={styles.task_info_item_value}
                  onPress={this.onEditTaskFinishDate}>
                  <Text style={styles.task_info_item_value_text}>
                    {this.state.task_infomation.date_finished
                      ? moment
                          .utc(this.state.task_infomation.date_finished)
                          .tz(userInfo.tz)
                          .format('DD/MM/YYYY HH:mm:ss')
                      : ''}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          ) : null}
        </View>

        <View style={styles.bottom_bar}>
          <TouchableOpacity style={styles.bottom_bar_item_wrapper}>
            <View style={styles.bottom_bar_item_icon_wrapper}>
              <FontAwesome size={18} color={'#000'} name={'check-square-o'} />
              <Text style={styles.bottom_bar_item_icon_text}> 2</Text>
            </View>
            <Text style={styles.bottom_bar_item_text}>Todo List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottom_bar_item_wrapper}>
            <View style={styles.bottom_bar_item_icon_wrapper}>
              <FontAwesome size={18} color={'#000'} name={'commenting-o'} />
              <Text style={styles.bottom_bar_item_icon_text}> 5</Text>
            </View>
            <Text style={styles.bottom_bar_item_text}>Comments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottom_bar_item_wrapper}>
            <View style={styles.bottom_bar_item_icon_wrapper}>
              <FontAwesome size={18} color={'#000'} name={'clock-o'} />
              <Text style={styles.bottom_bar_item_icon_text}> 2</Text>
            </View>
            <Text style={styles.bottom_bar_item_text}>Activities</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottom_bar_item_wrapper}>
            <View style={styles.bottom_bar_item_icon_wrapper}>
              <Ionicons size={18} color={'#000'} name={'link-sharp'} />
              <Text style={styles.bottom_bar_item_icon_text}> 14</Text>
            </View>
            <Text style={styles.bottom_bar_item_text}>Attachments</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#3486eb',
    padding: 15,
  },
  header_icon_left: {
    flexDirection: 'row',
  },
  header_icon: {
    color: '#fff',
    marginLeft: 10,
    marginRight: 10,
  },
  status_bar: {
    flexDirection: 'row',
    margin: 10,
    marginBottom: 0,
  },
  status_bar_stage_wrapper: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    padding: 8,
  },
  status_bar_stage_wrapper_current: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#4e9177',
    padding: 8,
  },
  status_bar_stage: {
    flexDirection: 'row',
  },
  status_bar_stage_text: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  status_bar_stage_text_current: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    flexDirection: 'row',
  },
  status_bar_stage_end: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 16,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'red',
    transform: [{rotate: '90deg'}],
    marginRight: -12,
    marginLeft: -12,
    marginTop: 12,
  },
  task_info: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  task_name: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  info_wrapper: {
    marginBottom: 180,
  },
  task_info_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  task_info_item_label: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  task_info_item_label_disabled: {
    fontSize: 15,
    color: '#8f6f6d',
  },
  task_info_item_value: {
    width: '55%',
    borderWidth: 1,
    borderColor: '#e7e7e7',
    borderRadius: 5,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
  task_info_item_value_multy: {
    width: '55%',
    borderWidth: 1,
    borderColor: '#e7e7e7',
    borderRadius: 5,
    minHeight: 40,
    flexWrap: 'wrap',
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  task_info_item_value_text: {
    color: '#000',
  },
  task_info_item_value_text_blue: {
    color: '#00f',
  },
  assigned_item: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 1,
    margin: 2,
  },
  assigned_item_text: {
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
  },
  tag_item: {
    borderRadius: 10,
    padding: 2,
    margin: 2,
  },
  tag_item_text: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  bottom_bar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 10,
    paddingBottom: 10,
  },
  bottom_bar_item_wrapper: {
    alignItems: 'center',
  },
  bottom_bar_item_icon_wrapper: {
    flexDirection: 'row',
  },
  bottom_bar_item_icon_text: {
    color: '#000',
    fontSize: 14,
  },
  bottom_bar_item_text: {
    color: '#000',
    fontSize: 14,
  },
});

export default withGlobalContext(TaskDetail);
