import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import "react-image-lightbox/style.css";
// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from "firebase/app";
import "firebase/analytics";

// react slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-dates/lib/css/_datepicker.css";

// Custom Styles
import "../styles/styles.scss";

import theme from '../src/theme';
import FlightContextProvider from '../contexts/FlightContext';
import HotelContextProvider from '../contexts/HotelContext';
import PackageContextProvider from '../contexts/PackageContext';
import { observer } from 'mobx-react';
import { action, makeObservable, observable } from 'mobx';


class STstore {

    constructor() {
        makeObservable(this, {
            serviceType: observable,
            updateStore: action,
        })
    }

    serviceType = 'flight';


    updateStore(object) {
        this.serviceType = object.serviceType ? object.serviceType : this.serviceType;
    }
}

export const sTstorefromClass = new STstore();

export const STStoreContext = createContext();

export default function MyApp(props) {
    const { Component, pageProps } = props;

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles
                .parentElement
                .removeChild(jssStyles);
        }



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
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }


    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Best travel agency in Bangladesh - ShareTrip</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />


                <meta property="fb:app_id" content="575994546140179" />

            </Head>
            {/* <Head>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <title>Best travel agency in Bangladesh - ShareTrip</title>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <link rel="stylesheet" href="//cdn.materialdesignicons.com/5.3.45/css/materialdesignicons.min.css" />
            </Head> */}

            <ThemeProvider theme={theme}>
                <CssBaseline />

                <FlightContextProvider>
                    <HotelContextProvider>
                        <PackageContextProvider>
                            <STStoreContext.Provider value={sTstorefromClass}>

                                <Component {...pageProps} />
                            </STStoreContext.Provider>
                        </PackageContextProvider>
                    </HotelContextProvider>
                </FlightContextProvider>

            </ThemeProvider>

        </React.Fragment>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired
};

