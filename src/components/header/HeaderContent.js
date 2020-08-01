import React from 'react';
import classes from './HeaderContent.module.css';
import Logo from '../../assets/logo.png';

const headerContent = (props) => {
    return (
        <div className={classes.HeaderContent}>
            <img src={Logo}></img>
            <p>A platform to share your knowledge!</p>
        </div>
    )
}

export default headerContent;