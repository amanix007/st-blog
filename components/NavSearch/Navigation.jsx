import React, { Component } from 'react';
import Link from 'next/link';

import _manifest from '../../_manifest';
import Brand from './Brand';
import Toggler from './Toggler';
import Spinner from './Spinner';
import Search from './Search';

class Navigation extends Component {
    state = {
        navOpen: false
    }

    setNavStatus = (status) => {
        this.setState({
            navOpen: status 
        })
    }

    render() {
        let { navOpen } = this.state;
        return (

            <nav className="navbar navbar-expand-lg sticky-top navbar-light">
                <div className="container position-relative">

                <Brand url="https://sharetrip.net" image={"https://utility-assets.s3.amazonaws.com/media/assets/full-logo.png"} />

                    <Toggler navOpen={navOpen} setNav={this.setNavStatus} />

                    <div className={ navOpen ? "navbar-collapse show" : "navbar-collapse"} id="navbarNavAltMarkup">
                        <div className="navbar-item">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link passHref href={`${process.env.NEXT_PUBLIC_siteBaseUrl}/hotel`} ><a className="nav-link">Hotel</a></Link>
                                </li>
                                <li className="nav-item">
                                    <Link passHref href={`${process.env.NEXT_PUBLIC_siteBaseUrl}/flight`}><a className="nav-link">Flight</a></Link>
                                </li>
                                <li className="nav-item">
                                    <Link passHref href={`${process.env.NEXT_PUBLIC_siteBaseUrl}/holiday`}><a className="nav-link">Holiday</a></Link>
                                </li>
                                <li className="nav-item">
                                    <Link passHref href={`${process.env.NEXT_PUBLIC_siteBaseUrl}/visa-guide`}><a className="nav-link">Visa Guide</a></Link>
                                </li>
                                <li className="nav-item">
                                    <Link passHref href={`${process.env.NEXT_PUBLIC_siteBaseUrl}/group-tour-request`}><a className="nav-link">Group Request</a></Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <Spinner />
                    <Search />
                </div>
            </nav>


        )
    }
}
export default Navigation;