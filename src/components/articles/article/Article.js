import React, { Component } from 'react';
import { Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Image from '../../../assets/smiley-cyrus.jpg';
import * as actions from '../../../store/actions/index';
import classes from './Article.module.css';
import { findAllByTestId } from '@testing-library/react';
import { articlePosted } from '../../../store/actions/articles';


class Article extends Component {

    state = {
        articleDeleted: false,
        currentArticle: null,
        error: null,
        updateArticle: false
    }

    componentDidMount() {
        console.log('[Article componentdidmount]', this.props.match.params.id, this.state.currentArticle);
        axios.get('https://conduit.productionready.io/api/articles/' + this.props.match.params.id)
            .then((res) => {
                console.log('Successss', res);
                this.setState({currentArticle: res.data.article});
            })
            .catch((error) => {
                console.log('Error while fetching this articleee', error);
                this.setState({error: error});
            })
    }
    
    render() {
        let redirectToArticlesPage = null;
        let article = null, loginToComment = null, followAndFav = null, editAndDelete = null;

        if(this.props.match.params.id) {
            article = <p>Loading...</p>
        }

       
        if(this.state.currentArticle) {
            followAndFav = (
                <div>
                    <button>Follow {this.state.currentArticle.author.username}</button>
                    <button>Favorite Article</button>
                </div>
            );
        }
        if(this.props.isAuthenticated && this.state.currentArticle != null) {
            if(this.props.userName === this.state.currentArticle.author.username) {
                editAndDelete = (
                    <div>
                        <button onClick={this.updateArticleHandler}>Edit Article</button>
                        <button onClick={this.deleteArticleHandler}>Delete Article</button>
                    </div>
                );
                followAndFav = null;
            }
        }
        else {
            loginToComment = (
                <div>
                    <Link to="/signin">Sign in </Link>or <Link to="/signup"> Sign up</Link> to add comments on this article.
                </div>
            )
        }

        if(this.state.articleDeleted) {
            redirectToArticlesPage = <Redirect to='/articles'></Redirect>
        }
        if(this.state.currentArticle) {
            article = (
                <div className={classes.Article}>
                    {redirectToArticlesPage}
                    <h2>{this.state.currentArticle.title}</h2>
                    <div>
                        <img src={Image}></img>
                        <div className={classes.UserInfo}>
                            <a href="/">{this.state.currentArticle.author.username}</a><br/>
                            <span>{this.state.currentArticle.createdAt}</span>                   
                        </div>
                              
                    </div>
                    {editAndDelete}
                    {followAndFav}
                    <p>{this.state.currentArticle.body}</p>
                    {loginToComment}
                </div>
            );
        }

        if(this.state.updateArticle) {
            article = <Redirect to={{pathname: '/createarticle', article: {
                title: this.state.currentArticle.title,
                desc: this.state.currentArticle.description,
                body: this.state.currentArticle.body,
                slug: this.state.currentArticle.slug
            }}}/>
        }
       

        return article;
    }

    deleteArticleHandler = () => {
        axios.delete('https://conduit.productionready.io/api/articles/' + this.props.match.params.id, {
            headers: {
              Authorization: 'Token ' + this.props.token
            }
          })
            .then((res) => {
                console.log('deleted successfully', res);
                this.setState({articleDeleted: true});
            })
            .catch((error) => {
                console.log('Error while deleting', error);
            })
    }

    updateArticleHandler = () => {
        console.log('to update article');
        this.setState({updateArticle: true});
    }
}

const mapStateToProps = state => {
    return {
        userName: state.auth.userName,
        isAuthenticated: state.auth.token !== null,
        token: state.auth.token
    }
}


export default connect(mapStateToProps)(Article);