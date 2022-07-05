import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import React, {Component} from 'react';

import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';

const buttonStyles = {
    backgroundColor:'white',
    width: 300,
    height: 30,
    marginLeft: 60,
    color:'black'
}

export class MapContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            address:'',
            
            mapCenter: {
                lat: -33.8688,
                lng: 151.2093,
            }
        }
    }

    getLocation = () => {
        if (navigator.geolocation){
            let position = navigator.geolocation.getCurrentPosition(this.showPosition);
            console.log("Postion", position);
        }
        else {
            alert("Geolocation is not supported by this browser");
        }
    }

    /*displayLocation = (latitude, longitude) => {
        var geocoder;
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(latitude, longitude);
    
        geocoder.geocode(
            {'latLng': latlng}, 
            function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var add = results[0].formatted_address ;
                        var value = add.split(",");
    
                        count = value.length;
                        country = value[count-1];
                        state = value[count-2];
                        city = value[count-3];
                        console.log("city", city);
                        x.innerHTML = "city name is: " + city;
                    }
                    else  {
                        x.innerHTML = "address not found";
                    }
                }
                else {
                    x.innerHTML = "Geocoder failed due to: " + status;
                }
            }
        );
    }*/

    /*fetchLocationName = async (lat,lng) => {
        await fetch(
          'https://www.mapquestapi.com/geocoding/v1/reverse?key=API-Key&location='+lat+'%2C'+lng+'&outFormat=json&thumbMaps=false',
        )
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(
              'ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson),
            );
        });
    };*/

    getCity = (lat, lng) => {
        var xhr = new XMLHttpRequest();
        //var lat = coordinates[0];
        //var lng = coordinates[1];
      
        // Paste your LocationIQ token below.
        xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.44b584b966ab53bf0e6a2776b36a8af6&lat=" +lat + "&lon=" + lng + "&format=json", true);
        xhr.send();
        xhr.onreadystatechange = processRequest;
        xhr.addEventListener("readystatechange", processRequest, false);
      
        function processRequest(e) {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                console.log(response);
                var city = response.address.city;
                console.log("city", city);
                return;
            }
        }
    }

    showPosition = (position) => {
        const latlng = {lat:position.coords.latitude, lng:position.coords.longitude}
        console.log("Postion", latlng);
        this.setState({
            mapCenter:latlng
        });
        this.getCity(position.coords.latitude, position.coords.longitude);
    }

    handleChange = address => {
        this.setState({address});
    };

      

    handleSelect = address => {
        geocodeByAddress(address)
        .then(results=> getLatLng(results[0]))
        .then(latlng =>{
            console.log('Success',latlng)
            this.setState({
                address,
            });
            this.setState({
                mapCenter:latlng
            });
        })
        .catch(error => console.error('Error', error));
    };

    render () {
        const {lat, lng} = this.state.mapCenter

        return (

            <div>
            <div>
                <button

                    style={buttonStyles}
                    onClick={this.getLocation}
                    
                >
                  GET CURRENT LOCATION!
                </button>

                <br />
                <br />

                <PlacesAutocomplete
                    value={this.state.address}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div>
                            <input
                                {...getInputProps({
                                    placeholder: 'Search Places ...',
                                    className: 'location-search-input',
                                })} 
                                 />
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                            })}
                                        >
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </PlacesAutocomplete>
                <br />
            </div>
            <Map
                google={this.props.google}
                style={{ height: '500px', width: '900px' }}
                initialCenter={{
                    lat: lat,
                    lng: lng
                }}

                center={{
                    lat: lat,
                    lng: lng,
                }}
            >
                    <Marker
                        position={{
                            lat: lat,
                            lng: lng,
                        }} />
                </Map>

                </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey:"AIzaSyBdIJ9BAkeVdw6KPYYUMPQIe2Gvfp8FwyQ",
    libraries: ["places"] 
})(MapContainer)