import React, { Fragment, Component } from "react";
import { Button, Typography } from "@material-ui/core";
import NumberFormat from "react-number-format";

// import dealsspecial from "./deals-special-mono.svg";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";


 import { svgProps, between } from "../../etc/common";


import moment from "moment";
import { Modal as Modal2, CircularProgress } from "@material-ui/core";


import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import FlightInnerRowComponent from "../BlogContent/FlightSearch/FlightInnerRowComponent"

// const ColorButton = withStyles(theme => ({
//     root: {
//         color: theme.palette.getContrastText(purple[500]),
//         backgroundColor: "#fff",
//         '&:hover': {
//             backgroundColor: "red",
//         },
//     },
// }))(Button);

// export function ButtonWhite(props) {
//     return (
//         <ColorButton variant="contained" color="primary" className={classes.margin} {...props} >
//             Custom CSS
//       </ColorButton>
//     )
// }

export function HotelPriceOnly(props) {
  let { hotelData, currency, roomCount } = props;
  return (

    <div className="costs d-flex flex-wrap mb-1 fz16">
        <span className="d-price fw-600">
          <NumberFormat thousandSeparator={true} displayType={"text"} prefix={currency + " "} value={Math.ceil(hotelData.lowestRate / roomCount)} />
          /<small>night</small>
        </span>
    </div>


    // <p className="hotel-price">
    //   <span className="Price mr-xs-0">
    //     <NumberFormat thousandSeparator={true} displayType={"text"} prefix={currency + " "} value={Math.ceil(hotelData.lowestRate / roomCount)} />
    //   </span>
    //   <small className="small"> /Night</small>
    // </p>
  );
}

export function HotelPriceWithDiscount(props) {
  let { hotelData, currency, roomCount } = props;
  return (
    <React.Fragment>

    <div className="costs d-flex flex-wrap mb-1 fz16">
        <span className="discount d-flex align-items-center fz10 mr-1">
            <img src="/assets/images/icons/discount-mono.svg" alt="" className="mr-1 m-0"/>
            {hotelData.discount}%
        </span> 
        <span className="o-price line-through fz12 mr-2 d-flex align-items-center">
          <NumberFormat thousandSeparator={true} className="fw-400" displayType={"text"} prefix={currency + " "} value={Math.ceil(hotelData.lowestRate / roomCount)} />
        </span>
        <span className="d-price fw-600">
          <NumberFormat thousandSeparator={true} displayType={"text"} prefix={currency + " "} value={Math.ceil(hotelData.lowestRateAfterDiscount / roomCount)} />
          /<small>night</small>
        </span>
    </div>


      {/* <p className="hotel-price ">
        <span className="Price mr-xs-0">
          <NumberFormat thousandSeparator={true} className="fw-400" displayType={"text"} prefix={currency + " "} value={Math.ceil(hotelData.lowestRate / roomCount)} />
        </span>
        <small className="small"> /Night</small>
      </p>

      <p className="hotel-price hasDiscount">
        <span className="Price mr-xs-0">
          <NumberFormat thousandSeparator={true} displayType={"text"} prefix={currency + " "} value={Math.ceil(hotelData.lowestRateAfterDiscount / roomCount)} />
          <small className="small"> /Night</small>
          <span className="percentage">{hotelData.discount}%</span>
        </span>
      </p> */}
    </React.Fragment>
  );
}

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    window.location.reload();
    return "";
  } else {
    // Render a countdown
    return (
      <React.Fragment>
        <div className="time">
          <strong>
            <span className="inner">{minutes}</span>
          </strong>
          <span className="timeType">min </span>
        </div>
        <span>:</span>
        <div className="time">
          <strong>
            <span className="inner">{seconds}</span>
          </strong>
          <span className="timeType">sec</span>
        </div>
      </React.Fragment>
    );
  }
};

function FlightTimeCounterFunc() {
  return (
    <div className="FlightTimeCounter">
      <div className="img">
        <img
          style={{
            position: "relative",
            left: 4,
          }}
          src="./assets/images/time-out.svg"
          alt=""
        />
      </div>
      <div className="text">
        <p>Book Now before it gets sold out.</p>
        <div className="countdown">
          <Countdown date={Date.now() + 1000 * 60 * 20} renderer={renderer} />
        </div>
      </div>
    </div>
  );
}
export let FlightTimeCounter = React.memo(FlightTimeCounterFunc);
// export function FlightTimeCounter(props) {

//     return (
//         <div className="FlightTimeCounter">
//             <div className="icon">
//                 <img src="./assets/images/icons/svg/hot-deal-color-2.svg" alt="" />
//             </div>
//             <div className="text">
//                 <p>Book now before tickets run out!</p>
//                 <div className="countdown">
//                     <Countdown
//                         date={Date.now() + 1000 * 60 * 20}
//                         renderer={renderer}
//                     />

//                 </div>
//             </div>
//         </div>
//     )
// }

function FlightRouteWatchingFunc() {
  return (
    <div className="FlightRouteWatching ">
      <div className="icon">
        <i className="mdi mdi-account-group"></i>
      </div>
      <div className="text">
        <p>{between(2, 12)} people are looking at this flight.</p>
      </div>
    </div>
  );
}

export let FlightRouteWatching = React.memo(FlightRouteWatchingFunc);



export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography component="div" role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <div p={3}>{children}</div>}
    </Typography>
  );
}

export let SegmentComponent = (props) => {
  let { eachSegment } = props;
  return (
    <div className="details depart">
      <div className="flight-block">
        {eachSegment.segment.map((seg, j) => {
          return (
            <Fragment key={j}>
              <div className="airline-details mb-2">
                <div className="img">
                  <img src={seg.logo} alt="" />
                </div>
                <span className="airlineName fw-500">
                  {seg.airlines.short} &nbsp; {seg.airlines.code + seg.flightNumber}
                </span>
                <span className="flightNumber">
                  {seg.aircraft} - {seg.aircraftCode}
                </span>
                {/* <span className="strong">{moment(seg.departureDateTime.date).format("D MMM, YYYY")}</span> */}
              </div>
              <FlightInnerRowComponent index={j} type="details" flight={seg} />
              {seg.transitTime && <div className="layover fz12 fw-600 pl-2">Layover: {seg.transitTime}</div>}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export let FlightInfo = (props) => {
  let { eachSegment } = props;
  return (
    <div className="FlightInfo">
      <div className="flight-block">
        {eachSegment.segment.map((seg, j) => {
          return (
            <Fragment key={j}>
              <div className="airline-details">
                <div className="img">
                  <img src={seg.logo} alt="" />
                </div>
                <span className="airlineName fw-600">
                  {seg.airlines.short} &nbsp; {seg.airlines.code + seg.flightNumber}
                </span>
                <span className="flightNumber">
                  {seg.aircraft} - {seg.aircraftCode}
                </span>
                {/* <span className="strong">{moment(seg.departureDateTime.date).format("D MMM, YYYY")}</span> */}
              </div>
              <FlightInnerRowComponent index={j} type="details" flight={seg} />
              {seg.transitTime && <div className="layover fw-600">Layover: {seg.transitTime}</div>}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export let FlightBaggageInfo = (props) => {
  let { baggage } = props;
  return (
    <div className="FlightInfoType FlightBaggageInfo custom-scroll-bar-gray">
      {baggage.map((b, i) => (
        <div key={"bg" + i} className="info-container mb-xs-8">
          <p className="fw-700 fz14 mb-xs-0">{b.segment}</p>
          <div className="flight-info-table">
            <div className="i-row">
              <span className="i-label ">Baggage:</span>
              <span className="i-value">{b.weight} / person</span>
            </div>
            {/* <div className="i-row">
                        <span className="i-label">Cabin Baggage:</span>
                        <span className="i-value">7 KG / person</span>
                    </div>
                    <div className="i-row">
                        <span className="i-label">Check-in Baggage:</span>
                        <span className="i-value">30 KG / Person</span>
                    </div>
                    <div className="i-row">
                        <span className="i-label">Date Change Fee:  Airline Fee + ShareTrip Fee + Fare Difference</span>
                        <span className="i-value">100 %(apprx) + BDT 500 + Fare Difference</span>
                    </div> */}
          </div>
        </div>
      ))}

      {/* <div className="info-container" >
                <p className="fz12 fw-600 mb-xs-8">Dac - Kul</p>
                <div className="flight-info-table">
                    <div className="i-row">
                        <span className="i-label">Cabin Baggage:</span>
                        <span className="i-value">7 KG / person</span>
                    </div>
                    <div className="i-row">
                        <span className="i-label">Check-in Baggage:</span>
                        <span className="i-value">30 KG / Person</span>
                    </div>
                    <div className="i-row">
                        <span className="i-label">Date Change Fee:  Airline Fee + ShareTrip Fee + Fare Difference</span>
                        <span className="i-value">100 %(apprx) + BDT 500 + Fare Difference</span>
                    </div>
                </div>
            </div> */}
    </div>
  );
};

export let FlightAirFareRulesInfo = (props) => {
  let { eachSegment } = props;
  return (
    <div className="FlightInfoType FlightAirFareRulesInfo custom-scroll-bar-gray">
      <div>
        Max Stay Maximum stay none for economy unrestricted fares.
        <br />
        Layover Stopovers for economy unrestricted fares unlimited stopovers permitted.
        <br />
        Combinations Permitted combinations fares may be combined on a half round trip basis with any fare for any carrier in any rule and tariff to form round trips/circle trips. End-on-end
        permitted. Validate all fare components. Travel must be via construction point. Add-ons permitted. Open jaws fares may be combined on a half round trip basis with any fare for any carrier in
        any rule and tariff. -to form single or double open jaws. A maximum of 2 international fare components permitted. Mileage of an international open segment must be equal to/less than mileage of
        the shortest flown fare component. No mileage restriction on an open segment within one country.
        <br />
        Travel Restrictions Travel restrictions valid for travel commencing on/after 12 may 2017.
        <br />
        Accompanied Travel Restrictions Children discounts for economy unrestricted fares note - general rule does not apply. An accompanied child 2-11 years of age - charge 75 percent of the fare.
        Must be accompanied on all flights by adult 12 or older. Or - an unaccompanied child 2-11 years of age - charge 100 percent of the fare. Or - 1st infant under 2 years of age and not occupying
        a seat - charge 10 percent of the fare. Ticket designator- in and percent of discount must be accompanied on all flights by adult 12 or older. Or - an infant under 2 years of age and occupying
        a seat - charge 75 percent of the fare. Ticket designator- ch and percent of discount must be accompanied on all flights by adult 12 or older. Note - unaccompanied infant under 2 years -
        travel not permitted at this fare.
      </div>
    </div>
  );
};

export const StSlider = withStyles({
  valueLabel: {
    top: -40,
    "& >span": {
      width: 42,
      height: 42,
      fontSize: ".65rem",
    },
  },
})(Slider);

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export function SimpleSelect() {
  const classes = useStyles();
  const [age, setAge] = React.useState(10);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} onChange={handleChange} IconComponent={() => <i className="arrowBottomIcon mdi mdi-chevron-down" />}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
