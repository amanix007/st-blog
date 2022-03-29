import React, { Component, createContext, useReducer } from "react";
import moment from "moment";

export const PackageContext = createContext();
let defaultValue = {

    cityList: [""],
    limit: 10,
    offset: 0,

};

const PackageContextProvider = (props) => {

    const [PackageStore, dispatch] = useReducer(PackageReducer, defaultValue);

    return (<PackageContext.Provider value={{ PackageStore, dispatch }}>
        {props.children}
    </PackageContext.Provider>)
}

export default PackageContextProvider;

const PackageReducer = (state, action) => {
    switch (action.type) {
        case 'update_store':
            state[action.data.type] = action.data.value
            return { ...state }
        default:
            return state;
    }
}
