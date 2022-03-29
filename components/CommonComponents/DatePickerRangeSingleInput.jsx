import React, { Component } from "react";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import { ANCHOR_LEFT, HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION } from "react-dates/lib/constants";
import isInclusivelyAfterDay from "react-dates/lib/utils/isInclusivelyAfterDay";
import 'react-dates/initialize';
import omit from 'lodash/omit';

const defaultProps = {
  // example props for the demo
  autoFocus: false,
  initialDate: null,

  // input related props
  id: 'date',
  placeholder: 'Date',
  disabled: false,
  required: false,
  screenReaderInputMessage: '',
  showClearDate: false,
  showDefaultInputIcon: false,
  customInputIcon: null,
  block: false,
  small: false,
  regular: false,
  verticalSpacing: undefined,
  keepFocusOnInput: false,

  // calendar presentation and interaction related props
  renderMonthText: null,
  orientation: HORIZONTAL_ORIENTATION,
  anchorDirection: ANCHOR_LEFT,
  horizontalMargin: 0,
  withPortal: false,
  withFullScreenPortal: false,
  initialVisibleMonth: null,
  numberOfMonths: 2,
  keepOpenOnDateSelect: false,
  reopenPickerOnClearDate: false,
  isRTL: false,

  // navigation related props
  navPrev: null,
  navNext: null,
  onPrevMonthClick() { },
  onNextMonthClick() { },
  onClose() { },

  // day presentation and interaction related props
  renderCalendarDay: undefined,
  renderDayContents: null,
  enableOutsideDays: false,
  isDayBlocked: () => false,
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  isDayHighlighted: () => { },

  // internationalization props
  displayFormat: () => moment.localeData().longDateFormat('L'),
  monthFormat: 'MMMM YYYY',
  // phrases: SingleDatePickerPhrases,
};


class DatePickerRangeSingleInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: null,
      focusedInputSecondDate: null,
      startDate: moment(),

      date: moment(),
      focused: props.autoFocus,
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


  onDateChange = (date) => {
    this.setState({ date }, this.props.onChange(date));

  }


  onFocusChange = ({ focused }) => {
    this.setState({ focused });
  }
  render() {

    let { startDate, date, focused, endDate, mobile } = this.state;

    const props = omit(this.props, [
      'autoFocus',
      'initialDate',
    ]);



    return (
      <div className="DatePickerRangeSingleInput">
        <div className="daterangepicker-cont startDate">
          <div className="icon">
            <i className="mdi mdi-calendar"></i>
          </div>
          <div className="daterangepicker-component">
            <label htmlFor="startDatestartDateId">Date of Entry</label>
            <SingleDatePicker
              // {...props}
              id="date_input"
              date={date}
              focused={focused}
              onDateChange={this.onDateChange}
              onFocusChange={this.onFocusChange}
              block
              noBorder
              displayFormat="D MMM YY"

              readOnly={true}
              customArrowIcon={null}
              transitionDuration={300}
            // startDatePlaceholderText="Depart"

            // date={startDate}
            // endDate={endDate}
            // onDateChange={async ({ startDate, endDate }) => {
            //   // await this.change(startDate, endDate);
            //   // // this.setState({
            //   // //   focusedInput: null,
            //   // //   focusedInputSecondDate: "endDate",
            //   // // });
            // }}
            // focusedInput={this.state.focusedInput}
            // onFocusChange={(focusedInput) => {
            //   this.setState({ focusedInput });
            // }}



            // noBorder
            // // showDefaultInputIcon={!mobile}
            // block
            // regular
            // keepOpenOnDateSelect={false}
            // hideKeyboardShortcutsPanel
            // enableOutsideDays
            // orientation={mobile ? VERTICAL_ORIENTATION : HORIZONTAL_ORIENTATION}
            // isOutsideRange={(day) => {
            //   // !isInclusivelyAfterDay(day, moment(hotel_search_period.searchStartDate)) ||
            //   // isInclusivelyAfterDay(day, moment().add(365, "days"))
            //   return !isInclusivelyAfterDay(day, moment()) || isInclusivelyAfterDay(day, moment().add(365, "days"));
            // }}
            // displayFormat="D MMM YY"
            // readOnly={true}
            // customArrowIcon={<span />}
            // transitionDuration={300}
            />
          </div>
        </div>
      </div>
    );
  }
}

DatePickerRangeSingleInput.defaultProps = defaultProps;

export default DatePickerRangeSingleInput;
