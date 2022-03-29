import React, { Component } from "react";
import HotelTouristSelect from "./HotelTouristSelect";
import moment from "moment";
import openSocket from "socket.io-client";
import HotelDatePicker from "./HotelDatePicker";
import Button from "@material-ui/core/Button";
import HotelSelectInputComponent from "./HotelSelectInputComponent";
import { HotelContext } from "../../../contexts/HotelContext";
import _manifest from "../../../_manifest";
import HotelSearchResultPage from "./HotelSearchResultPage";
import { stringify } from "querystring";
import { GET_HOTELS } from "../../../etc/api/HotelApi";

const SOCKET_URL = _manifest.hotelListSocketUrl;

class HotelSearch extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hotelList: null,
			mapHotelList: [],
			mapActiveHotelID: null,
			modal1: false,
			// modal1: true,
			totalRecords: 0,
			itemPerPage: 10,
			currentPage: 1,
			loading: false,
			filterLoading: false,
			searchCode: "",
			sessionId: "",
			priceRange: {
				high: 0,
				low: 0,
			},
			districtName: "",
			distance: 25,
			guestRating: 10,
			mapToShow: false,
			filters: {},
			resultHide: false,
			dropdownOpen: false,
			loading: false,
			fireRedirect: false,
			url: "",
			focusedInput: null,
		};

		this.socket = openSocket(SOCKET_URL, {
			transports: ["websocket"],
		});
	}

	static contextType = HotelContext;

	searchHoltel = async (e) => {
		e.preventDefault();
		if (
			this.context.HotelStore.cityCode !== "" &&
			this.context.HotelStore.cityName !== ""
		) {
			let roomObj = [];

			this.context.HotelStore.roomObject.map((room) => {
				if (room.child === 1)
					roomObj.push({
						adults: room.adult,
						children: [room.child1Age],
					});
				else if (room.child === 2)
					roomObj.push({
						adults: room.adult,
						children: [room.child1Age, room.child2Age],
					});
				else
					roomObj.push({
						adults: room.adult,
						children: [],
					});
			});

			let searchParams = {
				currency: this.context.HotelStore.currency,
				propertyCode: this.context.HotelStore.cityCode,
				checkin: moment(this.context.HotelStore.checkInDate).format(
					"YYYY-MM-DD"
				),
				checkout: moment(this.context.HotelStore.checkOutDate).format(
					"YYYY-MM-DD"
				),
				nationality: this.context.HotelStore.nationality,
				rooms: JSON.stringify(roomObj),
				offset: this.context.HotelStore.offset,
				limit: this.context.HotelStore.limit,
			};

			searchParams = stringify(searchParams);
			console.log("searchParams:", searchParams);

			this.getHotels(searchParams);
		}
	};

	getHotels = async (params) => {
		this.setState({ loading: true });
		
		if (res) {
			
			let res = await GET_HOTELS(params);
			
			this.setState(
				{
					hotelList: res.hotels,
					totalRecords: res.totalHotels,
					filters: res.filters,
					currency: res.currency,
					searchCode: res.searchCode,
					itemPerPage: res.limit,
					currentPage: res.offset / res.limit + 1,
					priceRange: res.priceRange,
				},
				async () => {
					// this.props.hotelSearchStore.updateSearchObject("searchCode", res.searchCode);

					if (!res.cached) {
						this.socket.on(res.searchCode, (socketResult) => {
							console.log(socketResult);
							if (socketResult.count > this.state.totalRecords) {
								this.setState({
									totalRecords: socketResult.count,
									priceRange: socketResult.priceRange,
								});
							}
						});
					}
					this.setState({ loading: false });
				}
			);
		} else {
			// setInterval(() => {
			// 	window.location = "/";
			// }, 6000);
		}
		return false;
		
	};

	componentWillUnmount() {
		this.socket.disconnect();
	}

	render() {
		let { hotelList, loading, searchCode } = this.state;
		return (
			<>
				<form className="service-main hotel-form" onSubmit={this.searchHoltel}>
					<div className="service-fields-container">
						<div className="service-fields-row">
							<div className="icon-input-block">
								<div className="icon">
									<i className="mdi mdi-map-marker"></i>
								</div>
								<div className="text-field text-left">
									<span className="b-label">Enter City or Property</span>
									<HotelSelectInputComponent
										name="city"
										placeholderText="Search Hotels"
										classText="yourcity"
									/>
								</div>
							</div>
							<div className="icon-input-block">
								<div className="icon">
									<i className="mdi mdi-calendar"></i>
								</div>
								<div className="text-field text-left">
									<span className="b-label">Check In - Check Out</span>
									<HotelDatePicker />
								</div>
							</div>
						</div>
						<div className="service-fields-row align-items-center">
							<div className="icon-input-block">
								<div className="icon">
									<i className="mdi mdi-account-group"></i>
								</div>
								<div className="text-field text-left">
									<span className="b-label">Travellers & Rooms</span>
									<HotelTouristSelect />
								</div>
							</div>
							<div className="text-right">
								<div className="text-field text-left">
									<Button
										variant="contained"
										size="large"
										color="primary"
										size="large"
										type="submit"
									>
										<b>SEARCH HOTELS</b>
									</Button>
								</div>
							</div>
						</div>
					</div>
				</form>

				<HotelSearchResultPage
					hotelList={hotelList}
					loading={loading}
					searchCode={searchCode}
				/>

			</>
		);
	}
}

export default HotelSearch;


