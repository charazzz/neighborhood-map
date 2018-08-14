import React from 'react';

import classes from './QueryInput.css';

const queryInput = (props) => {
        return (
            <form className={classes.QueryForm}>
            <div className={classes.QueryInput}>
                <label htmlFor='location-select' className={classes.QueryLabel}>Search:
                    <select className={classes.QuerySelect} onChange={(e) => props.queryHandler(e.target.value)}>
                        <option value='All'>All</option>                        
                        <option value='Bar'>Bar</option>
                        <option value='Beach'>Beach bar</option>
                        <option value='Café'>Café</option>
                        <option value='Restaurant'>Restaurant</option>
                        <option value='Lounge'>Lounge</option>
                        <option value='Nightclub'>Nightclub</option>
                    </select>
                </label>
            </div>
            </form>
        )
}

export default queryInput;