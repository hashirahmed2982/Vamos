import React, {Component} from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom';
import moment from 'moment'
import { joinRide, cancelJoin, cancelOffer, isJoinedByUser, isOfferedByUser, canCancel, canJoin, enoughMoney } from '../../store/actions/rideActions';
import { getFirestore } from 'redux-firestore';

let counter = 0;

class RideDetails extends Component {

  constructor(props){
    super(props);
    counter = 0;
  }

  state = {
    enoughMoney: true,
  }


  handleJoin = (e) => {
    e.preventDefault();
    this.props.joinRide(this.props.ride, this.props.auth);
    this.props.history.push('/home');
  }

  handleCancelJoin = (e) => {
    e.preventDefault();
    this.props.cancelJoin(this.props.ride, this.props.auth);
    this.props.history.push('/home');
  }

  handleCancelOffer = (e) => {
    e.preventDefault();
    this.props.cancelOffer(this.props.ride, this.props.auth);
    this.props.history.push('/home');
  }

  redirectToWallet = (e) => {
    e.preventDefault();
    this.props.history.push('/wallet');
  }

  render() {
    const { ride, auth, authError } = this.props;
    console.log( "RIDE", ride);
    if (counter === 0) {
      const firestore = getFirestore();
      firestore.collection('users').get()
      .then((querySnapshot) => {
          querySnapshot.forEach(snapshot => {
            let data = snapshot.data();
            if (data.uid === auth.uid){
              if (!enoughMoney(this.props.ride, data.wallet)){
                this.setState({
                  enoughMoney: false,
                })
              }
              counter++;
            }
          }
        )
      })
    }
    
    if (!auth.uid) {
      return <Redirect to="/signin"/>
    } 
    if (ride) {
      if (ride.joinedSeats === parseInt(ride.noSeats, 10) && !isJoinedByUser(ride, auth)){
        return (
          <div className="container section ride-details">
            <h3>
              Ride Details: 
            </h3>
            <div className="card z-depth-0">
              <div className="row">
                <div className="col m8 s12">
                  <div className="card-content">
                    <span className="card-title">
                      From: <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingFrom}</span> @ <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingTime}</span>
                      <br/>
                      <br/>
                      To: <span style={{fontWeight: 'bold', margin: "0"}}>{ride.arrivingTo}</span> @ approx <span style={{fontWeight: 'bold', margin: "0"}}>{ride.estimatedArrivingTime}</span>
                      <br/>
                      <br/>
                      On <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingDate}</span>
                      <br/>
                      <br/>
                      Meeting at <span style={{fontWeight: 'bold', margin: "0"}}>{ride.meetingPoint}</span> before departure.
                    </span>
                    <span style={{fontSize: "18px"}}><span style={{fontWeight: 'bold', margin: "0"}}>{ride.noSeats}</span> total seats offered @ <span style={{fontWeight: 'bold', margin: "0"}}>{ride.farePerPerson} TL</span>/person.</span>
                    <br/>
                    <span style={{fontSize: "18px"}}><span style={{fontWeight: 'bold', margin: "0"}}>{ride.joinedSeats}</span> already joined.</span>
                  </div>
                </div>
                <div className="col m4 s12">
                  <div className="card-content grey">
                    <span className ="card-title center-align">
                      Vehicle Details:
                    </span>
                    <ul className="center-align">
                      <li style={{fontSize: "18px"}}>Vehicle Name: <span style={{fontWeight: "bold", margin: "0"}}>{ride.vehicleName}</span></li>
                      <li style={{fontSize: "18px"}}>Vehicle Model: <span style={{fontWeight: "bold", margin: "0"}}>{ride.vehicleModel}</span></li>
                      <li style={{fontSize: "18px"}}>License Plate: <span style={{fontWeight: "bold", margin: "0"}}>{ride.licensePlate}</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-action">
                <div className="center-align" style={{padding: "10px"}}><span>Departure Address: </span>
                <span style={{fontWeight: "bold", color: "#36b9ee", margin: "0"}}>{ride.departingFromFullAddress}</span></div>
                <img src={ride.departingFromMapUrl}/>
                <br></br>
                <div className="center-align" style={{padding: "10px"}}><span>Arrival Address: </span>
                <span style={{fontWeight: "bold", color: "#e73f48", margin: "0"}}>{ride.arrivingToFullAddress}</span></div>
                <img src={ride.arrivingToMapUrl}/>
              </div>
              <div className="card-action grey lighten-4 grey-text">
                <div className="left-align">
                  <div>Posted by {ride.authorFirstName} {ride.authorLastName}</div>
                  <div>{moment(ride.createdAt.toDate()).calendar()}</div>
                </div>
                <div className="right-align">
                  <button className="btn black lighten-1" disabled>
                    Ride Full
                  </button>
                </div>
              </div>
            </div>
            <div className="red-text center">
                { authError ? <p>{ authError }</p> : null}
            </div>
          </div>
        )
      }

      else if (isOfferedByUser(ride, auth)){
        if (canCancel(ride)){
          return (
            <div className="container section ride-details">
              <h3>
                Ride Details: 
              </h3>
              <div className="card z-depth-0">
                <div className="row">
                  <div className="col m8 s12">
                    <div className="card-content">
                      <span className="card-title">
                        From: <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingFrom}</span> @ <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingTime}</span>
                        <br/>
                        <br/>
                        To: <span style={{fontWeight: 'bold', margin: "0"}}>{ride.arrivingTo}</span> @ approx <span style={{fontWeight: 'bold', margin: "0"}}>{ride.estimatedArrivingTime}</span>
                        <br/>
                        <br/>
                        On <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingDate}</span>
                        <br/>
                        <br/>
                        Meeting at <span style={{fontWeight: 'bold', margin: "0"}}>{ride.meetingPoint}</span> before departure.
                      </span>
                      <span style={{fontSize: "18px"}}><span style={{fontWeight: 'bold', margin: "0"}}>{ride.noSeats}</span> total seats offered @ <span style={{fontWeight: 'bold', margin: "0"}}>{ride.farePerPerson} TL</span>/person.</span>
                      <br/>
                      <span style={{fontSize: "18px"}}><span style={{fontWeight: 'bold', margin: "0"}}>{ride.joinedSeats}</span> already joined.</span>
                    </div>
                  </div>
                  <div className="col m4 s12">
                    <div className="card-content grey">
                      <span className ="card-title center-align">
                        Vehicle Details:
                      </span>
                      <ul className="center-align">
                        <li style={{fontSize: "18px"}}>Vehicle Name: <span style={{fontWeight: "bold", margin: "0"}}>{ride.vehicleName}</span></li>
                        <li style={{fontSize: "18px"}}>Vehicle Model: <span style={{fontWeight: "bold", margin: "0"}}>{ride.vehicleModel}</span></li>
                        <li style={{fontSize: "18px"}}>License Plate: <span style={{fontWeight: "bold", margin: "0"}}>{ride.licensePlate}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-action">
                  <div className="center-align" style={{padding: "10px"}}><span>Departure Address: </span>
                  <span style={{fontWeight: "bold", color: "#36b9ee", margin: "0"}}>{ride.departingFromFullAddress}</span></div>
                  <img src={ride.departingFromMapUrl}/>
                  <br></br>
                  <div className="center-align" style={{padding: "10px"}}><span>Arrival Address: </span>
                  <span style={{fontWeight: "bold", color: "#e73f48", margin: "0"}}>{ride.arrivingToFullAddress}</span></div>
                  <img src={ride.arrivingToMapUrl}/>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                  <div className="left-align">
                    <div>Posted by {ride.authorFirstName} {ride.authorLastName}</div>
                    <div>{moment(ride.createdAt.toDate()).calendar()}</div>
                  </div>
                  <div className="right-align">
                    <button className="btn red lighten-1" onClick={this.handleCancelOffer}>
                      Cancel Offer
                    </button>
                  </div>
                </div>
              </div>
              <div className="red-text center">
                  { authError ? <p>{ authError }</p> : null}
              </div>
            </div>
          )
        }

        return (
          <div className="container section ride-details">
            <h3>
              Ride Details: 
            </h3>
            <div className="card z-depth-0">
              <div className="row">
                <div className="col m8 s12">
                  <div className="card-content">
                    <span className="card-title">
                      From: <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingFrom}</span> @ <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingTime}</span>
                      <br/>
                      <br/>
                      To: <span style={{fontWeight: 'bold', margin: "0"}}>{ride.arrivingTo}</span> @ approx <span style={{fontWeight: 'bold', margin: "0"}}>{ride.estimatedArrivingTime}</span>
                      <br/>
                      <br/>
                      On <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingDate}</span>
                      <br/>
                      <br/>
                      Meeting at <span style={{fontWeight: 'bold', margin: "0"}}>{ride.meetingPoint}</span> before departure.
                    </span>
                    <span style={{fontSize: "18px"}}><span style={{fontWeight: 'bold', margin: "0"}}>{ride.noSeats}</span> total seats offered @ <span style={{fontWeight: 'bold', margin: "0"}}>{ride.farePerPerson} TL</span>/person.</span>
                    <br/>
                    <span style={{fontSize: "18px"}}><span style={{fontWeight: 'bold', margin: "0"}}>{ride.joinedSeats}</span> already joined.</span>
                  </div>
                </div>
                <div className="col m4 s12">
                  <div className="card-content grey">
                    <span className ="card-title center-align">
                      Vehicle Details:
                    </span>
                    <ul className="center-align">
                      <li style={{fontSize: "18px"}}>Vehicle Name: <span style={{fontWeight: "bold", margin: "0"}}>{ride.vehicleName}</span></li>
                      <li style={{fontSize: "18px"}}>Vehicle Model: <span style={{fontWeight: "bold", margin: "0"}}>{ride.vehicleModel}</span></li>
                      <li style={{fontSize: "18px"}}>License Plate: <span style={{fontWeight: "bold", margin: "0"}}>{ride.licensePlate}</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-action">
                <div className="center-align" style={{padding: "10px"}}><span>Departure Address: </span>
                <span style={{fontWeight: "bold", color: "#36b9ee", margin: "0"}}>{ride.departingFromFullAddress}</span></div>
                <img src={ride.departingFromMapUrl}/>
                <br></br>
                <div className="center-align" style={{padding: "10px"}}><span>Arrival Address: </span>
                <span style={{fontWeight: "bold", color: "#e73f48", margin: "0"}}>{ride.arrivingToFullAddress}</span></div>
                <img src={ride.arrivingToMapUrl}/>
              </div>
              <div className="card-action grey lighten-4 grey-text">
                <div className="left-align">
                  <div>Posted by {ride.authorFirstName} {ride.authorLastName}</div>
                  <div>{moment(ride.createdAt.toDate()).calendar()}</div>
                </div>
                <div className="right-align">
                  <button className="btn red lighten-1" disabled>
                    Too Late To Cancel
                  </button>
                </div>
              </div>
            </div>
            <div className="red-text center">
                { authError ? <p>{ authError }</p> : null}
            </div>
          </div>
        )
        
      }

      else if (isJoinedByUser(ride, auth)){
        if(canCancel(ride)){
          return (
            <div className="container section ride-details">
              <h3>
                Ride Details: 
              </h3>
              <div className="card z-depth-0">
                <div className="row">
                  <div className="col m8 s12">
                    <div className="card-content">
                      <span className="card-title">
                        From: <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingFrom}</span> @ <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingTime}</span>
                        <br/>
                        <br/>
                        To: <span style={{fontWeight: 'bold', margin: "0"}}>{ride.arrivingTo}</span> @ approx <span style={{fontWeight: 'bold', margin: "0"}}>{ride.estimatedArrivingTime}</span>
                        <br/>
                        <br/>
                        On <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingDate}</span>
                        <br/>
                        <br/>
                        Meeting at <span style={{fontWeight: 'bold', margin: "0"}}>{ride.meetingPoint}</span> before departure.
                      </span>
                      <span style={{fontSize: "18px"}}><span style={{fontWeight: 'bold', margin: "0"}}>{ride.noSeats}</span> total seats offered @ <span style={{fontWeight: 'bold', margin: "0"}}>{ride.farePerPerson} TL</span>/person.</span>
                      <br/>
                      <span style={{fontSize: "18px"}}><span style={{fontWeight: 'bold', margin: "0"}}>{ride.joinedSeats}</span> already joined.</span>
                    </div>
                  </div>
                  <div className="col m4 s12">
                    <div className="card-content grey">
                      <span className ="card-title center-align">
                        Vehicle Details:
                      </span>
                      <ul className="center-align">
                        <li style={{fontSize: "18px"}}>Vehicle Name: <span style={{fontWeight: "bold", margin: "0"}}>{ride.vehicleName}</span></li>
                        <li style={{fontSize: "18px"}}>Vehicle Model: <span style={{fontWeight: "bold", margin: "0"}}>{ride.vehicleModel}</span></li>
                        <li style={{fontSize: "18px"}}>License Plate: <span style={{fontWeight: "bold", margin: "0"}}>{ride.licensePlate}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-action">
                  <div className="center-align" style={{padding: "10px"}}><span>Departure Address: </span>
                  <span style={{fontWeight: "bold", color: "#36b9ee", margin: "0"}}>{ride.departingFromFullAddress}</span></div>
                  <img src={ride.departingFromMapUrl}/>
                  <br></br>
                  <div className="center-align" style={{padding: "10px"}}><span>Arrival Address: </span>
                  <span style={{fontWeight: "bold", color: "#e73f48", margin: "0"}}>{ride.arrivingToFullAddress}</span></div>
                  <img src={ride.arrivingToMapUrl}/>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                  <div className="left-align">
                    <div>Posted by {ride.authorFirstName} {ride.authorLastName}</div>
                    <div>{moment(ride.createdAt.toDate()).calendar()}</div>
                  </div>
                  <div className="right-align">
                    <button className="btn red lighten-1" onClick={this.handleCancelJoin}>
                      Cancel Join
                    </button>
                  </div>
                </div>
              </div>
              <div className="red-text center">
                  { authError ? <p>{ authError }</p> : null}
              </div>
            </div>
          )
        }

        return (
          <div className="container section ride-details">
            <h3>
              Ride Details: 
            </h3>
            <div className="card z-depth-0">
              <div className="row">
                <div className="col m8 s12">
                  <div className="card-content">
                    <span className="card-title">
                      From: <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingFrom}</span> @ <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingTime}</span>
                      <br/>
                      <br/>
                      To: <span style={{fontWeight: 'bold', margin: "0"}}>{ride.arrivingTo}</span> @ approx <span style={{fontWeight: 'bold', margin: "0"}}>{ride.estimatedArrivingTime}</span>
                      <br/>
                      <br/>
                      On <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingDate}</span>
                      <br/>
                      <br/>
                      Meeting at <span style={{fontWeight: 'bold', margin: "0"}}>{ride.meetingPoint}</span> before departure.
                    </span>
                    <span style={{fontSize: "18px"}}><span style={{fontWeight: 'bold', margin: "0"}}>{ride.noSeats}</span> total seats offered @ <span style={{fontWeight: 'bold', margin: "0"}}>{ride.farePerPerson} TL</span>/person.</span>
                    <br/>
                    <span style={{fontSize: "18px"}}><span style={{fontWeight: 'bold', margin: "0"}}>{ride.joinedSeats}</span> already joined.</span>
                  </div>
                </div>
                <div className="col m4 s12">
                  <div className="card-content grey">
                    <span className ="card-title center-align">
                      Vehicle Details:
                    </span>
                    <ul className="center-align">
                      <li style={{fontSize: "18px"}}>Vehicle Name: <span style={{fontWeight: "bold", margin: "0"}}>{ride.vehicleName}</span></li>
                      <li style={{fontSize: "18px"}}>Vehicle Model: <span style={{fontWeight: "bold", margin: "0"}}>{ride.vehicleModel}</span></li>
                      <li style={{fontSize: "18px"}}>License Plate: <span style={{fontWeight: "bold", margin: "0"}}>{ride.licensePlate}</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-action">
                <div className="center-align" style={{padding: "10px"}}><span>Departure Address: </span>
                <span style={{fontWeight: "bold", color: "#36b9ee", margin: "0"}}>{ride.departingFromFullAddress}</span></div>
                <img src={ride.departingFromMapUrl}/>
                <br></br>
                <div className="center-align" style={{padding: "10px"}}><span>Arrival Address: </span>
                <span style={{fontWeight: "bold", color: "#e73f48", margin: "0"}}>{ride.arrivingToFullAddress}</span></div>
                <img src={ride.arrivingToMapUrl}/>
              </div>
              <div className="card-action grey lighten-4 grey-text">
                <div className="left-align">
                  <div>Posted by {ride.authorFirstName} {ride.authorLastName}</div>
                  <div>{moment(ride.createdAt.toDate()).calendar()}</div>
                </div>
                <div className="right-align">
                  <button className="btn red lighten-1" disabled>
                    Too Late To Cancel
                  </button>
                </div>
              </div>
            </div>
            <div className="red-text center">
                { authError ? <p>{ authError }</p> : null}
            </div>
          </div>
        )
        
      }

      if (canJoin(ride)){
        if (this.state.enoughMoney){
          return (
            <div className="container section ride-details">
              <h3>
                Ride Details: 
              </h3>
              <div className="card z-depth-0">
                <div className="row">
                  <div className="col m8 s12">
                    <div className="card-content">
                      <span className="card-title">
                        From: <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingFrom}</span> @ <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingTime}</span>
                        <br/>
                        <br/>
                        To: <span style={{fontWeight: 'bold', margin: "0"}}>{ride.arrivingTo}</span> @ approx <span style={{fontWeight: 'bold', margin: "0"}}>{ride.estimatedArrivingTime}</span>
                        <br/>
                        <br/>
                        On <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingDate}</span>
                        <br/>
                        <br/>
                        Meeting at <span style={{fontWeight: 'bold', margin: "0"}}>{ride.meetingPoint}</span> before departure.
                      </span>
                      <span style={{fontSize: "18px"}}><span style={{fontWeight: 'bold', margin: "0"}}>{ride.noSeats}</span> total seats offered @ <span style={{fontWeight: 'bold', margin: "0"}}>{ride.farePerPerson} TL</span>/person.</span>
                      <br/>
                      <span style={{fontSize: "18px"}}><span style={{fontWeight: 'bold', margin: "0"}}>{ride.joinedSeats}</span> already joined.</span>
                    </div>
                  </div>
                  <div className="col m4 s12">
                    <div className="card-content grey">
                      <span className ="card-title center-align">
                        Vehicle Details:
                      </span>
                      <ul className="center-align">
                        <li style={{fontSize: "18px"}}>Vehicle Name: <span style={{fontWeight: "bold", margin: "0"}}>{ride.vehicleName}</span></li>
                        <li style={{fontSize: "18px"}}>Vehicle Model: <span style={{fontWeight: "bold", margin: "0"}}>{ride.vehicleModel}</span></li>
                        <li style={{fontSize: "18px"}}>License Plate: <span style={{fontWeight: "bold", margin: "0"}}>{ride.licensePlate}</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card-action">
                  <div className="center-align" style={{padding: "10px"}}><span>Departure Address: </span>
                  <span style={{fontWeight: "bold", color: "#36b9ee", margin: "0"}}>{ride.departingFromFullAddress}</span></div>
                  <img src={ride.departingFromMapUrl}/>
                  <br></br>
                  <div className="center-align" style={{padding: "10px"}}><span>Arrival Address: </span>
                  <span style={{fontWeight: "bold", color: "#e73f48", margin: "0"}}>{ride.arrivingToFullAddress}</span></div>
                  <img src={ride.arrivingToMapUrl}/>
                </div>
                <div className="card-action grey lighten-4 grey-text">
                  <div className="left-align">
                    <div>Posted by {ride.authorFirstName} {ride.authorLastName}</div>
                    <div>{moment(ride.createdAt.toDate()).calendar()}</div>
                  </div>
                  <div className="right-align">
                    <button className="btn black lighten-1" onClick={this.handleJoin}>
                      Join Ride
                    </button>
                  </div>
                </div>
              </div>
              <div className="red-text center">
                  { authError ? <p>{ authError }</p> : null}
              </div>
            </div>
          )
        }
        return (
          <div className="container section ride-details">
            <h3>
              Ride Details: 
            </h3>
            <div className="card z-depth-0">
              <div className="row">
                <div className="col m8 s12">
                  <div className="card-content">
                    <span className="card-title">
                      From: <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingFrom}</span> @ <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingTime}</span>
                      <br/>
                      <br/>
                      To: <span style={{fontWeight: 'bold', margin: "0"}}>{ride.arrivingTo}</span> @ approx <span style={{fontWeight: 'bold', margin: "0"}}>{ride.estimatedArrivingTime}</span>
                      <br/>
                      <br/>
                      On <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingDate}</span>
                      <br/>
                      <br/>
                      Meeting at <span style={{fontWeight: 'bold', margin: "0"}}>{ride.meetingPoint}</span> before departure.
                    </span>
                    <span style={{fontSize: "18px"}}><span style={{fontWeight: 'bold', margin: "0"}}>{ride.noSeats}</span> total seats offered @ <span style={{fontWeight: 'bold', margin: "0"}}>{ride.farePerPerson} TL</span>/person.</span>
                    <br/>
                    <span style={{fontSize: "18px"}}><span style={{fontWeight: 'bold', margin: "0"}}>{ride.joinedSeats}</span> already joined.</span>
                  </div>
                </div>
                <div className="col m4 s12">
                  <div className="card-content grey">
                    <span className ="card-title center-align">
                      Vehicle Details:
                    </span>
                    <ul className="center-align">
                      <li style={{fontSize: "18px"}}>Vehicle Name: <span style={{fontWeight: "bold", margin: "0"}}>{ride.vehicleName}</span></li>
                      <li style={{fontSize: "18px"}}>Vehicle Model: <span style={{fontWeight: "bold", margin: "0"}}>{ride.vehicleModel}</span></li>
                      <li style={{fontSize: "18px"}}>License Plate: <span style={{fontWeight: "bold", margin: "0"}}>{ride.licensePlate}</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="card-action">
                <div className="center-align" style={{padding: "10px"}}><span>Departure Address: </span>
                <span style={{fontWeight: "bold", color: "#36b9ee", margin: "0"}}>{ride.departingFromFullAddress}</span></div>
                <img src={ride.departingFromMapUrl}/>
                <br></br>
                <div className="center-align" style={{padding: "10px"}}><span>Arrival Address: </span>
                <span style={{fontWeight: "bold", color: "#e73f48", margin: "0"}}>{ride.arrivingToFullAddress}</span></div>
                <img src={ride.arrivingToMapUrl}/>
              </div>
              <div className="card-action grey lighten-4 grey-text">
                <div className="left-align">
                  <div>Posted by {ride.authorFirstName} {ride.authorLastName}</div>
                  <div>{moment(ride.createdAt.toDate()).calendar()}</div>
                </div>
                <div className="right-align">
                  <button className="btn red lighten-1" onClick={this.redirectToWallet}>
                    Not Enough Money (Click to Top Up)
                  </button>
                </div>
              </div>
            </div>
            <div className="red-text center">
                { authError ? <p>{ authError }</p> : null}
            </div>
          </div>
        )
      }
      return (
        <div className="container section ride-details">
          <h3>
            Ride Details: 
          </h3>
          <div className="card z-depth-0">
            <div className="row">
              <div className="col m8 s12">
                <div className="card-content">
                  <span className="card-title">
                    From: <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingFrom}</span> @ <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingTime}</span>
                    <br/>
                    <br/>
                    To: <span style={{fontWeight: 'bold', margin: "0"}}>{ride.arrivingTo}</span> @ approx <span style={{fontWeight: 'bold', margin: "0"}}>{ride.estimatedArrivingTime}</span>
                    <br/>
                    <br/>
                    On <span style={{fontWeight: 'bold', margin: "0"}}>{ride.departingDate}</span>
                    <br/>
                    <br/>
                    Meeting at <span style={{fontWeight: 'bold', margin: "0"}}>{ride.meetingPoint}</span> before departure.
                  </span>
                  <span style={{fontSize: "18px"}}><span style={{fontWeight: 'bold', margin: "0"}}>{ride.noSeats}</span> total seats offered @ <span style={{fontWeight: 'bold', margin: "0"}}>{ride.farePerPerson} TL</span>/person.</span>
                  <br/>
                  <span style={{fontSize: "18px"}}><span style={{fontWeight: 'bold', margin: "0"}}>{ride.joinedSeats}</span> already joined.</span>
                </div>
              </div>
              <div className="col m4 s12">
                <div className="card-content grey">
                  <span className ="card-title center-align">
                    Vehicle Details:
                  </span>
                  <ul className="center-align">
                    <li style={{fontSize: "18px"}}>Vehicle Name: <span style={{fontWeight: "bold", margin: "0"}}>{ride.vehicleName}</span></li>
                    <li style={{fontSize: "18px"}}>Vehicle Model: <span style={{fontWeight: "bold", margin: "0"}}>{ride.vehicleModel}</span></li>
                    <li style={{fontSize: "18px"}}>License Plate: <span style={{fontWeight: "bold", margin: "0"}}>{ride.licensePlate}</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-action">
              <div className="center-align" style={{padding: "10px"}}><span>Departure Address: </span>
              <span style={{fontWeight: "bold", color: "#36b9ee", margin: "0"}}>{ride.departingFromFullAddress}</span></div>
              <img src={ride.departingFromMapUrl}/>
              <br></br>
              <div className="center-align" style={{padding: "10px"}}><span>Arrival Address: </span>
              <span style={{fontWeight: "bold", color: "#e73f48", margin: "0"}}>{ride.arrivingToFullAddress}</span></div>
              <img src={ride.arrivingToMapUrl}/>
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <div className="left-align">
                <div>Posted by {ride.authorFirstName} {ride.authorLastName}</div>
                <div>{moment(ride.createdAt.toDate()).calendar()}</div>
              </div>
              <div className="right-align">
                <button className="btn black lighten-1" disabled>
                  Too Late To Join
                </button>
              </div>
            </div>
          </div>
          <div className="red-text center">
              { authError ? <p>{ authError }</p> : null}
          </div>
        </div>
      )     
    } else {
      return (
        <div className="container center">
          <p>Loading ride details...</p>
        </div>
      )
    }
  }
  
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const rides = state.firestore.data.rides;
  const ride = rides ? rides[id] : null
  //console.log("AUTHERROR", state.auth.authError);
  return {
    ride: ride,
    auth: state.firebase.auth,
    authError: state.auth.authError,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    joinRide: (ride, auth) => dispatch(joinRide(ride, auth)),
    cancelJoin: (ride, auth) => dispatch(cancelJoin(ride, auth)),
    cancelOffer: (ride, auth) => dispatch(cancelOffer(ride, auth)),
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{
    collection: 'rides'
  }])
)(RideDetails)
