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
import {Rating} from 'react-native-ratings';
import {withGlobalContext} from '~/provider/GlobalContext';
import {avatarURL, partnerAvatarURL} from '~/service/configURL';
import {onChangeTaskPriority} from '~/business/ProjectManageBusiness';

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

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_id: this.props.route.params.project_id,
      project_name: this.props.route.params.project_name,
      allTask: this.props.route.params.allTask,
    };
  }

  openDrawerNavigation = () => this.props.navigation.openDrawer();

  loadTaskScreen = itemTask =>
    this.props.navigation.navigate('Task', {
      task_id: itemTask.id,
      task_name: itemTask.name,
    });

  onChangeTaskPriority = async (num, itemTask) =>
    this.setState({
      allTask: await onChangeTaskPriority(
        this.props.global.uid,
        this.props.global.lang,
        this.state.project_id,
        itemTask.id,
        num,
      ),
    });

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.header_icon_wrapper}
            onPress={this.openDrawerNavigation}>
            <FontAwesome5
              style={styles.header_icon}
              size={20}
              name={'align-left'}
            />
          </TouchableOpacity>

          <Text style={styles.header_text}>{this.state.project_name}</Text>
        </View>
        <View>
          <ScrollView horizontal={true}>
            {this.state.allTask.map(item => (
              <View style={styles.stage} key={item.stage_id}>
                <View style={styles.stage_header}>
                  <Text style={styles.stage_name}>
                    {item.stage_name || 'Undefined'} ({item.stage_count})
                  </Text>
                </View>
                <ScrollView>
                  {item.tasks.map(itemTask => (
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
                                    partnerAvatarURL + itemTask.creator_id[0],
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
                          <Rating
                            ratingCount={3}
                            startingValue={itemTask.priority}
                            onFinishRating={num =>
                              this.onChangeTaskPriority(num, itemTask)
                            }
                            imageSize={20}
                          />
                        </View>
                        {itemTask.date_deadline && (
                          <View style={styles.item_wrapper}>
                            <Text style={styles.item_label}>Deadline</Text>
                            <Text style={styles.task_deadline}>
                              {itemTask.date_deadline}
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e9ecf2',
    paddingBottom: 120,
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
  },
  stage_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  stage_name: {
    color: '#4848db',
    fontSize: 16,
    fontWeight: 'bold',
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

export default withGlobalContext(Project);
