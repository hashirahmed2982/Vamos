import React from 'react'
import RideSummary from './RideSummary'
import { Link } from 'react-router-dom'
import { canShow } from '../../store/actions/rideActions'

const RideList = ({rides}) => {
  return (
    <div className="project-list section">
      { rides && rides.map(ride => {          
        if (canShow(ride)){
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

export default RideList
