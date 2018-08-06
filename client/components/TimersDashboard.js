import React from 'react'
import { Grid } from 'semantic-ui-react'
import uuid from 'uuid'
import axios from 'axios'

import EditableTimerList from './EditableTimerList'
import ToggleableTimerForm from './ToggleableTimerForm'
import { newTimer } from './helpers'

class TimerDashboard extends React.Component {
  constructor () {
    super()

    this.state = {
      timers: [
        {
          title: 'Learn NodeJs',
          description: 'Create time tracker app',
          id: uuid.v4(),
          elapsed: 7423081,
          runningSince: Date.now()
        },
        {
          title: 'MERN || MEAN STACK',
          description: 'Use nodeJs, react, angular and PHP',
          id: uuid.v4(),
          elapsed: 1981207,
          runningSince: null
        }
      ]
    }
    this.getData = this.getData.bind(this);
  }

  getData(that){
    //I wanted to add filters here
    axios.get('/getAll')
      .then(function(response) {
          let savedTimers = that.state.timers;
          response.data.forEach((timer)=>{
            savedTimers.push({
              title: timer.title, 
              description: timer.description, 
              id: timer._id || uuid.v4(),
              elapsed: timer.elapsed || 0,
              runningSince: timer.since || null
            });
          })
        that.setState({timers: savedTimers});
      });
  }
  componentDidMount() {
    this.getData(this);
  }
  updateTimer (attrs) {
    this.setState({
      timers: this.state.timers.map(timer => {
        if (timer.id === attrs.id) {
          return Object.assign({}, timer, {
            title: attrs.title,
            description: attrs.description
          })
        } else {
          return timer
        }
      })
    })
  }
  createTimer (timer) {
    const t = newTimer(timer)
    this.setState({
      timers: this.state.timers.concat(t)
    })
  }
  deleteTimer (timerId) {
    this.setState({
      timers: this.state.timers.filter(t => t.id !== timerId)
    })
  }
  startTimer (timerId) {
    const now = Date.now()

    this.setState({
      timers: this.state.timers.map(timer => {
        if (timer.id === timerId) {
          return Object.assign({}, timer, {
            runningSince: now
          })
        } else {
          return timer
        }
      })
    })
  }
  stopTimer (timerId) {
    const now = Date.now()

    this.setState({
      timers: this.state.timers.map(timer => {
        if (timer.id === timerId) {
          const lastElapsed = now-timer.runningSince
          return Object.assign({}, timer, {
            elapsed: timer.elapsed + lastElapsed,
            runningSince: null
          })
        } else {
          return timer
        }
      })
    })
  }
  render () {
    return (
      <Grid centered>
        <Grid.Column mobile={16} tablet={8} computer={4}>
          <EditableTimerList
            timers={this.state.timers}
            onFormSubmit={attrs => this.updateTimer(attrs)}
            onTrashClick={timerId => this.deleteTimer(timerId)}
            onStartClick={timerId => this.startTimer(timerId)}
            onStopClick={timerId => this.stopTimer(timerId)}
          />
          <ToggleableTimerForm
            onFormSubmit={timer => this.createTimer(timer)}
          />
        </Grid.Column>
      </Grid>
    )
  }
}

export default TimerDashboard
