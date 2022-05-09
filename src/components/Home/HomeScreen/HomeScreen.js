import React, {Component} from 'react';
import BottomNavigation from '../../../Navigation/BottomNavigation/BottomNavigation';

// TODO: Gom những gì thuộc Navigation thành 1 Folder riêng, không nên viết chung với Component

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <BottomNavigation />
    );
  }
}



export default HomeScreen;
