import React, { Component } from "react";
import { Button } from "@material-ui/core";

class ResultNotFound extends Component {
  render() {
    let FlightNotFound = () => {
      return (
        <div className="FlightNotFound listNotFound">
          <div className="img">
            <img src="/assets/images/no-flights.png" alt="" />
          </div>
          <div
            style={{
              textAlign: "center",
              padding: "4vw",
            }}
          >
            <h1>Sorry!</h1>
            <p className="h5 mb-0">We did not find any suitable option for your search. </p>
            <p className="h5">
              We've searched more than 100 airlines that we sell, and couldn't find any flights on these dates. <br />
              Please try Changing your search details.
            </p>
            <p className="h5" style={{ color: "red" }}>
              <b> Important:</b> This destination may have COVID-19 travel restrictions in place, including specific restrictions for lodging. <br />
              Check any national, local, and health advisories for this destination before you book.
            </p>
          </div>
        </div>
      );
    };
    let HotelNotFound = () => {
      return (
        <div className="HotelNotFound listNotFound">
          <div className="img">
            <img src="/assets/images/no-hotels.png" alt="" />
          </div>
          <h1>Sorry!</h1>
          <p className="h5 mb-0">We did not find any suitable option for your search. </p>
          <p className="h5">Please modify your search and try again.</p>
          {/* <Button color="primary" size="large" variant="contained" >SEARCH AGAIN</Button> */}
        </div>
      );
    };

    let HistoryNotFound = () => {
      return (
        <div className="HistoryNotFound listNotFound">
          <div className="img">
            <img src="/assets/images/historyNotFound.png" alt="" />
          </div>
          <h1>Sorry!</h1>
          <p className="h5">No history found!</p>
        </div>
      );
    };
    let OthersNotFound = () => {
      return (
        <div className="OthersNotFound listNotFound">
          <div className="img">
            <img src="/assets/images/otherNotFound.png" alt="" />
          </div>
          <h1>Sorry!</h1>
          <p className="h5 mb-0">We did not find any suitable option for your search. </p>
          <p className="h5">Please modify your search and try again.</p>
        </div>
      );
    };
    return (
      <div className="ResultNotFound">
        {this.props.type === "Flight" && <FlightNotFound />}
        {this.props.type === "Hotel" && <HotelNotFound />}
        {this.props.type === "History" && <HistoryNotFound />}
        {this.props.type === "Others" && <OthersNotFound />}
      </div>
    );
  }
}

export default ResultNotFound;
