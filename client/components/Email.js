import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import {Link} from 'react-router-dom';

class Email extends React.Component {
constructor() {
    super();
    this.state = {
        name: '',
        description: '',
        modalIsOpen: false,
        message: ''
    }
    this.onClick = this.onClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
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
        name: '',
        message: ''
    });
}
onClick(e) {
    window.location.href=`mailto:karadumanbaturay@gmail.com&subject=Evaluation%20from%20${this.state.name.toUpperCase()}&body=${this.state.description}`;
    this.setState({message: 'Thank you for your evaluation!'})
}

handleTextChange(e) {
    if (e.target.name == "description") {
        this.setState({
          description: e.target.value
        });
    }
    if (e.target.name == "name") {
        this.setState({
          name: e.target.value
        });
    }
}
handleKeyPress(event) {
    if(event.key == 'Enter'){
        this.onClick();
    }
}
render() {
   if(this.state.message == ''){
      return (
        <div>
            <div className="new-track-button">
                <p style={{ marginLeft: '-8px' }}>Send Email</p>
                <Button bsStyle="success" bsSize="small" onClick={this.openModal} style={{ marginTop: '-10px', marginLeft: '10px' }}><span className="fa fa-envelope"></span></Button>
            </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Send Mail"
                    className="Modal"
                    ariaHideApp={false}>
                <Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
                    <Button bsStyle="danger" bsSize="small" onClick={this.closeModal}><span className="closebtn fa fa-remove"></span></Button>
                </Link><br/>
                <fieldset>
                    <label htmlFor="name">Your name:</label><input type="text" id="name" name="name" value={this.state.name} onChange={this.handleTextChange}></input>
                    <label htmlFor="description">What would you like to say:</label><input type="text" id="description" name="description" value={this.state.description} onChange={this.handleTextChange} onKeyPress={this.handleKeyPress}></input>
                </fieldset>
                    <div className='button-center'>
                        <br/>
                        <Button bsStyle="success" bsSize="small" onClick={this.onClick}>Send Email!</Button>
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
            contentLabel="Send Mail"
            className="Modal">
            <div className='button-center'>
                <h3>{this.state.message}</h3>
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
export default Email;
