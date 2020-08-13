import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import Image from '../../../assets/smiley-cyrus.jpg';
import classes from './Article.module.css';
import Comments from '../../comments/Comments';


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
                this.setState({currentArticle: res.data.article});
            })
            .catch((error) => {
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
            let tags = null;
            if(this.state.currentArticle.tagList) {
                tags = this.state.currentArticle.tagList.map((tag) => {
                    return <li>{tag}</li>
                })
            }

            article = (
                <div className={classes.Article}>
                    {redirectToArticlesPage}
                    <h2>{this.state.currentArticle.title}</h2>
                    <div>
                        <img src={Image} alt='author'></img>
                        <div className={classes.UserInfo}>
                            <a href="/">{this.state.currentArticle.author.username}</a><br/>
                            <span>{this.state.currentArticle.createdAt}</span>                   
                        </div>
                              
                    </div>
                    {editAndDelete}
                    {followAndFav}
                    <p>{this.state.currentArticle.body}</p>

                    <ul className={classes.Tags}>{tags}</ul>
                    {loginToComment}
                    <Comments slug={this.props.match.params.id}/>
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
                this.setState({articleDeleted: true});
            })
    }

    updateArticleHandler = () => {
        this.setState({updateArticle: true});
    }
}

const mapStateToProps = state => {
    return {
        userName: state.userName,
        isAuthenticated: state.token !== null,
        token: state.token
    }
}


export default connect(mapStateToProps)(Article);