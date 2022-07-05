import React , { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Slider from './inc/Slider';
import VMC from './inc/VMC';



class Rules extends Component {
    render(){
        const { auth } = this.props;
        if (!auth.uid) {
            return <Redirect to="/home"/>
        } 
        return(
            
                    <div class="row">
                        <div className="col-md-3 center">
                        <div class="rules">
                        <h1 style={{fontSize:"30px", color: "black"}}>User Guidelines</h1>
                        <br></br>
                        <div style={{color: "white", backgroundColor:'black'}}>
                        <br></br>
                        <p style={{ color: "white"}}>1)Once joined the ride,User cannot cancel the ride within 12 hour(s) of departure time. </p>
                        <p style={{ color: "white"}}>2)User cannot join the ride within 1 hour of departure time.</p>
                        <p style={{ color: "white"}}>3)The driver can reject your join request anytime he wants.</p>
                        <p style={{ color: "white"}}>4)In order to deposit wallet points in your account you can top up with adding your card details.</p>
                        <p style={{ color: "white"}}>5)In order to withdraw your wallet points you can make transaction to our nearest withdraw branches.</p>
                        <br></br>
                        <ul style={{color:"white", padding:"50px"}}>
                            Contact us:
                            <li>hashirahmed@sabanciuniv.edu</li>
                            <li>kawtarl@sabanciuniv.edu</li>
                            <li>momer@sabanciuniv.edu</li>
                            <li>saifulmalook@sabanciuniv.edu</li>
                        </ul>
                        </div>
                        </div>
                </div>
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
)(Rules)