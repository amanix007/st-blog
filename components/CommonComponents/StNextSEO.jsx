import React, { Component } from 'react'

import { NextSeo } from 'next-seo';
import _SeoData from '../../_SeoData';
let openGraphImageModel = {
    url: 'https://www.example.ie/og-image-01.jpg',
    width: 800,
    height: 600,
    alt: 'Og Image Alt',
}

export default function StNextSEO({ title, description, keywords, images, url }) {


    return (
        <>
            <NextSeo
                defaultTitle="Best travel agency in Bangladesh - ShareTrip"
                title={title ? title : _SeoData.homePage.data.title}
                description={description ? description : _SeoData.homePage.data.description}
                keywords={keywords ? keywords : _SeoData.homePage.data.keywords}
                // canonical="https://www.canonical.ie/"
                openGraph={{
                    url: url,
                    type: "website",
                    title: title,
                    description: description,
                    images: images,
                    site_name: 'Sharetrip.net',
                }}
                twitter={{
                    handle: '@handle',
                    site: '@site',
                    cardType: 'summary_large_image',
                }}
                facebook={{
                    appId: '575994546140179',
                }}
            />
        </>
    )
}

