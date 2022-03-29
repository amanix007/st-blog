import React from 'react';
import Link from 'next/link';


export default function BlogPostModule({ post, type }) {
    return (
        <div className={"blog-item position-relative d-flex align-items-end " + type} >
            

                    <Link passHref href={`/post/${post.slug}`} as={`/post/${post.slug}`}>
                        <a>
                            <div className={post.featured_image ? "image flex-img radius-4 w-100 h-100" : "image flex-img radius-4 w-100 h-100 darken-image"}>
                                {post.featured_image ?
                                    <img src={post.featured_image} alt={post.title} /> : <img src={"/assets/images/placeholder.png"} alt={"ShareTrip"} />
                                }
                            </div>
                        </a>
                    </Link> 

                <div className="info">
                    <p className="category fz14 fw-500 ">
                        <Link passHref href={`/category/${post.category.slug}`} as={`/category/${post.category.slug}`}>
                            {post.category.name}
                        </Link>
                    </p>

                    <h2 className="title fw-500 white-color mt-16">
                        <Link passHref href={`/post/${post.slug}`} as={`/post/${post.slug}`}>
                            <a className="fw-500 white-color">{post.title}</a>
                        </Link>
                    </h2>

                </div>

        </div>
    )
}
