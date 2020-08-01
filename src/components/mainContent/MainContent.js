import React from 'react';
import classes from './MainContent.module.css';
import Article from './article/Article';

const mainContent = (props) => {
    const articles = props.articles.map((article, index) => {
        return <Article title={article.title} content={article.content} key={index}/>
    });
    return(
    <div className={classes.MainContent}>
        {articles}
    </div>
    )
}

export default mainContent;