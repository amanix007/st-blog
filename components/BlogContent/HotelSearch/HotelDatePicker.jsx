import React, { Component } from 'react';
import moment from "moment";
import { DateRangePicker } from "react-dates";
import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION } from "react-dates/lib/constants";
import isInclusivelyAfterDay from "react-dates/lib/utils/isInclusivelyAfterDay";
import { HotelContext } from '../../../contexts/HotelContext';


class HotelDatePicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            focusedInput: null,
            mobile: false
        }

    }
    componentDidMount() {
        this.setState({
            mobile: window.innerWidth < 768
        })
    }

    static contextType = HotelContext;


    updateSearchObject = (type, value) => {
        let { dispatch } = this.context;
        dispatch({
            type: "update_store",
            data: { type, value }
        })
    }



    change = (startDate, endDate) => {
        console.log(startDate, endDate);
        this.setState({ startDate, endDate }, () => {
            console.log(this.state.startDate, this.state.endDate);
            this.updateSearchObject("checkInDate", this.state.startDate);
            this.updateSearchObject("checkOutDate", this.state.endDate);
            console.log(this.props.hotelSearchStore.searchObject)
        });
    };
    render() {
        let { mobile } = this.state;
        
        
        let { checkInDate, checkOutDate } = this.context.HotelStore;
        
        return (
            <DateRangePicker
                startDateId="startDateId"
                endDateId="endDateId"
                startDatePlaceholderText="Depart"
                endDatePlaceholderText="Return"
                startDate={checkInDate}
                endDate={checkOutDate}
                onDatesChange={({ startDate, endDate }) => {
                    // this.setState({ startDate, endDate });
                    // this.change(startDate, endDate);
                    this.updateSearchObject("checkInDate", startDate);
                    this.updateSearchObject("checkOutDate", endDate);

                }}
                focusedInput={this.state.focusedInput}
                onFocusChange={focusedInput => {
                    this.setState({ focusedInput });
                }}
                noBorder
                // showDefaultInputIcon={!mobile}
                block
                regular
                keepOpenOnDateSelect={false}
                hideKeyboardShortcutsPanel
                enableOutsideDays
                orientation={mobile ? VERTICAL_ORIENTATION : HORIZONTAL_ORIENTATION}
                isOutsideRange={day =>
                    // !isInclusivelyAfterDay(day, moment(hotel_search_period.searchStartDate)) ||
                    !isInclusivelyAfterDay(day, moment()) ||
                    isInclusivelyAfterDay(day, moment().add(365, "days"))
                }
                displayFormat="D MMM YY"
                readOnly={true}
                customArrowIcon={<span />}
                transitionDuration={500}
            />
        );
    }
}

HotelDatePicker.propTypes = {};


export default HotelDatePicker;