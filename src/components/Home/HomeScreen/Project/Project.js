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

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project_id: this.props.route.params.project_id,
      project_name: this.props.route.params.project_name,
    };
  }

  loadProjectData=()=>{
    
  }

  render() {
    return (
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

          <Text style={styles.header_text}>{this.state.project_name}</Text>
        </View>
        <View>
          <ScrollView>
            <View style={styles.stage}>
              <View style={styles.stage_header}>
                <Text style={styles.stage_name}>Backlog/Feedback (26)</Text>
              </View>
              <View style={styles.task}>
                <View
                  style={{
                    ...styles.task_color,
                    backgroundColor: '#f00',
                  }}></View>
                <View style={styles.task_content}>
                  <View style={styles.task_header}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate('Task')}>
                      <Text style={styles.task_name}>
                        [Bug] Sale_Add multi product hiển thị thông báo khi
                        người dùng click vào chức năng này.
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.item_wrapper}>
                    <Text style={styles.item_label}>Status</Text>
                    <Text style={styles.task_status}>In Progress</Text>
                  </View>
                  <View style={styles.item_wrapper}>
                    <Text style={styles.item_label}>Assigned</Text>
                    <View style={styles.user_img_wrapper}>
                      <Image
                        style={styles.user_img}
                        source={require('../../../../assets/images/user.png')}
                      />
                      <Text style={{color: '#664e4d',fontSize: 18,marginLeft: 5, marginRight: 5,}}>></Text>
                      <Image
                        style={styles.user_img}
                        source={require('../../../../assets/images/user.png')}
                      />
                    </View>
                  </View>
                  <View style={styles.item_wrapper}>
                    <Text style={styles.item_label}>Priority</Text>
                    <Rating
                      ratingCount={3}
                      startingValue={1}
                      onFinishRating={num => {}}
                      imageSize={20}
                    />
                  </View>
                  <View style={styles.item_wrapper}>
                    <Text style={styles.item_label}>Deadline</Text>
                    <Text style={styles.task_deadline}>
                      2021-05-14 00:00:00
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
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
  },
  task_header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  task_name: {
    color: '#4848db',
    // paddingLeft: 10,
    // paddingRight: 15,
    fontSize: 16,
  },
  item_wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingLeft: 5,
    paddingRight: 5,
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
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  task_status: {
    color: '#000',
  },
  task_deadline: {
    color: '#f00',
  },
});

export default Project;
