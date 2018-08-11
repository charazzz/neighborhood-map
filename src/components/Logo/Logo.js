import React from 'react';

import earthLogo from '../../assets/pictures/planet-earth.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={earthLogo} alt="MyPlaces" />
    </div>
);

export default logo;