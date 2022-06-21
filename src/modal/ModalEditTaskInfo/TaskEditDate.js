import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment-timezone';

class TaskEditDate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDate: false,
      value: this.props.currentValue,
    };
  }

  value = () =>
    this.state.value ? moment(this.state.value).format('YYYY-MM-DD') : false;

  onShowDate = () => {
    this.setState({
      showDate: true,
    });
  };

  onChangeValueDate = (event, selectedDate) => {
    this.setState({
      value: selectedDate,
      showDate: false,
    });
  };

  onClearValue = () => {
    this.setState({value: false});
  };

  render() {
    return (
      <View style={{width: '90%'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            height: 30,
          }}>
          <TouchableOpacity
            onPress={this.onShowDate}
            style={{
              backgroundColor: '#856663',
              width: '30%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text style={{color: '#fff', fontSize: 15}}>Pick Date</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onClearValue}
            style={{
              backgroundColor: '#f24235',
              width: '30%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text style={{color: '#000'}}>Clear</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            margin: 10,
            height: 25,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: '#000',
            borderWidth: 1,
            borderRadius: 5,
          }}>
          <Text style={{color: '#000'}}>
            {this.state.value
              ? moment(this.state.value).format('DD/MM/YYYY')
              : '(None)'}
          </Text>
        </View>

        {this.state.showDate && (
          <DateTimePicker
            testID="datePicker"
            value={this.state.value || new Date()}
            mode={'date'}
            onChange={this.onChangeValueDate}
          />
        )}
      </View>
    );
  }
}

export default TaskEditDate;
