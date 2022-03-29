import React, { Component, Fragment } from "react";

// import "./ResultDetailsComponent.css";



import { Modal as Modal2, ModalBody, Dialog, DialogContent, DialogContentText, ButtonBase, Typography, IconButton, } from "@material-ui/core";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import LoadingComponent from "./LoadingComponent";

import { withStyles } from '@material-ui/core/styles';
// import { logEventRecord } from "../../logger/log";
import { GET_FARE_RULES } from "../../etc/api/FlightApi";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: 16,
    },
    closeButton: {
        position: 'absolute',
        right: 0,
        top: 4,
        color: theme.palette.grey[500],
    },
});
const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <i className="mdi mdi-close"
                        style={{ lineHeight: 1 }}
                    ></i>
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

export default class FlightRulesModal extends Component {

    state = {
        ruleIndex: 1,
        rulesModal: false,
        airFareRules: [],
        loading: true
    }


    componentDidMount() {
        
    }

    componentDidUpdate(prevProps, prevState) {

    }


    getAirFareRules = async () => {


        let { sequenceCode, searchId } = this.props;
        let params = `?searchId=${searchId}&sequenceCode=${sequenceCode}`;
        if (sessionStorage.getItem(params)) {
            let res = JSON.parse(sessionStorage.getItem(params));
            this.setState({ loading: false, airFareRules: res.airFareRules });
        } else {
            let res = await GET_FARE_RULES(params);
            console.log(res);
            if (res) {
                this.setState({
                    loading: false,
                    airFareRules: res.airFareRules
                }, () => {
                    sessionStorage.setItem(params, JSON.stringify(res));
                });
            } else {

            }


        }
    };
    rulesmodalToggle = () => {

        this.setState({ rulesModal: !this.state.rulesModal }, () => this.getAirFareRules());
    }
    handleOpen = () => {
        
        // logEventRecord("Click_on_Refund_Policy")
        this.setState({ rulesModal: true }, () => this.getAirFareRules());
    };

    handleClose = () => {
        this.setState({ rulesModal: false });
    };

    showRule = (e, ruleIndex) => {
        this.setState({ ruleIndex })
    }

    render() {

        let { loading, ruleIndex, rulesModal, airFareRules } = this.state;
        return (
            <div>
                <p onClick={this.handleOpen} className="fw-600 primaryColor-color fz12 cursor-p mt-xs-16">Show More Information</p>
                <Dialog
                    fullWidth={true}
                    maxWidth={"sm"}
                    open={rulesModal}
                    onClose={this.handleClose}
                    scroll="paper"
                ><DialogTitle
                    onClose={this.handleClose}
                    id="alert-dialog-slide-title">{"Refund Policy"}</DialogTitle>
                    <DialogContent dividers>
                        <div>
                            {loading ? <LoadingComponent /> :
                                <React.Fragment>
                                    {
                                        airFareRules.map((item, i) => {
                                            return (
                                                <div key={i + item.type + "div"} >
                                                    <h6 key={i + item.type + "h6"} className="mb-xs-10">{item.type}</h6>
                                                    <ul key={i + item.type + "ul"} className="mb-xs-20">
                                                        {item.rules.map((rules, key) => {
                                                            if (rules) {
                                                                let newText = rules.text
                                                                    .split("\n")
                                                                    .map((item, i) => <li key={i}>{item}</li>);
                                                                return (
                                                                    <li key={i + item.type + key}>
                                                                        <h6 className="mb-xs-10"> {rules.type} </h6>
                                                                        <div >
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
                                        })
                                    }
                                </React.Fragment>
                            }

                            {/* <Tabs
                                className="st-tab-button-container"
                                value={ruleIndex}
                                indicatorColor="primary"
                                // variant="fullWidth"
                                textColor="primary"
                                onChange={(e, newValue) => this.showRule(e, newValue)}
                                wrapped
                                classes={{
                                    indicator: "indicator",
                                    fixed: "fixed"
                                }}
                            >

                                <Tab
                                    className="tab-button"
                                    classes={{
                                        selected: "selected",
                                        wrapper: "wrapper"
                                    }}
                                    label="Baggage"
                                />
                                <Tab
                                    className="tab-button"
                                    classes={{
                                        selected: "selected",
                                        wrapper: "wrapper"
                                    }}
                                    label="Refund Policy"
                                />
                                <Tab
                                    className="tab-button"
                                    classes={{
                                        selected: "selected",
                                        wrapper: "wrapper"
                                    }}
                                    label="Air Fare Rules"
                                />

                            </Tabs>
                            
                            <TabPanel className="TabPanel" value={ruleIndex} index={0}>
                                <div className="TabPanelInner refundPolicy">
                                    <FlightBaggageInfo />
                                </div>
                            </TabPanel>
                            <TabPanel className="TabPanel" value={ruleIndex} index={1}>
                                <div className="TabPanelInner refundPolicy">
                                    
                                </div>
                            </TabPanel>
                            <TabPanel className="TabPanel" value={ruleIndex} index={2}>
                                <div className="TabPanelInner refundPolicy">
                                    <FlightAirFareRulesInfo />
                                </div>
                            </TabPanel> */}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}
