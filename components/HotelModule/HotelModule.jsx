import React, {Component} from 'react';

import Link from 'next/link';
import { HotelContext } from '../../contexts/HotelContext';
import { HotelPriceOnly, HotelPriceWithDiscount } from '../CommonComponents/SmallCommonComponents';
import NumberFormat from 'react-number-format';

export default class HotelModule extends Component {
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

        console.log(hotelData);

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

        let Location = () => {
           let address = hotelData.contact[0].address;
           address  = address.length > 10 ? address.substring(0, 25) + "..." : address;

           return address;
        }

        return (
            <div className={"hotel-module " + this.props.classList}>

                <div className="image-area">
                    <Link passHref href={this.props.urlRedirect}>
                        <a className="flex-img">
                            <img src={ backGroundImage ? backGroundImage  : "/assets/images/placeholder.png" } className="mb-0" alt={ hotelData.name }/>
                        </a>
                    </Link>

                </div>

                <h6 className="title">
                    <Link passHref href="/#"><a className="fw-500 black-color">{ hotelData.name }</a></Link>
                </h6>

                <div className="d-flex align-items-center mb--15">
                    <div className="rattings fz22 d-flex align-items-center">
                        <HotelStar />
                    </div>

                    {
                        (hotelData.rating !== 0 && hotelData.rating !== null) &&
                        <div className="likes d-flex align-items-center">
                            <i className="mdi mdi-thumb-up"></i> {hotelData.rating}
                        </div>
                    }
                </div>

                <div className="tour-info d-flex align-items-center justify-content-start fz12">

                    <div className="loacation d-flex align-items-center"
                     onClick={() => {
                        window.open(`https://www.google.com/maps/search/?api=1&query=${hotelData.contact[0].center.lat},${hotelData.contact[0].center.lon}`, "_blank")

                    }}
                    >
                        <i className="mdi mdi-map-marker mr-1"></i>
                        <Location />
                    </div>

                </div>

                <p className="fz10  mb-0">Sarts from</p>

                {(hotelData.discount === 0) &&
                    <HotelPriceOnly hotelData={hotelData} currency={currency} roomCount={roomCount}/>
                }
                {(hotelData.discount > 0) &&
                    <HotelPriceWithDiscount hotelData={hotelData} currency={currency} roomCount={roomCount}/>
                }

                {hotelData.points.earning && 
                    <div className="coin fz14 d-flex align-items-center fz14 fw-500 mb-1">
                        <img src="/assets/images/icons/currency.svg" className="icon mr-2 m-0" alt=""/>
                        <span>{hotelData.points.earning} </span>
                    </div>
                }

            </div>
        )
    }
}
