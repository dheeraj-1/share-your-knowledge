import React from 'react';
import { NavLink } from 'react-router-dom'; 
import classes from './NavigationItem.css';

const navigationItem = (props) => {
    return (
        <li className={classes.NavigationItem}>
            {props.children}
        </li>
    )
}

export default navigationItem;