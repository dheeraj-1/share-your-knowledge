import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Image from '../../../assets/smiley-cyrus.jpg';
import * as actions from '../../../store/actions/index';


class Article extends Component {

    componentDidMount() {
        console.log('[Article componentdidmount]', this.props.match.params.id, this);
        //this.loadArticle();
        this.props.getCurrentArticle(this.props.match.params.id);
    }
    
    render() {
        let article = null;

        if(this.props.match.params.id) {
            article = <p>Loading...</p>
        }
        if(this.props.currentArticle) {
            article = (
                <div>
                    <h2>{this.props.currentArticle.title}</h2>
                    <div>
                        <img src={Image}></img>
                        <div>
                            <a href="/">{this.props.currentArticle.author.username}</a><br/>
                            <span>{this.props.currentArticle.createdAt}</span>                   
                        </div>                
                    </div>
                    
                    <p>{this.props.currentArticle.body}</p>
                </div>
            );
        }

        return article;
    }
}

const mapStateToProps = state => {
    return {
        currentArticle: state.article.currentArticle
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCurrentArticle: (slug) => dispatch(actions.getCurrentArticle(slug))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);