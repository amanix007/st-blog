import React, { Component } from "react";
import moment from "moment";
import { isEmpty } from "lodash";
import Zoom from '@material-ui/core/Zoom';
import Tooltip from "@material-ui/core/Tooltip";
// import './FlightInnerRowComponent.css';
import WarningNotice from "../../BlogContent/FlightSearch/WarningNotice";
const FlightInnerRowComponent = (props) => {
    const { flight, type } = props;
    let SegmentHiddenStop = {};
    
    if (type === "details") {
        SegmentHiddenStop = flight.hiddenStop
    }

    return (
        <React.Fragment>

            <div className={"FlightInnerRowComponent fz12 row " + props.type}>
                <div className="col-sm-4 flight-det-wrapper">
                    <div className="flight-det origin">
                        <div className="code-time">
                            <span className="code">{flight.originName.code}</span> <span className="time fw-600">{flight.departureDateTime.time}</span>
                        </div>
                        <p className="airport mb-xs-0 fz11">{flight.originName.airport}</p>
                        <p className="date">{moment(flight.departureDateTime.date).format('Do MMM YYYY')}</p>
                    </div>

                </div>

                <div className="col-sm-3 flight-duration text-center">
                    <div className="arrow-right mb-1"></div>
                    <span className="fz10">{flight.duration}</span>
                </div>

                <div className="col-sm-5 flight-det-wrapper">
                    <div className="flight-det destination">
                        <div className="code-time">
                            <span className="code">{flight.destinationName.code}</span> <span className="time fw-600">{flight.arrivalDateTime.time}
                                {/* {
                                (flight.dayCount !== 0) && <small className="dayCount">{flight.dayCount}+</small>
                            } */}
                            </span>

                        </div>
                        <p className="airport mb-xs-0 fz11">{flight.destinationName.airport}</p>
                        <p className="date">{moment(flight.arrivalDateTime.date).format('Do MMM YYYY')}</p>
                    </div>

                </div>
           
            </div>
            {/* {!isEmpty(SegmentHiddenStop) && <p className="errorDark-bg white-color p-xs-8 radius-4  fz14">
                This flight has technical stoppage at  {SegmentHiddenStop.airport} ({SegmentHiddenStop.city}), before booking this flight please check your visa requirements  as per your nationality.
            </p>} */}

            {!isEmpty(SegmentHiddenStop) &&
                <WarningNotice message={`This flight has technical stoppage at  ${SegmentHiddenStop.airport} (${SegmentHiddenStop.city}), before booking this flight please check your visa requirements  as per your nationality.`} />}
        </React.Fragment>
    )
}
export default FlightInnerRowComponent;