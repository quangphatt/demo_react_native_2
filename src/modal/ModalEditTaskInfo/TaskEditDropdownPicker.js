import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

class TaskEditDropdownPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: this.props.currentValue,
      listItem: [{value: this.props.currentValue, label: 'Loading...'}],
      openDropdown: false,
    };
  }

  componentDidMount = async () => {
    let res = await this.props.getListItem();
    this.setState({
      listItem: res,
    });
  };

  value = () => [
    this.state.currentValue,
    this.state.listItem.find(item => item.value === this.state.currentValue)
      .label,
  ];

  setOpenDropdown = () => {
    this.setState({openDropdown: true});
  };

  setValue = newValue => {
    this.setState({
      currentValue: newValue(),
    });
  };

  render() {
    return (
      <ScrollView style={{width: '100%'}}>
        <DropDownPicker
          items={this.state.listItem}
          value={this.state.currentValue}
          open={this.state.openDropdown}
          setOpen={this.setOpenDropdown}
          setValue={this.setValue}
          style={{borderColor: '#000', borderRadius: 10}}
          labelStyle={{fontSize: 15, color: '#000'}}
          listMode="MODAL"
          modalProps={{
            onRequestClose: () => {
              this.setState({openDropdown: false});
            },
          }}
          modalTitle={'Select ' + this.props.label}
          searchable={false}
          zIndex={99}
        />
      </ScrollView>
    );
  }
}

export default TaskEditDropdownPicker;
