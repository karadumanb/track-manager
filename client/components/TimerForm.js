import React from 'react'
import { Card, Form, Button, Message } from 'semantic-ui-react'
import axios from 'axios';
import { insertNewTrack, updateTrack } from './services';
var querystring = require('querystring');

class TimerForm extends React.Component {
  constructor () {
    super()

    this.state = {
      errorsList: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (submitType) {
    if (this.refs.title.value && this.refs.description.value) {
      if(submitType === 'Create') {
        insertNewTrack(this, { description: this.refs.description.value, title: this.refs.title.value, elapsed: 0, runningSince: Date.now(), updateDate: new Date().toISOString()});
      } else if(submitType === 'Update') {
        updateTrack(this, {_id: this.props.id, description: this.refs.description.value, title: this.refs.title.value});
      }
    } else {
      let errorsList = []
      if (!this.refs.title.value) {
        errorsList.push('The title cannot be empty.')
      }
      if (!this.refs.description.value) {
        errorsList.push('The description cannot be empty.')
      }
      this.setState({ errorsList })
    }
  }
  render () {
    const submitText = this.props.id ? 'Update' : 'Create'
    return (
      <Card centered>
        <Card.Content>
          <Form error={this.state.errorsList.length > 0}>
            <Form.Field>
              <label>Title</label>
              <input type='text' ref='title' defaultValue={this.props.title}/>
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <input type='text' ref='description' defaultValue={this.props.description}/>
            </Form.Field>
            <Message
              error
              list={this.state.errorsList}
            />
            <Button.Group attached='bottom'>
              <Button as='div' basic color='blue' onClick={()=>{this.handleSubmit(submitText)}}>{ submitText }</Button>
              <Button as='div' basic color='red' onClick={this.props.onFormClose}>Cancel</Button>
            </Button.Group>
          </Form>
        </Card.Content>
      </Card>
    )
  }
}

export default TimerForm
