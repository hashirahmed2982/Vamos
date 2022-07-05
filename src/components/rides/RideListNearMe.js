import React from 'react'
import RideSummary from './RideSummary'
import { Link } from 'react-router-dom'
import { withinRadius, canShow } from '../../store/actions/rideActions'

const RideListNearMe = ({rides, userLat, userLon}) => {

  return (
    <div className="project-list section">
      { rides && rides.map(ride => {          
        if (withinRadius(7, ride, userLat, userLon)){
          return (
            <Link to={'/ride/' + ride.id} key={ride.id}>
              <RideSummary ride={ride} />
            </Link>
          )
        };
         return null;
      })}  
    </div>
  )
}

export default RideListNearMe
