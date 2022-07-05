import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createRide } from '../../store/actions/rideActions'
import { Redirect } from 'react-router-dom';
import { minimumCost } from '../../store/actions/rideActions';

class CreateRide extends Component {
  state = {
    departingFrom: "",
    departingFromFullAddress: "...search for a departing location to see it on the map...",
    departingFromMapUrl: "",
    departingFromLon: "",
    departingFromLat: "",
    departingDate: "",
    departingTime: "",
    arrivingTo: "",
    arrivingToFullAddress: "...search for an arriving location to see it on the map...",
    arrivingToMapUrl: "",
    arrivingToLon: "",
    arrivingToLat: "",
    vehicleName: "",
    vehicleModel:"",
    licensePlate:"",
    meetingPoint:"",
    estimatedArrivingTime: "",
    noSeats: 0,
    farePerPerson: 0,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createRide(this.state);
    this.props.history.push('/home');
  }

  doSearchDeparture = (e) => {
    e.preventDefault();
    let q = document.getElementById('departingFrom').value.trim();
    if (!q) return false;
    let url = `https://api.locationiq.com/v1/autocomplete.php?key=pk.44b584b966ab53bf0e6a2776b36a8af6&q=${q}`;
    
    fetch(url)
      .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.json();
      })
      .then((data) => {
        console.log(data[0]);
        this.setState({
          departingFrom: data[0].display_place,
          departingFromLon: data[0].lon,
          departingFromLat: data[0].lat,
          departingFromFullAddress: data[0].display_name,
        });
        console.log(this.state.departingFrom);
        let lon = this.state.departingFromLon;
        let lat = this.state.departingFromLat;
        
        let url = `https://maps.locationiq.com/v3/staticmap?key=pk.44b584b966ab53bf0e6a2776b36a8af6&center=${lat},${lon}&zoom=14&size=1000x400&format=png&markers=${lat},${lon}|icon:large-blue-cutout`;

        this.setState({
          departingFromMapUrl: url,
        })
      })
      .catch((err) => {
        console.error(err);
    });
  }

  doSearchArrival = (e) => {
    e.preventDefault();
    let q = document.getElementById('arrivingTo').value.trim();
    if (!q) return false;
    let url = `https://api.locationiq.com/v1/autocomplete.php?key=pk.44b584b966ab53bf0e6a2776b36a8af6&q=${q}`;
    
    fetch(url)
      .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.json();
      })
      .then((data) => {
        console.log(data[0]);
        this.setState({
          arrivingTo: data[0].display_place,
          arrivingToLon: data[0].lon,
          arrivingToLat: data[0].lat,
          arrivingToFullAddress: data[0].display_name,
        });

        let lon = this.state.arrivingToLon;
        let lat = this.state.arrivingToLat;
        
        let url = `https://maps.locationiq.com/v3/staticmap?key=pk.44b584b966ab53bf0e6a2776b36a8af6&center=${lat},${lon}&zoom=14&size=1000x400&format=png&markers=${lat},${lon}|icon:large-red-cutout`;

        this.setState({
          arrivingToMapUrl: url,
        })
      })
      .catch((err) => {
        console.error(err);
    });
  }

  render() {
    const { auth } = this.props;
    if (!auth.uid) {
      return <Redirect to="/signin"/>
    } 
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Offer a New Ride</h5>
          <div className="input-field">
            <input type="text" id='departingFrom' onChange={this.handleChange} required={true} value={this.state.departingFrom}/>
            <label htmlFor="departingFrom">Departing From</label>
            <div>
              <button className="btn black lighten-1" onClick={this.doSearchDeparture}>
                  Search
              </button>
            </div>
          </div>
          <div className="center-align" style={{padding: "20px"}}>
            <span style={{fontSize:"15px", fontWeight: "bold"}}>{this.state.departingFromFullAddress}</span>   
          </div>
          <div className="center-align">
            <img src={this.state.departingFromMapUrl} style={{width: "600", resize:"both"}}></img> 
          </div>
          <div className="input-field">
            <input type="text" id='meetingPoint' onChange={this.handleChange} required={true}/>
            <label htmlFor="meetingPoint">Meeting Point</label>
          </div>
          <div className="input-field">
            <input type="date" id='departingDate' onChange={this.handleChange} required={true}/>
            <label htmlFor="departingDate">Departing Date</label>
          </div>
          <div className="input-field">
            <input type="time" id='departingTime' onChange={this.handleChange} required={true}/>
            <label htmlFor="departingTime">Departing Time (24 hr Format)</label>
          </div>
          <div className="input-field">
            <input type="text" id='arrivingTo' onChange={this.handleChange} required={true} value={this.state.arrivingTo}/>
            <label htmlFor="arrivingTo">Arriving To</label>
            <div>
              <button className="btn black lighten-1" onClick={this.doSearchArrival}>
                  Search
              </button>
            </div>
          </div>
          <div className="center-align" style={{padding: "20px"}}>
            <span style={{fontSize:"15px", fontWeight: "bold"}}>{this.state.arrivingToFullAddress}</span>   
          </div>
          <div className="center-align">
            <img src={this.state.arrivingToMapUrl} style={{width: "600", resize:"both"}}></img> 
          </div>
          <div className="input-field">
            <input type="time" id='estimatedArrivingTime' onChange={this.handleChange} required={true}/>
            <label htmlFor="estimatedArrivingTime">Estimated Arriving Time (24 hr Format)</label>
          </div>
          <div className="input-field">
            <input type="text" id='noSeats' onChange={this.handleChange} required={true}/>
            <label htmlFor="noSeats">Number of Available Seats</label>
          </div>
          <div className="input-field">
            <input type="number" id='farePerPerson' onChange={this.handleChange} required={true} 
            min={minimumCost(this.state.departingFromLat, this.state.arrivingToLat, this.state.departingFromLon, this.state.arrivingToLon, 30, 1.75)}
            />
            <label htmlFor="farePerPerson">Requested Fare per Person (TL)</label>
          </div>
          <div className="input-field">
            <input type="text" id='vehicleName' onChange={this.handleChange} required={true}/>
            <label htmlFor="vehicleName">Vehicle Name</label>
          </div>
          <div className="input-field">
            <input type="text" id='vehicleModel' onChange={this.handleChange} required={true}/>
            <label htmlFor="vehicleModel">Vehicle Model (Year &amp; Make)</label>
          </div>
          <div className="input-field">
            <input type="text" id='licensePlate' onChange={this.handleChange} required={true}/>
            <label htmlFor="licensePlate">License Plate</label>
          </div>
          <div className="input-field">
            <button className="btn black lighten-1">Create Ride</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createRide: (ride) => dispatch(createRide(ride))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRide)
































