import React from 'react';
import BlogPostModule from "../BlogPostModule/BlogPostModule";

export default function RelatedBlog({ post_suggestions }) {
    
    return (
        <div className="related-blog bg-white radius-4">
            <h5 className="fw-500">You Might Like</h5>
            <div className="row">
                {post_suggestions.map((post, i) => <div key={i} className="col-lg-12 col-md-6 mt-3">
                    <BlogPostModule post={post} type="related" />
                </div>)}

            </div>

        </div>
    )
}

