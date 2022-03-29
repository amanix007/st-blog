import React, { Component } from 'react'
import LoadingComponent from '../../CommonComponents/LoadingComponent';
import ResultNotFound from '../../CommonComponents/ResultNotFound';
import ModuleItem from '../../CommonComponents/ModuleItem';

export default class PackageSearchResult extends Component {
    render() {
        let { loading, list } = this.props;
        return (
            <div className="row ModuleItem-list">
                {loading ? (
                    <LoadingComponent />
                ) : list.length === 0 ? (
                    <ResultNotFound type="Others" />
                ) : (
                            list.map((data, i) => {
                                let moduleObject = {};
                                moduleObject.type = "package";
                                moduleObject.discount = data.discount;
                                moduleObject.discountType = data.discountType;
                                moduleObject.discountPrice = data.discountPrice;

                                moduleObject.image = data.images.length !== 0 ? data.images[Math.floor(Math.random() * data.images.length)] : "./assets/images/demoImage.png";
                                // moduleObject.duration = data.duration + " " + data.durationType;
                                moduleObject.duration = data.duration + " " + "Day";
                                moduleObject.tripCoin = data.points.earning;
                                moduleObject.shareCoin = data.points.shared;
                                moduleObject.currency = data.currency;
                                moduleObject.total = data.lowestPrice;
                                moduleObject.title = data.title;
                                moduleObject.cityName = data.locations.join(" - ");
                                moduleObject.withAirFare = data.withAirfare;

                                return (
                                    <div className="col-md-6 mb-4 " key={i} onClick={() => window.open(process.env.NEXT_PUBLIC_siteBaseUrl+"/package-details?productCode=" + data.productCode, "_blank")}>
                                        <ModuleItem moduleObject={moduleObject} />
                                    </div>
                                );
                            })
                        )}
            </div>
        )
    }
}
