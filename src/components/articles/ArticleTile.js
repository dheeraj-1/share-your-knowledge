import React from 'react';

import Image from '../../assets/smiley-cyrus.jpg';

import classes from './ArticleTile.module.css';

const articleTile = (props) => {
    let tags = null;
    if(props.tags) {
        tags = props.tags.map((tag, index) => {
            return <li key={tag}>{tag}</li>
        })
    }

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
                <ul className={classes.Tags}>{tags}</ul>
                <span>Read more...</span>
            </div>
            
        </div>
    );
}

export default articleTile;