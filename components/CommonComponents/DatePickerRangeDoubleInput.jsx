import React, { Component } from "react";
import moment from "moment";
import { DateRangePicker } from "react-dates";
import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION } from "react-dates/lib/constants";
import isInclusivelyAfterDay from "react-dates/lib/utils/isInclusivelyAfterDay";
import 'react-dates/initialize';
class DatePickerRangeDoubleInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInputFirstDate: null,
      focusedInputSecondDate: null,
      startDate: moment(),
      endDate: moment().add(2, "days"),
    };
  }

  componentDidMount() {
    this.setState({
      mobile: window.innerWidth < 768
    })
  }


  change = (startDate, endDate) => {
    this.setState({ startDate, endDate }, () => {
      this.props.onChange(startDate, endDate);
    });
  };
  render() {

    let { startDate, endDate, mobile } = this.state;
    if (moment.isMoment(endDate)) {
      console.log('endDate:', endDate.format("DD/MM/YYYY"))
    }

    return (
      <div className="DatePickerRangeDoubleInput">
        <div className="daterangepicker-cont startDate">
          <div className="icon">
            <i className="mdi mdi-calendar"></i>
          </div>
          <div className="daterangepicker-component">
            <label htmlFor="startDatestartDateId">Date of Entry</label>
            <DateRangePicker
              startDateId="startDatestartDateId"
              endDateId="startDateendDateId"
              startDatePlaceholderText="Depart"
              endDatePlaceholderText="Return"
              startDate={startDate}
              endDate={endDate}
              onDatesChange={async ({ startDate, endDate }) => {
                await this.change(startDate, endDate);
                this.setState({
                  focusedInputFirstDate: null,
                  focusedInputSecondDate: "endDate",
                });
              }}
              focusedInput={this.state.focusedInputFirstDate}
              onFocusChange={(focusedInputFirstDate) => {
                console.log("focusedInputFirstDate:", focusedInputFirstDate);
                this.setState({ focusedInputFirstDate });
              }}
              noBorder
              // showDefaultInputIcon={!mobile}
              block
              regular
              keepOpenOnDateSelect={false}
              hideKeyboardShortcutsPanel
              enableOutsideDays
              orientation={mobile ? VERTICAL_ORIENTATION : HORIZONTAL_ORIENTATION}
              isOutsideRange={(day) => {
                // !isInclusivelyAfterDay(day, moment(hotel_search_period.searchStartDate)) ||
                // isInclusivelyAfterDay(day, moment().add(365, "days"))
                return !isInclusivelyAfterDay(day, moment()) || isInclusivelyAfterDay(day, moment().add(365, "days"));
              }}
              displayFormat="D MMM YY"
              readOnly={true}
              customArrowIcon={<span />}
              transitionDuration={300}
            />
          </div>
        </div>
        <div className="daterangepicker-cont endDate">
          <div className="icon">
            <i className="mdi mdi-calendar"></i>
          </div>
          <div className="daterangepicker-component">
            <label htmlFor="endDateendDateId">Date of Exit </label>

            <DateRangePicker
              startDateId="endDatestartDateId"
              endDateId="endDateendDateId"
              startDatePlaceholderText="Depart"
              endDatePlaceholderText="Return"
              startDate={startDate}
              endDate={endDate}
              onDatesChange={({ startDate, endDate }) => {
                // this.setState({ startDate, endDate });
                this.change(startDate, endDate);

                // this.props.hotelSearchStore.updateSearchObject("startDate", startDate);
                // this.props.hotelSearchStore.updateSearchObject("endDate", endDate);
              }}
              focusedInput={this.state.focusedInputSecondDate}
              onFocusChange={(focusedInputSecondDate) => {
                console.log("focusedInputSecondDate:", focusedInputSecondDate);
                this.setState({ focusedInputSecondDate });
              }}
              noBorder
              // showDefaultInputIcon={!mobile}
              block
              regular
              keepOpenOnDateSelect={false}
              hideKeyboardShortcutsPanel
              enableOutsideDays
              orientation={mobile ? VERTICAL_ORIENTATION : HORIZONTAL_ORIENTATION}
              isOutsideRange={(day) => {
                // !isInclusivelyAfterDay(day, moment(hotel_search_period.searchStartDate)) ||
                // isInclusivelyAfterDay(day, moment().add(365, "days"))
                return !isInclusivelyAfterDay(day, moment()) || isInclusivelyAfterDay(day, moment().add(365, "days"));
              }}
              displayFormat="D MMM YY"
              readOnly={true}
              customArrowIcon={<span />}
              transitionDuration={300}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default DatePickerRangeDoubleInput;
