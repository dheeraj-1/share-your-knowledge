import React, { Component } from 'react';
import axios from 'axios';

import Image from '../../../assets/smiley-cyrus.jpg';


class Article extends Component {

    state = {
        loadedArticle: null
    }

    loadArticle = () => {
        if(this.props.match.params.id) {
            if(!this.state.loadedArticle || (this.state.loadedArticle && this.state.loadedArticle.id !== this.props.match.params.id)) {
                axios.get('https://conduit.productionready.io/api/articles/' + this.props.match.params.id)
                    .then((res) => {
                        console.log('Success', res);
                        this.setState({loadedArticle: res.data.article});
                    })
                    .catch((error) => {
                        console.log('Error while fetching this article', error);
                    })
            }
        }
    }

    componentDidMount() {
        console.log('[Article componentdidmount]', this.props.match.params.id, this);
        this.loadArticle();
    }
    
    render() {
        let article = null;
        if(this.props.match.params.id) {
            article = <p>Loading...</p>
        }
        if(this.state.loadedArticle) {
            article = (
                <div>
                <h2>{this.state.loadedArticle.title}</h2>
                 <div>
                    <img src={Image}></img>
                    <div>
                        <a href="/">{this.state.loadedArticle.author.username}</a><br/>
                        <span>{this.state.loadedArticle.createdAt}</span>                   
                    </div>                
                </div>
                
                <p>{this.state.loadedArticle.body}</p>
            </div>
            )
        }

        return article;
    }
}
export default Article;