import React from 'react';
import {Button} from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router';

var querystring = require('querystring');
class Login extends React.Component {
    constructor() {
        super();
        this.state = {
                username: '',
                pwd: '',
                messageFromServer: null
        }
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.login = this.login.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        this.setState({
            elapsed: this.props.selectedElapsed
        });
        this.setState({
            since: this.props.selectedSince
        });
    }

    onClick(e) {
        this.login(this);
    }

    login(e) {
        axios.post('/login',
            querystring.stringify({
                username: e.state.username,
                pwd: e.state.pwd
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
        if (e.target.name == "username") {
            this.setState({
                username: e.target.value
            });
        }
        if (e.target.name == "pwd") {
            this.setState({
            pwd: e.target.value
            });
        }
    }
    handleKeyPress(event) {
        if(event.key == 'Enter'){
            this.onClick();
        }
    }
    render() {
        let serverResponse = '';
        if(this.state.messageFromServer != null) {
            serverResponse = this.state.messageFromServer.message;
            if(this.state.messageFromServer.authenticated) {
                localStorage.setItem('authenticated', true);
                return <Redirect to='/' />
            }
        }
        return (
            <div className="login-layout">
                <div className="centerize">
                    <fieldset>
                        <label htmlFor="username">Username:</label><input type="text" id="username" name="username" value={this.state.username} onChange={this.handleTextChange} onKeyPress={this.handleKeyPress}></input>
                        <label htmlFor="pwd">Password:</label><input type="password" id="pwd" name="pwd" value={this.state.pwd} onChange={this.handleTextChange} onKeyPress={this.handleKeyPress}></input>
                    </fieldset>
                        <p className="error-message" title="checkout the environment.json">{serverResponse}</p>
                    <div className='button-center'>
                        <br/>
                        <Button bsStyle="success" bsSize="small" onClick={this.onClick}>Login</Button>
                    </div>
                </div>
            </div>
        ); 
    }
}
export default Login;
