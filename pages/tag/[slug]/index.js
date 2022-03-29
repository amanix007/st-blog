import Head from 'next/head';
import { useState, useEffect } from 'react';
import Layout from '../../../Layouts/Layout';
import Submenu from '../../../components/Submenu2/Submenu';
import BlogBooking from '../../../components/BlogBooking/BlogBooking';
import BlogTrending from '../../../components/BlogTrending/BlogTrending';

import { GET_TOP_POST, BLOG_BOOKING, TRENDING, BLOG_TAG } from '../../../etc/api/BlogApi'
import { NextSeo } from 'next-seo';
import BannerCenter from '../../../components/BannerCenter/BannerCenter';
import BlogGrid from '../../../components/BlogGrid/BlogGrid';
import _ from "lodash";
import StNextSEO from '../../../components/CommonComponents/StNextSEO';
import _SeoData from '../../../_SeoData';



export async function getServerSideProps(context) {
    let blogBooking = await BLOG_BOOKING();
    let trending = await TRENDING();

    let tag = await BLOG_TAG(context.params.slug, 0, 12);

    if (!tag) {
        return {
            notFound: true,
        }
    }
    return {
        props: { tag, blogBooking, trending, slug: context.params.slug },

    };
}


// export async function getStaticPaths() {

//     let topPost = await GET_TOP_POST(0, 12);
//     // let paths = topPost.blog_posts.map(d => { return { params: { slug: d.slug } } });
//     let paths = [
//         {
//             params: {
//                 slug: "travel-guide"
//             }
//         }
//     ];
//     return {
//         paths,
//         fallback: true,
//     }
// }





const Tag = (props) => {
    if (_.isEmpty(props)) {
        return "Loading..."
    }
    let { slug, tag, trending, blogBooking } = props;

    let { count } = tag;

    const [postList, SetpostList] = useState(tag.blog_posts);
    const [offset, setOffset] = useState(12);
    const [postAmount, setPostAmount] = useState(12);
    const [loading, setLoading] = useState(false);
    const [postLoader, setLoadBtn] = useState(true);



    const loadMore = async () => {

        setLoading(true);
        setOffset(offset + postAmount);
        let result = await BLOG_TAG(slug, offset, postAmount);
        SetpostList([...postList, ...result.blog_posts]);
        setLoading(false);
        if (offset >= postList.length) {
            setLoadBtn(false);
        }

    }

    return (
        <>
            <StNextSEO
                title={tag.tag_data.title}
                description={_SeoData.tagPage.data.meta.description}
                keywords={_SeoData.tagPage.data.meta.description}
                url={`${process.env.NEXT_PUBLIC_this_site_url}/tag/${slug}`}
                images={[]}
            />
            <Head>
                <meta name="robots" content="noindex" />
            </Head>
            <Layout>
                <Submenu />
                <BannerCenter
                    image={"/assets/images/banner/blog-banner.jpg"}
                    name={tag.tag_data.title}
                    slug={tag.tag_data.slug}
                />


                <section className="pt-72 pt-md-50 pt-sm-35 pb-35">
                    <div className="container">

                        <div className="section-content">
                            {postList && <BlogGrid postList={postList} loadMore={loadMore} loading={loading} loader={postLoader} count={count} />}
                        </div>

                    </div>
                </section>

                <section className="booking-trending pt-35 pt-767-0 pb-35">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                {blogBooking && <BlogBooking blogBooking={blogBooking} />}
                            </div>
                            <div className="col-lg-4 mt-991-35 mt-767-0">
                                {trending && <BlogTrending blog_posts={trending.blog_posts} />}
                            </div>
                        </div>
                    </div>
                </section>

            </Layout>

        </>
    )
}

export default Tag;

