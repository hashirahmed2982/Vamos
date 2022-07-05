import React from "react";
import { NavLink } from 'react-router-dom';
import './Links.css';

const SignedOutLinks = () => {
    return (
        <ul className="right">
            <li>
                <NavLink to="/signin" className="login">
                    Login
                </NavLink>
            </li>
            <li>
                <NavLink to="/signup" className="signup">
                    Signup
                </NavLink>
            </li>
        </ul>
    )
}

export default SignedOutLinks