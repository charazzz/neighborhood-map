import React, { PureComponent } from 'react';

import Auxiliary from '../Auxiliary/Auxiliary';
import Map from '../../components/Map/Map';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Search from '../../components/UI/Search/Search';
import QueryInput from '../../components/UI/QueryInput/QueryInput';

import NoImage from '../../assets/pictures/NoImage.png';

import classes from './Layout.css';

class Layout extends PureComponent {
    state = {
        showSideDrawer: false,
        markers: null,
        items: [],
        pics: [],
        isMarkerShown: false,
        isMarkerClicked: null,
        index: null
    }
    
    componentDidMount() {
        this.init();
        this.delayedShowMarker();   
    }
    
    //**-------------------Main API Request Functions----------------**//
    //Initialize the app by fetching the venues and their info
    init = () => {
        fetch('https://api.foursquare.com/v2/venues/search?ll=38.021294,%2023.798670&categoryId=4d4b7105d754a06376d81259&v=20150214&m=foursquare&client_secret=KVY52L0NEAPDUP2SKHEKGTA2NHFXIW2K0Z2WJ5RWLC1JBA5R&client_id=I3RA2YZX0YFD11IP3G4IVR4EXQDSIRZSNYECRH1KZIB1M4FN')
        
        .then(res => res.json() )
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
                    icon: attachedIcon.join('bg_32'),
                    category: v.categories[0].name
                }
            })
            
            this.setState({ markers, items: markers })
            this.fetchPics();
        })        
        .catch(error => {
            alert('Sorry for the inconvenience. Can\'t fetch data. Error: ' + error);
        });     
    }
    
    //Fetch the pictures of the venues 
    fetchPics = () => {
        let pic;
        this.state.markers.map(m => {
            fetch('https://api.foursquare.com/v2/venues/' + m.id + '/photos?&oauth_token=MCDZOB502YQJVGZNO5UOAHC2BQLL3EFADLA0BZQEEJBOD1TQ&v=20180812')
            .then(res => res.json())
            .then(res => {
                let prefix = res.response.photos.items[0] ? res.response.photos.items[0].prefix : null;
                let suffix = res.response.photos.items[0] ? res.response.photos.items[0].suffix : null;
                pic = prefix ? prefix + '100x100' + suffix : NoImage;
                return m.pic = pic;
                })
            .catch(error => {
                //alert('Sorry for the inconvenience. Can\'t fetch photos');
                console.log(error)
            });
            return this.state.markers;
        })    
    }//**-------------------Main API Request Functions----------------**//
    
    
    //------Delay Markers so that the API info is fetched Handler------//
    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({ isMarkerShown: true })
        }, 3000)
    }//------Delay Markers so that the API info is fetched Handler------//
    
    
    //--------InfoWindow Show/Hide Handler----------//
    toggleInfoHandler = (i) => {
        this.setState( prevState => {
            return { isMarkerClicked: !prevState.isMarkerClicked, index: i };
        } );
        this.delayedShowMarker();
    } //--------InfoWindow Show/Hide Handler----------//
    
    
    //-----------SideDrawer Open & Close Handlers-------------//
    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer, index: null };
        } );
        
        const searchInput = document.querySelector('#searchInput');
        searchInput.focus();
    }
    
    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
        
        const selectCategory = document.querySelector('#selectCategory');
        selectCategory.focus();
    }//-----------SideDrawer Open & Close Handlers-------------//
    
    
    //--------SideBar's Search Handlers----------//
    //Function for filtering the sidebar's list and markers simultaneously upon user's typing
    filterListHandler = (e) => {
        let loggedMarkers = [];
        let updatedMarkers = this.state.markers.map(marker => marker.name);
        
        //filter the user's input and then, if it is included in the main/marker's array, update
        updatedMarkers = updatedMarkers.filter(marker => 
            marker.toLowerCase().search(e.target.value.toLowerCase()) !== -1)
        this.state.markers.map(marker => {
            if (updatedMarkers.includes(marker.name)) {
                return loggedMarkers.push(marker);
            }
            return loggedMarkers;
        })
        this.setState({items: loggedMarkers});
    }    
    //- When a list item is clicked find the relevant marker and make it animate - Handler
    listItemClickedHandler = (i) => {
        this.setState(prevState => {
            return { isMarkerClicked: !prevState.isMarkerClicked, index: i, showSideDrawer: false };
        } );
    }//--------SideBar's Search Handlers----------//
    
    
    //------Update venue list and markers upon user's category selection-------//
    queryHandler = (e) => {
        let loggedMarkers = [];
        
        if (e === 'All') {
            this.setState({items: this.state.markers});
        } else {
            this.state.markers.map(marker => {
                if (marker.category.includes(e)) {
                    return loggedMarkers.push(marker);
                }
                return loggedMarkers;
            })
            this.setState({items: loggedMarkers});
        }
    }//------Update venue list and markers upon user's category selection-------//
    
    //-------Skip to main button-Focus Fuunction----------//
    mainContentBtnFocus = () => {
        const mainBtnCnt = document.querySelector('#mainBtnCnt');
        mainBtnCnt.focus();
    }//-------Skip to main button-Focus Fuunction----------//
    
    
    render () {
        const google = window.google
        
        return (
            <Auxiliary>
                <Toolbar
                sideDrawerToggleHandler={this.sideDrawerToggleHandler}
                focus={this.mainContentBtnFocus}
                />
                <QueryInput
                queryHandler={this.queryHandler}
                focus={this.mainContentBtnFocus}
                />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} >
                    {this.state.isMarkerShown && this.state.items &&
                    <Search
                    items={this.state.items}
                    filterListHandler={this.filterListHandler}
                    listItemClickedHandler={this.listItemClickedHandler}
                    sideDrawerClosedHandler={this.sideDrawerClosedHandler}
                    /> }
                </SideDrawer>
                <main className={classes.Content}>
                    <Map
                        isMarkerShown={this.state.isMarkerShown}
                        openInfo={this.toggleInfoHandler}
                        items={this.state.items}
                        index={this.state.index}
                        google={google}
                    />
                </main>
                </Auxiliary>
            )
        }
    }
    
    export default Layout;
    
    