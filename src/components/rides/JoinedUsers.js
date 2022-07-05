import React, {Component} from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom';
import moment from 'moment'
import { cancelJoin, removeUser } from '../../store/actions/rideActions';

class JoinedUsers extends Component {
    //for handling clicks
    handleClick = (e) => {
        e.preventDefault();
        this.props.history.push('/offered');
    }
    //removes user from joined users
    handleRemoveUser = (e) => {
        console.log(e.target.value);
        e.preventDefault();
        console.log("CANCELLING");
        this.props.removeUser(this.props.ride, e.target.value);
    }
    render() {
        const { ride, auth } = this.props;
        //if user isnt signed in
        if (!auth.uid) {
        return <Redirect to="/signin"/>
        } 
        if (ride) {
            return(
                <div className="project-list container">
                    <div className="col s12 m6" >
                        <h3 style={{marginBottom: "70px"}}>Joined Users:
                            <div className="right-align" style={{float: "right", fontSize: "18px"}}>
                                <button className="btn black lighten-1" onClick={this.handleClick}>
                                    Go back
                                </button>
                            </div>
                        </h3>
                    </div>
                    
                    <div className="card-action white" style={{marginBottom: "30px"}}>
                        <div className="center-align">
                            <h5>
                                Your ride has been joined by the following user(s):
                            </h5>
                        </div>
                    </div> 
                    {ride && ride.joined && ride.joined.map(user => {
                        return (
                            <div className="card z-depth-0 grey lighten-4">
                                <div className="card-content">
                                    <span className="card-title">
                                        {user.firstName} {user.lastName}
                                        <button className="btn red lighten-1" style={{float: "right"}} onClick={this.handleRemoveUser} value={user.uid}>Remove User</button>
                                        <span style={{float: "right", marginRight: "120px", fontWeight: "bolder"}}>{user.contact}</span>
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>   
            )
        }
       return (
            <div className="container center">
                <p>Loading information...</p>
            </div>
        )     
    }
}
//connecting state to props
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const rides = state.firestore.data.rides;
  const ride = rides ? rides[id] : null
  return {
    ride: ride,
    auth: state.firebase.auth,
    authError: state.auth.authError,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    cancelJoin: (ride, auth) => dispatch(cancelJoin(ride, auth)),
    removeUser: (ride, uid) => dispatch(removeUser(ride, uid)),
  }
}
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{
    collection: 'rides'
  }])
)(JoinedUsers)







































