import React from 'react';
import NavigationItem  from './navigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" active>Home</NavigationItem>
            <NavigationItem link="/">SignIn</NavigationItem>
            <NavigationItem link="/">SignUp</NavigationItem>
        </ul>
    )
}

export default navigationItems;