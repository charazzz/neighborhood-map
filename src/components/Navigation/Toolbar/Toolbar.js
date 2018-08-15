import React from 'react';

import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Title from './Title/Title';

import classes from './Toolbar.css';

const toolbar = ( props ) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <Title focus={props.focus}/>
        <div className={classes.Logo}>
            <Logo />
        </div>
    </header>
);

export default toolbar;