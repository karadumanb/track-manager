import React, { Component } from 'react';
import '../css/App.css';
import Add from './Add';
import TimersDashboard from './TimersDashboard';

import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to={{pathname: '/login'}} style={{ textDecoration: 'none', position: 'absolute', right: '120px', top: '50px' }}>
              <Button bsStyle="danger" bsSize="small" onClick={() => {localStorage.removeItem('authenticated')}}>Logout</Button>
          </Link>
        </header>
        <TimersDashboard />
        <Add/>
      </div>
    );
  }
}

export default App;
