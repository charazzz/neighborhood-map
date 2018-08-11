import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './SideDrawer.css';


const sideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                {props.children}
            </div>
        </Auxiliary>
    );
};

export default sideDrawer;