import { Component } from "react";
// import React, { Component } from 'react';
import Slider from "react-slick";

import Link from "next/link";

export default class SliderFullWidth extends Component {

    render() {
        var settings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 6000,
            speed: 800,
            swipe: true,
            swipeToSlide: true,
            arrows: false,
            dots: true,
            fade: true,
            cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)'
        };

        return (
            <section className="dots-right slider-fullwidth">
                <Slider ref={c => (this.slider = c)} {...settings}>

                    {this
                        .props
                        .slides
                        .map(item => <div className="slider-item" key={item.slug}>
                            <div className="item d-flex align-items-end w-100 position-relative">
                                <div className="image position-absolute left top w-100 h-100">
                                    <img src={item.featured_image} alt="" />
                                </div>
                                {/* {console.log('item:', item)} */}
                                <div className="container slider-inner">
                                    <Link passHref href={`/category/${item.category.slug}`} as={`/category/${item.category.slug}`}>
                                        <a href={`/category/${item.category.slug}`} className="text-decoration-none">
                                            <h5 className="subtitle fw-500 white-color">
                                                {item.category.name}</h5>
                                        </a>

                                    </Link>

                                    <Link passHref href={`/post/${item.slug}`} as={`/post/${item.slug}`}>
                                        <a href={`/post/${item.slug}`} className="text-decoration-none">
                                            <h2
                                                className="title fw-500 white-color"
                                                dangerouslySetInnerHTML={{
                                                    __html: item.title
                                                }}></h2>
                                        </a>

                                    </Link>

                                </div>
                            </div>
                        </div>)}

                </Slider>
   
            </section>

        )
    }
}
