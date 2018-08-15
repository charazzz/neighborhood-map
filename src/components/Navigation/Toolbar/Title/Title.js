import React from 'react';

import classes from './Title.css';

const title = (props) => (
    <div className={classes.Title}>
        <h1 autoFocus>My Lovely City!</h1>
        <a 
            tabIndex='0' 
            onClick={props.focus}
            onKeyPress={(e) => { if (e.key === 'Enter') {
                props.focus(e)
        }}}
        >Skip to main content</a>
    </div>
);

export default title;