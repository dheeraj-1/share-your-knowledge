import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/auth';

import classes from './SignIn.module.css';

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }
    render() {
        let errorMessage = null;
        if(this.props.error) {
            errorMessage = (
                <p>Username or Password is incorrect!</p>
            )
        }

        let redirectToLoggedInUsers = null;
        if(this.props.isAuthenticated) {
            redirectToLoggedInUsers = (
                <Redirect to="/"/>
            )
        }
        return(
            <div className={classes.SignIn}>
                {redirectToLoggedInUsers}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    <h2>Sign In</h2>
                    <input type="text" name="email" onChange={(event) => this.changeHandler(event, "email")} value={this.state.email} placeholder="Email"></input><br/>
                    <input type="password" name="password" onChange={(event) => this.changeHandler(event, "password")} value={this.state.password} placeholder="Password"></input><br/>
                    <button type="submit" >Submit</button>
                </form>
            </div>
        );
    }

    changeHandler = (event, elementName) => {
        var newState = { ...this.state};
        newState[elementName] = event.target.value;
        this.setState(newState);
    }
    submitHandler = (event) => {
        event.preventDefault();
        console.log('Form submitted', this.state);
        this.props.onAuth(null, this.state.email, this.state.password, false);
    }
}


const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userName: state.auth.userName,
        userId: state.auth.userId,
        isAuthenticated: state.auth.token !== null,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password, isSignup) => dispatch(actions.auth(username, email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);