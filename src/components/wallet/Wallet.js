import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addamount } from '../../store/actions/authActions';
import { getFirestore } from 'redux-firestore';

class Wallet extends Component {
    
    state = {
        email: this.props.auth.email,
        uid: this.props.auth.uid,
        Amount:0,
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("id",this.state)
        this.props.addamount(this.state, this.state.Amount);
        this.props.history.push('/home');
    }

    render() {
        const { ride,auth, authError } = this.props;
        if (!auth.uid) {
            return <Redirect to="/"/>
        } 
        const firestore = getFirestore();
            firestore.collection('users').get()
            .then((querySnapshot) => {
                querySnapshot.forEach(snapshot => {
                        let data = snapshot.data();
                        if (data.uid === auth.uid){
                            this.setState({
                                wallet: data.wallet,
                            })                        
                        }
                    }
                )
            })
            //.then( ()=>{
             //   console.log("amount",this.state.wallet);
                
            //})
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h3 className="grey-text text-darken-3">
                        My Wallet
                        <span style={{fontSize: "24px", float:"right", fontWeight:"bold"}}>{this.state.wallet} TL</span> 
                        <span style={{fontSize: "18px", float:"right"}}>Current Amount:</span>       
                    </h3>
                    <div className="input-field">
                        <label htmlFor="Card holder">Card Holder</label>
                        <input type="text" id="holder" onChange={this.handleChange} required={true}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="Card Number">Card Number (16 digits)</label>
                        <input type="text" id="CardNumber" onChange={this.handleChange} required={true} pattern=".{16}"/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="CVC">CVC (3 digits)</label>
                        <input type="text" id="CVC" onChange={this.handleChange} pattern=".{3}" required={true}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="Expiry">Expiry (mm/yy)</label>
                        <input type="text" id="Expiry" onChange={this.handleChange} required={true}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="Amount">Amount</label>
                        <input type="number" id="Amount" onChange={this.handleChange} required={true}/>
                    </div>
                    <div className="input-field">
                        <button className="btn black lighten-1 z-depth-0">
                            Top Up
                        </button>
                        <div className="red-text center">
                            { authError ? <p>{ authError }</p> : null}
                        </div>
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
        addamount: (userDetails, newamount) => dispatch(addamount(userDetails ,newamount)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallet)
       













 
  








      