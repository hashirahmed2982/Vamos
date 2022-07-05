import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getFirestore } from 'redux-firestore';
import { editUserDetails } from '../../store/actions/authActions';
import Upload from './Upload';

let counter = 0;

class Profile extends Component {   

    constructor(props){
        super(props);
        counter = 0;
    }

    state = {
        password: "",
        firstName: "",
        lastName: "",
        contact: "",
        email: this.props.auth.email,
        uid: this.props.auth.uid,
        wallet: 0,
    }
    //handling data changed
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.editUserDetails(this.state, this.props.auth);
        //console.log("AUTH", this.props.auth);
        this.props.history.push('/home');
    }

    render() {
        const { auth } = this.props;
        console.log(auth);
        if (!auth.uid) {
            return <Redirect to="/"/>
        } 

        if (counter === 0) {
            const firestore = getFirestore();
            firestore.collection('users').get()
            .then((querySnapshot) => {
                querySnapshot.forEach(snapshot => {
                        let data = snapshot.data();
                        if (data.uid === auth.uid){
                            this.setState({
                                password: data.password,
                                firstName: data.firstName,
                                lastName: data.lastName,
                                contact: data.contact,
                                wallet: data.wallet,
                            })
                            counter++;
                        }
                    }
                )
            })
        }
        
        return (
            
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white" name="myform">
                    <h3 className="grey-text text-darken-3" style={{marginBottom: "50px"}}>
                        My Account
                    </h3>
                    <div className="input-field">
                        First Name:
                        <input type="text" id="firstName" onChange={this.handleChange} value={this.state.firstName}/>
                    </div>
                    <div className="input-field">
                        Last Name:
                        <input type="text" id="lastName" onChange={this.handleChange} value={this.state.lastName}/>
                    </div>
                    <div className="input-field">
                        Contact:
                        <input type="text" id="contact" onChange={this.handleChange} value={this.state.contact}/>
                    </div>
                    <div className="input-field">
                        Password
                        <input type="password" id="password" onChange={(this.handleChange)} value={this.state.password}/>
                    </div>
                    <div className="input-field">
                        <button className="btn black lighten-1 z-depth-0">
                            Change
                        </button>
                    </div>
                    
                </form>
            </div>
            
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editUserDetails: (userDetails, auth) => dispatch(editUserDetails(userDetails, auth)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
