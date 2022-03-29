import React, { useState, useEffect } from 'react';
import { TwitterShareButton, PinterestShareButton } from 'react-share';
export default function ShareMedia(props) {

    let { stUrl, stText, stMediaImageURL } = props;
    console.log(props)
    return (
        <div className={props.type + " share-media d-flex flex-wrap align-items-center white-bg radius-4"}>
            <p className="mr-3 mb-0">Share on post</p>
            <div className="social-media d-flex align-items-center fz20">
                {/* <a href="https://twitter.com/intent/tweet" data-text={`${stText}`} data-url={`${stUrl}`} target="_blank">
                    <i className="mdi mdi-twitter"></i>
                </a> */}
                <TwitterShareButton url={stUrl} title={stText}>
                        <i className="mdi mdi-twitter"></i>
                </TwitterShareButton>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${stUrl}&title=${stText}`} target="_blank">
                    <i className="mdi mdi-linkedin"></i>
                </a>
                {/* <a href={`https://pinterest.com/pin/create/+/button/?url=${stUrl}&media=${stMediaImageURL}&description=${stText}`} target="_blank">
                    <i className="mdi mdi-pinterest"></i>
                </a> */}
                <PinterestShareButton url={stUrl} media={stMediaImageURL} description={stText}>
                    <i className="mdi mdi-pinterest"></i>
                </PinterestShareButton>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${stUrl}`} target="_blank">
                    <i className="mdi mdi-facebook"></i>
                </a>
            </div>

        </div>
    )
}
