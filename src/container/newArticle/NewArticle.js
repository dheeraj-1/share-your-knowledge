import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

import * as actions from '../../store/actions/index';
import classes from './NewArticle.module.css';

class NewArticle extends Component {

    state = {
        title: '',
        desc: '',
        body: ''
    }
    render() {
        let redirectToCurrentArticle = null;
        if(this.props.currentArticle) {
            redirectToCurrentArticle = <Redirect to={'articles/' + this.props.currentArticle.slug} />
        }

        return (
            <div className={classes.NewArticle}>
                {redirectToCurrentArticle}
                <form onSubmit={this.submitHandler}>
                    <h2>Create own article</h2>
                    <input
                        type='text'
                        name='title'
                        placeholder='Enter title'
                        value={this.state.title}
                        onChange={(event) => this.changeHandler(event, "title")}
                        ></input><br/>
                    <input
                        type='text'
                        name='desc'
                        placeholder='Enter description'
                        value={this.state.desc}
                        onChange={(event) => this.changeHandler(event, "desc")}
                        ></input><br/>
                    <textarea
                        type='text'
                        name='body'
                        placeholder='Enter content'
                        value={this.state.body}
                        onChange={(event) => this.changeHandler(event, "body")}
                        ></textarea><br/>
                    <button type="submit">Post Article</button>
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
        this.props.onSubmit(this.state.title, this.state.desc, this.state.body, this.props.token);
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        userName: state.auth.userName,
        currentArticle: state.article.currentArticle
    }
};

const mapDispatchToProps  = dispatch => {
    return {
        onSubmit: (title, desc, body, token) => dispatch(actions.postArticle(title, desc, body, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewArticle);