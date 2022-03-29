import React, { Component } from 'react';
import Link from 'next/link';
import TrendingModule from '../TrendingModule/TrendingModule';

export default function BlogTrending({ blog_posts }) {

    return (
        <div className="blog-trending">
            <h2 className="mb-4 fw-500">Trending Topics</h2>

            <div className="section-content">
                {blog_posts.map((post, i) => <div className="mb-3" key={i}>
                    <TrendingModule post={post} />
                </div>)}

            </div>

            {/* <Link passHref href="/#"><a className="primary-color fw-500 fz12 mt-3 d-block">All Stories</a></Link> */}
        </div>
    )
}


