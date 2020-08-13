import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Route, Link} from 'react-router-dom';
import axios from 'axios';
import classes from './MainContent.module.css';
import ArticleTile from '../../components/articles/ArticleTile';
import Article from '../../components/articles/article/Article';
import { articlesNotReceived } from '../../store/actions/articles';

class MainContent extends Component {

  state = {
    articles: null,
    getArticlesByAuthor: ''
  }
  showFullArticle = (id) => {
    console.log("Clicked", id);
  }

  componentDidMount() {
    let reqUrl = 'https://conduit.productionready.io/api/articles';

    if(this.props.author) {
      this.setState({getArticlesByAuthor: true});
      reqUrl += '?author=' + this.props.author;
    }
    axios.get(reqUrl)
        .then(res => {
            console.log('Articles received', res);
            this.setState({articles: res.data.articles})
        })
        
  }



  render() {
    let articles = null;
   let loader = null;
   if(this.state.articles) {
      articles = this.state.articles.map((article, index) => {
        return (
          <Link to={'/articles/' + article.slug} key={article.slug}>
            <ArticleTile title={article.title}
            content={article.description}
            author={article.author}
            createdAt={article.createdAt}
            key={article.slug}
            clicked={() => {this.showFullArticle(article.slug)}}/>
          </Link>
        )
      });
   }
   else {
     loader = <p>Loading...</p>
   }

    return(
    <div className={classes.MainContent}>
        {loader}
        {articles}
        
    </div>
    )

  }
}

export default MainContent;