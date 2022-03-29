import React, { Component } from 'react';

// import Sticky from '../Sticky/Sticky';
import StickyMenu from '../StickyMenu/StickyMenu';

export default class StickyBanner extends Component {
    render() {
        return (
            <section className="sticky-banner dark-bg d-flex justify-content-center align-items-center flex-column">
                <div className="image">
                    <img src="/assets/images/banner/blog-banner.jpg" alt=""/>
                </div>
                <div className="banner-content">
                    <div className="container text-center">
                        <h4 className="fw-500 white-color">ASIA</h4>
                        <h1 className="title white-color fw-500">Bangladesh</h1>
                    </div>
                </div>

                    <StickyMenu />
                {/* <Sticky>
                </Sticky> */}

            </section>
        )
    }
}
