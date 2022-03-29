import React, { Component } from "react";
import ReactAutocomplete from "react-autocomplete";
import _ from "lodash";

import { FIND_CITIES } from "../../../etc/api/HotelApi";
import { HotelContext } from "../../../contexts/HotelContext";

class HotelSelectInputComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
            code: "",
            cities: [],
            properties: [],
            cityName: "Search Hotels"
        };

    }

    onChange = value => {
        this.setState({ value }, this.doApiCall);
    };

    doApiCall = _.debounce(async () => {
        let { value } = this.state;
        if (_.size(value) > 2) {
            let res = await FIND_CITIES(value);
            if (res) this.setState({ cities: res.city, properties: res.hotel });
        }
    }, 300);

    // onChange = async value => {
    //     this.setState({ value });
    //     if (_.size(value) > 2) {
    //         let res = await FIND_CITIES(value);
    //         if (res)
    //             this.setState({ cities: res.city, properties: res.hotel });
    //     }
    // };

    static contextType = HotelContext;
    componentDidMount() {
        this.setState({ value: this.context.HotelStore.cityName });
        // console.log(this.input);
    }

    updateSearchObject = (type, value) => {
        let { dispatch } = this.context;
        dispatch({
            type: "update_store",
            data: { type, value }
        })
    }

    render() {
        const { props } = this;
        return (
            <React.Fragment>
                <ReactAutocomplete

                    inputProps={{
                        id: "hotelAutocomplete",
                        placeholder: props.placeholderText,
                        className: "form-control autocomplete" + props.classText,
                    }}
                    wrapperStyle={{}}
                    value={this.state.value}
                    items={[...this.state.cities, ...this.state.properties]}
                    getItemValue={item => item.name}
                    onSelect={(value, item) => {
                        console.log(item);
                        this.setState({
                            value: `${item.name}`,
                            code: item.id,
                            cities: [item],
                            cityName: item.name
                        }, () => {
                            this.updateSearchObject("cityName", this.state.value);
                            this.updateSearchObject("cityCode", this.state.code);
                            this.updateSearchObject("cityObj", item);

                        });

                    }}
                    onChange={(event, value) => this.onChange(value)}
                    // open={true}

                    renderMenu={(items, value) => (
                        <div className="menu hotel">
                            {value === "" ? (
                                <div className="item">{items}</div>
                            ) : this.state.loading ? (
                                <div className="item">Loading...</div>
                            ) : items.length === 0 ? (
                                <div className="item">No matches for {value}</div>
                            ) : (
                                            items
                                        )}
                        </div>
                    )}
                    renderItem={(item, isHighlighted) => (
                        <div
                            className={`item-element ${
                                isHighlighted ? "item-highlighted" : ""
                                }`}
                            key={item.id}
                        >
                            <div className="icon">
                                {item.type === 'city' ? <img src="/assets/images/icons/menu-marker-darkblue.png" alt="City" /> : <img src="/assets/images/icons/menu-hotel-darkblue.png" alt="" />}
                            </div>
                            <div className="text">
                                <strong>
                                    {item.name}
                                </strong>
                                <small>{item.countryName}</small>


                            </div>

                        </div>
                    )}
                />

            </React.Fragment>
        );
    }
}

HotelSelectInputComponent.propTypes = {};

export default HotelSelectInputComponent;
