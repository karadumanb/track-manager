import React, { Component } from 'react';
import '../css/App.css';
import Email from './Email';
import TimersDashboard from './TimersDashboard';

import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to={{pathname: '/login'}}>
              <Button bsStyle="danger" bsSize="small" onClick={() => {localStorage.removeItem('authenticated')}}>Logout</Button>
          </Link>
        </header>
        <TimersDashboard />
        <Email/>
      </div>
    );
  }
}

export default App;
