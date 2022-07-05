import React, { Component } from "react";
import { Link } from 'react-router-dom';
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from 'react-redux';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import { IconContext } from 'react-icons';
import './Navbar.css';

class Navbar extends Component {

    constructor() {
        super();

        // Defining the initial state:
        this.state = {
            showSidebar: false,
        };
    }

    handleClick = () => {
        this.setState({
            showSidebar: !this.state.showSidebar,
        })
    }

    render(){
        const { auth, profile } = this.props;
        const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks/>;
        
        if (auth.uid){
            return (
                <IconContext.Provider value={{color: '#fff'}}>
                    <div className="navbar">
                        <Link to="#" className="menu-bars">
                            <FaIcons.FaBars onClick={this.handleClick}/>
                        </Link>
                        <nav className="nav-wrapper black" style={{float: "right"}}>
                            <div className="container">
                                <Link to="/home" className="brand-logo" style={{fontSize: "50px"}}>
                                    vamos
                                </Link>
                                
                                { links }
                            </div>
                        </nav>  
                    </div>
                    
                    <nav className={this.state.showSidebar ? "nav-menu active":"nav-menu"}>
                        <ul className="nav-menu-items" onClick={this.handleClick}>
                            <li className="navbar-toggle">
                                <Link to="#" className="menu-bars">
                                    <AiIcons.AiOutlineClose />
                                </Link>
                            </li>
                            {SidebarData.map((item, index) => {
                                return(
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                        
                    </nav>
                </IconContext.Provider>
            )
        }

        return(
            <nav className="nav-wrapper black" style={{height: "80px"}}>
                <div className="container">
                    <Link to="/" className="brand-logo" style={{fontSize: "50px"}}>
                        vamos
                    </Link>
                    
                    { links }
                </div>
            </nav>
        )
    }  
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar)