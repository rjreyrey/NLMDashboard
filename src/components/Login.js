import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="innerContainer">
                <h1 className="loginHeader">Welcome</h1>

                <form className="form">
                    <input type="text" placeholder="Username" id="loginUserName"></input>
                    <input type="password" placeholder="Password" id="loginPassword"></input>
                    <button type="submit" className="button" id="login-button">Login</button>
                    <div id="loginError" className="error hide">This is the error</div>
                    <div className="loaderWrapper hide"><div className="loader"></div></div>
                </form>
            </div>
        );
    }
}

export default Login;