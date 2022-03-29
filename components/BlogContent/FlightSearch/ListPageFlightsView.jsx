import React, { Component } from "react";
import ResultComponent from "./ResultComponent";



class ListPageFlightsView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalCloseClicked: false,
            modal: false,
            list: [],
            filters: [],
            advice: "",
            totalRecords: 0,
            tripType: "",
            itemPerPage: 10,
            currentPage: 1,
            searchId: "",
            sessionId: "",
            postFilter: {},
            loading: true,
            filterLoading: false,
            sort: "cheapest"
        };
        this.flightFilterRef = React.createRef();
        this.flightFilterRefTAB = React.createRef();

    }


    modalToggle = () => {
        this.setState({ modal: !this.state.modal });
    };

    componentDidUpdate(prevProps, prevState) {


    }


    componentDidMount() {
        const { response } = this.props;

        // console.log(response);

        this.setState({
            list: response.flights,
            filters: response.filters,
            advice: response.advice,
            totalRecords: response.totalRecords,
            tripType: response.tripType,
            searchId: response.searchId,
            sessionId: response.sessionId,
            loading: false
        });
    }


    render() {
        let {
            list,
            filters,
            postFilter,
            advice,
            totalRecords,
            tripType,
            itemPerPage,
            currentPage,
            searchId,
            sessionId,
            loading,
            filterLoading
        } = this.state;


   
        
        return (
            <div>
                {
                    list.map((flight, index) => {
                        return (
                            <ResultComponent
                                flightDetails={flight}
                                key={flight.sequence}
                                index={index}
                                searchId={searchId}
                                sessionId={sessionId}
                                showBookNow={true}
                                filterLoading={filterLoading}
                            />
                        )

                    })
                }
            </div>
        );
    }
}

ListPageFlightsView.propTypes = {};

export default ListPageFlightsView;
