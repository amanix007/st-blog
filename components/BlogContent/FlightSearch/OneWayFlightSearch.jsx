import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";

// import SingleDatePickerWrapper from "./SingleDatePickerWrapper";
// import FlightPassengersSelect from "./FlightPassengersSelect";
import { Button } from "@material-ui/core";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";

import { ADVANCE_SEARCH, FIND_AIRPORTS } from "../../../etc/api/FlightApi";
import { YYYYMMDD, kFormatter } from "../../../etc/common";
import DatePickerRangeSingleInput from "../../CommonComponents/DatePickerRangeSingleInput";
import AirportInput from "./AirportInput";
import FlightPassengerSelect from "./FlightPassengerSelect";
import { FlightContext } from "../../../contexts/FlightContext";

class OneWayFlightSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      airportList: [],
      origin: "DAC",
      destination: "",
      startDate: moment(),
      endDate: moment().add(2, "days"),
      class: "Economy",
      passenger: {},
      originOBJ: {
        city: "",
        iata: this.props.route.origin,
        name: ""
      },
      destinationOBJ: {
        city: "",
        iata: this.props.route.destination,
        name: ""
      },

      dropdownOpen: false,
      loading: false,
      data: {},
      errors: {},
      fireRedirect: false,
      url: "",

      snakeBarOpen: false,
      snakeBarMessage: "Error !!",



    };
  }

  static contextType = FlightContext;

  handleClickSnakeBar = (snakeBarMessage) => {
    this.setState({
      snakeBarOpen: true,
      snakeBarMessage,
    });
  };

  handleClose = (event, reason) => {
    // if (reason === 'clickaway') {
    //   return;
    // }
    this.setState({
      snakeBarOpen: false,
    });
  };

  componentDidMount() {



  }

  onSubmit = (e) => {
    // console.log('test on submit');
    e.preventDefault();
    // console.log('this.props.flightSearchStore:', toJS(this.props.flightSearchStore))

    const errors = this.validate(this.state.data);



    let { originOBJ, destinationOBJ, startDate, endDate } = this.state;
    let { flightStore } = this.context;
    let { tripType, passenger, childDOBlist } = flightStore;

    if (originOBJ.iata === "" || destinationOBJ.iata === "") {
      this.handleClickSnakeBar("Please Enter Airport Location");
      return false;
    }
    else if (moment(startDate).isAfter(endDate) && tripType == "Return") {

      if (moment.isMoment(endDate)) {
        // console.log('endDate:', endDate.format("DD/MM/YYYY"))
        // console.log('startDate:', startDate.format("DD/MM/YYYY"))
      }

      // this.handleClickSnakeBar("Please Select Correct Date");
      return false;
    }
    else if (startDate == "Invalid date" || endDate == "Invalid date") {
      this.handleClickSnakeBar("Please Select Date");
      return false;
    }

    
    this.setState({ errors });
    if (_.isEmpty(errors)) {

      let childAgeString = "";
			for (let c = 0; c < childDOBlist.length; c++) {
				childAgeString = childAgeString + `&childAge[]=${childDOBlist[c]}`
			}


      let urlParams = `?tripType=${tripType}&adult=${passenger.adults}&child=${passenger.child}&infant=${passenger.infant}&class=${flightStore.class
        }&origin=${originOBJ.iata}&destination=${destinationOBJ.iata}&depart=${moment(startDate).format(YYYYMMDD)}${childAgeString}`;

      // return false;
      // window.location = "flight-search" + urlParams;
      this.props.searchFlights(urlParams)
    } else {
      this.handleClickSnakeBar("Please Select Correct Date");
      console.log("errors");
    }
    console.log("submit");
  };

  validate = () => {
    const errors = {};
    let { state } = this;
    //  console.log(this.state, "this.state");
    if (_.size(state.originOBJ.iata) < 3) {
      errors.origin = "origin is important!";
    }
    if (_.size(state.destinationOBJ.iata) < 3) {
      errors.destination = "destination is important!";
    }
    return errors;
  };

  setAirportName = async (type, data, airports) => {
    // console.log(type, data, airports);
    let object = {};

    if (type === "origin") {
      object.origin = _.size(data) < 3 ? "DAC" : data;
      object.originCityObj = _.size(data) < 3 ? {} : airports;
      this.props.flightSearchStore.updateStore(object);
    } else {
      object.destination = _.size(data) < 3 ? "BKK" : data;
      object.destinationCityObj = _.size(data) < 3 ? {} : airports;
      this.props.flightSearchStore.updateStore(object);
    }

  };



  getDateRange = (startDate, endDate) => {
    // console.log('startDate, endDate:', startDate, endDate)
    //this.setState({ startDate, endDate });
    let object = {};
    object.startDate = startDate;
    object.endDate = endDate;
    this.props.flightSearchStore.updateStore(object);
  };

  setPassengers = (passenger) => {
    // this.setState({ passenger });
    let object = {};
    object.passenger = passenger;
    this.props.flightSearchStore.updateStore(object);
  };

  classChange = (cabinClass) => {
    /*this.setState({ class: cabinClass }, () =>
      console.log(this.state.class)
    );*/

    let object = {};
    object.class = cabinClass;
    this.props.flightSearchStore.updateStore(object);
  };

  searchAirport = _.debounce(async (value) => {

    if (value) {
      this.setState({ loading: true });
      let airportList = await FIND_AIRPORTS(value);
      if (airportList) {
        this.setState({
          airportList
        })
      }
    }
  }, 200);
  render() {
    let { airportList, snakeBarOpen, snakeBarMessage,
      originOBJ, destinationOBJ
    } = this.state;


    let { startDate, endDate } = this.state;

    return (
		<div>
			<form onSubmit={this.onSubmit}>
				<div className="flight-element-container returnflight">
					<div className="row">
						<div className="col-lg-4 col-md-4 mb-3">
							<AirportInput
								label="Flying from"
								type={"visaCountry"}
								dataList={airportList}
								value={originOBJ}

								onChange={(e, v) => this.setState({ originOBJ: v }, () => {

								})}

								icon="airplane-takeoff"

								renderOption={(option) => <React.Fragment>{option.iata}</React.Fragment>}
								getOptionLabel={(option) => option.iata}
								onInputChange={(e) => this.searchAirport(e.target.value)}
								loading={false}
								loadingText={"Loading..."}
							/>
						</div>
						<div className="col-lg-4 col-md-4 mb-3">
							<AirportInput
								label="Flying to"
								type={"visaCountry"}
								dataList={airportList}
								value={destinationOBJ}
								onChange={(e, v) => this.setState({ destinationOBJ: v }, () => {

								})}
								icon="airplane-landing"

								renderOption={(option) => <React.Fragment>{option.iata}</React.Fragment>}
								getOptionLabel={(option) => option.iata}
								onInputChange={(e) => this.searchAirport(e.target.value)}
								loading={false}
								loadingText={"Loading..."}
							/>
						</div>
						<div className="col-lg-4 col-md-4 mb-3">
							<DatePickerRangeSingleInput
								startDate={moment(startDate)}
								endDate={moment(endDate)}
								// minStartDate={minStartDate}
								minStartDate={startDate}
								disabled={false}
								onChange={(startDate) => this.setState({ startDate: moment(startDate).format("YYYY-MM-DD") })}
							/>
						</div>
						<div className="col-lg-6 col-md-6 mb-3">
							<FlightPassengerSelect />
						</div>
						<div className="col-lg-6 col-md-6 mb-3 d-flex justify-content-end align-items-center">
							<Button color="primary" variant="contained" type="submit" size="large">
								<b>Search Flights</b>
							</Button>
						</div>
					</div>

				</div>
			</form>
			<Snackbar
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				open={snakeBarOpen}
				autoHideDuration={6000}
				onClose={this.handleClose}
				ContentProps={{
					"aria-describedby": "message-id",
				}}
				message={<span id="message-id">{snakeBarMessage}</span>}
				action={[
					//   <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
					//     UNDO
					// </Button>,
					<IconButton key="close" aria-label="close" color="inherit" onClick={this.handleClose}>
						<i className="mdi mdi-close"></i>
					</IconButton>,
				]}
			/>
			{/* {this.state.fireRedirect && <Redirect to={this.state.url} />} */}




		</div>
    );
  }
}


export default OneWayFlightSearch;
