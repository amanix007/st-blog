import React, { Component } from 'react'

import Button from '@material-ui/core/Button';
import Theme from "../../src/theme";
import parse from "html-react-parser";
import FlightSearch from './FlightSearch/FlightSearch';
import { FlightContext } from '../../contexts/FlightContext';
import HotelSearch from './HotelSearch/HotelSearch';
import PackageSearch from './PackageSearch/PackageSearch';
import Link from 'next/link';
import _, { isEmpty } from "lodash";



let html = `
<div>
<p>test ddd</p>
<flightnode from="100" to="200"></flightnode>
<hotelnode from="100" to="200"></hotelnode>
<packagenode from="100" to="200"></packagenode>

<img src="/assets/images/blogs/img-1.png" alt="" className="jsx-3552364357">
<p>test xxx</p>
</div>
`;



export default class BlogContent extends Component {
    static contextType = FlightContext;


    render() {
        if (_.isEmpty(this.props)) {
            return "Loading..."
        }



        let { category, sub_title, content, featured_image, meta_description, meta_keywords,
            meta_title, tags, title } = this.props.blog_post;
        if (content) {
            content = content.replace(/&lt;/g, "<");
            content = content.replace(/&gt;/g, ">");
        }


        return (
            <div className="blog-content bg-white">
                <div className="content-head">
                    <h5 className="fw-500">
                        {sub_title}
                    </h5>

                    <div className="button-group d-flex align-items-center flex-wrap mt-3">
                        {tags.map(c => <Link passHref key={c.blogTag.slug} href={`/tag/${c.blogTag.slug}`}><Button variant="outlined" className="mr-2 mb-2" style={Theme.palette.textNormal} key={c.id}>{c.blogTag.title}</Button></Link>)}
                    </div>
                </div>

                <div className="h-line"></div>



                <div className="content-info radius-4 d-flex justify-content-center flex-column" >

                    {parse(content, {
                        replace: function (domNode) {
                            if (domNode.name) {
                                if (domNode.name === "flightnode") {
                                    let route = {
                                        origin: "",
                                        destination: ""
                                    }


                                    if (!isEmpty(domNode.attribs)) {
                                        if (domNode.attribs.from) {
                                            route.origin = domNode.attribs.from;
                                        }
                                        if (domNode.attribs.to) {
                                            route.destination = domNode.attribs.to;
                                        }
                                        
                                    }

                                    return <FlightSearch route={route} />
                                }
                                if (domNode.name === "hotelnode") {
                                    // return "";
                                    return <HotelSearch />
                                }
                                if (domNode.name === "packagenode") {
                                    // return "";
                                    return <PackageSearch />
                                }
                            }
                        }
                    })}

                </div>

            </div>
        )
    }
}
