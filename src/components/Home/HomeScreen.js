import React, {Component} from 'react';
import BottomNavigation from '~/Navigation/BottomNavigation/BottomNavigation';

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
