import React, { Component } from 'react'
import { connect } from 'react-redux';
import { signIn } from '../../store/actions/authActions';
import { Redirect } from 'react-router-dom';

class SignIn extends Component {
    
    constructor(props){
        super(props);
        this.getLocation();
    }
    
    state = {
        email: "",
        password: "",
        currentLat: "",
        currentLon: "",
        currentAddress: "",
        currentTown: "",
        currentCity: "",
    }

    showPosition = (position) => {
        this.setState({
            currentLat:position.coords.latitude,
            currentLon:position.coords.longitude,
        });
        console.log(this.state.currentLat);
        this.getAddress(this.state.currentLat, this.state.currentLon);
    }

    getLocation = async () => {
        if (navigator.geolocation){
            let position = navigator.geolocation.getCurrentPosition(this.showPosition);
        }
        else {
            console.log("Geolocation is not supported by this browser");
        }
    }

    getAddress = async (lat, lon) => {
        let url = `https://eu1.locationiq.com/v1/reverse.php?key=pk.44b584b966ab53bf0e6a2776b36a8af6&lat=${lat}&lon=${lon}&format=json`;
        
        fetch(url)
          .then((resp) => {
            if (!resp.ok) throw new Error(resp.statusText);
            return resp.json();
          })
          .then((data) => {
            this.setState({
              currentAddress: data.display_name,
              currentTown: data.address.town,
              currentCity: data.address.province,
            });
            console.log(this.state.currentTown);
          })
          .catch((err) => {
            console.error(err);
        });
    }
    
    //to handle change in fields
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }
    //when button clicked
    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.signIn(this.state);
        
    }

    render() {
        const { authError, auth } = this.props;
        if (auth.uid) {
            return <Redirect to="/"/>
        } 
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">
                        Sign In
                    </h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} required={true}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange} required={true}/>
                    </div>
                    <div className="input-field">
                        <button className="btn black lighten-1 z-depth-0">
                            Login
                        </button>
                        <div className="red-text center">
                            { authError ? <p>{authError}</p> : null }
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)












