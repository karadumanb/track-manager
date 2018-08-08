import React from 'react'

import TimerForm from './TimerForm'
import Timer from './Timer'

class EditableTimer extends React.Component {
  constructor () {
    super()
    this.state = {
      editFormOpen: false
    }
  }
  closeForm () {
    this.setState({ editFormOpen: false })
  }
  openForm () {
    this.setState({ editFormOpen: true })
  }
  datePipe(updateDate) {
    let date = new Date(updateDate);
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();
    var hh = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();
    if (dt < 10) {
      dt = '0' + dt;
    }
    if (month < 10) {
      month = '0' + month;
    }
    if (hh.toString().length === 1) {
      hh = '0' + hh;
    }
    if (mm.toString().length === 1) {
      mm = '0' + mm;
    }
    if (ss.toString().length === 1) {
      ss = '0' + ss;
    }
    return `${dt} ${month} ${year} - ${hh}:${mm}:${ss}`
  }
  render () {
    const date = this.datePipe(this.props.updateDate);
    if (this.state.editFormOpen) {
      return (
        <TimerForm
          id={this.props.id}
          title={this.props.title}
          description={this.props.description}
          onFormSubmit={timer => {
            this.props.onFormSubmit(timer)
            this.closeForm()
          }}
          onFormClose={e => this.closeForm()}
        />
      )
    } else {
      return (
        <Timer
          id={this.props.id}
          title={this.props.title}
          description={this.props.description}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
          updateDate={date}
          onEditClick={() => this.openForm()}
          onTrashClick={this.props.onTrashClick}
          onStartClick={this.props.onStartClick}
          onStopClick={this.props.onStopClick}
        />
      )
    }
  }
}

export default EditableTimer
