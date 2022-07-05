import { getFirestore } from "redux-firestore";

export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).update({
                currentLat: credentials.currentLat,
                currentLon: credentials.currentLon,
                currentAddress: credentials.currentAddress,
                currentTown: credentials.currentTown,
                currentCity: credentials.currentCity,
            })
        }).then(() => {
            dispatch({ type: "LOGIN_SUCCESS" })
        }).catch((err) => {
            dispatch({ type: "LOGIN_ERROR", err })
        });
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: "SIGNOUT_SUCCESS" })
        }).catch((err) => {
            dispatch({ type: "SIGNOUT_ERROR", err })
        });
    }
}

export const signUp = (newUser) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: (newUser.firstName[0] + newUser.lastName[0]).toUpperCase(),
                uid: resp.user.uid,
                email: newUser.email,
                contact: newUser.contact,
                password: newUser.password,
                wallet: 0, 
                profPic: "",
            })
        }).then(() => {
            dispatch({ type: "SIGNUP_SUCCESS" })
        }).catch(err => {
            dispatch({ type: "SIGNUP_ERROR", err })
        });
    }
}

export const getUserDetails = (auth) => {
    const firestore = getFirestore();

    firestore.collection('users').get()
    .then((querySnapshot) => {
        querySnapshot.forEach(snapshot => {
            let data = snapshot.data();
            if (data.uid === auth.uid){
                return data;
            }
        }
    )})
}

export const editUserDetails = (userDetails, auth) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const firebase = getFirebase();

        var user = firebase.auth().currentUser;
        var newPassword = userDetails.password;

        user.updatePassword(newPassword).then(function() {
            console.log("AUTH OBJECT UPGRADED")
        }).catch(function(error) {
            // An error happened.
        }).then(() => {
            firestore.collection('users').doc(userDetails.uid).update({
                password: userDetails.password, 
                contact: userDetails.contact,
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                initials: (userDetails.firstName[0] + userDetails.lastName[0]).toUpperCase(),
            }).then(() => {
                firestore.collection('rides').get()
                .then((querySnapshot) => {
                    querySnapshot.forEach(snapshot => {
                        let data = snapshot.data();
                        if (data.authorId === auth.uid){
                            firestore.collection('rides').doc(data.rideId).update({
                                authorFirstName: userDetails.firstName,
                                authorLastName: userDetails.lastName,
                            })
                        }
                    }
                )
            })
            })
            
            .then(() => {
                dispatch({ type: "USER_DETAILS_CHANGED", userDetails });
                console.log("USER DETAILS CHANGED");
            }).catch((err) => {
                dispatch({ type: "USER_DETAILS_CHANGE_ERROR", err })
                console.log("USER DETAILS CHANGE ERROR");
            })  
        })
  
    }
    
}

export const addamount = (userDetails ,newamount) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        firestore.collection('users').doc(userDetails.uid).update({
            wallet: userDetails.wallet + parseInt(newamount, 10), 
        })
    }
  
}

export const handleUpload = (file) => {
    return(dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        var user = firebase.auth().currentUser;

        // Create a Storage Ref w/ username
        var storageRef = firebase.storage().ref(user + '/profilePicture/' + file.name);

        // Upload file
        var task = storageRef.put(file);
    }
}