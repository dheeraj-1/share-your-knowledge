import React from 'react';

import NavigationItem from './navigationItem/NavigationItem';
import './Toolbar.css';

const toolbar = (props) => {
    return (
        <ul className="NavigationItems">
            <NavigationItem>Home</NavigationItem>
            <NavigationItem>SignIn</NavigationItem>
            <NavigationItem>SignUp</NavigationItem>
        </ul>
    )
}

export default toolbar;
