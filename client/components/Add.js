import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';
var querystring = require('querystring');
class Add extends React.Component {
constructor() {
    super();
    this.state = {
        description: '',
        title: '',
        messageFromServer: '',
        modalIsOpen: false
    }
    this.onClick = this.onClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.insertNewTrack = this.insertNewTrack.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
}

openModal() {
    this.setState({
        modalIsOpen: true
    });
}
closeModal() {
    this.setState({
        modalIsOpen: false,
        description: '',
        title: '',
        messageFromServer: ''
    });
}
onClick(e) {
      this.insertNewTrack(this);
}
insertNewTrack(e) {
    axios.post('/insert',
        querystring.stringify({
          description: e.state.description,
          title: e.state.title,
          elapsed: 0,
          since: new Date().getTime()
        }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function(response) {
        e.setState({
          messageFromServer: response.data
        });
    });
}
handleTextChange(e) {
    if (e.target.name == "description") {
        this.setState({
          description: e.target.value
        });
    }
    if (e.target.name == "title") {
        this.setState({
          title: e.target.value
        });
    }
}
render() {
   if(this.state.messageFromServer == ''){
      return (
        <div>
            <div style={{ position: 'absolute', top: '50px', left: '120px' }}>
                <p style={{ marginLeft: '10px' }}>Add new track</p>
                <Button bsStyle="success" bsSize="small" onClick={this.openModal} style={{ marginTop: '-10px', marginLeft: '10px' }}><span className="fa fa-plus"></span></Button>
            </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Add Track"
                    className="Modal"
                    ariaHideApp={false}>
                <Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
                    <Button bsStyle="danger" bsSize="small" onClick={this.closeModal}><span className="closebtn fa fa-remove"></span></Button>
                </Link><br/>
                <fieldset>
                    <label htmlFor="description">Description:</label><input type="text" id="description" name="description" value={this.state.description} onChange={this.handleTextChange}></input>
                    <label htmlFor="title">Title:</label><input type="text" id="title" name="title" value={this.state.title} onChange={this.handleTextChange}></input>
                </fieldset>
                    <div className='button-center'>
                        <br/>
                        <Button bsStyle="success" bsSize="small" onClick={this.onClick}>Add New Track</Button>
                    </div>
                </Modal>
        </div>
      )
   }
   else{
    return (
     <div>
       <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="fa fa-plus"></span></Button>
        <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Add Track"
            className="Modal">
            <div className='button-center'>
                <h3>{this.state.messageFromServer.codeName}</h3>
                <Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
                    <Button bsStyle="success" bsSize="small" onClick={this.closeModal}>Close the Dialog</Button>
                </Link>
        </div>
        </Modal>
    </div>
     )
    }
   }
}
export default Add;
