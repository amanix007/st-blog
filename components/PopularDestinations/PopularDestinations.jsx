import React, { Component } from 'react';

import Link from 'next/link';
import { Button } from '@material-ui/core';

export default class PopularDestinations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            destinations: [

            ]
        }
    }
    getData = async () => {
        setTimeout(() => {
            this.setState({
                destinations: [
                    {
                        name: 'Bangladesh',
                        tag: 'ASIA',
                        image: 'assets/images/topcountries/img.png',
                        url: '/#'
                    }, {
                        name: 'Bangladesh',
                        tag: 'ASIA',
                        image: 'assets/images/topcountries/img.png',
                        url: '/#'
                    }, {
                        name: 'Bangladesh',
                        tag: 'ASIA',
                        image: 'assets/images/topcountries/img.png',
                        url: '/#'
                    }, {
                        name: 'Bangladesh',
                        tag: 'ASIA',
                        image: 'assets/images/topcountries/img.png',
                        url: '/#'
                    }, {
                        name: 'Bangladesh',
                        tag: 'ASIA',
                        image: 'assets/images/topcountries/img.png',
                        url: '/#'
                    }, {
                        name: 'Bangladesh',
                        tag: 'ASIA',
                        image: 'assets/images/topcountries/img.png',
                        url: '/#'
                    }, {
                        name: 'Bangladesh',
                        tag: 'ASIA',
                        image: 'assets/images/topcountries/img.png',
                        url: '/#'
                    }, {
                        name: 'Bangladesh',
                        tag: 'ASIA',
                        image: 'assets/images/topcountries/img.png',
                        url: '/#'
                    }
                ]
            })
        }, 1000);
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        // let Loader = null;
        // if (this.state.type !== 'CountryDetails') {
        //     Loader = <div className="button-group">
        //         <Button className="load-more">Load more</Button>
        //     </div>
        // }

        return (
            <section className="popular-destination">
                <div className="container">
                    <h2 className="fw-500 mb-4">Explore Popular Destinations</h2>
                    <div className="section-content">
                        <div className="row">

                            {this.state.destinations.map((item, index) =>
                                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
                                    <div className="item">
                                        <Link passHref href={item.url}>
                                            <a>
                                                <div className="image">
                                                    <img src={item.image} alt="" />
                                                </div>
                                                <p className="tag fz12 mt-12 mt-3 mb-1">
                                                    {item.tag}
                                                </p>
                                                <h5 className="name fw-500">{item.name}</h5>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                    <div className="button-group">
                        <Button className="load-more" variant="outlined" color="primary">Load more</Button>
                    </div>
                </div>

            </section>
        )
    }
}
