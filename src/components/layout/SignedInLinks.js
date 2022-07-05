import React from "react";
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../store/actions/authActions';
import './Links.css';
import * as IoIcons from 'react-icons/io';



//links for the buttons in navbar
const SignedInLinks = (props) => {
    return (
        <ul className="right">
            <li className="search">
                <NavLink to="/search">
                    <IoIcons.IoIosSearch/> Search
                </NavLink>
            </li>
            <li className="offer">
                <NavLink to="/create">
                    Offer a New Ride
                </NavLink>
            </li>
            <li className="wallet">
                <NavLink to="/Wallet">
                    Wallet
                </NavLink>
            </li>
            <li>
                <a onClick={props.signOut} className="logout">
                    Log Out
                </a>
            </li>
            <li>
                <NavLink to="/profile" className="btn btn-floating light-blue lighten-1">
                    {props.profile.initials}
                </NavLink>
            </li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut()),
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)