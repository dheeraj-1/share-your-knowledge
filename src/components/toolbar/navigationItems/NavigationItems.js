import React from 'react';
import NavigationItem  from './navigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Home</NavigationItem>
            <NavigationItem link="/signin">SignIn</NavigationItem>
            <NavigationItem link="/signup">SignUp</NavigationItem>
        </ul>
    )
}

export default navigationItems;