import React from 'react';

import Image from '../../../assets/smiley-cyrus.jpg';
import classes from './Comment.module.css';


const comment = (props) => {
    return (
        <div className={classes.Comment}>
            <p>{props.comment.body}</p>
            <div>
                <img src={Image} alt='author'></img>
                <div className={classes.Author}>
                    <a href="/">{props.comment.author.username}</a><br/>
                    <span>{props.comment.updatedAt}</span>                   
                </div>
                        
            </div>
        </div>
    )
}

export default comment;