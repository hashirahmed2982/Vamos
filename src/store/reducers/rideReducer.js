const initState = {
    authError: null,
}

function rideReducer(state = initState, action) {
    switch (action.type) {
        case "CREATE_RIDE":
            console.log("Created RIDE", action);
            return {
                ...state,
                authError: null,
            }
        case "CREATE_RIDE_ERROR":
            console.log("Create RIDE error", action);
            return {
                ...state,
                authError: "Ride could not be created."
            };
        case "JOINED_RIDE":
            console.log("JOINED RIDE", action);
            return {
                ...state,
                authError: "JOINED RIDE",
            }
        case "JOIN_RIDE_ERROR":
            console.log("JOIN RIDE ERROR", action);
            return {
                ...state,
                authError: "Ride could not be joined."
            }
        case "NOT_ENOUGH_SEATS":
            console.log("NOT ENOUGH SEATS", action);
            return {
                ...state,
                authError: "Not enough seats in the ride."
            }
        case "USER_ALREADY_JOINED":
            console.log("USER ALREADY JOINED", action);
            return {
                ...state,
                authError: "You have already joined this ride."
            }
        default:
            return state;
    }
}

export default rideReducer