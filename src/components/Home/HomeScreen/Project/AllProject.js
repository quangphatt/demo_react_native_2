import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {AuthContext} from '../../../../context/AuthContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

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

class AllProject extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      // TODO: Tách Context Provider + Consumer ra 1 file riêng và quản lý state ở đó, không để rời rạc như vậy
      <AuthContext.Consumer>
        {context => (
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.header_icon_wrapper}
                onPress={() => this.props.navigation.openDrawer()}>
                <FontAwesome5
                  style={styles.header_icon}
                  size={20}
                  name={'align-left'}
                />
              </TouchableOpacity>

              <Text style={styles.header_text}>All Projects</Text>
            </View>
            <View>
              <ScrollView>
                <ScrollView horizontal={true}>
                  {context.allProject.map(item => (
                    <View style={styles.project_group} key={item.status}>
                      <View style={styles.project_group_header}>
                        <Text style={styles.project_type}>
                          {item.status_name} ({item.count})
                        </Text>
                        <TouchableOpacity>
                          <FontAwesome5
                            size={20}
                            color={'#261d1d'}
                            name={'ellipsis-v'}
                          />
                        </TouchableOpacity>
                      </View>
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
                                  context.changeProjectIsfavorite(
                                    itemProject.id,
                                    item.status,
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
                              <TouchableOpacity>
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
                    </View>
                  ))}
                </ScrollView>
              </ScrollView>
            </View>
          </View>
        )}
      </AuthContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e9ecf2',
    paddingBottom: 100,
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
    marginBottom: 0,
  },
  project_group_header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  project_type: {
    color: '#4848db',
    fontSize: 16,
  },
  project: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#d6d5ce',
    marginTop: 10,
    flexDirection: 'row',
  },
  project_color: {
    width: 8,
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

export default AllProject;
