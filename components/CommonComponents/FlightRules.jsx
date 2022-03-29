import React, { Component, Fragment } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// import "./ResultDetailsComponent.css";

import { Modal as Modal2, CircularProgress, ModalBody, Dialog, DialogTitle, DialogContent, DialogContentText, ButtonBase, } from "@material-ui/core";
import { FlightBaggageInfo, TabPanel, FlightAirFareRulesInfo } from "./SmallCommonComponents";
import FlightRulesModal from "./FlightRulesModal";
import { GET_FARE_RULES } from "../../etc/api/FlightApi";
// import FlightRefundPolicyInfo from "./FlightRefundPolicyInfo";




export class FlightRules extends Component {
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
            fareDetails: "Loading Fare Details",
            ruleIndex: 0,
        };
    }


    toggleFairDetails = () => {
        this.setState({ toggleFairDetails: !this.state.toggleFairDetails }, () => this.getAirFareRules());
    };
    toggleBaggages = () => {
        this.setState({ toggleBaggages: !this.state.toggleBaggages }, () => this.getAirFareRules());
    };

    toggleRefundPolicy = () => {
        this.setState({ toggleRefundPolicy: !this.state.toggleRefundPolicy }, () => this.getAirFareRules());
    };


    showRule = (e, ruleIndex) => {
        this.setState({ ruleIndex });
    }
    componentDidMount() {


    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.collapse) {
            this.getAirFareRules();
        }
    }


    getAirFareRules = async () => {
        if (this.state.toggleFairDetails || this.state.toggleBaggages || this.state.toggleRefundPolicy) {
            let { sequenceCode, searchId } = this.props;
            let params = `?searchId=${searchId}&sequenceCode=${sequenceCode}`;

            if (sessionStorage.getItem(params)) {
                let res = JSON.parse(sessionStorage.getItem(params));
                console.log(res);
                this.setState({ airFareRules: res.airFareRules, baggages: res.baggages, fareDetails: res.fareDetails });
            } else {
                let res = await GET_FARE_RULES(params);
                console.log(res);
                if (res) {
                    this.setState({ airFareRules: res.airFareRules, baggages: res.baggages, fareDetails: res.fareDetails }, () => {
                        sessionStorage.setItem(params, JSON.stringify(res));
                    });
                } else {
                    this.setState({
                        toggleFairDetails: false,
                        toggleBaggages: false,
                        toggleRefundPolicy: false
                    });
                }
            }
        }
    };
    render() {


        let { flightDetails: { baggage } } = this.props;
        let Baggages = () => {
            return (
                <div>
                    {" "}
                    <CircularProgress /> Please wait..
                </div>
            );
        };
        let Cancellation = () => {
            return (
                <div>
                    {" "}
                    <CircularProgress /> Please wait..
                </div>
            );
        };

        let { ruleIndex } = this.state;


        if (this.state.airFareRules.length > 0) {
            Cancellation = () =>
                this.state.airFareRules.map((item, i) => {
                    return (
                        <div key={i + item.type + "div"}>
                            <h6 key={i + item.type + "h6"} className="mb-xs-10">
                                {item.type}
                            </h6>
                            <ul key={i + item.type + "ul"}>
                                {item.rules.map((rules, key) => {
                                    if (rules) {
                                        let newText = rules.text.split("\n").map((item, i) => <li key={i}>{item}</li>);
                                        return (
                                            <li key={i + item.type + key}>
                                                <h6 className="mb-xs-10"> {rules.type} </h6>
                                                <div>
                                                    <ul>{newText}</ul>
                                                </div>
                                            </li>
                                        );
                                    } else {
                                        return "";
                                    }
                                })}
                            </ul>
                        </div>
                    );
                });
        }


        return (
            <div className="other-details" >
                <Tabs
                    className="st-tab-button-container fz12"
                    value={ruleIndex}
                    indicatorColor="primary"
                    variant="fullWidth"
                    textColor="primary"
                    onChange={(e, newValue) => this.showRule(e, newValue)}
                    wrapped="true"
                    classes={{
                        indicator: "indicator",
                        fixed: "fixed"
                    }}
                >


                    <Tab
                        className="tab-button fz12"
                        classes={{
                            selected: "selected",
                            wrapper: "wrapper"
                        }}
                        label="Refund Policy"
                    />
                    <Tab
                        className="tab-button fz12"
                        classes={{
                            selected: "selected",
                            wrapper: "wrapper"
                        }}
                        label="Baggage"
                    />
                    {/* <Tab
                        className="tab-button"
                        classes={{
                            selected: "selected",
                            wrapper: "wrapper"
                        }}
                        label="Air Fare Rules"
                    /> */}

                </Tabs>

                <TabPanel className="TabPanel" value={ruleIndex} index={0}>
                    <div className="TabPanelInner">
                        {/* <FlightRefundPolicyInfo
                            sequenceCode={this.props.flightDetails.sequence}
                            searchId={this.props.searchId}
                        /> */}

                        <p className="fz12">Refund and Date Change are done as per the following policies.</p>
                        <p className="fz12">Refund Amount= Refund Charge (as per airline policy + ShareTrip Convenience Fee). </p>
                        <p className="fz12">Date Change Amount= Date Change Fee (as per Airline Policy + ShareTrip Convenience Fee).</p>

                        <FlightRulesModal {...this.props} />
                    </div>
                </TabPanel>
                <TabPanel className="TabPanel" value={ruleIndex} index={1}>
                    <div className="TabPanelInner">
                        <FlightBaggageInfo baggage={baggage} />
                    </div>
                </TabPanel>
                {/* <TabPanel className="TabPanel" value={ruleIndex} index={2}>
                    <div className="TabPanelInner refundPolicy">
                        <Cancellation />
                        <FlightAirFareRulesInfo />

                    </div>
                </TabPanel> */}




                {/* <div className="modal-button-group d-flex">
                    <button className="btn btn-outline-primary fw-700" onClick={this.toggleFairDetails}>
                        Fare Details
              </button>
                    <Modal isOpen={this.state.toggleFairDetails} toggle={this.toggleFairDetails}>
                        <ModalHeader toggle={this.toggleFairDetails}>Fare Details</ModalHeader>
                        <ModalBody>
                            {this.state.fareDetails === "Loading Fare Details" && (
                                <div className="">
                                    <CircularProgress />
                                </div>
                            )}

                            <div dangerouslySetInnerHTML={{ __html: this.state.fareDetails }} />
                        </ModalBody>
                    </Modal>

                    <button className="btn btn-outline-primary fw-700" onClick={this.toggleBaggages}>
                        Baggages
              </button>
                    <Modal isOpen={this.state.toggleBaggages} toggle={this.toggleBaggages}>
                        <ModalHeader toggle={this.toggleBaggages}>Baggages Policy</ModalHeader>
                        <ModalBody>
                            <Baggages />
                        </ModalBody>
                    </Modal>

                    <button className="btn btn-outline-primary fw-700" onClick={this.toggleRefundPolicy}>
                        Refund Policy
              </button>
                    <Modal isOpen={this.state.toggleRefundPolicy} toggle={this.toggleRefundPolicy}>
                        <ModalHeader toggle={this.toggleRefundPolicy}>Refund Policy</ModalHeader>
                        <ModalBody>
                            <Cancellation />
                        </ModalBody>
                    </Modal>
                </div> */}
            </div >
        )
    }
}
