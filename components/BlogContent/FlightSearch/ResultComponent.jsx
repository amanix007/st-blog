import React, { Component } from "react";
// import ResultDetailsComponent from "./ResultDetailsComponent";

import FlightRowComponent from "./FlightRowComponent";
import Tooltip from "@material-ui/core/Tooltip";

import NumberFormat from "react-number-format";
import { Button } from "@material-ui/core";
import { FlightContext } from "../../../contexts/FlightContext";
import _manifest from "../../../_manifest";
import ResultDetailsComponent from "./ResultDetailsComponent";
// import ComponentPlaceholder from "../../../common/ComponentPlaceholder";
// import { svgProps } from "../../../../misc/common";
// import { logEventRecord } from "../../../../logger/log";

class ResultComponent extends Component {
    static contextType = FlightContext;
    state = {
        url: "/details",
        tripType: this.context.flightStore.tripType,
        collapse: false,
    };



    // toggle = () => {
    //     console.log('toggle');
    //     this.setState({ collapse: !this.state.collapse });

    //     const { flightDetails: { flight } } = this.props;
    // };

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    };

    render() {
        const { flightDetails } = this.props;
        const { index } = this.props;
        const { searchId } = this.props;
        const { sessionId } = this.props;
        let mobile = window.innerWidth < 576;

        const list = flightDetails.flight;

        if (this.props.filterLoading) {
            // if (true) {
            return <ComponentPlaceholder type="newFlight" />;
        }

        return (
            <React.Fragment>
                <div className={"single-result-component " + this.state.tripType}>
                    <div className="main-body" onClick={this.toggle}>
                        <div className="left" >
                            {list.map((flight, index) => {
                                return <FlightRowComponent type="listCompact" flight={flight} index={index} key={index} />;
                            })}

                        </div>
                        <div className="right">
                         
                            <div className="text-cont w-100">
                                {/* <div className="d-flex align-items-center justify-content-between w-100 mb-2">
                                    <div className="tripCoinOffers ">
                                        <div className="tripCoin">
                                        <img src="/assets/images/icons/tripcoin.svg" alt="" />
                                        <NumberFormat thousandSeparator={true} displayType={"text"} value={flightDetails.earnPoint} />
                                        </div>
                                    
                                    </div>
                                </div> */}
                                    <span className="ml-xs-8 fz12 fw-500 mb-2">{flightDetails.refundable ? "Refundable" : "Non-Refundable"}</span>
                                { (parseInt(flightDetails.priceBreakdown.promotionalDiscount) > 0) &&
                                    <React.Fragment>
                                        <span className="discountPrice flight fz16 mr-0">
                                            <small className="percentage">*{flightDetails.priceBreakdown.promotionalDiscount}%</small>
                                            <NumberFormat thousandSeparator={true}
                                                displayType={'text'}
                                                prefix={flightDetails.currency + ' '}
                                                value={flightDetails.priceBreakdown.promotionalAmount} />
                                        </span>
                                        <span className="fw-600 price fz15 mr-0">
                                            <NumberFormat thousandSeparator={true}
                                                displayType={'text'}
                                                prefix={flightDetails.currency + ' '}
                                                value={flightDetails.originPrice} />
                                        </span>
                                    </React.Fragment>
                                }
                                { (parseInt(flightDetails.priceBreakdown.promotionalDiscount) === 0) &&
                                    <span className="price fz16">
                                        <NumberFormat thousandSeparator={true}
                                            displayType={'text'}
                                            prefix={flightDetails.currency + ' '}
                                            value={flightDetails.originPrice} />
                                    </span>
                                }
                            </div>
                            <div className="btn-cont">
                                <Button
                                    color="primary"
                                    variant="contained"
                                    size="medium"
                                    onClick={
                                        () => {
                                            // flightDetails.deal === "Preferred" ? logEventRecord("Click_on_Preffered_Airline") : logEventRecord("Click_on_Best_Deals")
                                            // logEventRecord("Click_on_BookNow")
                                            localStorage.setItem("flight_search_url", window.location.href);
                                            localStorage.setItem("prevURL", `/flight-details?searchId=${searchId}&sessionId=${sessionId}&sequenceCode=${flightDetails.sequence}`);
                                            window.open(`${process.env.NEXT_PUBLIC_siteBaseUrl}/flight-details?searchId=${searchId}&sessionId=${sessionId}&sequenceCode=${flightDetails.sequence}`, "_blank");
                                        }
                                    }
                                >Book Now</Button>
                            </div>
                        </div>
                    </div>
                    <ResultDetailsComponent
                        segments={flightDetails.segments}
                        kg={flightDetails.weight}
                        seatsLeft={flightDetails.seatsLeft}
                        shareLink={flightDetails.shareLink}
                        index={index}
                        flightDetails={flightDetails}
                        sequenceCode={flightDetails.sequence}
                        searchId={this.props.searchId}
                        type="list"
                        collapse={this.state.collapse}
                        toggle={this.toggle}
                    />


                </div>
            </React.Fragment>
        );
    }


}



export default ResultComponent;

