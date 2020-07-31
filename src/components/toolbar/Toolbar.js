import React from 'react';

import NavigationItems from './navigationItems/NavigationItems';
import classes from './Toolbar.css'

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <NavigationItems></NavigationItems>
        </header>
        
    )
}

export default toolbar;
