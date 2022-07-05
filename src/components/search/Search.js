import React, { Component } from "react";
import RideList from "../rides/RideList";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import SearchQuery from './SearchQuery'

class Search extends Component {
    
    state = {     
        departure: '',
        arrival: '',
        time: null,
        date: '2025-12-13'
    }

    getValue = (e) => {

        const departure  = this.departure.value;
        const arrival  = this.arrival.value;
        const time = this.time.value;
        const date = this.date.value;


        this.setState ({departure:departure, arrival:arrival, time:time, date:date});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const departure = this.state.departure;
        const arrival = this.state.arrival;
        const time = this.state.time;
        const date = this.state.date;

    }

    render() {
        const { rides, auth } = this.props;
        console.log(rides,auth);
        if (!auth.uid) {
            return <Redirect to="/signin"/>
        } 
        
        return(
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m12">
                        <form>
                            <div>
                                <label htmlFor=""> Departure </label>
                                <input type="text" onChange={this.getValue} ref={ (dep) => this.departure = dep}/>
                            </div>
                            <div>
                                <label htmlFor=""> Arrival </label>
                                <input type="text" onChange={this.getValue} ref={ (arr) => this.arrival = arr}/>
                            </div>
                            <div>
                                <label htmlFor=""> Departure Time </label>
                                <input type="time" onChange={this.getValue} ref={ (time) => this.time = time}/>
                            </div>
                            <div>
                                <label htmlFor=""> Date </label>
                                <input type="date" onChange={this.getValue} ref={ (date) => this.date = date}/>
                            </div>
                            <button style={{width:"100%", color:"white", backgroundColor:"black", borderRadius:"10px"}} onClick={this.handleSubmit}>Submit!</button>
                        </form>
                        <h5>Searched Rides:</h5>
                        <SearchQuery rides={rides} arrival={this.state.arrival} departure={this.state.departure} time={this.state.time} date={this.state.date}/>
                        
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
)(Search)