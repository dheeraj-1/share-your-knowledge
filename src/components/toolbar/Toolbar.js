import React from 'react';

import NavigationItems from './navigationItems/NavigationItems';
import classes from './Toolbar.module.css'

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <nav>
                <NavigationItems isAuthenticated={props.isAuthenticated} userName={props.userName}></NavigationItems>
            </nav>
        </header>        
    )
}

export default toolbar;
