import React from 'react';

import Link from 'next/link';

export default function Brand(props) {
    return (
        <>
        <Link passHref href={props.url}>
            <a className="navbar-brand"><img
                src={props.image}
                alt="ShareTrip"/></a>
        </Link>
        </>
    )
}
