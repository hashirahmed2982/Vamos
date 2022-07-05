import React, { Component } from "react";
import RideListNearMe from "../rides/RideListNearMe";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';

let counter = 0;

class DashboardNearMe extends Component {

    constructor(props){
        super(props);
        counter = 0;
    }

    state = {
        currentTown: "",
        currentCity: "",
        currentLat: "",
        currentLon: "",
    }

    handleClick = (e) => {
        e.preventDefault();
        this.props.history.push('/')
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
                                currentLat: data.currentLat,
                                currentLon: data.currentLon,
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
                            <h3>Available Rides (Within 7 Km):
                            <div style={{fontSize: "0.5em", fontWeight: "bold", float: "right"}}>{this.state.currentTown} - {this.state.currentCity}
                            </div> 
                            </h3>
                            <button className="btn black lighten-1" style={{float:"right"}} onClick={this.handleClick}>All Available Rides</button>
                        </div>
                        <RideListNearMe rides={rides} userLat={this.state.currentLat} userLon={this.state.currentLon}/>
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
)(DashboardNearMe)
