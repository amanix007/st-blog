import React, { Component, createContext, useReducer } from "react";
import moment from "moment";

export const HotelContext = createContext();
let defaultValue = {
    cityCode: "",
    cityName: "",
    // cityObj: null,
    cityObj: { id: "2zaBb2gBIAV4GvJoB2W4", countryCode: "ID", center: { lon: "115.20538299999997", lat: "-8.366410000000014" }, name: "Bali", countryName: "Indonesia", type: "city" },
    searchCode: "",
    currency: "BDT",
    checkInDate: moment().add(2, "days"),
    checkOutDate: moment().add(4, "days"),
    nationality: "bd",
    rooms: [{ adults: 2, children: [5, 6] }],
    roomObject: [
        {
            adult: 1,
            child: 0,
            child1Age: 5,
            child2Age: 5,
        },
    ],

    getTotalAdultChild: {
        adult: 1,
        child: 0,
        roomCount: 1
    },
    offset: 0,
    limit: 10,
    currency: "BDT",

};

const HotelContextProvider = (props) => {

    const [HotelStore, dispatch] = useReducer(HotelReducer, defaultValue);

    return (<HotelContext.Provider value={{ HotelStore, dispatch }}>
        {props.children}
    </HotelContext.Provider>)
}

export default HotelContextProvider;


const HotelReducer = (state, action) => {
    switch (action.type) {
        case 'update_store':
            state[action.data.type] = action.data.value
            return {
                ...state,
            }
        default:
            return state;
    }
}
