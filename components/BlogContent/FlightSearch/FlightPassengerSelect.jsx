import React, { Component } from 'react'
import { Button, Menu, ButtonGroup, TextField } from '@material-ui/core'
import { FlightContext } from '../../../contexts/FlightContext';
import moment from "moment";
import { MenuItem } from "@material-ui/core";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

export default class FlightPassengerSelect extends Component {

    constructor(props) {
        super(props);
        this.elemRef = React.createRef();
    }

    static contextType = FlightContext;
    state = {
        anchorEl: null,
        selectedCabin: "Economy",
        count: this.props.passengerCount ? this.props.passengerCount : 1,
        passenger: {
            adults: 1,
            child: 0,
            infant: 0,
        },
        childDOBlist: []
    }

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget })

    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
            width: "200px"
        })
    };
    handleCount = (type) => {
        let { count } = this.state;
        if (type === "add" && count < 30) {
            count++;
        } else if (type === "remove" && count > 1) {
            count--;

        }

        this.setState({ count }, this.props.setPassengerCount(count))
    }

    setPassengers = (obj, operation) => {
        let passenger = JSON.parse(JSON.stringify(this.state.passenger));
        let childDOBlist = JSON.parse(JSON.stringify(this.state.childDOBlist));


        let MaxAdults = 7;
        let MaxChild = 7 - passenger.adults;
        let MaxInfant = passenger.adults;

        switch (operation) {
            case "add":
                if (obj === "adults" && passenger.adults + passenger.child < MaxAdults)
                    passenger.adults = passenger.adults + 1;

                if (obj === "child" && passenger.child < MaxChild) {
                    passenger.child = passenger.child + 1;
                    childDOBlist.push(moment().subtract(2, "years").format("YYYY-MM-DD"))
                }

                if (obj === "infant" && passenger.infant < MaxInfant)
                    passenger.infant = passenger.infant + 1;

                break;

            case "sub":
                if (obj === "adults" && passenger.adults > 1) {
                    passenger.adults = passenger.adults - 1;
                    if (passenger.infant > passenger.adults)
                        passenger.infant = passenger.adults;
                }

                if (obj === "child" && passenger.child > 0) {
                    passenger.child = passenger.child - 1;
                    childDOBlist.pop();
                }

                if (obj === "infant" && passenger.infant > 0)
                    passenger.infant = passenger.infant - 1;
                break;
        }

        this.setState({ passenger, childDOBlist }, () => {
            let { dispatch } = this.context;

            dispatch({
                type: "change_passenger",
                passenger
            });
            dispatch({
                type: "change_childDOBlist",
                childDOBlist
            });
        }


        );

        // console.log(this.state.dropdownOpen);
    };

    changedateOfBirth = (date, i) => {
        let { dispatch } = this.context;
        let { childDOBlist } = this.state;
        childDOBlist[i] = moment(date).format("YYYY-MM-DD");
        this.setState({ childDOBlist }, () => {
            dispatch({
                type: "change_childDOBlist",
                childDOBlist
            });
        })
    }
    componentDidMount() {
        // console.log('this.elemRef:', this.elemRef)
        // this.setState({
        //     width: this.elemRef.current.offsetWidth
        // })

    }

    changeCabin = (value) => {
        let { dispatch } = this.context;
        this.setState({
            selectedCabin: value
        });
        dispatch({
            type: "change_class",
            class: value
        });

    }
    render() {
        let { count, anchorEl, width, passenger, childDOBlist } = this.state;



        return (
            <div className="">
      
              <div className="TravellerCalulate"
                onClick={this.handleClick}
              >
                <div className="icon">
                  <i className="mdi mdi-account-group"></i>
                </div>
                <div className="text">
                  <span className="b-label">Passengers & Cabin Class</span>
                  <p className="mb-0">{passenger.adults + passenger.child + passenger.infant}  Person -  {this.state.selectedCabin}</p>
      
                </div>
              </div>
              <Menu
                anchorEl={this.state.anchorEl}
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleClose}
                // elevation={0}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                className="TravellerCalulate-menu"
              >
                <MenuItem
                  disableGutters={true}
                  dense={false}
                  className="TravellerCalulate-menu-item"
                >
                  <div className="TravellerCalulate-persons">
      
                    <div className="passengers">
                      <h6 className="fz14 fw-600">Passengers</h6>
                      <div className="passengers-types">
                        <div className="passengers-type">
                          <div className="text">
                            <span className="count">{passenger.adults}</span>
                            <div className="type-label">
                              <p className="fz14 mb-xs-0">Adult</p>
                              <span>12 - 12+ yrs</span>
                            </div>
                          </div>
                          <div className="button-set">
                            <Button onClick={() => this.setPassengers("adults", "sub")} size="small" variant="outlined"><i className="mdi mdi-minus"></i></Button>
                            <Button onClick={() => this.setPassengers("adults", "add")} size="small" variant="outlined" color="primary" ><i className="mdi mdi-plus"></i></Button>
                          </div>
                        </div>
                        <div className="passengers-type">
                          <div className="text">
                            <span className="count">{passenger.child}</span>
                            <div className="type-label">
                              <p className="fz14 mb-xs-0">Children</p>
                              <span>2 - Less then 12 yrs</span>
                            </div>
                          </div>
                          <div className="button-set">
                            <Button onClick={() => this.setPassengers("child", "sub")} size="small" variant="outlined"><i className="mdi mdi-minus"></i></Button>
                            <Button onClick={() => this.setPassengers("child", "add")} size="small" variant="outlined" color="primary" ><i className="mdi mdi-plus"></i></Button>
                          </div>
                        </div>
                        {(childDOBlist.length > 0) && <div className="childDOBlist">
      
                          {childDOBlist.map((DOB, i) => {
      
                            return <DatePicker
                              key={i}
                              // dateFormat="DD-MM-YYYY"
                              selected={moment(DOB).toDate()}
                              maxDate={moment().subtract(2 , "years").toDate()}
                              onChange={(dateOfBirth) => this.changedateOfBirth(dateOfBirth, i)}
                              // peekNextMonth
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              customInput={
                                <TextField
                                  variant="outlined"
                                  label={`Child ${i + 1} Date of Birth*`}
                                  required
                                  fullWidth
                                  type="text"
                                  readOnly
      
                                  // value={moment(this.state.childDOBlist[i]).format('DD-MM-YYYY')}
                                  inputProps={{
                                    className: "chddob",
                                    value: moment(this.state.childDOBlist[i]).format('DD-MM-YYYY')
                                  }
                                  }
                                />
                              }
                            />
                          })}
                        </div>
                        }
      
                        <div className="passengers-type">
                          <div className="text">
                            <span className="count">{passenger.infant}</span>
                            <div className="type-label">
                              <p className="fz14 mb-xs-0">Infant</p>
                              <span>Less then 2 yrs</span>
                            </div>
                          </div>
                          <div className="button-set">
                            <Button onClick={() => this.setPassengers("infant", "sub")} size="small" variant="outlined"><i className="mdi mdi-minus"></i></Button>
                            <Button onClick={() => this.setPassengers("infant", "add")} size="small" variant="outlined" color="primary" ><i className="mdi mdi-plus"></i></Button>
                          </div>
                        </div>
                      </div>
      
                    </div>
                    <div className="cabin-selection">
                      <span className="label">Cabin Class</span>
                      <div className="cabin-list">
                        <Button onClick={() => this.changeCabin("Economy")} fullWidth className={this.state.selectedCabin === "Economy" ? "selected" : ""}>Econnomy {this.state.selectedCabin === "Economy" && <i className="mdi mdi-check" />}</Button>
                        <Button onClick={() => this.changeCabin("Business")} fullWidth className={this.state.selectedCabin === "Business" ? "selected" : ""}>Business {this.state.selectedCabin === "Business" && <i className="mdi mdi-check" />}</Button>
                        <Button onClick={() => this.changeCabin("First")} fullWidth className={this.state.selectedCabin === "First" ? "selected" : ""}>First Class  {this.state.selectedCabin === "First" && <i className="mdi mdi-check" />}</Button>
                      </div>
                    </div>
                  </div>
                </MenuItem>
              </Menu>
      
      
      
            </div>
      
          );

        return (
            <React.Fragment>
                <div ref={this.elemRef} className="FlightPassengerSelect" onClick={this.handleClick}>

                    <div className="icon">
                        <i className="mdi mdi-account-group" />
                    </div>
                    <div className="text-field">
                        <span className="b-label">{this.state.selectedCabin} &amp; {passenger.adults + passenger.child + passenger.infant} Travellers</span>
                    </div>
                </div>
                <Menu

                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    // open={true}
                    onClose={this.handleClose}
                    className="VisaTravellerSelect-buttons"
                // anchorOrigin={{
                //     vertical: 'top',
                //     horizontal: 'top',
                // }}
                // anchorPosition={{ top: 0,left: 0 }}
                >
                    <div
                        // style={{ width }}
                        className="ServicePassengersSelect">

                        <div className="ServicePassengersSelect FlightPassengersSelect">
                            <div className="wrapper">


                                <div
                                    tabIndex={-1}
                                    role="menu"
                                    aria-hidden="true"
                                    className="dropdown-menu_"
                                >
                                    {/* <div className="icon-input-block">
                                        <div className="icon">
                                            <i className="mdi mdi-account-group" />
                                        </div>
                                        <div className="text-field">
                                            <span className="b-label">Class &amp; Travellers</span>
                                            <h4>{this.state.selectedCabin}  &amp; {passenger.adults + passenger.child + passenger.infant} Person</h4>
                                        </div>
                                    </div> */}
                                    <div className="block-container">
                                        <div className="head">
                                            <span className="fw-500">Persons</span>
                                        </div>
                                        <div
                                            tabIndex={0}
                                            role="menuitem"
                                            className="block-wrapper full dropdown-item"
                                        >
                                            <div className="block">
                                                <div className="mdi mdi-minus" onClick={() => this.setPassengers("adults", "sub")}></div>
                                                <div className="text"><span>{passenger.adults} </span>ADT</div>
                                                <div className="mdi mdi-plus" onClick={() => this.setPassengers("adults", "add")}></div>
                                            </div>
                                            <span className="fz12">Adult (11+ yrs)</span>
                                        </div>
                                        <div
                                            tabIndex={0}
                                            role="menuitem"
                                            className="block-wrapper half dropdown-item"
                                        >
                                            <div className="block">
                                                <div className="mdi mdi-minus" onClick={() => this.setPassengers("child", "sub")}></div>
                                                <div className="text"><span>{passenger.child} </span>CHD</div>
                                                <div className="mdi mdi-plus" onClick={() => this.setPassengers("child", "add")}></div>
                                            </div>
                                            <span className="fz12"> Child (2-11 yrs)</span>
                                        </div>
                                        {(childDOBlist.length > 0) && <div className="childDOBlist">

                                            {childDOBlist.map((DOB, i) => {

                                                return <DatePicker
                                                    key={i}
                                                    // dateFormat="DD-MM-YYYY"
                                                    selected={moment(DOB).toDate()}
                                                    maxDate={moment().subtract(2, "years").toDate()}
                                                    onChange={(dateOfBirth) => this.changedateOfBirth(dateOfBirth, i)}
                                                    // peekNextMonth
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    dropdownMode="select"
                                                    customInput={
                                                        <TextField
                                                            variant="outlined"
                                                            label={`Child ${i + 1} Date of Birth*`}
                                                            required
                                                            fullWidth
                                                            type="text"
                                                            readOnly

                                                            // value={moment(this.state.childDOBlist[i]).format('DD-MM-YYYY')}
                                                            inputProps={{
                                                                className: "chddob",
                                                                value: moment(this.state.childDOBlist[i]).format('DD-MM-YYYY')
                                                            }
                                                            }
                                                        />
                                                    }
                                                />
                                            })}
                                        </div>
                                        }

                                        <div
                                            tabIndex={0}
                                            role="menuitem"
                                            className="block-wrapper half dropdown-item"
                                        >
                                            <div className="block">
                                                <div className="mdi mdi-minus" onClick={() => this.setPassengers("infant", "sub")}></div>
                                                <div className="text"><span>{passenger.infant} </span>INF</div>
                                                <div className="mdi mdi-plus" onClick={() => this.setPassengers("infant", "add")}></div>
                                            </div>
                                            <span className="fz12"> Infant (0-2 yrs)</span>
                                        </div>
                                    </div>
                                    <div className="cabin-class">
                                        <div className="head">
                                            <span className="fw-500">Class</span>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="cabin" id="cabin1" value="Economy"
                                                onChange={this.changeCabin}
                                                checked={this.state.selectedCabin === "Economy"}
                                            />
                                            <label className="form-check-label" htmlFor="cabin1">Economy</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="cabin" id="cabin3" value="Business"
                                                onChange={this.changeCabin}
                                                checked={this.state.selectedCabin === "Business"}
                                            />
                                            <label className="form-check-label" htmlFor="cabin3">Business</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="cabin" id="cabin4" value="First"
                                                onChange={this.changeCabin}
                                                checked={this.state.selectedCabin === "First"}
                                            />
                                            <label className="form-check-label" htmlFor="cabin4">First</label>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>




                    </div>

                </Menu>
            </React.Fragment>
        )
    }
}


