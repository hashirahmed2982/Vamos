import React, { Component } from "react";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { cancelOffer, isOfferedByUser, canShow, canCancel } from '../../store/actions/rideActions';
import Collapsible from "react-collapsible";
import * as IoIcons from 'react-icons/io';

class OfferedRides extends Component {

    handleClick = (e) => {
        e.preventDefault();
        this.props.history.push('/offeredall');
    }

    handleClick2 = (e) => {
        e.preventDefault();
        //this.props.history.push('/joinedusers');
    }

    handleCancelOffer = (e, ride) => {
        e.preventDefault();
        const { auth } = this.props;

        if (isOfferedByUser(ride, auth)) {
            this.props.cancelOffer(ride, auth);
        }
    }

    render() {
        const { rides, auth } = this.props;
        if (!auth.uid) {
            return <Redirect to="/signin"/>
        } 
        return(
            <div className="project-list container">
                <div className="col s12 m6" >
                    <h3 style={{marginBottom: "70px"}}>Offered Rides:
                        <div className="right-align" style={{float: "right", fontSize: "18px"}}>
                            <button className="btn black lighten-1" onClick={this.handleClick}>
                                All Offered Rides
                            </button>
                        </div>
                    </h3>
                </div>
                
                <div className="card-action white" style={{marginBottom: "30px"}}>
                    <div className="center-align">
                        <h5>
                            You have scheduled the following ride(s):
                        </h5>
                    </div>
                </div>      
                { rides && rides.map(ride => {           
                    if (isOfferedByUser(ride, auth) && canShow(ride)){
                        if (canCancel(ride)){
                            return (
                                <div className="card z-depth-0 grey lighten-4">
                                    <div className="card-content">
                                        <span className="card-title">
                                            <span style={{float:"left"}}>
                                                From: <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingFrom}</span> @ <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingTime}</span>
                                                <br/>
                                                To: <span style={{fontWeight: 'bold', margin: "0"}}>{ride.arrivingTo}</span> @ approx <span style={{fontWeight: 'bold', margin: "0"}}>{ride.estimatedArrivingTime}</span>
                                                <br/>
                                            </span>
                                            <span style={{float: "right"}}>On <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingDate}</span></span>
                                            <br/>
                                            <br/>
                                            <span style={{fontSize: "18px"}}><span style={{fontWeight: 'bold', margin: "0"}}>{parseInt(ride.noSeats,10) - ride.joinedSeats}</span> available seats remaining @ <span style={{fontWeight: 'bold', margin: "0"}}>{ride.farePerPerson} TL</span>/person.</span>
                                        </span>
                                        <div style={{padding: "30px"}}>
                                            <Link to={'/joinedusers/' + ride.rideId} key={ride.rideId}> 
                                                <button className="btn black lighten-1" style={{float:"right"}}>
                                                    View Joins
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="card-action">
                                        <Collapsible trigger={<div className="center-align"><button className="btn black lighten-1"><IoIcons.IoMdArrowDropdown/> Details</button></div>}>
                                            <div className="center-align" style={{padding: "10px"}}><span>Departure Address: </span>
                                            <span style={{fontWeight: "bold", color: "#36b9ee", margin: "0"}}>{ride.departingFromFullAddress}</span></div>
                                            <img src={ride.departingFromMapUrl}/>
                                            <br></br>
                                            <div className="center-align" style={{padding: "10px"}}><span>Arrival Address: </span>
                                            <span style={{fontWeight: "bold", color: "#e73f48", margin: "0"}}>{ride.arrivingToFullAddress}</span></div>
                                            <img src={ride.arrivingToMapUrl}/>
                                        </Collapsible>
                                    </div>
                                    <div className="card-action grey lighten-2 grey-text">
                                        <div className="center-align">
                                            <button className="btn red lighten-1" onClick={(e) => {this.handleCancelOffer(e, ride)}}>
                                                Cancel Offer
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        return (
                            <div className="card z-depth-0 grey lighten-4">
                                <div className="card-content">
                                    <span className="card-title">
                                        <span style={{float:"left"}}>
                                            From: <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingFrom}</span> @ <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingTime}</span>
                                            <br/>
                                            To: <span style={{fontWeight: 'bold', margin: "0"}}>{ride.arrivingTo}</span> @ approx <span style={{fontWeight: 'bold', margin: "0"}}>{ride.estimatedArrivingTime}</span>
                                            <br/>
                                        </span>
                                        <span style={{float: "right"}}>On <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingDate}</span></span>
                                        <br/>
                                        <br/>
                                        <span style={{fontSize: "18px"}}><span style={{fontWeight: 'bold', margin: "0"}}>{parseInt(ride.noSeats,10) - ride.joinedSeats}</span> available seats remaining @ <span style={{fontWeight: 'bold', margin: "0"}}>{ride.farePerPerson} TL</span>/person.</span>
                                    </span>
                                    <div style={{padding: "30px"}}>
                                        <Link to={'/joinedusers/' + ride.rideId} key={ride.rideId}> 
                                            <button className="btn black lighten-1" style={{float:"right"}}>
                                                View Joins
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="card-action">
                                    <Collapsible trigger={<div className="center-align"><button className="btn black lighten-1"><IoIcons.IoMdArrowDropdown/> Details</button></div>}>
                                        <div className="center-align" style={{padding: "10px"}}><span>Departure Address: </span>
                                        <span style={{fontWeight: "bold", color: "#36b9ee", margin: "0"}}>{ride.departingFromFullAddress}</span></div>
                                        <img src={ride.departingFromMapUrl}/>
                                        <br></br>
                                        <div className="center-align" style={{padding: "10px"}}><span>Arrival Address: </span>
                                        <span style={{fontWeight: "bold", color: "#e73f48", margin: "0"}}>{ride.arrivingToFullAddress}</span></div>
                                        <img src={ride.arrivingToMapUrl}/>
                                    </Collapsible>
                                </div>
                                
                                <div className="card-action grey lighten-2 grey-text">
                                    <div className="center-align">
                                        <button className="btn red lighten-1" disabled>
                                            Too Late To Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    };
                    
                    return null;
                    
                })}  
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

const mapDispatchToProps = (dispatch) => {
    return {
      cancelOffer: (ride, auth) => dispatch(cancelOffer(ride, auth)),
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: 'rides' }
    ])
)(OfferedRides)