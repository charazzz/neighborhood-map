import React from 'react';

import placeholderLogo from '../../assets/pictures/placeholder.png';
import classes from './Logo.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={placeholderLogo} alt="MyPlaces" />
    </div>
);

export default logo;