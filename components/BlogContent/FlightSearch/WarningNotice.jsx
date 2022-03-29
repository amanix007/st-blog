import React from 'react'

export default function WarningNotice(props) {
    return (
        <div className="WarningNotice">
            <div className="icon">
                <i className="mdi mdi-information"></i>
            </div>
            <div className="text">
                <p>{props.message}</p>
            </div>
        </div>
    )
}
