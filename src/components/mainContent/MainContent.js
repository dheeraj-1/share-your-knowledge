import React from 'react';
import classes from './MainContent.module.css';
import Article from './article/Article';

const mainContent = (props) => {
    const articles = props.articles.map((article, index) => {
        return <Article title={article.title} content={article.content} key={index}/>
    });
    let welcomeMessage = null;
    if(props.isAuthenticated) {
        welcomeMessage = (
            <h1>Welcome {props.userName}</h1>
        )
    }
    return(
    <div className={classes.MainContent}>
        {welcomeMessage}
        {articles}
    </div>
    )
}

export default mainContent;