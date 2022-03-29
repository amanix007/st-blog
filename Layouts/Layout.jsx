import React, { Component } from 'react';

import Navigation from '../components/NavSearch/Navigation';
import DownloadApp from '../components/DownloadApp/DownloadApp';
// import Newsletter from '../components/Newsletter/Newsletter';
import Footer from '../components/Footer/Footer';

export default function Layout(props) {
    return (
        <>
        <Navigation />
        <main>
            { props.children }
            <DownloadApp />
            {/* <Newsletter /> */}
        </main>
        <Footer />
        </>
    )
}
