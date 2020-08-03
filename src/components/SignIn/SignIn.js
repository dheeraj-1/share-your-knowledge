import React, { Component } from 'react';

import classes from './SignIn.module.css';

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }
    render() {
        return(
            <div className={classes.SignIn}>
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
    }
}

export default SignIn;