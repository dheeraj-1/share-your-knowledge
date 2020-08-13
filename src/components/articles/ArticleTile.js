import React from 'react';

import Image from '../../assets/smiley-cyrus.jpg';

import classes from './ArticleTile.module.css';

const articleTile = (props) => {
    return (
        <div className={classes.ArticleTile}>
            <div>
                <img src={Image} alt='author'></img>
                <div className={classes.UserInfo}>
                    {props.author.username}<br/>
                    <span>{props.createdAt}</span>                   
                </div>
                <div className={classes.FavIcon}>

                </div>
                
            </div>
            <div onClick={props.clicked}>
                <h3>{props.title}</h3>
                <p>{props.content}</p>
                <span>Read more...</span>
            </div>
        </div>
    );
}

export default articleTile;