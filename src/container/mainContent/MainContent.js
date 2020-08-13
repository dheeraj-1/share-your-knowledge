import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';
import classes from './MainContent.module.css';
import ArticleTile from '../../components/articles/ArticleTile';

class MainContent extends Component {

  state = {
    articles: null,
    getArticlesByAuthor: ''
  }
  showFullArticle = (id) => {
    console.log("Clicked");
  }

  componentDidMount() {
    let reqUrl = 'https://conduit.productionready.io/api/articles';

    if(this.props.author) {
      this.setState({getArticlesByAuthor: true});
      reqUrl += '?author=' + this.props.author;
    }
    axios.get(reqUrl)
        .then(res => {
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
            tags={article.tagList}
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
      <h2 className={classes.Author}>{this.props.author ? 'My Articles ' : 'Global Feed'}</h2>
        {loader}
        {articles}
        
    </div>
    )

  }
}

export default MainContent;