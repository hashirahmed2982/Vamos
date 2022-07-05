import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import RideDetails from './components/rides/RideDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateRide from './components/rides/CreateRide'
import OfferedRides from './components/rides/OfferedRides';
import OfferedRidesAll from './components/rides/OfferedRidesAll';
import AboutUs from './components/about/AboutUs';
import JoinedRides from './components/rides/JoinedRides';
import JoinedRidesAll from './components/rides/JoinedRidesAll';
import Search from './components/search/Search';
import DashboardNearMe from './components/dashboard/DashboardNearMe';
import JoinedUsers from './components/rides/JoinedUsers';
import Profile from './components/profile/Profile';
import Wallet from './components/wallet/Wallet';
import Rules from './components/about/rules';
import GoogleMapsPage from './components/map/GoogleMapsPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path ='/' component={AboutUs} />
            <Route path='/home'component={Dashboard} />
            <Route path='/ride/:id' component={RideDetails} />
            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreateRide} />
            <Route path='/offered' component={OfferedRides} />
            <Route path='/offeredall' component={OfferedRidesAll} />
            <Route path='/joined' component ={JoinedRides} />
            <Route path='/joinedall' component={JoinedRidesAll} />
            <Route path='/search' component={Search} />
            <Route path='/profile' component={Profile} />
            <Route path='/joinedusers/:id' component={JoinedUsers} />
            <Route path='/wallet' component={Wallet} />
            <Route path='/rules' component={Rules} />
            <Route path='/googlemapspage' component={GoogleMapsPage} />
            <Route path='/ridesnearme' component={DashboardNearMe} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
