import React, {Component} from 'react';

import Link from 'next/link';

export default class Packages extends Component {
    render() {
        return (
            <div className="package-item">

                <div className="image-area">
                    <Link passHref href="/#">
                        <a className="flex-img">
                        <img src="/assets/images/locations/img-1.png" alt="Singapore, Singapore…"/>
                       </a> 
                    </Link>

                    <div className="taglines d-flex align-items-center justify-content-between">

                        <div className="timer d-flex align-items-center fz12 primary-tag">
                            <img src="/assets/images/icons/timer.svg" className="icon mr-2 mt--1" alt=""/>
                            <span>02:22:26:45</span>
                        </div>

                        <div className="tag d-flex align-items-center fz12 primary-tag">
                            <img src="/assets/images/icons/thunder.svg" className="icon mr-2" alt=""/>
                            <span>Trending</span>
                        </div>

                    </div>

                </div>

                <h6 className="title">
                    <Link passHref href="/#"><a>Uniquely Singapore, Amazing Thailand With Indonesia…</a></Link>
                </h6>

                <div className="tour-info d-flex align-items-center justify-content-start fz12">

                    <div className="duration d-flex align-items-center mr-3">
                        <i className="mdi mdi-calendar mr-1"></i>
                        4 days
                    </div>

                    <div className="loacation d-flex align-items-center">
                        <i className="mdi mdi-map-marker mr-1"></i>
                        Singapore, Singapore…
                    </div>

                </div>

                <div className="sml start-from fz12">
                    Starts from(with Airfare)
                </div>

                <div className="costs d-flex justify-content-between flex-wrap">

                    <div className="fz16 fw-500 mb-2">
                        BDT 48,000/<span className="fz12 fw-400">person</span>
                    </div>

                    <div className="fz14 d-flex align-items-center fz14 fw-500 mb-1">
                        <img src="/assets/images/icons/currency.svg" className="icon mr-2 mt--1" alt=""/>
                        <span>4,800</span>
                    </div>

                </div>
                
            </div>
        )
    }
}
