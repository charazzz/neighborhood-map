import React from 'react';
import { compose, withProps } from 'recompose';
import { withGoogleMap, GoogleMap, withScriptjs, Marker, InfoWindow } from 'react-google-maps';

import classes from './Map.css';


const Map = compose(
    withProps ({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCMsMAx_jwS_21tswLBYvOc8Mo6-lZepCo",
        loadingElement: <div style= { { height: `100%` } } />,
        containerElement: <div style={{ height: `calc(100vh - 50px)`}} />,
        mapElement: <div style = { { height: `100%`}} />
    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <div classes={classes.MapContainer} aria-label="The map of Northern Athens" role="application">
    <GoogleMap
    
    defaultCenter = { { lat: 37.989747, lng: 23.729412 } }
    defaultZoom = { 11 }>
    {props.isMarkerShown && props.items.map((item, i) => {
        return (
            
            <Marker
            key={item.id}
            onClick={() => props.openInfo(i) && props.fetchPhotosHandler}
            position={item.position}
            icon={item.icon ? item.icon : null}
            animation={props.index === i ? props.google.maps.Animation.BOUNCE :  props.google.maps.Animation.DROP}>
            {props.index === i &&
              <InfoWindow
              onCloseClick={props.openInfo}>
                    <div aria-label='Venues images and address' className={classes.InfoWindow}>
                        <img src={item.pic} alt={item.name  + ' image' }/>
                        <h5>{item.name}</h5>
                        <h5>{item.address}</h5>
                    </div>
              </InfoWindow>}
            </Marker>
        ) 
    })}
    </GoogleMap>
    </div>
)

export default Map;
