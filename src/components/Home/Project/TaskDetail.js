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
import ModalEditTaskInfo from '~/modal/ModalEditTaskInfo';
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
        task_infomation: taskInfo,
      });
    }

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

    console.log(this.state.task_infomation);

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
  };

  BackToTaskScreen = () => {
    this.props.navigation.goBack();
  };

  onChangeStage = () => {};

  onEditTaskInfo = (info_label, info_value) => {
    Global._showModal({
      content: (
        <ModalEditTaskInfo
          hideModal={() => {
            Global._hideModal({callback: null});
          }}
          label={info_label}
          value={info_value}
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
                    onPress={this.onChangeStage}
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
          <Text style={styles.task_name}>
            {this.props.route.params.task_name}
          </Text>
          {this.state.task_infomation ? (
            <ScrollView style={styles.info_wrapper}>
              <View style={styles.task_info_item}>
                <Text style={styles.task_info_item_label}>Task Number</Text>
                <TouchableOpacity
                  style={styles.task_info_item_value}
                  onPress={() =>
                    this.onEditTaskInfo(
                      'Task Number',
                      this.state.task_infomation.task_number,
                    )
                  }>
                  <Text style={styles.task_info_item_value_text}>
                    {this.state.task_infomation.task_number}
                  </Text>
                </TouchableOpacity>
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
                <TouchableOpacity style={styles.task_info_item_value}>
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
                <TouchableOpacity style={styles.task_info_item_value}>
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
                <TouchableOpacity style={styles.task_info_item_value}>
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
                <TouchableOpacity style={styles.task_info_item_value}>
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
                <TouchableOpacity style={styles.task_info_item_value}>
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
                <TouchableOpacity style={styles.task_info_item_value}>
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
                <TouchableOpacity style={styles.task_info_item_value}>
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
                <TouchableOpacity style={styles.task_info_item_value}>
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
                <TouchableOpacity style={styles.task_info_item_value}>
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
                    this.state.task_infomation.need_install
                      ? styles.task_info_item_label
                      : styles.task_info_item_label_disabled
                  }>
                  Need Install
                </Text>
                <TouchableOpacity style={styles.task_info_item_value}>
                  <Text style={styles.task_info_item_value_text}></Text>
                </TouchableOpacity>
              </View>
              <View style={styles.task_info_item}>
                <Text
                  style={
                    this.state.task_infomation.milestone_id
                      ? styles.task_info_item_label
                      : styles.task_info_item_label_disabled
                  }>
                  Milestones
                </Text>
                <TouchableOpacity style={styles.task_info_item_value}>
                  <Text style={styles.task_info_item_value_text_blue}>
                    {this.state.task_infomation.milestone_id?.[1] ?? ''}
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
                <TouchableOpacity style={styles.task_info_item_value}>
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
                <TouchableOpacity style={styles.task_info_item_value}>
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
                    selectedStar={rating => {}}
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
                <TouchableOpacity style={styles.task_info_item_value}>
                  <Text style={styles.task_info_item_value_text}>
                    {this.state.task_infomation.scheduling_mode ?? ''}
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
                <TouchableOpacity style={styles.task_info_item_value}>
                  <Text style={styles.task_info_item_value_text}>
                    {this.state.task_infomation.constraint_type ?? ''}
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
                <TouchableOpacity style={styles.task_info_item_value}>
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
                <TouchableOpacity style={styles.task_info_item_value}>
                  {this.state.task_infomation.effort_driven ? (
                    <Feather name={'check-square'} size={15} color={'#00f'} />
                  ) : (
                    <Feather name={'square'} size={15} color={'#000'} />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.task_info_item}>
                <Text style={styles.task_info_item_label}>
                  Manually Scheduled
                </Text>
                <TouchableOpacity style={styles.task_info_item_value}>
                  {this.state.task_infomation.manually_scheduled ? (
                    <Feather name={'check-square'} size={15} color={'#00f'} />
                  ) : (
                    <Feather name={'square'} size={15} color={'#000'} />
                  )}
                </TouchableOpacity>
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
                <TouchableOpacity style={styles.task_info_item_value}>
                  <Text style={styles.task_info_item_value_text}>
                    {this.state.task_infomation.option}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.task_info_item}>
                <Text
                  style={
                    this.state.task_infomation.product_backlog_id
                      ? styles.task_info_item_label
                      : styles.task_info_item_label_disabled
                  }>
                  Request
                </Text>
                <TouchableOpacity style={styles.task_info_item_value}>
                  <Text style={styles.task_info_item_value_text_blue}>
                    {this.state.task_infomation.product_backlog_id?.[1] ?? ''}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.task_info_item}>
                <Text
                  style={
                    this.state.task_infomation.sprint_id
                      ? styles.task_info_item_label
                      : styles.task_info_item_label_disabled
                  }>
                  Sprint
                </Text>
                <TouchableOpacity style={styles.task_info_item_value}>
                  <Text style={styles.task_info_item_value_text_blue}>
                    {this.state.task_infomation.sprint_id?.[1] ?? ''}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.task_info_item}>
                <Text
                  style={
                    this.state.task_infomation.release_id
                      ? styles.task_info_item_label
                      : styles.task_info_item_label_disabled
                  }>
                  Release
                </Text>
                <TouchableOpacity style={styles.task_info_item_value}>
                  <Text style={styles.task_info_item_value_text_blue}>
                    {this.state.task_infomation.release_id?.[1] ?? ''}
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
                <TouchableOpacity style={styles.task_info_item_value}>
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
                <TouchableOpacity style={styles.task_info_item_value}>
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
