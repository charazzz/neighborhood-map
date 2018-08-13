import React, { PureComponent } from 'react';

import Auxiliary from '../Auxiliary/Auxiliary';
import Map from '../../components/Map/Map';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Search from '../../components/UI/Search/Search';
import NoImage from '../../assets/pictures/NoImage.png';

import classes from './Layout.css';

class Layout extends PureComponent {
    state = {
        showSideDrawer: false,
        markers: [],
        items: [],
        pics: [],
        filteredMarkers: [],
        isMarkerShown: false,
        isMarkerClicked: null,
        query: 'restaurant',
        index: null
    }
    
    componentDidMount() {
        this.init();
        this.delayedShowMarker();       
    }
    
    //Initialize the app by fetching the venues and their 
    init = () => {
        fetch('https://api.foursquare.com/v2/venues/search?ll=38.021294,%2023.798670&query=' + this.state.query + '&v=20150214&m=foursquare&client_secret=KVY52L0NEAPDUP2SKHEKGTA2NHFXIW2K0Z2WJ5RWLC1JBA5R&client_id=I3RA2YZX0YFD11IP3G4IVR4EXQDSIRZSNYECRH1KZIB1M4FN')
        .then( res => res.json() )
        .then(res => { 
            const venues = res.response.venues;
            
            let markers = venues.map(v => {
                let attachedAddress = [v.location.address, v.location.city];
                let attachedIcon = [v.categories[0].icon.prefix, v.categories[0].icon.suffix];
                
                return {
                    name: v.name,
                    position: {
                        lat: v.location.lat, 
                        lng: v.location.lng
                    },
                    address: attachedAddress.join('\n'),
                    id: v.id,
                    icon: attachedIcon.join('bg_32')
                }
            })
            
            this.setState({ markers, items: markers })
            
            this.fetchPics();
        })        
        .catch(error => {
            alert('Sorry for the inconvenience. The following error has occurred: ' + error);
        });        
    }
    
    //Fetch the pictures of the venues 
    fetchPics = () => {
        let pics=[];
        
        this.state.markers.map(m => {
            fetch('https://api.foursquare.com/v2/venues/' + m.id + '/photos?&oauth_token=MCDZOB502YQJVGZNO5UOAHC2BQLL3EFADLA0BZQEEJBOD1TQ&v=20180812')
            .then(res => res.json())
            .then(res => {
                let prefix = res.response.photos.items[0] ? res.response.photos.items[0].prefix : null;
                let suffix = res.response.photos.items[0] ? res.response.photos.items[0].suffix : null;
                let pic = prefix ? prefix + '100x100' + suffix : NoImage;
                return pics.push(pic);
            })
            return pics;
        })
        this.setState({ pics })
        // .catch(error => {
        //     console.log(error);
        // }); 
    }
    
    //Delay Markers so that the API info is fetched
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
    
    //SideDrawer Open & Close Handlers
    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer, index: null };
        } );
    }
    
    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }
    
    //Function for filtering the sidebar's list
    filterListHandler = (e) => {
        let loggedMarkers = [];
        let updatedMarkers = this.state.markers.map(marker => marker.name);

        updatedMarkers = updatedMarkers.filter(marker => marker.toLowerCase().search(e.target.value.toLowerCase()) !== -1)
        this.state.markers.map(marker => {
            if (updatedMarkers.includes(marker.name)) {
                return loggedMarkers.push(marker);
            }
        })
        this.setState({items: loggedMarkers});
        }
        
        //- When a list item is clicked find the relevant marker and make it animate - Handler
        listItemClickedHandler = (i) => {
            this.setState(prevState => {
                return { isMarkerClicked: !prevState.isMarkerClicked, index: i, showSideDrawer: false };
            } );
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
                    filterListHandler={this.filterListHandler}
                    listItemClickedHandler={this.listItemClickedHandler}
                    /> }
                    </SideDrawer>
                    <main className={classes.Content}>
                    <Map
                    isMarkerShown={this.state.isMarkerShown}
                    openInfo={this.toggleInfoHandler}
                    markers={this.state.markers}
                    update={this.state.update}
                    items={this.state.items}
                    pics={this.state.pics}
                    index={this.state.index}
                    google={google}
                    query={this.state.query}
                    />
                    </main>
                    </Auxiliary>
                )
            }
        }
        
        export default Layout;
        
        