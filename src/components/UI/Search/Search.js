import React from 'react';

import classes from './Search.css';

const search = (props) => {    
        return (
            <div className={classes.Container}>
              <input type="text" placeholder="Search" onChange={(e) => props.filterList(e)}/>
              <List items={props.items} />
            </div>
        )
        
}

const List = (props) => {
      return (
        <ul>
        {props.items.map((item, i) => {
            return <li key={i}>{item}</li>
          })}
        </ul>
      )  
    }

export default search;