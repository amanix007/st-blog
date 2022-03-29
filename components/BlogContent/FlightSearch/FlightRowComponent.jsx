import React, { Component } from "react";
import moment from "moment";
import { isEmpty } from "lodash";

import Tooltip from "@material-ui/core/Tooltip";
import WarningNotice from "./WarningNotice";


const FlightRowComponent = (props) => {
    const { flight, type } = props;
    // console.log('flight:', type, flight)

    let SegmentHiddenStop = {};
    if (type === "details") {
        SegmentHiddenStop = flight.hiddenStop
    }



    let transitVisaRequired = false;
    let transitVisaText = "";

    let { transitTime } = flight;
    let { code } = flight.destinationName;

    // transitTime = "13h 0m";
    // code = "HKG"
    // flight.arrivalDateTime.date = "2020-04-01";
    // flight.arrivalDateTime.time = "12:30";
    // console.log('transitTime:', transitTime)

    if (transitTime && transitTime !== "" && type === "details") {

        let transitTimeFormat = transitTime.replace("h ", ":").replace("m", "");
        let transitTimeAsMinutes = moment.duration(transitTimeFormat).asMinutes();

        if (code === "BKK" || code === "DMK") {
            if (transitTimeAsMinutes >= 12 * 60) {
                transitVisaRequired = true;
                transitVisaText = "*This flight contains more than 12 hours of transit, before booking this flight please check your visa requirements as per your nationality.";
            }
        } else if (code === "HKG") {

            let arrivalDateTime = flight.arrivalDateTime.date + " " + flight.arrivalDateTime.time
            
            arrivalDateTime = moment(arrivalDateTime);


            let nextFlightTime = moment(arrivalDateTime).add(transitTimeAsMinutes, "m");

            

            if (!moment(arrivalDateTime).isSame(nextFlightTime, 'day')) {
                transitVisaRequired = true
                transitVisaText = "* This flight contains transit which extends till the next calendar date, before booking this flight please check your visa requirements as per your nationality.";
            }
        } else {

            if (transitTimeAsMinutes >= 24 * 60) {
                transitVisaRequired = true
                transitVisaText = "* This flight contains more than 24 hours of transit, before booking this flight please check your visa requirements as per your nationality.";
            }
        }





    }

    return (
        <React.Fragment>

            <div className={"FlightRowComponent " + props.type}>
                <div className="flight-det-wrapper">
                    <div className="airline_logo">
                        <Tooltip title={flight.airlines.short} placement="top-start" >
                            <img src={flight.logo} />
                        </Tooltip>
                    </div>
                    {props.type === 'details' && <i className="mdi mdi-airplane-takeoff"></i>}
                    <div className="flight-det origin"> 
                        <div className="code-time">
                            <span className="code">{flight.originName.code}</span> <span className="time">{flight.departureDateTime.time}</span>
                        </div>
                        <p className="mb-xs-0">

                            {flight.originName.airport.length > 26 ? flight.originName.airport.slice(0, 26) + "..." : flight.originName.airport}
                        </p>
                        <p>{moment(flight.departureDateTime.date).format('Do MMM YYYY')}</p>
                    </div>

                </div>
                <div className="flight-duration">
                    <div className="arrow-right"></div>
                    <p className="mb-xs-0">{(flight.stop > 0) ? flight.stop + " Stop(S)" : "Non Stop"}</p>
                    <span>{flight.duration}</span>
                </div>

                <div className="flight-det-wrapper">
                    <div className="flight-det destination">
                        <div className="code-time">
                            <span className="code">{flight.destinationName.code}</span> <span className="time">{flight.arrivalDateTime.time}
                                {/* {
                                (flight.dayCount !== 0) && <small className="dayCount">{flight.dayCount}+</small>
                            } */}
                            </span>

                        </div>
                        <p className="mb-xs-0">
                            {flight.destinationName.airport.length > 26 ? flight.destinationName.airport.slice(0, 26) + "..." : flight.destinationName.airport}
                        </p>
                        <p>{moment(flight.arrivalDateTime.date).format('Do MMM YYYY')}</p>
                    </div>
                </div>

            </div>

            {flight.hiddenStops &&
                <WarningNotice message={"This flight has technical stoppage, before booking this flight please check your visa requirements as per your nationality."} />
            }

            {transitVisaRequired &&
                <WarningNotice message={transitVisaText} />
            }
        </React.Fragment>
    )
}
export default FlightRowComponent;