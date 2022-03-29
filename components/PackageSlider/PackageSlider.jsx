import React, { Component } from 'react';
import Slider from "react-slick"; 

import Packages from '../Packages/Packages';
import Link from 'next/link';


export default class PackageSlider extends Component {
    constructor(props) {
        super(props);

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);

        this.state = {
            locations: [
                {
                    image: 'assets/images/locations/img-1.png',
                    title: 'Uniquely Singapore, Amazing Thailand With Indonesia…',
                    duration: '4 days',
                    location: 'Singapore, Singapore…',
                    startLocation: 'with Airfare',
                    costBDT: '48,000',
                    cost: '4,800',
                    unit: 'person',
                    tag: 'Trending',
                    schedule: '02:22:26:45',
                    url: '#'
                },
                {
                    image: 'assets/images/locations/img-2.png',
                    title: 'Uniquely Singapore, Amazing Thailand With Indonesia…',
                    duration: '4 days',
                    location: 'Singapore, Singapore…',
                    startLocation: 'with Airfare',
                    costBDT: '48,000',
                    cost: '4,800',
                    unit: 'person',
                    tag: 'Trending',
                    schedule: '02:22:26:45',
                    url: '#'
                },
                {
                    image: 'assets/images/locations/img-3.png',
                    title: 'Uniquely Singapore, Amazing Thailand With Indonesia…',
                    duration: '4 days',
                    location: 'Singapore, Singapore…',
                    startLocation: 'with Airfare',
                    costBDT: '48,000',
                    cost: '4,800',
                    unit: 'person',
                    tag: 'Trending',
                    schedule: '02:22:26:45',
                    url: '#'
                },
                {
                    image: 'assets/images/locations/img-4.png',
                    title: 'Uniquely Singapore, Amazing Thailand With Indonesia…',
                    duration: '4 days',
                    location: 'Singapore, Singapore…',
                    startLocation: 'with Airfare',
                    costBDT: '48,000',
                    cost: '4,800',
                    unit: 'person',
                    tag: 'Trending',
                    schedule: '02:22:26:45',
                    url: '#'
                },
                {
                    image: 'assets/images/locations/img-1.png',
                    title: 'Uniquely Singapore, Amazing Thailand With Indonesia…',
                    duration: '4 days',
                    location: 'Singapore, Singapore…',
                    startLocation: 'with Airfare',
                    costBDT: '48,000',
                    cost: '4,800',
                    unit: 'person',
                    tag: 'Trending',
                    schedule: '02:22:26:45',
                    url: '#'
                },
                {
                    image: 'assets/images/locations/img-2.png',
                    title: 'Uniquely Singapore, Amazing Thailand With Indonesia…',
                    duration: '4 days',
                    location: 'Singapore, Singapore…',
                    startLocation: 'with Airfare',
                    costBDT: '48,000',
                    cost: '4,800',
                    unit: 'person',
                    tag: 'Trending',
                    schedule: '02:22:26:45',
                    url: '#'
                },
                {
                    image: 'assets/images/locations/img-3.png',
                    title: 'Uniquely Singapore, Amazing Thailand With Indonesia…',
                    duration: '4 days',
                    location: 'Singapore, Singapore…',
                    startLocation: 'with Airfare',
                    costBDT: '48,000',
                    cost: '4,800',
                    unit: 'person',
                    tag: 'Trending',
                    schedule: '02:22:26:45',
                    url: '#'
                },
                {
                    image: 'assets/images/locations/img-4.png',
                    title: 'Uniquely Singapore, Amazing Thailand With Indonesia…',
                    duration: '4 days',
                    location: 'Singapore, Singapore…',
                    startLocation: 'with Airfare',
                    costBDT: '48,000',
                    cost: '4,800',
                    unit: 'person',
                    tag: 'Trending',
                    schedule: '02:22:26:45',
                    url: '#'
                } 
            ]
        }
    }
    next() {
        this.slider.slickNext();
    }
    previous() {
        this.slider.slickPrev();
    }

    render() {
        var settings = {
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 5000,
            speed: 700,
            swipe: true,
            swipeToSlide: true,
            arrows: false,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 475,
                    settings: {
                        slidesToShow: 1,
                        centerMode: true,
                        centerPadding: '60px',
                    }
                },
                {
                    breakpoint: 375,
                    settings: {
                        slidesToShow: 1,
                        centerMode: true,
                        centerPadding: '30px',
                    }
                }
            ]
        };


        return (
            <section className="package-slider-section">
                <div className="container">
                    <div className="section-title d-flex align-items-end justify-content-between">
                        <div className="title-left">
                           <h2 className="fw-300">Best Selling Packages in Bangladesh</h2>
                        </div>
                        <div className="arrows lightning-deals-arrows d-none d-sm-flex align-items-center justify-content-center">
                            <div className="arrow prev" onClick={this.previous}><i className="mdi mdi-arrow-left fz22"></i></div>
                            <div className="arrow next ml-4" onClick={this.next}><i className="mdi mdi-arrow-right fz22"></i></div>
                        </div>
                    </div>
                    <div className="section-content">

                        <Slider ref={c => (this.slider = c)} {...settings} className="row st-location-slider ff2">

                            {this.state.locations.map((item, index) =>
                                <Packages item={item} key={index} />
                            )}

                        </Slider>
                            
                        <div className="row mt-4">
                            <div className="col-md-12">
                                <Link passHref href="/">
                                    <a className="primary-color ff2 d-flex align-items-center hover-translate-x">
                                    Show all Offers
                                    <i className="mdi mdi-chevron-right translate ml-2 fz22"></i>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        )
    }
}
