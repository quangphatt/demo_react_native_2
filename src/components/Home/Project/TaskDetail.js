import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Global, {withGlobalContext} from '~/provider/GlobalContext';
import ModalEditTaskInfo from '~/modal/ModalEditTaskInfo';
import StarRating from 'react-native-star-rating';
import projectManageBusiness from '~/business/ProjectManageBusiness';
import {userInfo} from '~/utils/config';

const testListStage = [
  {stage_name: 'New', stage_id: 1},
  {stage_name: 'Doing', stage_id: 2},
  {stage_name: 'Review', stage_id: 3},
  {stage_name: 'Beta Testing', stage_id: 4},
  {stage_name: 'Feedback', stage_id: 5},
  {stage_name: 'Done', stage_id: 6},
];

const currentStageId = 2;

class TaskDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {};

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
            {testListStage.map(item =>
              item.stage_id === currentStageId ? (
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
          <ScrollView>
            <Text style={styles.task_name}>
              {this.props.route.params.task_name}
            </Text>
            <View style={styles.task_info_item}>
              <Text style={styles.task_info_item_label}>Task Number</Text>
              <TouchableOpacity
                style={styles.task_info_item_value}
                onPress={() =>
                  this.onEditTaskInfo('Task Number', '0002082002')
                }>
                <Text style={styles.task_info_item_value_text}>0008022002</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.task_info_item}>
              <Text style={styles.task_info_item_label}>Priority</Text>
              <View style={styles.task_info_item_value}>
                <StarRating
                  disabled={false}
                  maxStars={3}
                  rating={2}
                  starSize={18}
                  fullStarColor={'#f0c735'}
                  selectedStar={rating => {}}
                />
              </View>
            </View>
            <View style={styles.task_info_item}>
              <Text style={styles.task_info_item_label}>Project</Text>
              <TouchableOpacity
                style={styles.task_info_item_value}
                onPress={() => this.onEditTaskInfo('Project', 'XBOSS UI/UX')}>
                <Text style={styles.task_info_item_value_text}>
                  XBOSS UI/UX
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.task_info_item}>
              <Text style={styles.task_info_item_label}>Tag</Text>
              <TouchableOpacity
                style={styles.task_info_item_value}
                onPress={() => this.onEditTaskInfo('Tag', 'XBOSS UI/UX')}>
                <Text style={styles.task_info_item_value_text}>
                  XBOSS UI/UX
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.task_info_item}>
              <Text style={styles.task_info_item_label}>Type</Text>
              <TouchableOpacity
                style={styles.task_info_item_value}
                onPress={() => this.onEditTaskInfo('Type', 'XBOSS UI/UX')}>
                <Text style={styles.task_info_item_value_text}>
                  XBOSS UI/UX
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.task_info_item}>
              <Text style={styles.task_info_item_label}>WBS ID</Text>
              <TouchableOpacity style={styles.task_info_item_value}>
                <Text style={styles.task_info_item_value_text}>
                  XBOSS UI/UX
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.task_info_item}>
              <Text style={styles.task_info_item_label}>Parent Task</Text>
              <TouchableOpacity style={styles.task_info_item_value}>
                <Text style={styles.task_info_item_value_text}>
                  XBOSS UI/UX
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.task_info_item}>
              <Text style={styles.task_info_item_label}>Assigned To</Text>
              <TouchableOpacity style={styles.task_info_item_value}>
                <Text style={styles.task_info_item_value_text}>
                  XBOSS UI/UX
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.task_info_item}>
              <Text style={styles.task_info_item_label}>Assigned Team</Text>
              <TouchableOpacity style={styles.task_info_item_value}>
                <Text style={styles.task_info_item_value_text}>
                  Design Team
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.task_info_item}>
              <Text style={styles.task_info_item_label}>Reported By</Text>
              <TouchableOpacity style={styles.task_info_item_value}>
                <Text style={styles.task_info_item_value_text}>Admin</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.task_info_item}>
              <Text style={styles.task_info_item_label}>Deadline</Text>
              <TouchableOpacity style={styles.task_info_item_value}>
                <Text style={styles.task_info_item_value_text}>12/08/2022</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.task_info_item}>
              <Text style={styles.task_info_item_label}>Task Number</Text>
              <TouchableOpacity style={styles.task_info_item_value}>
                <Text style={styles.task_info_item_value_text}>Finish</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
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
    marginBottom: 150,
  },
  task_name: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
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
  task_info_item_value: {
    width: '55%',
    borderWidth: 1,
    borderColor: '#e7e7e7',
    borderRadius: 5,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  task_info_item_value_text: {
    color: '#000',
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
