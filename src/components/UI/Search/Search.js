import React from 'react';

import classes from './Search.css';

const search = (props) => {   
  
  return (
    <div role='dialog' className={classes.Container} >
      <input tabIndex='0' id='searchInput' type="text" placeholder="Search" aria-label='Type or tab through the markers' onChange={(e) => props.filterListHandler(e)}/>
      <ul role='tablist'>
        {props.items.map((item, i) => {
            return <li role='tab' tabIndex='0' key={i}
            onClick={() => props.listItemClickedHandler(i)}
            >{item.name}</li>
        })}
      </ul>
      <button id='closeBtn' tabIndex='0' className={classes.BtnCloseSidedrawer} 
      onClick={props.sideDrawerClosedHandler} >
        <span>X</span>
        <span className={classes.ScreenReadersOnly}>Close Modal</span>
      </button>
    </div>
  )
}

export default search;