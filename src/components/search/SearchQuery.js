import React from 'react'
import RideSummary from '../rides/RideSummary';
import { Link } from 'react-router-dom'
import { canShow } from '../../store/actions/rideActions'


const SearchQuery = ({rides, arrival, departure, time, date}) => {
 
  return (
    <div className="project-list section">
      { rides && rides.map(ride => {           
        if (canShow(ride)){
          if ((ride.arrivingTo.toLowerCase()).includes(arrival.toLowerCase()) && ((ride.departingFrom.toLowerCase()).includes(departure.toLowerCase()) && (ride.departingTime >= time) && (ride.departingDate >= date))
          ){
            return ( 
              <Link to={'/ride/' + ride.id} key={ride.id}>
                <RideSummary ride={ride} /> 
              </Link>
            )
          }
        }; 
         return null;
      })}  
    </div>
  )
}

export default SearchQuery