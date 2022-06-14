import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import {Modalize} from 'react-native-modalize';

class ComponentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
    };
    this.modalizeRef = React.createRef();
  }

  open = ({content}) => {
    this.setState({content: content}, () => {
      this.modalizeRef.current.open();
    });
  };

  close = ({callback}) => {
    if (typeof callback === 'function') {
      callback();
    }
    this.modalizeRef.current.close();
  };

  render() {
    return (
      <Modalize
        ref={this.modalizeRef}
        adjustToContentHeight={true}
        closeOnOverlayTap={true}>
        {this.state.content}
      </Modalize>
    );
  }
}

export default ComponentModal;
