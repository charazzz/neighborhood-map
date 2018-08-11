import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';


const querySearcher = (props) => (
    <Auxiliary>
    <form>
        <div>
        <label>
          Pick one:
          <select
            onChange={(event) => props.queryHandler(event.target.value)}
          >
            <option value='sushi'>Sushi</option>
            <option value='coffee'>Coffee</option>
            <option value='movie'>Movie</option>
          </select>
          </label>
        </div>
      </form>
    </Auxiliary>
)

export default querySearcher;