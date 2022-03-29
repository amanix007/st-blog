import React, {useState} from 'react';

import Link from 'next/link';

export default function TrendingModule({ post }) {
    const [strCount, setStrCount] = useState(45)
    return (
        <>
            <Link passHref href={"/post/"+post.slug}>
                <a className="trending-module d-flex">
                    <div className={post.featured_image ? "image flex-img radius-4" : "image flex-img radius-4 darken-image"}>
                        <img src={post.featured_image ? post.featured_image : "/assets/images/placeholder.png"} alt={post.title} />
                    </div>
                    <div className="info">
                        <p className="fz12 fw-500 lh1 dark-gray-color">{post.category.name}</p>
                        <h5 className="title fz20 mt-8 fw-400">
                            {(post.title.length > strCount) ? post.title.substr(0, strCount) + '...' : post.title }
                        </h5>
                        <p className="d-block mt-2 fz12 fw-500">Read More</p>
                    </div>
                </a>
            </Link>

        </>
    )
}
