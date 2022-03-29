import React, { Component } from 'react';

import Lightbox from "react-image-lightbox";


// import './HotelComponent.css';
import ComponentPlaceholder from '../../CommonComponents/ComponentPlaceholder';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import NumberFormat from 'react-number-format';

import { Button } from '@material-ui/core';
import { HotelPriceWithDiscount, HotelPriceOnly } from '../../CommonComponents/SmallCommonComponents';
import { HotelContext } from '../../../contexts/HotelContext';



class HotelComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photoIndex: 0,
            isOpen: false,
            hotelData: props.data,
            hotelAmenities: props.hotelAmenities,
            hotelImages: props.images,
            currency: props.currency,
            searchParams: null,
        };
        // console.log(props.data.contact[0].center);


    }
    static contextType = HotelContext;

    render() {

        let { photoIndex, isOpen, hotelData, hotelAmenities, hotelImages, currency } = this.state;

        let roomCount = this.context.HotelStore.rooms.length;
        if (hotelData.currency === undefined) {
            hotelData.currency = this.context.HotelStore.currency;
        }
        let images = [];
        let backGroundImage;

        hotelData.discount = parseInt(hotelData.discount);

        if (hotelImages.length > 0) {
            hotelImages.map((img) => {
                images.push(img);
            });
            backGroundImage = images[0];
        } else {
            images.push("./assets/images/demoImage.png");
            backGroundImage = "./assets/images/demoImage.png";
        }

        // let backGroundImage = "./assets/images/demoImage.png";

        // images = [backGroundImage, backGroundImage, backGroundImage, backGroundImage, backGroundImage]


        let HotelStar = () => {
            let HotelStar = [];
            for (let i = 0; i < hotelData.starRating; i++) {
                HotelStar.push(<i className="mdi mdi-star" key={i}></i>);
            }
            return HotelStar;
        };


        let HotelLightBox = (
            <div className="image" style={{ backgroundImage: `url(${backGroundImage})` }}
                onClick={() => this.setState({ isOpen: true })}>
                <div className="image-container">
                    <div className="images-overlay">
                        <span className="more-photo"><i className="mdi mdi-image-multiple"></i></span>
                    </div>
                </div>

                {isOpen && (
                    <Lightbox
                        mainSrc={images[photoIndex]}
                        nextSrc={images[(photoIndex + 1) % images.length]}
                        prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + images.length - 1) % images.length
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % images.length
                            })
                        }
                    />
                )}
            </div>
        );


        let HotelTextDetails = (
            <div className="details">
                {this.props.type === 'list' &&
                    <div className="titleRatting">

                        <h4 onClick={() => this.props.type === 'list' && window.open(this.props.urlRedirect, '_blank')}>
                            {hotelData.name}
                        </h4>



                    </div>
                }
                {this.props.type === 'details' &&
                    <div className="title">
                        <h3 onClick={() => {
                            if (this.props.type === 'list') {
                                // logEventRecord("Click_on_Hotels_name")
                                window.open(this.props.urlRedirect, '_blank');
                            }
                        }}>
                            {hotelData.name}
                        </h3>
                    </div>
                }
                {this.props.type === 'list' && (
                    <div className="list-page-body">
                        <div className="left">
                            <div className="star-view-on-map">
                                {(hotelData.starRating !== 0) && <div className="hotel-star"><HotelStar /></div>}
                                {
                                    (hotelData.rating !== 0 && hotelData.rating !== null) &&
                                    <div className="h-point">
                                        <img src="/assets/images/icons/like-mono@2x.png" alt="" /> <span> {hotelData.rating}</span>
                                    </div>
                                }

                            </div>
                            <div
                                className="view-on-map"
                                onClick={() => {
                                    logEventRecord('Click_on_Map')
                                    window.open(`https://www.google.com/maps/search/?api=1&query=${hotelData.contact[0].center.lat},${hotelData.contact[0].center.lon}`, "_blank")

                                }}
                            >
                                <p><i className="mdi mdi-map-marker"></i>
                                    <span>{hotelData.contact[0].address}</span></p>

                            </div>
                            <div className="round-icon-collection">
                                {
                                    hotelAmenities.map((amenity, key) =>
                                        (

                                            <Tooltip title={amenity.title} key={key} placement="bottom">
                                                <img className={"mdi"} key={key} src={amenity.logo} alt="" />
                                            </Tooltip>

                                        )
                                    )
                                }
                            </div>

                            {this.props.type === 'list' && (

                                <div className="tripCoin ">
                                    <ul>
                                        <li><img src="./assets/images/icons/tripCoin.png" alt="" />
                                            <span>{hotelData.points.earning}</span></li>
                                        <li><img src="./assets/images/icons/tripCoinShare.png" alt="" />
                                            <span>{hotelData.points.shared}</span></li>
                                    </ul>
                                    {/* <p>*Price includes VAT & Tax</p> */}
                                </div>
                            )}
                        </div>
                        <div className="right">
                            {this.props.type === 'list' && (
                                <div className="price-block"
                                    onClick={() => this.props.type === 'list' && window.open(this.props.urlRedirect, '_blank')}
                                >
                                    <small>Starts from</small>

                                    {(hotelData.discount === 0) &&
                                        //{(false) &&
                                        <HotelPriceOnly
                                            hotelData={hotelData}
                                            currency={currency}
                                            roomCount={roomCount}
                                        />
                                    }

                                    {(hotelData.discount > 0) &&
                                        // {(true) &&
                                        <HotelPriceWithDiscount
                                            hotelData={hotelData}
                                            currency={currency}
                                            roomCount={roomCount}
                                        />
                                    }








                                </div>
                            )}
                            <Button className="btn btn-primary" size="small"
                                onClick={() => this.props.type === 'list' && window.open(this.props.urlRedirect, '_blank')}
                            > Book Now</Button>

                        </div>
                    </div>
                )}
                {this.props.type === 'details' && (
                    <div className="details-page-body">
                        <div className="rating-location-amenities-points">
                            <div className="rating-location-amenities">
                                {(hotelData.starRating !== 0) && <div className="hotel-star"><HotelStar /></div>}
                                <div className="view-on-map"
                                    onClick={() => {
                                        if (this.props.type === 'list') {
                                            //this.props.onMapLinkClick()
                                            window.open(`https://www.google.com/maps/search/?api=1&query=${hotelData.contact[0].center.lat},${hotelData.contact[0].center.lon}`, "_blank")
                                        } else {
                                            window.open(`https://www.google.com/maps/search/?api=1&query=${hotelData.contact[0].center.lat},${hotelData.contact[0].center.lon}`, "_blank")
                                        }
                                    }}
                                >
                                    <p><i className="mdi mdi-map-marker"></i>
                                        <span>{hotelData.contact[0].address}</span></p>
                                </div>
                                <div className="round-icon-collection amenities">
                                    {
                                        hotelAmenities.map((amenity, key) =>
                                            (
                                                <img className={"mdi"} key={key} src={amenity.logo} alt="" />
                                            )
                                        )
                                    }
                                </div>
                            </div>
                            {
                                (hotelData.rating !== 0 && hotelData.rating !== null) &&
                                <div className="point big">
                                    <span><i className="mdi mdi-thumb-up"></i>  {hotelData.rating}</span>
                                </div>
                            }

                        </div>

                        <div className="bottom">

                            <div className="tripCoinDetails ">
                                <div className="item">
                                    <div className="img">
                                        <img src="./assets/images/icons/tripCoin.png" alt="" />
                                    </div>
                                    <div className="text">
                                        <p>Earn TripCoin</p>
                                        <strong>
                                            <NumberFormat thousandSeparator={true}
                                                displayType={'text'}
                                                value={hotelData.points.earning} />
                                        </strong>
                                    </div>
                                </div>

                                <div className="item">
                                    <div className="option">OR</div>
                                    <div className="text">
                                        <p>Redeem TripCoin</p>
                                        <strong>
                                            <NumberFormat thousandSeparator={true}
                                                displayType={'text'}
                                                value={hotelData.points.earning} />
                                        </strong>
                                    </div>
                                </div>


                            </div>
                            <div className="price-details">
                                <div className="price-block">
                                    <small>Starts from</small>
                                    {(hotelData.discount === 0) &&
                                        //{(false) &&
                                        <HotelPriceOnly
                                            hotelData={hotelData}
                                            currency={currency}
                                        />
                                    }
                                    {(hotelData.discount > 0) &&
                                        // {(true) &&
                                        <HotelPriceWithDiscount
                                            hotelData={hotelData}
                                            currency={currency}
                                        />
                                    }
                                    <p className="vatTax">*Price includes VAT &amp; Tax</p>

                                </div>

                            </div>
                        </div>
                    </div>
                )}
                <div className="details-body">
                    <div className="left">


                        {/* {this.props.type === 'details' && (
                            <div className="rectangular-icon-collection"><i className="mdi mdi-bell-ring"></i><i
                                className="mdi mdi-heart-outline"></i><i className="mdi mdi-share-variant"></i></div>
                        )} */}

                    </div>
                    <div className="right select-room  text-right">
                        {/* {this.props.type === 'details' && (
                            <span className="discountPercent"> 44% OFF TODAY</span>
                        )}
                        {(hotelData.discount > 0) &&
                            <span className="info-badge green"> {hotelData.discount} OFF TODAY</span>
                        } */}


                    </div>


                </div>
                {/* {this.props.type === 'list' && <a href={this.props.urlRedirect} target={"_blank"}>
                    <button className="btn btn-primary">EXPLORE</button>
                </a>} */}


            </div>
        );


        if (this.props.filterLoading) {
            return (
                <ComponentPlaceholder />
            )
        }

        return (
            <div className={this.props.type === "list" ? "hotel-component" : "hotel-component details-component"}>
                {HotelLightBox}
                {HotelTextDetails}
            </div>
        );


    }
}


export default HotelComponent;