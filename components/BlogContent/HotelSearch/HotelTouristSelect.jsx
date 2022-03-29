import React, { Component } from "react";


import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { HotelContext } from "../../../contexts/HotelContext";
import { Menu } from "@material-ui/core";


class HotelTouristSelect extends Component {
    constructor(props) {
        super(props);


        this.toggle = this.toggle.bind(this);

    }

    static contextType = HotelContext;
    state = {
        dropdownOpen: false,
        tempChildAge: 0,
        roomCount: [],
        anchorEl: null
        // roomCount: this.context.HotelStore.roomObject.length ? this.context.HotelStore.roomObject.length : 1
    };
    toggle = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen });
    };

    ageOnchangeStore(child, key, value) {
        //console.log(child, key, value, "store");
        let { roomObject } = this.context.HotelStore;
        if (child === 1) {
            roomObject[key].child1Age = value;
        } else if (child === 2) {
            roomObject[key].child2Age = value;
        }

        let { dispatch } = this.context;
        dispatch({
            type: "update_store",
            data: { type: "roomObject", value: roomObject }
        })

    }

    setAnchorEl = (anchorEl) => {
        this.setState({ anchorEl })
    }
    ageOnchange = (child, key, value) => {
        if (value === 'plus') {
            if (child === 1) {
                let cValue = this.context.HotelStore.roomObject[key].child1Age;
                if (cValue < 10) {
                    cValue++;
                    this.ageOnchangeStore(child, key, cValue);
                }
            }
            if (child === 2) {
                let cValue = this.context.HotelStore.roomObject[key].child2Age;
                if (cValue < 10) {
                    cValue++;
                    this.ageOnchangeStore(child, key, cValue);
                }
            }
        } else {
            if (child === 1) {
                let cValue = this.context.HotelStore.roomObject[key].child1Age;
                if (cValue > 1) {
                    cValue--;
                    this.ageOnchangeStore(child, key, cValue);
                }
            }
            if (child === 2) {
                let cValue = this.context.HotelStore.roomObject[key].child2Age;
                if (cValue > 1) {
                    cValue--;
                    this.ageOnchangeStore(child, key, cValue);
                }
            }
        }


        // ageOnchangeStore(child, key, value);
        console.log(child, key, value);
    };



    addRoom = (value) => {

        let arr = [];
        for (let i = 0; i < value; i++) {
            arr.push({
                adult: 1,
                child: 0,
                child1Age: 5,
                child2Age: 5,
            });

        };

        let { dispatch } = this.context;
        dispatch({
            type: "update_store",
            data: { type: "roomObject", value: arr }
        })
    };

    removeRoom(index) {
        let { roomObject } = this.context.HotelStore;
        if (index !== 0) {
            roomObject.splice(index, index);
            console.log("NOt the first item");
        }
        let { dispatch } = this.context;
        dispatch({
            type: "update_store",
            data: { type: "roomObject", value: roomObject }
        })

    }

    roomCountChange = (e) => {
        let roomCount = e.target.value;
        this.setState({ roomCount });
        this.addRoom(roomCount);
    }
    setRoomObject(type, action, key) {
        let { dispatch } = this.context;
        let { roomObject } = this.context.HotelStore;

        if (type === "adult") {
            if (action === "add") {
                roomObject[key].adult = roomObject[key].adult + 1 <= 4 ? roomObject[key].adult + 1 : roomObject[key].adult;
            }
            if (action === "sub") {
                roomObject[key].adult = roomObject[key].adult - 1 > 0 ? roomObject[key].adult - 1 : roomObject[key].adult;
            }
        }

        if (type === "child") {
            if (action === "add") {
                roomObject[key].child = roomObject[key].child + 1 <= 2 ? roomObject[key].child + 1 : roomObject[key].child;
            }
            if (action === "sub") {
                roomObject[key].child = roomObject[key].child - 1 >= 0 ? roomObject[key].child - 1 : roomObject[key].child;
            }
        }
        dispatch({
            type: "update_store",
            data: {
                type: "roomObject",
                value: roomObject
            }
        });

        sessionStorage.setItem("roomObject", JSON.stringify(this.roomObject));
    }

    handleClick = (event) => {
        this.setAnchorEl(event.currentTarget);
    };

    handleClose = () => {
        this.setAnchorEl(null);
    };
    render() {

        const ChildAge = (props) => {
            console.log(props);
            return (props.child === 0) ? "" :
                (
                    <div className="child-age block-container">
                        <div className="block-wrapper full">
                            <span className="fz14">Children’s Age (at check-out)</span>
                        </div>
                        <div className="block-wrapper half">
                            <div className="block">
                                <div className="mdi mdi-minus" onClick={() => this.ageOnchange(1, props.roomKey, 'minus')} ></div>
                                <div className="text"><span>{this.context.HotelStore.roomObject[props.roomKey].child1Age}</span> Year</div>
                                <div className="mdi mdi-plus" onClick={() => this.ageOnchange(1, props.roomKey, 'plus')}></div>
                            </div>
                            <span className="fz12">Child 1</span>
                        </div>
                        {
                            (props.child < 2) ? "" : <div className="block-wrapper half">
                                <div className="block">
                                    <div className="mdi mdi-minus" onClick={() => this.ageOnchange(2, props.roomKey, 'minus')}></div>
                                    <div className="text"><span>{this.context.HotelStore.roomObject[props.roomKey].child2Age}</span> Year</div>
                                    <div className="mdi mdi-plus" onClick={() => this.ageOnchange(2, props.roomKey, 'plus')}></div>
                                </div>
                                <span className="fz12">Child 2</span>
                            </div>

                        }

                    </div>
                );
        }

        let { adult, child, roomCount } = this.context.HotelStore.getTotalAdultChild;


        return (
            <div className="ServicePassengersSelect HotelTouristSelect">
                <div
                    className="wrapper"
                    direction="down"
                    isOpen={this.state.dropdownOpen}
                    // isOpen={true}
                    toggle={this.toggle}
                    aria-haspopup={true}
                >
                    <div
                        onClick={this.handleClick}
                        aria-haspopup={true}
                    >
                        <span>{adult + child} Person - {roomCount} Room</span>
                    </div>

                    <Menu
                        id="simple-menu"
                        anchorEl={this.state.anchorEl}
                        keepMounted
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.handleClose}

                        className="ServicePassengersSelect"
                    >
                        <div className="dropdown-menu_3">
                            <div className="icon-input-block" onClick={this.toggle}>
                                <div className="icon">
                                    <i className="mdi mdi-account-group"></i>
                                </div>

                                <div className="text-field">
                                    <span className="b-label">Persons &amp; Rooms</span>
                                    <h4>{adult + child}  Person -  {roomCount} Room</h4>
                                </div>
                            </div>


                            {
                                this.context.HotelStore.roomObject.map((room, key) => {
                                    return (
                                        <div className="block-container" key={key}>
                                            <div className="head">
                                                <span className="fw-500">Room {key + 1}{" "} (max 6 Person)</span>

                                                {
                                                    (key === 0) &&
                                                    <span className="roomNumberSelect fz14">
                                                        <select className="" onChange={this.roomCountChange} value={this.state.roomCount}>
                                                            <option value="1">1 Room</option>
                                                            <option value="2">2 Room</option>
                                                            <option value="3">3 Room</option>
                                                            <option value="4">4 Room</option>
                                                        </select>
                                                    </span>}




                                                {(key !== 0) && <span className="removeRoom" onClick={() => this.removeRoom(key)}>Remove</span>}


                                            </div>


                                            <div className="block-wrapper half">
                                                <div className="block">
                                                    <div className="mdi mdi-minus" onClick={() => this.setRoomObject("adult", "sub", key)}></div>
                                                    <div className="text"><span>{room.adult}</span> Adult</div>
                                                    <div className="mdi mdi-plus" onClick={() => this.setRoomObject("adult", "add", key)}></div>
                                                </div>
                                            </div>
                                            <div className="block-wrapper half">
                                                <div className="block">
                                                    <div className="mdi mdi-minus" onClick={() => this.setRoomObject("child", "sub", key)}></div>
                                                    <div className="text"><span>{room.child}</span> Child</div>
                                                    <div className="mdi mdi-plus" onClick={() => this.setRoomObject("child", "add", key)}></div>
                                                </div>
                                            </div>


                                            {
                                                room.child === 0 ? '' :
                                                    <div className="block-wrapper full">
                                                        <div className="child-age block-container">
                                                            <div className="block-wrapper full">
                                                                <span className="fz14">Children’s Age (at check-out)</span>
                                                            </div>
                                                            <div className="block-wrapper half">
                                                                <div className="block">
                                                                    <div className="mdi mdi-minus" onClick={() => this.ageOnchange(1, key, 'minus')} ></div>
                                                                    <div className="text"><span>{this.context.HotelStore.roomObject[key].child1Age}</span> Year</div>
                                                                    <div className="mdi mdi-plus" onClick={() => this.ageOnchange(1, key, 'plus')}></div>
                                                                </div>
                                                                <span className="fz12">Child 1</span>
                                                            </div>
                                                            {
                                                                (room.child < 2) ? "" : <div className="block-wrapper half">
                                                                    <div className="block">
                                                                        <div className="mdi mdi-minus" onClick={() => this.ageOnchange(2, key, 'minus')}></div>
                                                                        <div className="text"><span>{this.context.HotelStore.roomObject[key].child2Age}</span> Year</div>
                                                                        <div className="mdi mdi-plus" onClick={() => this.ageOnchange(2, key, 'plus')}></div>
                                                                    </div>
                                                                    <span className="fz12">Child 2</span>
                                                                </div>

                                                            }
                                                        </div>
                                                        {/* <ChildAge key={key} child={room.child} roomKey={key} /> */}
                                                    </div>
                                            }

                                        </div>
                                    )
                                })
                            }


                        </div>

                    </Menu>
                </div>
            </div>

        );
    }
}

HotelTouristSelect.propTypes = {};

export default HotelTouristSelect;
