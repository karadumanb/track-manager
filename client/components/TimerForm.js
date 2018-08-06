import React from 'react'
import { Card, Form, Button, Message } from 'semantic-ui-react'
import axios from 'axios';
var querystring = require('querystring');

class TimerForm extends React.Component {
  constructor () {
    super()

    this.state = {
      errorsList: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  insertNewTrack(values) {
    axios.post('/insert',
        querystring.stringify({
          description: values.description.value,
          title: values.title.value,
          elapsed: 0,
          since: new Date().getTime()
        }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function(response) {
          console.log(response.data);
    });
  }
  updateTrack(values) {
    console.log(values)
    axios.post('/update',
      querystring.stringify({
        _id: values.id,
        description: values.description,
        title: values.title,
        elapsed: values.elapsed,
        since: Date.now()
      }), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(function(response) {
        console.log(response.data);
    }); 
  }
  handleSubmit (submitType) {
    if (this.refs.title.value && this.refs.description.value) {
      this.props.onFormSubmit({
        id: this.props.id,
        title: this.refs.title.value,
        description: this.refs.description.value
      })
      if(submitType === 'Create') {
        this.insertNewTrack(this.refs);
      } else if(submitType === 'Update') {
        this.updateTrack(this.refs);
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
