import React, { Component, createContext, useReducer } from "react";
import moment from "moment";

export const FlightContext = createContext();
let defaultValue = {
    tripType: "OneWay",
    flight_search_period: null,
    origin: "DAC",
    destination: "",
    startDate: moment(),
    endDate: moment().add(2, "days"),
    originOBJ: {
        city: "Cox  s Bazar",
        iata: "CXB",
        name: "Bangladesh, Cox  s Bazar Airport (CXB)"
    },
    destinationOBJ: {
        city: "Cox  s Bazar",
        iata: "BKK",
        name: "Bangladesh, Cox  s Bazar Airport (CXB)"
    },
    class: "Economy",
    passenger: {
        adults: 1,
        child: 0,
        infant: 0,
    },
    childDOBlist: []

};

const FlightContextProvider = (props) => {

    const [flightStore, dispatch] = useReducer(flightReducer, defaultValue);

    return (<FlightContext.Provider value={{ flightStore, dispatch }}>
        {props.children}
    </FlightContext.Provider>)
}

export default FlightContextProvider;


const flightReducer = (state, action) => {
    switch (action.type) {
        case 'change_triptype':
            return {
                ...state,
                tripType: action.tripType,
            }
        case 'change_route':
            return {
                ...state,
                origin: action.origin,
                destination: action.destination,
            }
        case 'change_class':
            return {
                ...state,
                class: action.class,

            }
        case 'change_passenger':
            return {
                ...state,
                passenger: action.passenger,
            }
        case 'change_childDOBlist':
            return {
                ...state,
                childDOBlist: action.childDOBlist,
            }

        default:
            return state;
    }
}
