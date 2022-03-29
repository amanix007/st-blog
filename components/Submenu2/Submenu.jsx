import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import SearchBar from '../Searchbar/SearchBar';
import Slider from "react-slick";
// import { logFirebase } from "../../logger/firebase";
import firebase from "firebase/app";
import "firebase/analytics";



const firebaseConfig = {
    apiKey: "AIzaSyB2LynOMinAYqqF5xfMxR9zJEtDm2pZ7uA",
    authDomain: "sharetrip-96054.firebaseapp.com",
    databaseURL: "https://sharetrip-96054.firebaseio.com",
    projectId: "sharetrip-96054",
    storageBucket: "sharetrip-96054.appspot.com",
    messagingSenderId: "346164418203",
    appId: "1:346164418203:web:10ae29b2b5a1fc19",
    measurementId: "G-9098T6H32G",
};

// Initialize Firebase
let logEvent = null;
let logFirebase = () => { };


export default class Submenu extends Component {

    componentDidMount() {

        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);


            if (typeof window !== undefined) {
                if (window.navigator !== undefined) {
                    logEvent = firebase.analytics().logEvent;
                }
            }
        }


        logFirebase = (event, data) => {
            if (logEvent) {
                console.log('event:', event)
                logEvent(event, data);
            }
        };
    }

    next = () => {
        this.slider.slickNext();
    }
    previous = () => {
        this.slider.slickPrev();
    }

    render() {
        var settings = {
            slidesToShow: 5,
            dots: false,
            arrows: false,
            infinite: false,
            variableWidth: true,
            swipeToSlide: true,
            responsive: [
                {
                    breakpoint: 575,
                    settings: {
                        speed: 300,
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 375,
                    settings: {
                        speed: 300,
                        slidesToShow: 2
                    }
                }
            ]
        };
        return (
            <div className="submenu">
                <div className="container">
                    <div className="d-inline-block d-md-flex justify-content-end align-items-center w-100">
                        <div className="arrows">
                            <div className="arrow prev" onClick={this.previous}><i className="mdi mdi-chevron-left fz22"></i></div>
                            <div className="arrow next" onClick={this.next}><i className="mdi mdi-chevron-right fz22"></i></div>
                        </div>
                        <div className="menu-area">
                            <Slider ref={c => (this.slider = c)} {...settings}>
                                <div className="submenu-item">
                                    <Button href="/category/destinations"
                                        onClick={(e) => { logFirebase("Click_On_Blog_Destination", null) }}
                                    >Destinations</Button>
                                </div>
                                <div className="active submenu-item">
                                    <Button href="/category/discover-bd"
                                        onClick={(e) => { logFirebase("Click_On_Blog_DiscoverBangladesh", null) }}
                                    >Discover Bangladesh</Button>
                                </div>
                                <div className="submenu-item">
                                    <Button href="/category/travel-inspiration"
                                        onClick={(e) => { logFirebase("Click_On_Blog_TravelInspiration", null) }}
                                    >Travel Inspiration</Button>
                                </div>
                                <div className="submenu-item">
                                    <Button href="/category/stories"
                                        onClick={(e) => { logFirebase("Click_On_Blog_Stories", null) }}
                                    >Stories</Button>
                                </div>
                                <div className="submenu-item">
                                    <Button href="/category/tips"
                                        onClick={(e) => { logFirebase("Click_On_Blog_Tips", null) }}
                                    >Tips</Button>
                                </div>
                            </Slider>
                        </div>

                        <div className="nav-search">
                            <SearchBar />
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}
