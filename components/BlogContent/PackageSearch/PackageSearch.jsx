import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import { stringify } from "querystring";
import PackageSelectInputComponent from "./PackageSelectInputComponent";
import PackageSearchResult from "./PackageSearchResult";
import { GET_PACKAGES } from "../../../etc/api/PackageApi";
// import { logEventRecord } from "../../../logger/log";

class PackageSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityList: [""],
      cityNameList: [""],
      list: null,
      loading: false,
    };
  }


  getCityCode = (city, name, index) => {
    let { cityList, cityNameList } = this.state;
    cityList[index] = `${city}`;
    cityNameList[index] = name;

    this.setState({ cityList, cityNameList }, () => {

    });
  };

  search = () => {


    let { cityList } = this.state;
    let go = true;
    cityList.map((city, i) => {
      console.log(city);
      if (city === null || city === undefined || city === "") {
        console.log("false");
        go = false;
      }
    });
    let obj = {};

    obj.cityCodes = JSON.stringify(this.state.cityList)
    obj.limit = 10;
    obj.offset = 0;

    let SearchURL = stringify(obj);
    if (!go) {
      return false;
    } else {

      console.log('SearchURL:', SearchURL)
      this.getDataFromAPI("?" + SearchURL)

    }
  };
  manageCityList = (type) => {
    let { cityList, cityNameList } = this.state;
    if (type === "add") {
      if (cityList.length < 4) {
        cityList.push("");
        cityNameList.push("");
      } else {
        return false;
      }
    } else {
      if (cityList.length > 1) {
        cityList.pop();
        cityNameList.pop();
      } else {
        return false;
      }
    }

    this.setState({ cityList, cityNameList }, () => {


    });
  };


  getDataFromAPI = async (params) => {
    this.setState({ loading: true });
    let res = await GET_PACKAGES(params);
    if (res) {
      this.setState(
        {
          list: res.data,
          totalRecords: res.count,
          filter: res.filter,
          loading: false,
        }
      );
    }
    return false;
  };

  render() {
    let { list, loading } = this.state;
    return (
      <div className="service-main PackageSearchFrom">
        <div className="service-fields-container">
          {this.state.cityList.map((city, i) => {
            return (
              <div className="service-fields-row" key={i}>
                <div className="icon-input-block full">
                  <div className="icon">
                    <i className="mdi mdi-office-building"></i>
                  </div>
                  <div className="text-field text-left">
                    <span className="b-label">Destination</span>
                    <PackageSelectInputComponent setValue={(city, name) => this.getCityCode(city, name, i)} placeholderText="City" classText="yourcity" cityName={this.state.cityNameList[i]} />
                  </div>
                </div>
              </div>
            );
          })}

          <div className="service-fields-row">
            <div className="icon-input-block half"
              style={{ border: "none" }}
            >
              <div className="icon">
                <i className="mdi mdi-plus-circle-outline"></i>
              </div>
              <div className="buttons">
                <div className="btn-group multi-city-manage">
                  <Button variant="contained" color="primary" onClick={() => this.manageCityList("add")}>
                    Add City
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => this.manageCityList("remove")}
                    style={{ opacity: this.state.cityList.length < 2 ? ".5" : "1" }}
                    disabled={this.state.cityList.length < 2}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
            <div className="icon-input-block half" style={{ border: "none" }}>
              <div className="text-right w-100">
                <Button onClick={this.search}
                  // style={{ display: "inline-block" }}
                  variant="contained" color="primary" size="large">
                  <b>Search</b>
                </Button>
              </div>
            </div>
          </div>

        </div>

        {list && <PackageSearchResult loading={loading} list={list} />}


      </div>
    );
  }
}

export default PackageSearch;
