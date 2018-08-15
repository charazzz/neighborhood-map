import React from 'react';

import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Title from './Title/Title';

import classes from './Toolbar.css';

const toolbar = ( props ) => (
    <header tabIndex='-1' className={classes.Toolbar}>
        <DrawerToggle 
        clicked={props.sideDrawerToggleHandler}
        />
        <Title focus={props.focus}/>
        <div tabIndex='-1' className={classes.Logo}>
            <Logo />
        </div>
    </header>
);

export default toolbar;