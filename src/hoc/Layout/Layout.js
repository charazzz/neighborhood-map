import React, { PureComponent } from 'react';

import Auxiliary from '../Auxiliary/Auxiliary';
import Map from '../../components/Map/Map';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Search from '../../components/UI/Search/Search';

import classes from './Layout.css';

class Layout extends PureComponent {
    state = {
        showSideDrawer: false,
        venues: [],
        markers: [],
        isMarkerShown: false,
        isMarkerClicked: null,
        query: 'coffee',
        index: null,
        items: []
    }
    
    componentDidMount() {
        this.init();
        this.delayedShowMarker();       
    }
    
    init = () => {
        fetch('https://api.foursquare.com/v2/venues/search?ll=38.021294,%2023.798670&query=' + this.state.query + '&v=20150214&m=foursquare&client_secret=KVY52L0NEAPDUP2SKHEKGTA2NHFXIW2K0Z2WJ5RWLC1JBA5R&client_id=I3RA2YZX0YFD11IP3G4IVR4EXQDSIRZSNYECRH1KZIB1M4FN')
        .then( res => res.json() )
        .then(res => {   
            const venues = res.response.venues;
            this.setState({ venues })

            var markers = venues.map(v => {
                return {
                    name: v.name.toUpperCase(),
                    position: {
                        lat: v.location.lat, 
                        lng: v.location.lng
                    },
                    address: v.location.formattedAddress.join(' '),
                    id: v.id 
                }
            })
            this.setState({ markers })

            var items = markers.map(m => {
                return m.name
            })
            this.setState({ items })
        })        
        .catch(error => {
            console.log(error);
            console.log(this.state);
        });
    }
    
    //Delay Marker so that the API info is rendered
    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({ isMarkerShown: true })
        }, 3000)
    }
    
    //InfoWindow Toggler
    toggleInfoHandler = (i) => {
        this.setState( prevState => {
            return { isMarkerClicked: !prevState.isMarkerClicked, index: i };
        } );
        this.delayedShowMarker();
    } 

    //SideDrawer Handlers
    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }
    
    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    //Function for filtering the sidebar's list
    filterList = (e) => {
        var updatedList = this.state.markers.map(m => {
            return m.name
        });

        updatedList = updatedList.filter(item => {
        return item.toLowerCase().search(
        e.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList});
    }
    
    render () {
        const google = window.google
        
        return (
            <Auxiliary>
            <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
            <SideDrawer
            open={this.state.showSideDrawer}
            closed={this.sideDrawerClosedHandler} >
            {this.state.isMarkerShown && this.state.items &&
            <Search
            items={this.state.items}
            filterList={this.filterList}
            /> }
                </SideDrawer>
                <main className={classes.Content}>
                <Map
                isMarkerShown={this.state.isMarkerShown}
                openInfo={this.toggleInfoHandler}
                markers={this.state.markers}
                index={this.state.index}
                google={google}
                />
                </main>
                </Auxiliary>
            )
        }
    }
    
    export default Layout;
    
    