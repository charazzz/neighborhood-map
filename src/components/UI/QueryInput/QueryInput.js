import React from 'react';

import classes from './QueryInput.css';

const queryInput = (props) => {
        return (
            <form className={classes.QueryForm}>
                <label htmlFor='selectCategory' className={classes.QueryLabel}>Select Category of Venue:
                    <select tabIndex='0' id='selectCategory' className={classes.QuerySelect} onChange={(e) => props.queryHandler(e.target.value)}>
                        <option value='All'>All</option>                        
                        <option value='Bar'>Bar</option>
                        <option value='Beach'>Beach bar</option>
                        <option value='Café'>Café</option>
                        <option value='Restaurant'>Restaurant</option>
                        <option value='Lounge'>Lounge</option>
                        <option value='Nightclub'>Nightclub</option>
                    </select>
                </label>
                <a 
                    tabIndex='0' 
                    onClick={props.focus}
                    onKeyPress={(e) => { if (e.key === 'Enter') {
                        props.focus(e)
                    }}}
                >Skip to main content</a>
            </form>
            
        )
}

export default queryInput;