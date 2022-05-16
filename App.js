import React, {Component} from 'react';
import AppNavigation from './src/Navigation/AppNavigation/AppNavigation';
import GlobalContext from './src/provider/GlobalContext'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
