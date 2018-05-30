import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchToken, verifyUser, showLoginLoader, hideLoginLoader, changeUsername, changePassword } from '../actions/';
const { remote } = require('electron');
import AutoUpdater from './AutoUpdater';
import Spinner from './Spinner';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    handleUsernameChange(event) {
        this.props.changeUsername(event.target.value);
    }

    handlePasswordChange(event) {
        this.props.changePassword(event.target.value);
    }

    onSubmitClick(event) {
        event.preventDefault();
        if (this.props.login.username.length > 0 && this.props.login.password.length > 0) {
            this.props.showLoginLoader();
            this.props.verifyUser(this.props.login.username, this.props.login.password);
        } else {
            if (this.props.login.username.length == 0) {
                this.props.changeUsername(this.props.login.username);
            }

            if (this.props.login.password.length == 0) {
                this.props.changePassword(this.props.login.password);
            }
        }
    }

    render() {
        return (
            <div className={this.props.login.loggedIn ? "loginPaneWrapper hide" : "loginPaneWrapper"}>
                <div className="container">
                    <AutoUpdater showUpdater={!this.props.login.showLogin} />
                    <div className={this.props.login.showLogin ? "innerContainer" : "innerContainer hide"}>
                        <Spinner show={this.props.login.showLoader} />
                        <h1 className="loginHeader">Welcome</h1>

                        <form className="form">
                            <input type="text" className={this.props.login.usernameError ? 'error invalid' : '' } placeholder="Username" id="loginUserName" value={this.props.login.username} onChange={this.handleUsernameChange.bind(this)}></input>
                            <input type="password" className={this.props.login.passwordError ? 'error invalid' : ''} placeholder="Password" id="loginPassword" value={this.props.login.password} onChange={this.handlePasswordChange.bind(this)}></input>
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
        hideLoginLoader: hideLoginLoader,
        changeUsername: changeUsername,
        changePassword: changePassword
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);