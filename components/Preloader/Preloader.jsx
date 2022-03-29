import React from 'react';

import _manifest from '../../_manifest';

export default function Preloader(props) {
    return (
        <div className={props.loader ? 'preloader show' : 'preloader hide'}>
            <div className="site-logo">
                <img src={_manifest.companyLogo} alt=""/>
            </div>
        </div>
    )
}
