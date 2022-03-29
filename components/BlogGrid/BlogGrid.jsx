import React from 'react';

import BlogPostModule from '../BlogPostModule/BlogPostModule';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function BlogGrid(props) {

    let { postList } = props;

    function sliceArrayIntoGroups(arr, size) {
        var step = 0, sliceArr = [], len = arr.length;
        while (step < len) {
            sliceArr.push(arr.slice(step, step += size));
        }
        return sliceArr;
    }

    let list = sliceArrayIntoGroups(postList, 6);
    return (
        <>
            {list.map((group, i) => {
                return <div className="blog-grid mb-4" key={i}>
                    {group.map((post, gi) => {
                        return <BlogPostModule post={post} key={i + gi} type="a" />
                    })}
                </div>
            })}
            {props.count > 12 && props.loader
                && 
                <div className="grid-button-group d-flex" data-aos="fade-in" data-aos-duration="1500">
                    <Button onClick={props.loadMore} 
                        className="st-btn-lg bg-black white-color w-100"
                        disabled={props.loading ? true : false}
                        >
                        {props.loading 
                            ? <span className="d-flex align-items-center"><span className="mr-4">Loading </span> <CircularProgress /> </span>
                            : <span> Load more <i className="mdi mdi-chevron-down"></i></span>
                        }
                       
                    </Button>
                </div>
            }

        </>
    )
}



