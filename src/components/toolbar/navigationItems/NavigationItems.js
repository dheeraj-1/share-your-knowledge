import React from 'react';
import NavigationItem  from './navigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => {
    let navigationItems = null;
    if (props.isAuthenticated) {
        navigationItems = (
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/" exact>Home</NavigationItem>
                <NavigationItem link="/createarticle">New Article</NavigationItem>
                <NavigationItem link="/logout">
                    {props.userName}<br/>
                    Logout</NavigationItem>
            </ul>
        );
    }
    else {
        navigationItems = (
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/" exact>Home</NavigationItem>
                <NavigationItem link="/signin">SignIn</NavigationItem>
                <NavigationItem link="/signup">SignUp</NavigationItem>
            </ul>
        );
    }
    return (
        <ul className={classes.NavigationItems}>
            {navigationItems}
        </ul>
    )
}

export default navigationItems;