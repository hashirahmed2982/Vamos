import authReducer from "./authReducer";
import rideReducer from "./rideReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
    auth: authReducer,
    ride: rideReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
})

export default rootReducer