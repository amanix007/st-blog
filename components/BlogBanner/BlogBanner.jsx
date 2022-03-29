import React, { Component } from 'react';
import Link from 'next/link';



export default function 
BlogBanner({ blog_post }) {
    return (
        <section
            className="blog-banner position-relative d-flex align-items-end">
            {blog_post.featured_image
                ? <div className="image">
                    <img src={blog_post.featured_image ? blog_post.featured_image : "/assets/images/placeholder.png"} alt={blog_post.title} />
                </div>
                : <div className="image darken-image">
                    <img src={blog_post.featured_image ? blog_post.featured_image : "/assets/images/placeholder.png"} alt={blog_post.title} />
                </div>
            }

            <div className="info d-flex flex-column justify-content-end">
                <div className="container">
                    <p className="category fw-500">
                        <Link passHref href={`/category/${blog_post.category.slug}`}>
                            <span className="text-white">{blog_post.category.name}</span>
                        </Link>
                    </p>
                    <h1 className="title">
                        {blog_post.title}
                    </h1>
                    <div className="tag d-flex align-items-center mt-2">
                        <div className="icon">
                            <img src="/assets/images/st-circle.svg" alt="" />
                        </div>
                        <span className="fz12 ml-2">
                            By {blog_post.author_name}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    )
}



