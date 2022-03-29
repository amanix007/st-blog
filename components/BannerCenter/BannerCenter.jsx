import Link from 'next/link';
import React, { Component } from 'react';




export default function BannerCenter({ image, name, slug }) {
    return (
        <section className="banner-center position-relative d-flex justify-content-center align-items-center">
            <div className="image">
                {/* <img src={image ? image : "https://s3.ap-southeast-1.amazonaws.com/utility-assets/media/assets/demoImage.png"} alt="" /> */}
                <img src={image ? image : "/assets/images/placeholder.png"} alt="" />
            </div>
            <div className="content">
                <Link passHref href={`/category/${slug}`}>
                    <h1 className="title fw-500 text-center">{name}</h1>
                </Link>
            </div>
        </section>
    )
}

