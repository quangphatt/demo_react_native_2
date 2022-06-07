import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import StarRating from 'react-native-star-rating';
import {withGlobalContext} from '~/provider/GlobalContext';
import {avatarURL, partnerAvatarURL} from '~/service/configURL';
import projectManageBusiness from '~/business/ProjectManageBusiness';
import {userInfo} from '~/utils/config';

const taskColor = {
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

class AllTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTasks: [],
    };
  }

  componentDidMount = async () => {
    // Load Tasks
    let result = await projectManageBusiness.getStage(
      userInfo.uid,
      userInfo.lang,
      this.props.route.params.domain,
    );
    if (result.status === 'success') {
      let allTask = result.data.map(item => ({
        stage_id: item.stage_id[0],
        stage_name: item.stage_id[1],
        stage_count: item.stage_id_count,
        fold: item.__fold,
        tasks: [],
      }));

      for (let i = 0; i < allTask.length; i++) {
        if (!allTask[i].fold) {
          allTask[i].tasks = await this.getTaskByStage(allTask[i].stage_id);
        }
      }
      this.setState({allTasks: allTask});
    }
  };

  getTaskByStage = async stage_id => {
    let res = await projectManageBusiness.getTasks(
      userInfo.uid,
      userInfo.lang,
      stage_id,
      this.props.route.params.domain,
    );
    if (res.status === 'success') {
      return res.data.records;
    } else {
      return [];
    }
  };

  openDrawerNavigation = () => this.props.navigation.openDrawer();

  backProjectScreen = () =>
    this.props.navigation.navigate('MenuNavigation', {
      screen: 'ProjectNavigation',
      params: {
        screen: 'Project',
      },
    });

  loadTaskScreen = itemTask =>
    this.props.navigation.navigate('TaskDetail', {
      task_id: itemTask.id,
      task_name: itemTask.name,
    });

  onChangeTaskPriority = async (newPriority, stage_id, task_id) => {
    let result = await projectManageBusiness.changeTaskPriority(
      userInfo.uid,
      userInfo.lang,
      task_id,
      newPriority,
    );
    if (result.status === 'success') {
      let res = this.state.allTasks;

      let stageIndex = res.findIndex(item => item.stage_id === stage_id);
      let taskIndex = res[stageIndex].tasks.findIndex(
        item => item.id === task_id,
      );

      res[stageIndex].tasks[taskIndex].priority = newPriority.toString();

      this.setState({
        allTasks: res,
      });
    }
  };

  setFold = async (stage_id, value) => {
    let res = this.state.allTasks;
    let stage_index = res.findIndex(item => item.stage_id === stage_id);
    res[stage_index].fold = value;

    if (!value) {
      if (res[stage_index].tasks.length === 0) {
        let tasks = await this.getTaskByStage(stage_id);

        res[stage_index].tasks = tasks;
      }
    }

    this.setState({
      allTasks: res,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {this.props.route.params.project_id ? (
            <TouchableOpacity
              style={styles.header_icon_wrapper}
              onPress={this.backProjectScreen}>
              <FontAwesome5
                style={styles.header_icon}
                size={20}
                name={'arrow-left'}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.header_icon_wrapper}
              onPress={this.openDrawerNavigation}>
              <FontAwesome5
                style={styles.header_icon}
                size={20}
                name={'align-left'}
              />
            </TouchableOpacity>
          )}

          <Text style={styles.header_text}>
            {this.props.route.params.project_name || 'All Tasks'}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <ScrollView horizontal={true}>
            {this.state.allTasks.map(item =>
              item.fold ? (
                <View style={styles.stage_fold} key={item.stage_id}>
                  <TouchableOpacity
                    onPress={() => this.setFold(item.stage_id, false)}>
                    <View style={styles.stage_header_fold}>
                      <FontAwesome5
                        size={20}
                        color={'#a1a1a1'}
                        name={'arrows-alt-h'}
                      />
                      <View style={styles.stage_name_fold_wrapper}>
                        <Text style={styles.stage_name_fold}>
                          {item.stage_name || 'Undefined'} ({item.stage_count})
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.stage} key={item.stage_id}>
                  <View style={styles.stage_header}>
                    <Text style={styles.stage_name}>
                      {item.stage_name || 'Undefined'} ({item.stage_count})
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.setFold(item.stage_id, true)}
                      style={{width: 30, alignItems: 'flex-end'}}>
                      <FontAwesome5
                        size={20}
                        color={'#261d1d'}
                        name={'ellipsis-v'}
                      />
                    </TouchableOpacity>
                  </View>
                  <ScrollView>
                    {item.tasks
                      ? item.tasks.map(itemTask => (
                          <View style={styles.task} key={itemTask.id}>
                            <View
                              style={{
                                ...styles.task_color,
                                backgroundColor: itemTask.color
                                  ? taskColor[itemTask.color]
                                  : '#fff',
                              }}></View>
                            <View style={styles.task_content}>
                              <View style={styles.task_header}>
                                <TouchableOpacity
                                  onPress={() => this.loadTaskScreen(itemTask)}>
                                  <Text style={styles.task_name}>
                                    {itemTask.name}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                              <View style={styles.item_wrapper}>
                                <Text style={styles.item_label}>Status</Text>
                                <Text style={styles.task_status}>
                                  {itemTask.kanban_state_label}
                                </Text>
                              </View>
                              <View style={styles.item_wrapper}>
                                <Text style={styles.item_label}>Assigned</Text>
                                <View style={styles.user_img_wrapper}>
                                  <Image
                                    style={styles.user_img}
                                    source={
                                      {
                                        uri:
                                          partnerAvatarURL +
                                          itemTask.creator_id[0],
                                      } || require('~/assets/images/user.png')
                                    }
                                  />
                                  <Text
                                    style={{
                                      color: '#664e4d',
                                      fontSize: 18,
                                      marginLeft: 5,
                                      marginRight: 5,
                                    }}>
                                    >
                                  </Text>
                                  <Image
                                    style={styles.user_img}
                                    source={
                                      {uri: avatarURL + itemTask.user_id[0]} ||
                                      require('~/assets/images/user.png')
                                    }
                                  />
                                </View>
                              </View>
                              <View style={styles.item_wrapper}>
                                <Text style={styles.item_label}>Priority</Text>
                                <StarRating
                                  disabled={false}
                                  maxStars={3}
                                  rating={parseInt(itemTask.priority)}
                                  starSize={18}
                                  fullStarColor={'#f0c735'}
                                  selectedStar={rating => {
                                    this.onChangeTaskPriority(
                                      rating,
                                      item.stage_id,
                                      itemTask.id,
                                    );
                                  }}
                                />
                              </View>
                              {itemTask.date_deadline && (
                                <View style={styles.item_wrapper}>
                                  <Text style={styles.item_label}>
                                    Deadline
                                  </Text>
                                  <Text style={styles.task_deadline}>
                                    {itemTask.date_deadline}
                                  </Text>
                                </View>
                              )}
                            </View>
                          </View>
                        ))
                      : null}
                  </ScrollView>
                </View>
              ),
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    height: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3486eb',
    paddingTop: 15,
    paddingBottom: 15,
  },
  header_icon_wrapper: {
    position: 'absolute',
    left: 20,
  },
  header_icon: {
    color: '#fff',
  },
  header_text: {
    color: '#fff',
    fontSize: 20,
  },
  stage: {
    width: 360,
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    marginBottom: 0,
    borderColor: '#ced4da',
    borderWidth: 1,
  },
  stage_fold: {
    width: 60,
    backgroundColor: '#ececec',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    marginBottom: 0,
  },
  stage_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  stage_header_fold: {
    alignItems: 'center',
  },
  stage_name: {
    color: '#4848db',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stage_name_fold_wrapper: {
    marginTop: 10,
    height: 200,
    width: 40,
  },
  stage_name_fold: {
    color: '#4848db',
    fontWeight: 'bold',
    padding: 7,
    fontSize: 16,
    transform: [{rotate: '90deg'}, {translateX: 80}, {translateY: 80}],
    height: 40,
    width: 200,
  },
  task: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d6d5ce',
    marginTop: 10,
    flexDirection: 'row',
  },
  task_color: {
    width: 6,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  task_content: {
    padding: 10,
    width: '100%',
  },
  task_header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  task_name: {
    color: '#4848db',
    fontSize: 16,
  },
  item_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingRight: 10,
  },
  item_label: {
    color: '#000',
    fontSize: 13,
  },
  user_img_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  user_img: {
    width: 25,
    height: 25,
    borderRadius: 15,
  },
  task_status: {
    color: '#000',
  },
  task_deadline: {
    color: '#f00',
  },
});

export default withGlobalContext(AllTask);
