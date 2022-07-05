import React from 'react'
import './RideSummary.css'
import { remainingTime } from '../../store/actions/rideActions'

const RideSummary = ({ride}) => {
  
  var isShowing = false;
  
  if (remainingTime(ride)) {
    isShowing = true;
  }

  if (isShowing && (parseInt(ride.noSeats, 10) - ride.joinedSeats) > 0){
    return (
      <div className="card z-depth-0 ride-summary">
        <div className="card-content customcard">
        <span className="card-title">
            {ride.departingFrom} ----&#62; {ride.arrivingTo} 
            <br/> <p style={{float: "right", fontSize: "20px"}}>Click for more details...</p>
            {ride.departingTime} - {ride.estimatedArrivingTime}
            <br/>
            On {ride.departingDate}
          </span> 
          <div className="center-align" style={{margin: "10px"}} >
            
            <span style={{fontSize: "20px", backgroundColor: "#000000", color: "#ffffff", padding: "5px"}}>
              {remainingTime(ride)}
            </span>
          </div>
          <div className="center-align" style={{margin: "10px"}} >
            <span style={{fontSize: "20px", backgroundColor: "#FF0000", color: "#ffffff", padding: "5px"}}>
            {parseInt(ride.noSeats,10) - ride.joinedSeats} seat(s) remaining.
            </span>
          </div>
        </div>
      </div>
    )
  }

  else if (!isShowing && (parseInt(ride.noSeats, 10) - ride.joinedSeats) === 0) {
    return (
      <div className="card z-depth-0 ride-summary">
        <div className="card-content customcard">
          <span className="card-title">
            {ride.departingFrom} ----&#62; {ride.arrivingTo} 
            <br/> <p style={{float: "right", fontSize: "20px"}}>Click for more details...</p>
            {ride.departingTime} - {ride.estimatedArrivingTime}
            <br/>
            On {ride.departingDate}  
          </span> 
          <div className="center-align" style={{margin: "10px"}}>
            <span style={{fontSize: "20px", backgroundColor: "#FF0000", color: "#ffffff", padding: "5px"}}>
              NO AVAILABLE SEATS!
            </span>
          </div>  
        </div>
      </div>
    )
  }

  else if (isShowing && (parseInt(ride.noSeats, 10) - ride.joinedSeats) === 0){
    return (
      <div className="card z-depth-0 ride-summary">
        <div className="card-content customcard">
        <span className="card-title">
            {ride.departingFrom} ----&#62; {ride.arrivingTo} 
            <br/> <p style={{float: "right", fontSize: "20px"}}>Click for more details...</p>
            {ride.departingTime} - {ride.estimatedArrivingTime}
            <br/>
            On {ride.departingDate}
          </span> 
          <div className="center-align" style={{margin: "10px"}} >
            
            <span style={{fontSize: "20px", backgroundColor: "#000000", color: "#ffffff", padding: "5px"}}>
              {remainingTime(ride)}
            </span>
          </div>
          <div className="center-align" style={{margin: "10px"}} >
            <span style={{fontSize: "20px", backgroundColor: "#FF0000", color: "#ffffff", padding: "5px"}}>
              NO AVAILABLE SEATS!
            </span>
          </div>
        </div>
      </div>
    )
  }

  else if (!isShowing && (parseInt(ride.noSeats, 10) - ride.joinedSeats) > 0){
    return (
      <div className="card z-depth-0 ride-summary">
        <div className="card-content customcard">
        <span className="card-title">
            {ride.departingFrom} ----&#62; {ride.arrivingTo} 
            <br/> <p style={{float: "right", fontSize: "20px"}}>Click for more details...</p>
            {ride.departingTime} - {ride.estimatedArrivingTime}
            <br/>
            On {ride.departingDate} 
          </span> 
          <div className="center-align" style={{margin: "10px"}}>
            <span style={{fontSize: "20px", backgroundColor: "#FF0000", color: "#ffffff", padding: "5px"}}>
              {parseInt(ride.noSeats,10) - ride.joinedSeats} seat(s) remaining.
            </span>
          </div>
        </div>
      </div>
    )
  }

  return null;

}

export default RideSummary
