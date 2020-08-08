import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Route, Link} from 'react-router-dom';
import classes from './MainContent.module.css';
import ArticleTile from '../../components/articles/ArticleTile';
import Article from '../../components/articles/article/Article';
import { articlesNotReceived } from '../../store/actions/articles';

class MainContent extends Component {

  showFullArticle = (id) => {
    console.log("Clicked", id);
    //this.props.history.push('/articles/' + id);
  }

  render() {
    let articles = null;
   let loader = null;
   if(this.props.articles) {
      articles = this.props.articles.map((article, index) => {
        return (
          <Link to={'/' + article.slug} key={article.slug}>
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