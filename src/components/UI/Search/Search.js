import React from 'react';

import classes from './Search.css';

const search = (props) => {    
  return (
    <div className={classes.Container}>
      <input type="text" placeholder="Search" onChange={(e) => props.filterListHandler(e)}/>
      <ul>
        {props.items.map((item, i) => {
            return <li key={i} onClick={() => props.listItemClickedHandler(i)}>{item.name}</li>
        })}
      </ul>
    </div>
  )
  
}

export default search;