import { getFirestore } from "redux-firestore";

export const createRide = (ride) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection('rides').add({
            ...ride, 
        }).then((docRef) => {
            firestore.collection('rides').doc(docRef.id).set({
                ...ride,
                authorFirstName: profile.firstName,
                authorLastName: profile.lastName,
                authorId: authorId,
                createdAt: new Date(),
                joined: [],
                rideId: docRef.id,
                joinedSeats: 0,
            })
        }).then(() => {
            dispatch({ type: "CREATE_RIDE", ride });
        }).catch((err) => {
            dispatch({ type: "CREATE_RIDE_ERROR", err })
        })  
    }
};

export const enoughMoney = (ride, wallet) => {

    if (parseInt(ride.farePerPerson, 10) > wallet){
        return false;
    }

    return true;
}

export const joinRide = (ride, auth) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        const firebase = getFirebase();
        var userAlreadyJoined = false;
        var userOwnRide = false;
        for (var x = 0; x < ride.joined.length; x++){
            if (ride.joined[x] === auth.uid){
                userAlreadyJoined = true;
            }
        }

        if (auth.uid === ride.authorId){
            userOwnRide = true;
        }
    
        var amount = parseInt(ride.farePerPerson, 10);

        firestore.collection('users').get()
        .then((querySnapshot) => {
            querySnapshot.forEach(snapshot => {
                    let data = snapshot.data();
                    if (data.uid === auth.uid){
                        let joinobj = {
                            firstName: data.firstName,
                            lastName: data.lastName,
                            contact: data.contact,
                            uid: data.uid,
                        }

                        if (!userAlreadyJoined && !userOwnRide && enoughMoney(ride, data.wallet)){
                            const updatedArray = [...ride.joined, joinobj];
                            if (ride.noSeats - ride.joinedSeats > 0){
                                firestore.collection('users').doc(ride.authorId).update({
                                    wallet: firebase.firestore.FieldValue.increment(amount),
                                }).then(() => {
                                    firestore.collection('users').doc(auth.uid).update({
                                        wallet: firebase.firestore.FieldValue.increment(-amount),
                                    })
                                })
                                                    
                                var noSeats = updatedArray.length;
                                firestore.collection('rides').doc(ride.rideId).set({
                                    ...ride,
                                    joinedSeats: noSeats, 
                                    joined: updatedArray,
                                })
                                .then(() => {
                                    dispatch({ type: "JOINED_RIDE", ride });
                                }).catch((err) => {
                                    dispatch({ type: "JOIN_RIDE_ERROR", err })
                                })
                            }               
                        }      
                    }
                }
            )
        })
    }
}

export const cancelJoin = (ride, auth) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        const firebase = getFirebase();
        
        var userAlreadyJoined = false;
        var userOwnRide = false;
        for (var x = 0; x < ride.joined.length; x++){
            if (ride.joined[x].uid === auth.uid){
                userAlreadyJoined = true;
            }
        }

        if (auth.uid === ride.authorId){
            userOwnRide = true;
        }

        var amount = parseInt(ride.farePerPerson, 10);

        if (userAlreadyJoined && !userOwnRide){
            var updatedArray = [];

            for (var x = 0; x < ride.joined.length; x++) {
                if (ride.joined[x].uid !== auth.uid){
                    updatedArray.push(ride.joined[x]);
                }
            }
            
            if (ride.joinedSeats > 0){
                
                firestore.collection('users').doc(ride.authorId).update({
                    wallet: firebase.firestore.FieldValue.increment(-amount),
                }).then(() => {
                    firestore.collection('users').doc(auth.uid).update({
                        wallet: firebase.firestore.FieldValue.increment(amount),
                    })
                })
                var noSeats = updatedArray.length;
                firestore.collection('rides').doc(ride.rideId).set({
                    ...ride,
                    joinedSeats: noSeats, 
                    joined: updatedArray,
                }).then(() => {
                    dispatch({ type: "JOINED_RIDE", ride });
                    console.log("JOINED RIDE");
                }).catch((err) => {
                    dispatch({ type: "JOIN_RIDE_ERROR", err })
                    console.log("JOIN RIDE ERROR");
                })  
            }    
        }
    }
}

export const cancelOffer = (ride, auth) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        /*const firestore = getFirestore();
        const rideId = ride.rideId;
        if (auth.uid === ride.authorId){
            firestore.collection("rides").where("rideId", "==", rideId).get()
            .then(querySnapshot => {
                console.log(querySnapshot.docs);
                for (var x = 0; x < querySnapshot.docs.length; x++) {
                    if (querySnapshot.docs[x].)
                }
                //querySnapshot.docs[0].ref.delete();
            }).then(() => {
                dispatch({ type: "DELETE_RIDE", ride });
            }).catch((err) => {
                dispatch({ type: "DELETE_RIDE_ERROR", err })
            })
        }*/
        
        const firebase = getFirebase();
        /*let fs = firebase.firestore();
        let collectionRef = fs.collection("rides");

        let count = 0;
        collectionRef.where("rideId", "==", ride.rideId)
        .get()
        .then(querySnapshot => {
            console.log("QUERYSNAPSHOT", querySnapshot);
        querySnapshot.forEach((doc) => {
            console.log("DOC",doc);
            console.log("DOC REF", doc.ref);
            console.log("DELETE", count)
            doc.ref.delete();
            
            //.then(() => {
            //console.log("Document successfully deleted!");
            //})
        })})*/

        const firestore = getFirestore();

        firestore.collection("rides").doc(ride.rideId).delete()
    }
}

export const canShow = (ride) => {
    const todayCompleteDate = new Date();
    const todayDate = todayCompleteDate.getDate();
    const todayMonth = todayCompleteDate.getMonth() + 1;
    const todayYear = todayCompleteDate.getFullYear();
    const todayTimeHours = todayCompleteDate.getHours();
    const todayTimeMinutes = todayCompleteDate.getMinutes();

    const rideCompleteDate = ride.departingDate;
    const rideYear = parseInt(rideCompleteDate.slice(0,4), 10);
    const rideMonth = parseInt(rideCompleteDate.slice(5,7), 10);
    const rideDate = parseInt(rideCompleteDate.slice(8), 10);
    const rideCompleteTime = ride.departingTime;
    const rideTimeHours = parseInt(rideCompleteTime.slice(0,2), 10);
    const rideTimeMinutes = parseInt(rideCompleteTime.slice(3), 10);

    var showRide = false;

    if (todayYear < rideYear){
        showRide = true;
    }

    else if (todayYear === rideYear){
        if (todayMonth < rideMonth){
        showRide = true;
        }

        else if (todayMonth === rideMonth){
            if (todayDate < rideDate) {
                showRide = true;
            }

            else if (todayDate === rideDate) {
                if (todayTimeHours < rideTimeHours) {
                showRide = true;
                }

                else if (todayTimeHours === rideTimeHours) {
                    if (todayTimeMinutes < rideTimeMinutes){
                        showRide = true;
                    }
                }
            }
        }
    }

    return showRide;
}

export const withinRadius = (radius, ride, uLat, uLon) => {
    
    let userLat = parseFloat(uLat);
    let userLon = parseFloat(uLon);

    let rideLat = parseFloat(ride.departingFromLat);
    let rideLon = parseFloat(ride.departingFromLon);
    console.log(euclideanDistance(userLat, rideLat, userLon, rideLon));
    if (euclideanDistance(userLat, rideLat, userLon, rideLon) <= radius){
        return true;
    }

    return false;
}

export const isOfferedByUser = (ride, auth) => {

    if (ride.authorId === auth.uid){
        return true;
    }

    return false;
}

export const isJoinedByUser = (ride, auth) => {

    for (var x = 0; x < ride.joined.length; x++) {
        if (ride.joined[x].uid === auth.uid && ride.authorId !== auth.uid) {
            return true;
        }
    }

    return false;
}

export const remainingTime = (ride) => {
    const todayCompleteDate = new Date();

    const rideCompleteDate = ride.departingDate;
    const rideYear = parseInt(rideCompleteDate.slice(0,4), 10);
    const rideMonth = parseInt(rideCompleteDate.slice(5,7), 10) - 1;
    const rideDate = parseInt(rideCompleteDate.slice(8), 10);
    const rideCompleteTime = ride.departingTime;
    const rideTimeHours = parseInt(rideCompleteTime.slice(0,2), 10);
    const rideTimeMinutes = parseInt(rideCompleteTime.slice(3), 10);
    const rideCompleteNewDate = new Date(rideYear, rideMonth, rideDate, rideTimeHours, rideTimeMinutes);

    var diff = rideCompleteNewDate.valueOf() - todayCompleteDate.valueOf();
    var diffInHours = diff/1000/60/60;
    var diffInDays = diff/1000/60/60/24;

    if (diffInHours <= 1 && diffInDays < 1){
        return("Less than an hour to go!");
    }

    else if (diffInDays <= 1){
        return("Less than a day to go!");
    }

    return null;   
}

export const canCancel = (ride) => {
    const todayCompleteDate = new Date();

    const rideCompleteDate = ride.departingDate;
    const rideYear = parseInt(rideCompleteDate.slice(0,4), 10);
    const rideMonth = parseInt(rideCompleteDate.slice(5,7), 10) - 1;
    const rideDate = parseInt(rideCompleteDate.slice(8), 10);
    const rideCompleteTime = ride.departingTime;
    const rideTimeHours = parseInt(rideCompleteTime.slice(0,2), 10);
    const rideTimeMinutes = parseInt(rideCompleteTime.slice(3), 10);
    const rideCompleteNewDate = new Date(rideYear, rideMonth, rideDate, rideTimeHours, rideTimeMinutes);

    var diff = rideCompleteNewDate.valueOf() - todayCompleteDate.valueOf();
    var diffInHours = diff/1000/60/60;
    
    if (diffInHours <= 12){
        return false;
    }

    return true;
}

export const canJoin = (ride) => {
    const todayCompleteDate = new Date();

    const rideCompleteDate = ride.departingDate;
    const rideYear = parseInt(rideCompleteDate.slice(0,4), 10);
    const rideMonth = parseInt(rideCompleteDate.slice(5,7), 10) - 1;
    const rideDate = parseInt(rideCompleteDate.slice(8), 10);
    const rideCompleteTime = ride.departingTime;
    const rideTimeHours = parseInt(rideCompleteTime.slice(0,2), 10);
    const rideTimeMinutes = parseInt(rideCompleteTime.slice(3), 10);
    const rideCompleteNewDate = new Date(rideYear, rideMonth, rideDate, rideTimeHours, rideTimeMinutes);

    var diff = rideCompleteNewDate.valueOf() - todayCompleteDate.valueOf();
    var diffInHours = diff/1000/60/60;
    
    if (diffInHours <= 1){
        return false;
    }

    return true;
}

export const removeUser = (ride, uid) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        // make async call to database
        const firestore = getFirestore();
        const firebase = getFirebase();
        
        var userAlreadyJoined = false;
        for (var x = 0; x < ride.joined.length; x++){
            if (ride.joined[x].uid === uid){
                userAlreadyJoined = true;
            }
        }

        var updatedArray = [];

        for (var x = 0; x < ride.joined.length; x++) {
            if (ride.joined[x].uid !== uid){
                updatedArray.push(ride.joined[x]);
            }
        }

        var amount = parseInt(ride.farePerPerson, 10);

        if (ride.joinedSeats > 0){
            firestore.collection('users').doc(ride.authorId).update({
                wallet: firebase.firestore.FieldValue.increment(-amount),
            }).then(() => {
                firestore.collection('users').doc(uid).update({
                    wallet: firebase.firestore.FieldValue.increment(amount),
                })
            })
            var noSeats = updatedArray.length;
            firestore.collection('rides').doc(ride.rideId).set({
                ...ride,
                joinedSeats: noSeats, 
                joined: updatedArray,
            }).then(() => {
                dispatch({ type: "JOINED_RIDE", ride });
                console.log("JOINED RIDE");
            }).catch((err) => {
                dispatch({ type: "JOIN_RIDE_ERROR", err })
                console.log("JOIN RIDE ERROR");
            })  
        }                 
                    
    }
}

export const euclideanDistance = (lat1, lat2, lon1, lon2) => {
    lon1 =  lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2)
    + Math.cos(lat1) * Math.cos(lat2)
    * Math.pow(Math.sin(dlon / 2),2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    let r = 6371;

    // calculate the result
    return(c * r);   
}

export const minimumCost = (la1, la2, lo1, lo2, baseRate, distFactor) => {
    let lat1 = parseFloat(la1);
    let lat2 = parseFloat(la2);
    let lon1 = parseFloat(lo1);
    let lon2 = parseFloat(lo2);

    return Math.ceil(baseRate + (distFactor * euclideanDistance(lat1, lat2, lon1, lon2)));
}