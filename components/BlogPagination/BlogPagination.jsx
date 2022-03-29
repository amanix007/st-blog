import React from 'react'

import Link from 'next/link';


export default function BlogPagination({ data }) {
    let { post_prev, post_next } = data;
    

    return (
        <div className="blog-pagination pt-72 pt-md-50 pt-sm-35">
            <div className="row">
                {post_prev &&
                    <div className="col-md-6">
                        <div className="pagination-item prev radius-4">
                            <Link passHref href={`/post/${post_prev.slug}`} as={`/post/${post_prev.slug}`}>
                                <a className="link d-flex">
                                    <div className="d-flex align-items-center w-100">
                                        <div className={post_prev.featured_image ? "image" : "image darken-image"}>
                                            <img src={post_prev.featured_image ? post_prev.featured_image : "/assets/images/placeholder.png"} alt={post_prev.title} />
                                        </div>
                                        <div className="text-content">
                                            <span className="fz12">PREVIOUS</span>
                                            <h5 className="title fz18">{post_prev.title}</h5>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    </div>
                }
                {post_next &&
                    <div className="col-md-6 ">

                        <div className="pagination-item next radius-4">
                            <Link passHref href={`/post/${post_next.slug}`} as={`/post/${post_next.slug}`}>
                                <a className="link d-flex">
                                    <div className="d-flex align-items-center flex-row-reverse w-100">
                                        <div className={post_next.featured_image ? "image" : "image darken-image"}>
                                            <img src={post_next.featured_image ? post_next.featured_image : "/assets/images/placeholder.png"} alt={post_next.title} />
                                        </div>
                                        <div className="text-content">
                                            <span className="fz12">NEXT</span>
                                            <h5 className="title fz18">{post_next.title}</h5>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    </div>
                }
            </div>
            <Link passHref href={`/category/${data.blog_post.category.slug}`}>

                <a className="all-links mt-5 mb-4 d-flex align-items-center">
                    See all  {data.blog_post.category.name}
                    <i className="mdi mdi-chevron-right translate ml-2 fz22"></i>
                </a>

            </Link>





        </div>
    )
}


