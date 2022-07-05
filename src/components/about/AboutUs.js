import React , { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Slider from './inc/Slider';
import VMC from './inc/VMC';
import './AboutUs.css'


class AboutUs extends Component {
    render(){
        const { auth } = this.props;
        if (auth.uid) {
            return <Redirect to="/home"/>
        } 
        return(
            <div style={{color: "lightgray", backgroundColor:'black'}}>

                <Slider/>

                <div class="row center">
                
                <div class="col s12">

                    <h6 style={{fontSize:"40px", color: "white"}}> Our Company</h6>

                    <div className="underline1 mx-auto center"></div>

                    <p style={{fontSize:"30px", color: "gray"}}>
                    Vamos is a Ride-Sharing Application. It is Cheap, Fun and Convenient! 
                   </p>
                </div>

            
            </div>

                <VMC/>
                </div>


        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
    }
}

export default compose(
    connect(mapStateToProps),
)(AboutUs)