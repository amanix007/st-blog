import React, { Component } from "react";
import moment from "moment";
import HotelComponent from "./HotelComponent";



// import "./HotelSearchResultPage.css";
import queryString from "query-string";



import ResultNotFound from "../../CommonComponents/ResultNotFound";
import openSocket from "socket.io-client";
import _manifest from "../../../_manifest";
import _ from "lodash";
import Lottie from "react-lottie";

import * as hotelLoadingAnimation from "./hotelLoadingAnimation.json";
import HotelModule from "../../HotelModule/HotelModule";

const hotelOptions = {
    loop: true,
    autoplay: true,
    animationData: hotelLoadingAnimation.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};

const SOCKET_URL = _manifest.hotelListSocketUrl;

class HotelSearchResultPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotelList: [],
            mapHotelList: [],
            mapActiveHotelID: null,
            modal1: false,
            // modal1: true,
            totalRecords: 0,
            itemPerPage: 10,
            currentPage: 1,
            loading: false,
            filterLoading: false,
            searchCode: "",
            sessionId: "",
            priceRange: {
                high: 0,
                low: 0,
            },
            districtName: "",
            distance: 25,
            guestRating: 10,
            mapToShow: false,
            filters: {},
            resultHide: false,
            tablet: false,
            currency: "BDT"
        };

        this.socket = openSocket(SOCKET_URL, {
            transports: ["websocket"],
        });
    }

    setResultHide = async () => {
        this.setState({ loading: true });
        let { resultHide } = this.state;

        let Response = await GET_CONTENT("https://sharetrip-96054.firebaseio.com/website/search_period/hotel_search_period.json");

        if (Response && Response.active) {
            let { checkInDate } = this.props.hotelSearchStore.searchObject;
            let { dayAfter, lastTime } = Response;
            let dhakaTime = moment().tz("Asia/Dhaka");

            if (dhakaTime.isAfter(moment(lastTime, "h:mma"), "minute")) {
                let bookableStartDate = moment().add(dayAfter, "days");
                if (checkInDate.isBefore(bookableStartDate)) {
                    resultHide = true;
                } else {
                    resultHide = false;
                }
            }

            // resultHide = true
            this.setState({ resultHide, loading: false });
            return resultHide;
        }
    };

    async componentDidMount() {
        this.setState({
            tablet: window.innerWidth < 992
        })

        // let resultHide = await this.setResultHide();
        // console.log("resultHide:", resultHide);
        // if (!resultHide) {
        //   await this.getHotels();
        // }
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    toggle1 = () => {
        this.setState({
            modal1: !this.state.modal1,
            mapToShow: !this.state.mapToShow,
        });
    };

    render() {

        let { hotelList, loading, searchCode } = this.props;

        return loading ? (
            <div className="text-center hotelAnimationContainer">
                <div className="animationContainer">
                    <Lottie options={hotelOptions} loop={true} autoplay={true} />
                </div>

                <h2 className="fw-600">Hold Tight!</h2>
                <h5 className="fw-500" style={{ paddingBottom: "20%" }}>
                    Fetching best Rates..
            </h5>
            </div>
        ) : (
                <>
                    {hotelList && <div className="HotelSearchResultComponent">

                        <div className="hotel-search-result">
                            {hotelList.length === 0 ? (
                                <ResultNotFound type="Hotel" />
                            ) : (
                                    <React.Fragment>
                                        <div className="row">
                                            {hotelList.map((data, i) => {
                                                return (
                                                    // <HotelComponent
                                                    //   key={data.id + i}
                                                    //   data={data}
                                                    //   currency={this.state.currency}
                                                    //   images={data.images}
                                                    //   onMapLinkClick={() => this.onMapLinkClick(data.id)}
                                                    //   hotelAmenities={data.amenityLogo ? data.amenityLogo : []}
                                                    //   type="list"
                                                    //   filterLoading={this.state.filterLoading}
                                                    //   urlRedirect={`${process.env.NEXT_PUBLIC_siteBaseUrl}/hotel-details?hotelId=${data.hotelId}&searchCode=${searchCode}`}
                                                    // />
                                                    <div className="col-md-4 col-sm-6" key={data.id + i}>
                                                        <HotelModule
                                                            data={data}
                                                            classList="hotel-search"
                                                            currency={this.state.currency}
                                                            images={data.images}
                                                            onMapLinkClick={() => this.onMapLinkClick(data.id)}
                                                            hotelAmenities={data.amenityLogo ? data.amenityLogo : []}
                                                            type="list"
                                                            filterLoading={this.state.filterLoading}
                                                            urlRedirect={`${process.env.NEXT_PUBLIC_siteBaseUrl}/hotel-details?hotelId=${data.hotelId}&searchCode=${searchCode}  `}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>

                                    </React.Fragment>
                                )}
                        </div>

                    </div>
                    } </>
            );
    }
}

export default HotelSearchResultPage;
