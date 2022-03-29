import React, { Component, Fragment } from "react";
// import { Button, Collapse, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import FlightRow from "./FlightRowComponent";
import Collapse from '@material-ui/core/Collapse';

import NumberFormat from "react-number-format";
import { TabPanel, SegmentComponent, SmallCommonComponents } from "../../CommonComponents/SmallCommonComponents";
import { FlightRules } from "../../CommonComponents/FlightRules";

class ResultDetailsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      collapse: props.collapse,
      toggleFairDetails: false,
      toggleBaggages: false,
      toggleRefundPolicy: false,
      airFareRules: [],
      baggages: [],
      segmentTypeIndex: 0,
      fareDetails: "Loading Fare Details"
    };
  }

  componentWillMount() {
    if (this.props.type === "history") {
      this.setState({
        collapse: true
      });
    }
  }

  componentWillReceiveProps(newProps){
    this.setState({
      collapse: newProps.collapse
    });
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  setSegmentType = (e, segmentTypeIndex) => {
    // console.log('segmentTypeIndex:', segmentTypeIndex)
    this.setState({ segmentTypeIndex })

  }

  render() {
    const { segments, flightDetails, index } = this.props;
    const { weight, seatsLeft, earnPoint, sharePoint, refundable } = flightDetails;
    let { segmentTypeIndex } = this.state;

    console.log('collapse', this.state.collapse);

    return (
      <Fragment>
       
        <Collapse  in={this.state.collapse} timeout="auto" unmountOnExit>
          <div className="body-details">
            <div className="segment-details">
              <Tabs
                className="st-tab-button-container"
                value={segmentTypeIndex}
                indicatorColor="primary"
                variant={segments.length > 3 ? "scrollable" : "standard"}
                scrollButtons={segments.length > 3 ? "auto" : "off"}
                textColor="primary"
                onChange={(e, newValue) => this.setSegmentType(e, newValue)}
                classes={{
                  indicator: "indicator",
                  fixed: "fixed"
                }}
              >
                {segments.map((segment, segmentTypeIndex) => {
                  return <Tab
                    key={segmentTypeIndex}
                    className="tab-button fz12"
                    classes={{
                      selected: "selected",
                      wrapper: "wrapper"
                    }}
                    label={segment.type}
                  />;
                })}
              </Tabs>
              {segments.map((segment, index) => {
                return (<TabPanel key={"tp" + index} value={segmentTypeIndex} index={index}>
                  <SegmentComponent eachSegment={segment} />
                </TabPanel>)
              })
              }

            </div>

            {this.props.type !== "history" && (
              <FlightRules {...this.props}/>
            )}

          </div>
        </Collapse >

        {this.props.type !== "history" && (
          <React.Fragment>
            <div className="flight-footer ">
            <div className="tripCoinOffers ">
                <div className="tripCoin">
                  <img src="/assets/images/icons/tripcoin.svg" alt="" />
                  <NumberFormat thousandSeparator={true} displayType={"text"} value={earnPoint} />
                </div>
              
              </div>

              <div className="right">
                <div className="showMore" onClick={() => this.props.toggle()}>
                  <span>Show {this.props.collapse ? "Less" : "More"} </span>
                  <i className={this.props.collapse ? "mdi mdi-chevron-up" : "mdi mdi-chevron-down"} />
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </Fragment>
    );
  }
}

ResultDetailsComponent.propTypes = {};

export default ResultDetailsComponent;
