import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {withGlobalContext} from '~/provider/GlobalContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import projectManageBusiness from '~/business/ProjectManageBusiness';

import {userInfo} from '~/utils/config';

const projectColor = {
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
      allProject: [],
    };
  }

  componentDidMount = async () => {
    //Load All Project
    let arrres = [];
    let result = await projectManageBusiness.getProjectStatus(
      userInfo.uid,
      userInfo.lang,
      userInfo.tz,
    );
    if (result.status === 'success') {
      arrres = result.data.map(item => ({
        status: item.project_status[0],
        status_name: item.project_status[1],
        count: item.project_status_count,
        fold: item.__fold,
        projects: [],
      }));
      let res = await projectManageBusiness.getAllProject(
        userInfo.uid,
        userInfo.lang,
        userInfo.tz,
      );
      if (res.status === 'success') {
        res.data.records.forEach(itemProject => {
          for (let i = 0; i < arrres.length; i++) {
            if (itemProject.project_status[0] === arrres[i].status) {
              arrres[i].projects.push(itemProject);
            }
          }
        });
      }
    }

    this.setState({
      allProject: arrres,
    });
  };

  openDrawerNavigation = () => this.props.navigation.openDrawer();

  onChangeProjectIsFavorite = async (
    project_status,
    project_id,
    is_favorite,
  ) => {
    let result = await projectManageBusiness.changeProjectIsFavorite(
      project_id,
      is_favorite,
      userInfo.uid,
      userInfo.lang,
      userInfo.tz,
    );
    if (result.status === 'success') {
      let res = this.state.allProject;

      let project_status_index = res.findIndex(
        item => item.status === project_status,
      );

      let project_index = res[project_status_index].projects.findIndex(
        item => item.id === project_id,
      );

      res[project_status_index].projects[project_index].is_favorite =
        is_favorite;

      this.setState({
        allProject: res,
      });
    }
  };

  loadProjectTask = itemProject => {
    this.props.navigation.navigate('MenuNavigation', {
      screen: 'TaskNavigation',
      params: {
        screen: 'Task',
        params: {
          project_id: itemProject.id,
          project_name: itemProject.name,
          domain: [['project_id', '=', itemProject.id]],
        },
      },
    });
  };

  setFold = (item, value) => {
    item.fold = value;
    let res = this.state.allProject;
    res[res.findIndex(it => it.status === item.status)] = item;
    this.setState({allProject: res});
  };

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
          <Text style={styles.header_text}>All Projects</Text>
        </View>
        <View style={{flex: 1}}>
          <ScrollView horizontal={true}>
            {this.state.allProject.map(item =>
              item.fold ? (
                <View style={styles.project_group_fold} key={item.status}>
                  <TouchableOpacity onPress={() => this.setFold(item, false)}>
                    <View style={styles.project_group_header_fold}>
                      <FontAwesome5
                        size={20}
                        color={'#a1a1a1'}
                        name={'arrows-alt-h'}
                      />
                      <View style={styles.project_type_fold_wrapper}>
                        <Text style={styles.project_type_fold}>
                          {item.status_name} ({item.count})
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.project_group} key={item.status}>
                  <View style={styles.project_group_header}>
                    <Text style={styles.project_type}>
                      {item.status_name} ({item.count})
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.setFold(item, true)}
                      style={{width: 30, alignItems: 'flex-end'}}>
                      <FontAwesome5
                        size={20}
                        color={'#261d1d'}
                        name={'ellipsis-v'}
                      />
                    </TouchableOpacity>
                  </View>
                  <ScrollView>
                    {item.projects.map(itemProject => (
                      <View style={styles.project} key={itemProject.id}>
                        <View
                          style={{
                            ...styles.project_color,
                            backgroundColor: itemProject.color
                              ? projectColor[itemProject.color]
                              : '#fff',
                          }}></View>
                        <View style={styles.project_content}>
                          <View style={styles.project_header}>
                            <TouchableOpacity
                              onPress={() =>
                                this.onChangeProjectIsFavorite(
                                  item.status,
                                  itemProject.id,
                                  !itemProject.is_favorite,
                                )
                              }>
                              {itemProject.is_favorite ? (
                                <AntDesign
                                  size={20}
                                  color={'#ffdd00'}
                                  name={'star'}
                                />
                              ) : (
                                <AntDesign
                                  size={20}
                                  color={'#848a6d'}
                                  name={'staro'}
                                />
                              )}
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() => this.loadProjectTask(itemProject)}>
                              <Text style={styles.project_name}>
                                {itemProject.name}
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <Text style={styles.project_username}>
                            {itemProject.user_id[1]}
                          </Text>
                          <Text style={styles.project_task_count}>
                            {itemProject.task_count} Tasks
                          </Text>
                        </View>
                      </View>
                    ))}
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
    fontSize: 18,
  },
  project_group: {
    width: 360,
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderColor: '#ced4da',
    borderWidth: 1,
    marginBottom: 0,
  },
  project_group_fold: {
    width: 60,
    backgroundColor: '#ececec',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    marginBottom: 0,
  },
  project_group_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  project_group_header_fold: {
    alignItems: 'center',
  },
  project_type: {
    color: '#4848db',
    fontSize: 16,
  },
  project_type_fold_wrapper: {
    marginTop: 10,
    height: 200,
    width: 40,
  },
  project_type_fold: {
    color: '#4848db',
    padding: 7,
    fontSize: 16,
    transform: [{rotate: '90deg'}, {translateX: 80}, {translateY: 80}],
    height: 40,
    width: 200,
  },
  project: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d6d5ce',
    marginTop: 10,
    flexDirection: 'row',
  },
  project_color: {
    width: 6,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  project_content: {
    padding: 10,
  },
  project_header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  project_name: {
    color: '#4848db',
    paddingLeft: 10,
    paddingRight: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  project_username: {
    marginLeft: 30,
    color: '#828076',
    fontSize: 15,
    marginBottom: 5,
  },
  project_task_count: {
    marginLeft: 20,
    color: '#4848db',
    fontSize: 14,
  },
});

export default withGlobalContext(Project);
