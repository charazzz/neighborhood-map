import React from 'react';
import { compose, withProps } from 'recompose';
import { withGoogleMap, GoogleMap, withScriptjs, Marker, InfoWindow } from 'react-google-maps';

// import coffee from '../../assets/pictures/coffee.svg';
// import pizza from '../../assets/pictures/pizza.svg';
// import movie from '../../assets/pictures/movie.svg';
// import sushi from '../../assets/pictures/sushi.svg';

import classes from './Map.css';


const Map = compose(
    withProps ({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCMsMAx_jwS_21tswLBYvOc8Mo6-lZepCo",
        loadingElement: <div style= { { height: `100%` } } />,
        containerElement: <div style={{ height: `calc(100vh - 56px)`}} />,
        mapElement: <div style = { { height: `100%`}} />
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <div classes={classes.MapContainer} tabIndex="0" aria-label="The map of Northern Athens" role="application">
    <GoogleMap
    
    defaultCenter = { { lat: 38.021294, lng: 23.798670 } }
    defaultZoom = { 13 }>
    {props.isMarkerShown && props.items.map((marker, i) => {
        return (
            
            <Marker
            key={marker.id}
            onClick={() => props.openInfo(i) && props.fetchPhotosHandler}
            position={marker.position}
            icon={marker.icon ? marker.icon : null}
            animation={props.index === i ? props.google.maps.Animation.BOUNCE :  props.google.maps.Animation.DROP}>
            {props.index === i &&
              <InfoWindow
              onCloseClick={props.openInfo}>
                    <div className={classes.InfoWindow}>
                        <img src={props.pics[i]} alt={marker.name  + ' image' }/>
                        <h5>
                            {marker.name}
                        </h5>
                        <h5>
                            {marker.address}
                        </h5>
                    </div>
              </InfoWindow>}
            </Marker>
        ) 
    })}
    </GoogleMap>
    </div>
)

export default Map;
