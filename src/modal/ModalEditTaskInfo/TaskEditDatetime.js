import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment-timezone';

class TaskEditDatetime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDate: false,
      showTime: false,
      value: this.props.currentValue,
    };
  }

  value = () =>
    this.state.value
      ? moment(this.state.value).format('YYYY-MM-DD HH:mm:ss')
      : false;

  onShowDate = () => {
    this.setState({
      showDate: true,
    });
  };

  onShowTime = () => {
    this.setState({
      showTime: true,
    });
  };

  onChangeValueDate = (event, selectedDate) => {
    this.setState({
      value: selectedDate,
      showDate: false,
    });
  };

  onChangeValueTime = (event, selectedTime) => {
    this.setState({
      value: selectedTime,
      showTime: false,
    });
  };

  onClearValue = () => {
    this.setState({value: false});
  };

  render() {
    return (
      <View style={{width: '90%'}}>
        <TouchableOpacity
          onPress={this.onShowDate}
          style={{backgroundColor: '#f00'}}>
          <Text style={{color: '#000', fontSize: 15}}>Pick Date</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.onShowTime}
          style={{backgroundColor: '#0f0'}}>
          <Text style={{color: '#000', fontSize: 15}}>Pick Time</Text>
        </TouchableOpacity>
        <Text>
          {this.state.value
            ? moment(this.state.value).format('DD/MM/YYYY HH:mm:ss')
            : 'None'}
        </Text>
        <TouchableOpacity onPress={this.onClearValue}>
          <Text>Clear Datetime</Text>
        </TouchableOpacity>
        {this.state.showDate && (
          <DateTimePicker
            testID="datePicker"
            value={this.state.value || new Date()}
            mode={'date'}
            is24Hour={true}
            onChange={this.onChangeValueDate}
          />
        )}
        {this.state.showTime && (
          <DateTimePicker
            testID="timePicker"
            value={this.state.value || new Date()}
            mode={'time'}
            is24Hour={true}
            onChange={this.onChangeValueTime}
          />
        )}
      </View>
    );
  }
}

export default TaskEditDatetime;
