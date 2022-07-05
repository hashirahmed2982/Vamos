import React, { Component } from "react";
import RideList from "../rides/RideList";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';

let counter = 0;

class Dashboard extends Component {

    /*constructor(props){
        super(props);
        if (count === 0){
            //this.getLocation();
            count++;
        }
    }

    state = {
        currentLat: "",
        currentLon: "",
        currentAddress: "",
        currentTown: "",
        currentCity: "",
    }

    showPosition = (position) => {
        this.setState({
            currentLat:position.coords.latitude,
            currentLon:position.coords.longitude,
        });
        this.getAddress(this.state.currentLat, this.state.currentLon);
        //this.getCity(position.coords.latitude, position.coords.longitude);
    }

    getLocation = () => {
        if (navigator.geolocation){
            let position = navigator.geolocation.getCurrentPosition(this.showPosition);
        }
        else {
            console.log("Geolocation is not supported by this browser");
        }
    }

    getAddress = (lat, lon) => {
        let url = `https://eu1.locationiq.com/v1/reverse.php?key=pk.44b584b966ab53bf0e6a2776b36a8af6&lat=${lat}&lon=${lon}&format=json`;
        
        fetch(url)
          .then((resp) => {
            if (!resp.ok) throw new Error(resp.statusText);
            return resp.json();
          })
          .then((data) => {
            this.setState({
              currentAddress: data.display_name,
              currentTown: data.address.town,
              currentCity: data.address.province,
            });
          })
          .catch((err) => {
            console.error(err);
        });
    }*/

    constructor(props){
        super(props);
        counter = 0;
    }

    state = {
        currentTown: "",
        currentCity: "",
    }

    handleClick = (e) => {
        e.preventDefault();
        this.props.history.push('/ridesnearme')
    }

    render() {
        const { rides, auth } = this.props;
        if (!auth.uid) {
            return <Redirect to="/signin"/>
        } 

        if (counter === 0) {
            const firestore = getFirestore();
            firestore.collection('users').get()
            .then((querySnapshot) => {
                querySnapshot.forEach(snapshot => {
                        let data = snapshot.data();
                        if (data.uid === auth.uid){
                            this.setState({
                                currentTown: data.currentTown,
                                currentCity: data.currentCity,
                            })
                            counter++;
                        }
                    }
                )
            })
        }
       
        return(
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m12">
                        <div>
                            <h3>All Available Rides:
                            <div style={{fontSize: "0.5em", fontWeight: "bold", float: "right"}}>{this.state.currentTown} - {this.state.currentCity}
                            </div> 
                            </h3>
                            <button className="btn black lighten-1" style={{float:"right"}} onClick={this.handleClick}>Near Me</button>
                        </div>
                        <RideList rides={rides}/>
                    </div>
                </div>
            </div>    
        )
    }
}

const mapStateToProps = (state) => {
    return {
        rides: state.firestore.ordered.rides,
        auth: state.firebase.auth,
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'rides' }
    ])
)(Dashboard)
