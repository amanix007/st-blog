import React, { Component } from 'react'

import CountrySelect from '../CountrySelect/CountrySelect';

export default class DestinationBanner extends Component {
    render() {
        return (
            <section className="destination-banner position-relative d-flex justify-content-center align-items-center">
                <div className="image">
                    <img src="/assets/images/banner/blog-banner.jpg" alt=""/>
                </div>
                <div className="content">
                    <h1 className="title fw-500 text-center">Travel Inspiration</h1>
                    <h4 className="subtitle mt-1">Discover the world and plan the perfect trip</h4>
                    <div className="mt-4 d-flex justify-content-center w-100">
                        <CountrySelect />
                    </div>
                </div>
            </section>
        )
    }
}
