import React, { Component } from 'react'
import Tabs from '@material-ui/core/Tabs';
import Lottie from "react-lottie";
import _, { isEmpty } from "lodash";
import Tab from '@material-ui/core/Tab';
import OneWayFlightSearch from './OneWayFlightSearch';
import { withStyles } from '@material-ui/core/styles';
import ReturnFlightSearch from './ReturnFlightSearch';
import moment from "moment";
import { GET_FLIGHTS } from '../../../etc/api/FlightApi';
import { FlightContext } from '../../../contexts/FlightContext';
import * as flightLoadingAnimation from "./flightLoadingAnimation.json";
import ResultNotFound from '../../CommonComponents/ResultNotFound';
import ListPageFlightsView from './ListPageFlightsView';


const flightOptions = {
    loop: true,
    autoplay: true,
    animationData: flightLoadingAnimation.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};


const styles = {
    indicator: {
        backgroundColor: "#1882ff",
        height: "100%",
        border: "1px solid #fff",
        borderRadius: "50px",
        zIndex: -1
    },
    root: {
        color: "#4c4c4c",
        fontWeight: "700",
        borderRadius: "50px",
        overflow: "hidden",
        // backgroundColor: "transparent",
        height: "100%",
        // border: "1px solid #c7c7c7",
    },


    selected: {
        color: "#fff",
        fontWeight: "700",
        borderRadius: "50px",
        overflow: "hidden",
        backgroundColor: "#1882ff",
        height: "100%",
        border: "1px solid #fff",
    }
};


class FlightSearch extends Component {

    static contextType = FlightContext;

    state = {
        tripType: "Return",
        flight_search_period: null,
        origin: "DAC",
        destination: "",
        startDate: moment(),
        endDate: moment().add(2, "days"),
        class: "Economy",

        passenger: {
            adults: 1,
            child: 0,
            infant: 0,
        },
        flights: null,
        loading: false,
    };

    searchFlights = (params) => {
        this.setState({
            loading: true
        })
        let getData = async () => {
            let flights = await GET_FLIGHTS(params);
            if (flights) {
                this.setState({
                    flights,
                    loading: false
                })
            } else {
                setInterval(() => {
                    window.location = "/";
                }, 8000);
            }
        };

        getData();
    }

    handleChangeIndexFlight = index => {
        this.setState({ tripType: index });
    };

    setTripType = param => {

        sessionStorage.setItem('tripType', param);
    };

    onChangeRoute = (origin, destination) => {
        let { dispatch } = this.context;
        dispatch({
            type: "change_route",
            origin, destination
        })

        this.setState({ origin, destination });
    }






    render() {


        let { flightStore, dispatch } = this.context;
        let { tripType, countryList, origin, destination, startDate, endDate, cabinClass, passenger } = flightStore;

        let { loading, flights } = this.state;

        const { classes } = this.props;
        let tabStyle = {
            selected: classes.selected,
            label: classes.label,
            root: classes.root,
        };

        let Animation = () => (
            <div className="text-center flightAnimationContainer">
                <div className="animationContainer">
                    <Lottie options={flightOptions} loop={true} autoplay={true} />
                </div>
                <h2 className="fw-600">Hold Tight!</h2>
                <h5 className="fw-500" style={{ paddingBottom: "20%" }}>
                    Fetching best Fares..
              </h5>
            </div>
        );
        return (
            <div className="flight-form">
                <div className="flight-form-container">
                    <div className="service-main FlightTabs-Main">

                        <div className="FlightTabs-tabs">
                            <Tabs
                                value={tripType}
                                onChange={(e, tripType) => dispatch({
                                    type: "change_triptype",
                                    tripType
                                })}
                                variant="standard"
                                indicatorColor="primary"
                                textColor="primary"
                                classes={{
                                    // indicator: classes.indicator
                                    indicator: "flightIndicator"
                                }} >

                                <Tab
                                    classes={{
                                        selected: "btn-selected",
                                        root: "btn-root"
                                    }}
                                    value={'Return'} label="Round Trip" />
                                <Tab
                                    classes={{
                                        selected: "btn-selected",
                                        root: "btn-root"
                                    }}
                                    value={'OneWay'} label="One Way" />

                            </Tabs>
                        </div>
                        <div className="FlightTabs-tabs-content">
                            {tripType === 'Return' && <div>
                                <ReturnFlightSearch
                                    route={this.props.route}
                                    searchFlights={this.searchFlights}
                                    // origin={origin}
                                    // destination={destination}
                                    // startDate={startDate}
                                    // endDate={endDate}
                                    // cabinClass={cabinClass}
                                    // passenger={passenger}
                                    // origin={origin}
                                    tripType={'Return'} />
                            </div>}

                            {tripType === 'OneWay' && <div>
                                <OneWayFlightSearch
                                    route={this.props.route}
                                    searchFlights={this.searchFlights}

                                    // origin={origin}
                                    // destination={destination}
                                    // startDate={startDate}
                                    // cabinClass={cabinClass}
                                    // passenger={passenger}
                                    // origin={origin}
                                    tripType={'OneWay'}
                                />
                            </div>}

                        </div>



                    </div>


                </div>


                {loading ? (
                    <Animation />
                ) : (
                        <React.Fragment>
                            {flights !== null && <>
                                {(flights.length === 0 || _.isEmpty(flights)) && <ResultNotFound type="Flight" />}
                                {!_.isEmpty(flights) && <ListPageFlightsView response={flights} />}
                            </>}


                        </React.Fragment>
                    )}
            </div>
        )
    }

}

export default withStyles(styles)(FlightSearch);