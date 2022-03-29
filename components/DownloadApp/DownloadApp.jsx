import React, {Component} from 'react';

import Link from 'next/link';
import _manifest from '../../_manifest';

export default class DownloadApp extends Component {
    render() {
        return (
            <section className="download-apps">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 col-sm-6">
                            <div className="image">
                                <img src="/assets/images/app.png" alt=""/>
                            </div>
                        </div>
                        <div
                            className="col-md-5 col-sm-6 d-flex align-items-center justify-content-center">
                            <div className="section-content text-center text-sm-left">
                                <h4 className="fw-600">Download ShareTrip App and Earn Trip Coin.</h4>
                                <div className="button-group d-flex align-items-center">
                                    <a href={_manifest.iosAppLink} target="_blank">
                                        <img src="/assets/images/appStore.png" alt=""/>
                                    </a>
                                    <a href={_manifest.androidAppLink} target="_blank">
                                        <img src="/assets/images/playStore.png" alt=""/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        )
    }
}
