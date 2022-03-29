import Head from 'next/head';
import Layout from '../../../Layouts/Layout';
import Submenu from '../../../components/Submenu2/Submenu';
import BlogBanner from "../../../components/BlogBanner/BlogBanner";
import BlogContent from "../../../components/BlogContent/BlogContent";
import ShareMedia from "../../../components/ShareMedia/ShareMedia";
import RelatedBlog from "../../../components/RelatedBlog/RelatedBlog";
import BlogPagination from "../../../components/BlogPagination/BlogPagination";
import BlogBooking from '../../../components/BlogBooking/BlogBooking';
import BlogTrending from '../../../components/BlogTrending/BlogTrending';
import _ from "lodash";
import { GET_TOP_POST, BLOG_DETAILS, BLOG_BOOKING, BLOG_SLUGS, TRENDING } from '../../../etc/api/BlogApi'
import { ArticleJsonLd } from 'next-seo';
import { useState, useEffect } from 'react';
import DefaultErrorPage from 'next/error';

import StNextSEO from '../../../components/CommonComponents/StNextSEO';



export async function getServerSideProps(context) {
    let blogBooking = await BLOG_BOOKING();
    let trending = await TRENDING();

    let details = await BLOG_DETAILS(context.params.slug);
    if (!details) {
        console.log('details not found:')

        return {
            props: {
                notFound: true,
            }
        }
    }



    return {
        props: { ...details, blogBooking, slug: context.params.slug, trending },
    };
}

// export async function getStaticProps(context) {
//     let blogBooking = await BLOG_BOOKING();
//     let trending = await TRENDING();

//     let details = await BLOG_DETAILS(context.params.slug);
//     if (!details) {
//         console.log('details not found:')

//         return {
//             props: {
//                 notFound: true,
//             }
//         }
//     }



//     return {
//         props: { ...details, blogBooking, slug: context.params.slug, trending },
//     };
// }


// export async function getStaticPaths() {
//     let allSlugs = await BLOG_SLUGS();
//     let paths = allSlugs.slugs.map(d => { return { params: { slug: d.slug } } });
//     return {
//         paths,
//         fallback: true,
//     }
// }


const Post = (props) => {
    if (_.isEmpty(props)) {
        return "Loading..."
    }



    let [stUrl, setURL] = useState("");

    useEffect(() => {
        setURL(window.location.href);
    }, [])

    let { blog_post, post_suggestions, user_data, blogBooking, slug } = props;

    let postFullURL = `${process.env.NEXT_PUBLIC_this_site_url}/post/${slug}`;


    if (!blog_post) {
        return <>
            <Head>
                <meta name="robots" content="noindex" />
            </Head>
            <DefaultErrorPage statusCode={404} />
        </>
    }

    return (
        <>
            <StNextSEO
                title={blog_post.meta_title}
                description={blog_post.meta_description}
                keywords={blog_post.meta_keywords}
                url={postFullURL}
                images={[{
                    url: blog_post.featured_image
                }]}
            />
            <ArticleJsonLd
                url={postFullURL}
                title={blog_post.meta_title}
                // images={[
                //     'https://example.com/photos/1x1/photo.jpg',
                //     'https://example.com/photos/4x3/photo.jpg',
                //     'https://example.com/photos/16x9/photo.jpg',
                // ]}
                // images={[]}
                // datePublished="2015-02-05T08:00:00+08:00"
                // dateModified="2015-02-05T09:00:00+08:00"
                // authorName={['Jane Blogs', 'Mary Stone']}
                // publisherName="Gary Meehan"
                publisherLogo="https://utility-assets.s3.amazonaws.com/media/assets/full-logo.png"
                description={blog_post.meta_description}
            />



            <Layout Layout >

                <Submenu />

                <BlogBanner blog_post={blog_post} />


                <section className="single-blog-inner pt-72 pb-35 pt-md-50 pt-sm-35 pb-35">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-12">

                                <BlogContent blog_post={blog_post} />

                                <ShareMedia type="blog-inner"
                                    stUrl={postFullURL}
                                    stText={blog_post.title}
                                    stMediaImageURL={blog_post.featured_image}

                                />

                                <div
                                    className="site-tag d-flex align-items-center radius-4">
                                    <div className="icon d-flex"><img src="/assets/images/st-circle.svg" alt="" /></div>
                                    <p className="fz16 ml-2 mb-0">By {blog_post.author_name}</p>
                                </div>

                                <div id="fb-root"></div>
                                <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v10.0&appId=575994546140179&autoLogAppEvents=1" nonce="POUClWGX"></script>
                                <div className="fb-comments" data-href={postFullURL} data-numposts="5" data-width="100%"></div>

                            </div>
                            <div className="col-lg-4 col-md-12 col-md-5">
                                <RelatedBlog post_suggestions={post_suggestions} />

                                {/* <div className="travel-tips">
                                    <h5 className="title fw-500">Travel Tips</h5>
                                    <p className="mt-2">
                                        Tips, Tricks and Advice <br /> from our Community
                                    </p>

                                    <Link passHref href="/#"><a className="mt-2 fz12">View all Tips</a></Link>
                                </div> */}
                            </div>
                        </div>

                        <BlogPagination data={props} />
                    </div>
                </section>

                <section className="booking-trending pt-72 pt-md-50 pt-sm-35 pb-75 pb-md-50 pb-sm-35">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <BlogBooking blogBooking={blogBooking} />
                            </div>
                            <div className="col-lg-4 mt-991-35 mt-767-0">
                                <BlogTrending
                                    blog_posts={props.trending.blog_posts}
                                />
                            </div>
                        </div>
                    </div>
                </section>


            </Layout>

        </>
    )
}

export default Post;



