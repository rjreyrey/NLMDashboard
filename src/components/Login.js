import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchToken, verifyUser, showLoginLoader, hideLoginLoader } from '../actions/';
const { remote } = require('electron');
import AutoUpdater from './AutoUpdater';
import Spinner from './Spinner';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: remote.getGlobal('credentials').username, password: '', inProcess: false, usernameError: false, passwordError: false };
    }

    handleUsernameChange(event) {
        if (event.target.value.length == 0) {
            this.setState({ ...this.state, username: event.target.value, usernameError: true });
        } else {
            this.setState({ ...this.state, username: event.target.value, usernameError: false });
        }
    }

    handlePasswordChange(event) {
        if (event.target.value.length == 0) {
            this.setState({ ...this.state, password: event.target.value, passwordError: true });
        } else {
            this.setState({ ...this.state, password: event.target.value, passwordError: false });
        }
    }

    onSubmitClick(event) {
        event.preventDefault();
        if (this.state.username.length > 0 && this.state.password.length > 0) {
            this.setState({ ...this.state, inProcess: true, usernameError: false, passwordError: false });
            this.props.showLoginLoader();
            this.props.verifyUser(this.state.username, this.state.password);
        } else {
            if (this.state.username.length == 0) {
                this.setState({ ...state, usernameError: true });
            }

            if (this.state.password.length == 0) {
                this.setState({ ...this.state, passwordError: true });
            }
        }
    }

    render() {
        return (
            <div className={this.props.login.loggedIn ? "loginPaneWrapper hide" : "loginPaneWrapper"}>
                <div className="container">
                    <AutoUpdater />
                    <div className="innerContainer">
                        <Spinner show={this.props.login.showLoader} />
                        <h1 className="loginHeader">Welcome</h1>

                        <form className="form">
                            <input type="text" className={this.state.usernameError ? 'error invalid' : '' } placeholder="Username" id="loginUserName" value={this.state.username} onChange={this.handleUsernameChange.bind(this)}></input>
                            <input type="password" className={this.state.passwordError ? 'error invalid' : ''} placeholder="Password" id="loginPassword" value={this.state.password} onChange={this.handlePasswordChange.bind(this)}></input>
                            <button type="submit" onClick={this.onSubmitClick.bind(this)} className="button" id="login-button">Login</button>
                            <div id="loginError" className={this.props.login.error.length > 0 ? "error" : "error hide"}>{ this.props.login.error }</div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        login: state.login
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchToken: fetchToken,
        verifyUser: verifyUser,
        showLoginLoader: showLoginLoader,
        hideLoginLoader: hideLoginLoader
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);