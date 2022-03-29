import React, { Component } from 'react';
import NumberFormat from 'react-number-format';

class ModuleItem extends Component {
    render() {
        let { type, discount, discountType, discountPrice, image, duration, tripCoin, shareCoin,
            total, currency, title, withAirFare, cityName, transportPoint, vehicle } = this.props.moduleObject;
        // console.log('this.props.moduleObject:', this.props.moduleObject);

        let priceDisply = null;
        if (type !== "package") {
            priceDisply = <h4>
                <NumberFormat thousandSeparator={true}
                    displayType={'text'}
                    prefix={currency + ' '}
                    value={total} />
            </h4>;

        } else {
            if (discount === 0) {
                priceDisply = <h5 className="color-w"><NumberFormat thousandSeparator={true}
                    displayType={'text'}
                    prefix={currency + ' '}
                    value={total} />
                </h5>
            } else {
                priceDisply = <h5 className="color-w"> 
                    <del>
                        <NumberFormat thousandSeparator={true}
                            displayType={'text'}
                            prefix={currency + ' '}
                            value={total} />
                    </del> {" "}
                    <NumberFormat thousandSeparator={true}
                        displayType={'text'}
                        prefix={currency + ' '}
                        value={discountPrice} />
                    {discountType === "Percentage" && <span className="percent ml-3">*{discount}%</span>}

                </h5>
            }


        }

        return (
            <div className="Module-item" style={{ backgroundImage: `url('${image}')` }}>
                <div className="overlay"></div>
                <div className="text">
                    <div className="top">
                        <ul>
                            {duration &&
                                <li><img src="./assets/images/icons/module-calender.png" alt="" /> <span>{duration}</span></li>
                            }

                            {vehicle &&
                                <li><i className="mdi mdi-car-multiple"></i> <span>{vehicle.name}</span></li>
                            }

                            {
                                (tripCoin != 0) && <li>
                                    <img src="./assets/images/icons/module-tripcoin.png" alt="" />
                                    <NumberFormat thousandSeparator={true}
                                        displayType={'text'}
                                        value={tripCoin} />
                                </li>
                            }

                            {(shareCoin != 0) &&
                                <li>
                                    <img src="./assets/images/icons/module-tripcoin-share.png" alt="" />
                                    <NumberFormat thousandSeparator={true}
                                        displayType={'text'}
                                        value={shareCoin} />
                                </li>
                            }

                        </ul>
                    </div>
                    <div className="bottom">
                        <span>Price starts from (per person)
                            {/* , 
                            {withAirFare && (
                            (withAirFare === "YES") ? <small> With Airfare</small> : ""
                        )} */}
                        </span>
                        {priceDisply}
                        <p>{title}</p>
                        {cityName && <p>
                            <small><i className="mdi mdi-map-marker"></i>{cityName} </small>
                        </p>}
                        {transportPoint && <p>
                            <small><i className="mdi mdi-map-marker"></i>{transportPoint[0]} <i className="mdi mdi-swap-horizontal"></i>  {transportPoint[1]}</small>
                        </p>}
                    </div>
                </div>
            </div>
        );
    }
}

export default ModuleItem;