# Neighborhood Map Project

## Table of Contents

* [About](#about)
* [Getting Started](#gettingStarted)
* [Prerequisites](#prerequisites)
* [Instructions](#instructions)
* [Built With](#builtWith)
* [Authors](#authors)
* [Contributing](#contributing)
* [Useful links](#usefulLinks)
* [Credits](#credits)
* [License](#license)



## About

This is the eighth and last project of the Google Front-End Nanodegree Program. 

We are requested to write code required to add a full-screen map to our page using the Google Maps API and display map markers identifying at least 5 locations that we are interested in within this neighborhood. 

Also:
- We must implement a list view of the set of locations.
- We must provide a filter option that uses an input field to filter both the list view and the map markers displayed by default on load. The list view and the markers should update accordingly in real time.
- The app's interface should be intuitive to use. 
(The input text area to filter locations should be easy to locate. It should be easy to understand what set of locations is being filtered. Selecting a location via list item or map marker should cause the map marker to bounce or in some other way animate to indicate that the location has been selected and associated info window should open above the map marker with additional information.)
- All data APIs used in the project should load asynchronously and errors should be handled gracefully. 


## Getting Started

Download or fork the repository from this link: 
    
    https://github.com/charazzz/neighborhood-map
    

1. On your cmd run npm install.

2. On your cmd run npm start.

3. With your server running, visit the site: `http://localhost:3000`.


## Prerequisites

    Browser
    Internet connection
    Command-line interface
    

## Instructions

This app is about locating various types of venues within a specific area.

There is a map which by default loads a number of venues.

On the top left corner of the page there is a burger button which, when clicked, displays all the -already appeared on the map- venues on a list. This list includes a search input which filters the venues according to what the user has typed simultaneously on the list and the on the map.

Every venue is accompanied by an InfoWindow which displays some information about the specific venue (I chose only name and address but there are also other possibilities).

When a specific venue is clicked, either on the venues' list on the left or its own marker,the marker animates/bounces so that the user can understand which venue he had chosen and where exactly is located on the map.

## Built With

    HTML,
    CSS,
    JS,
    REACT

## Authors

    Chara Zogkou
    

## Contributing

Please read CONTRIBUTING.md for details.

## Useful links

    Udacity's Project Specification
https://review.udacity.com/#!/rubrics/1351/view

    Udacity Frontend Nanodegree Style Guide
http://udacity.github.io/frontend-nanodegree-styleguide/index.html
http://udacity.github.io/frontend-nanodegree-styleguide/css.html
http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html

    Starting Code
No starting code is provided

## Credits

Info icon by 'http://www.freepik.com' licensed by 'http://creativecommons.org/licenses/by/3.0/'

Foursquare's API is used for fetching the venues and their information/pictures.

## License

Copyright © 2018, Chara Zogkou
Released under Udacity License