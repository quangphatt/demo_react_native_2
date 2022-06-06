import React, {Component} from 'react';
import AppNavigation from './src/Navigation/AppNavigation/AppNavigation';
import GlobalContext from './src/provider/GlobalContext';

import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
  'Warning: Each child in a list should have a unique "key" prop.',
]);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <GlobalContext>
        <AppNavigation />
      </GlobalContext>
    );
  }
}

export default App;
