import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Image from '../../../assets/smiley-cyrus.jpg';
import * as actions from '../../../store/actions/index';
import classes from './Article.module.css';


class Article extends Component {

    componentDidMount() {
        console.log('[Article componentdidmount]', this.props.match.params.id, this);
        //this.loadArticle();
        this.props.getCurrentArticle(this.props.match.params.id);
    }
    
    render() {
        let article = null, loginToComment = null, followAndFav = null, editAndDelete = null;

        if(this.props.match.params.id) {
            article = <p>Loading...</p>
        }
        // if(this.props.isAuthenticated && this.props.userName === this.props.currentArticle.author.username) {

        // }
        followAndFav = (
            <div>
                <button>Follow {this.props.userName}</button>
                <button>Favorite Article</button>
            </div>
        );
        if(this.props.isAuthenticated && this.props.currentArticle != null) {
            if(this.props.userName === this.props.currentArticle.author.username) {
                editAndDelete = (
                    <div>
                        <button>Edit Article</button>
                        <button>Delete Article</button>
                    </div>
                );
            }
        }
        else {
            loginToComment = (
                <div>
                    <Link to="/signin">Sign in </Link>or <Link to="/signup"> Sign up</Link> to add comments on this article.
                </div>
            )
        }
        if(this.props.currentArticle) {
            article = (
                <div className={classes.Article}>
                    <h2>{this.props.currentArticle.title}</h2>
                    <div>
                        <img src={Image}></img>
                        <div className={classes.UserInfo}>
                            <a href="/">{this.props.currentArticle.author.username}</a><br/>
                            <span>{this.props.currentArticle.createdAt}</span>                   
                        </div>
                              
                    </div>
                    
                    <p>{this.props.currentArticle.body}</p>
                    {loginToComment}
                </div>
            );
        }

        return article;
    }
}

const mapStateToProps = state => {
    return {
        currentArticle: state.article.currentArticle,
        userName: state.auth.userName,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCurrentArticle: (slug) => dispatch(actions.getCurrentArticle(slug))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);