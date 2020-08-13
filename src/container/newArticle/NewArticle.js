import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
import axios from 'axios';

import classes from './NewArticle.module.css';

class NewArticle extends Component {

    state = {
        title: '',
        desc: '',
        body: '',
        tags: '',
        slug: '',
        postedArticleId: null,
        updatingArticle: false
    }

    componentDidMount() {
        if(this.props.location.article) {
            this.setState({
                title: this.props.location.article.title,
                desc: this.props.location.article.desc,
                body: this.props.location.article.body,
                slug: this.props.location.article.slug,
                updatingArticle: true
            })
        }
    }

    render() {
        let redirectToNewArticle = null;
        if(this.state.postedArticleId) {
            redirectToNewArticle = <Redirect to={'articles/' + this.state.postedArticleId} />
        }

        return (
            <div className={classes.NewArticle}>
                {redirectToNewArticle}
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
                    <input
                        type='text'
                        name='tags'
                        placeholder='Enter Tags'
                        value={this.state.tags}
                        onChange={(event) => this.changeHandler(event, "tags")}
                        ></input><br/>
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
        const articleData = {
            article: {
                title: this.state.title,
                description: this.state.desc,
                body: this.state.body,
                tagList: this.state.tags.split(',')
              }
        }
        let reqUrl = 'https://conduit.productionready.io/api/articles';
        if(this.state.updatingArticle) {
            axios.put(reqUrl + '/' + this.state.slug, articleData, {
                headers: {
                  Authorization: 'Token ' + this.props.token
                }
              })
                .then(res => {
                    this.setState({postedArticleId: res.data.article.slug});
                })
        }
        else {
            axios.post(reqUrl, articleData, {
                headers: {
                  Authorization: 'Token ' + this.props.token
                }
              })
                .then(res => {
                    this.setState({postedArticleId: res.data.article.slug});
                })
        }
        
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        userId: state.userId,
        userName: state.userName
    }
};

export default connect(mapStateToProps)(NewArticle);