import React from 'react';
import NavigationItem  from '../navigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => {
    return (
        <ul className="NavigationItems">
            <NavigationItem>Home</NavigationItem>
            <NavigationItem>SignIn</NavigationItem>
            <NavigationItem>SignUp</NavigationItem>
        </ul>
    )
}

export default navigationItems;