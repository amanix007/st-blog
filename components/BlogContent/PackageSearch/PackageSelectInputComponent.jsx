import React, { Component } from "react";
import ReactAutocomplete from "react-autocomplete";

import _ from "lodash";
import { GET_PACKAGE_CITIES } from "../../../etc/api/PackageApi";


class PackageSelectInputComponent extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      // value: props.defaultValue,

      value: "",
      cities: [],
      packagetName: "Search Package",
    };
  }
  componentDidMount() {
    this.setState(
      {
        value: this.props.cityName,
      },
      () => {
        console.log("this.state.value:", this.state.value);
      }
    );
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.cityName !== prevState.value) {
  //     return { value: nextProps.cityName };
  //   }
  //   else return null;
  // }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cityName !== this.props.cityName) {
      //Perform some operation here
      this.setState({ value: this.props.cityName });
    }
  }

  // onChange = async value => {
  //   this.setState({ value });
  //   if (_.size(value) > 2) {
  //     let res = await GET_CITIES(value);
  //     if (res) this.setState({ cities: res });
  //   }
  // };

  onChange = (value) => {
    this.setState({ value }, this.doApiCall);
  };

  doApiCall = _.debounce(async () => {
    let { value } = this.state;
    if (_.size(value) > 2) {
      let res = await GET_PACKAGE_CITIES(value);
      if (res) this.setState({ cities: res });
    }
  }, 300);

  render() {
    const { props } = this;

    return (
      <React.Fragment>
        <ReactAutocomplete
          inputProps={{
            id: "autocomplete",
            placeholder: "City",
            className: "form-control autocomplete",
          }}
          wrapperStyle={{}}
          value={this.state.value}
          items={this.state.cities}
          getItemValue={(item) => item.name}
          onSelect={(value, item) => {
            console.log("item:", item);

            this.setState({
              value: value,
            });
            this.props.setValue(item.cityCode, item.name);
          }}
          onChange={(event, value) => this.onChange(value)}
          renderMenu={(items, value) => (
            <div className="menu">
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
            <div className={`item-element ${isHighlighted ? "item-highlighted" : ""}`} key={item.iata}>
              <div className="icon">
                <img src="/assets/images/icons/menu-marker-darkblue.png" alt="City" />
              </div>
              <div className="text">
                <strong>{item.name}</strong>
              </div>
            </div>
          )}
        />
      </React.Fragment>
    );
  }
}

export default PackageSelectInputComponent;
