import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/auth';

import classes from './SignUp.module.css';

class SignUp extends Component {
    state = {
        userName: '',
        email: '',
        password: ''
    }

    componentDidMount() {
        console.log("componentdidmount: ", this.props.isAuthenticated, this.props.error);
    }

    render() {

        let errorMessage = null;
        if(this.props.error) {
            errorMessage = (
                <p>User already exists!</p>
            )
        }
        let redirectToLoggedInUsers = null;
        if(this.props.isAuthenticated) {
            redirectToLoggedInUsers = <Redirect to="/articles"/>
        }

        return(
            <div className={classes.SignUp}>
                {redirectToLoggedInUsers}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    <h2>Sign Up</h2>
                    <input type="text"
                        name="userName"
                        onChange={(event) => this.changeHandler(event, "userName")}
                        value={this.state.userName}
                        placeholder="Username">
                    </input><br/>

                    <input type="text"
                        name="email"
                        onChange={(event) => this.changeHandler(event, "email")}
                        value={this.state.email}
                        placeholder="Email">
                    </input><br/>
                    <input type="password"
                        name="password"
                        onChange={(event) => this.changeHandler(event, "password")}
                        value={this.state.password}
                        placeholder="Password">
                    </input><br/>
                    <button type="submit">Submit</button>
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
        console.log('Form submitted to sign up', this.state);
        this.props.onAuth(this.state.userName, this.state.email, this.state.password, true);
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        userId: state.userId,
        userName: state.userName,
        isAuthenticated: state.token !== null,
        error: state.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (userName, email, password, isSignup) => dispatch(actions.auth(userName, email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);