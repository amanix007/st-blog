import React, {Component} from 'react';

import Link from 'next/link';

export default class Attractions extends Component {
    constructor(props){
        super(props);
        this.state = {
            places: [
                {
                    location: 'Bagherhat',
                    place: 'Shat Gumbad Mosque',
                    image: 'assets/images/locations/img-1.png',
                    url: '/#'
                },
                {
                    location: 'Bagherhat',
                    place: 'Shat Gumbad Mosque',
                    image: 'assets/images/locations/img-1.png',
                    url: '/#'
                },
                {
                    location: 'Bagherhat',
                    place: 'Shat Gumbad Mosque',
                    image: 'assets/images/locations/img-1.png',
                    url: '/#'
                },
                {
                    location: 'Bagherhat',
                    place: 'Shat Gumbad Mosque',
                    image: 'assets/images/locations/img-1.png',
                    url: '/#'
                },
                {
                    location: 'Bagherhat',
                    place: 'Shat Gumbad Mosque',
                    image: 'assets/images/locations/img-1.png',
                    url: '/#'
                },
                {
                    location: 'Bagherhat',
                    place: 'Shat Gumbad Mosque',
                    image: 'assets/images/locations/img-1.png',
                    url: '/#'
                },
                {
                    location: 'Bagherhat',
                    place: 'Shat Gumbad Mosque',
                    image: 'assets/images/locations/img-1.png',
                    url: '/#'
                },
                {
                    location: 'Bagherhat',
                    place: 'Shat Gumbad Mosque',
                    image: 'assets/images/locations/img-1.png',
                    url: '/#'
                },
                {
                    location: 'Bagherhat',
                    place: 'Shat Gumbad Mosque',
                    image: 'assets/images/locations/img-1.png',
                    url: '/#'
                },
                {
                    location: 'Bagherhat',
                    place: 'Shat Gumbad Mosque',
                    image: 'assets/images/locations/img-1.png',
                    url: '/#'
                },
                {
                    location: 'Bagherhat',
                    place: 'Shat Gumbad Mosque',
                    image: 'assets/images/locations/img-1.png',
                    url: '/#'
                },
            ]
        }
    }
    render() {
        return (
            <section className="top-attractions">
                <div className="container">
                    <h2 className="fw-500">
                        Top Attractions of Bangladesh
                    </h2>

                    <div className="section-content">
                        <div className="place-list">
                            <div className="list-items st-vertical-scrollbar">

                                { this.state.places.map((item, index) => 
                                <div className="item" key={index}>
                                    <Link passHref href={item.url}>
                                        <a className="link-item">
                                        <div className="image">
                                            <img src={item.image} alt=""/>
                                        </div>
                                        <div className="info">
                                        <p className="location fz12 fw-500 text-uppercase mb-0">{item.location}</p>
                                        <h5 className="place-name mt-3 fw-300">{item.place}</h5>
                                        </div>

                                        </a>
                                    </Link>
                                </div>

                                )}
                                
                            </div>

                        </div>

                        <div className="map-area">
                            <img src="/assets/images/map.jpg" alt=""/>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
