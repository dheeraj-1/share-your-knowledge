import React from 'react';

import Image from '../../../assets/smiley-cyrus.jpg';

import classes from './ArticleTile.module.css';

const article = (props) => {
    return (
        <div className={classes.ArticleTile}>
            <div>
                <img src={Image}></img>
                <div className={classes.UserInfo}>
                    <a href="/">{props.author}</a><br/>
                    <span>Aug 7, 2020</span>                   
                </div>
                <div className={classes.FavIcon}>

                </div>
                
            </div>
            <h3>{props.title}</h3>
            <p>{props.content}</p>
            <span>Read more...</span>
        </div>
    );
}

export default article;