import React from 'react';

import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
    <div
    id='mainBtnCnt'
    tabIndex='0'
    aria-label='Toggle to show or hide the Venues List' 
    className={classes.DrawerToggle} 
    onClick={props.clicked}
    onKeyPress={e => { 
        if (e.key === 'Enter') {
        props.clicked(e)
        }
    }}
    >
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default drawerToggle;