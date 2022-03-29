import React from 'react';

import Button from '@material-ui/core/Button';

export default function Spinner() {
    return (
        <div className="spinner">
            <a href="https://sharetrip.net/spin.html" target="_blank">
                <Button><img src="/assets/images/icons/spinner.png" alt="Spin to Win"/><span className="spin-text">Spin To Win</span></Button>
            </a>
        </div>
    )
}
