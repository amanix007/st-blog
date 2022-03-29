import Head from 'next/head';
import Layout from '../../../Layouts/Layout';
import Submenu from '../../../components/Submenu2/Submenu';
import BlogBooking from '../../../components/BlogBooking/BlogBooking';
import BlogTrending from '../../../components/BlogTrending/BlogTrending';

import { GET_TOP_POST, BLOG_BOOKING, BLOG_CATEGORY, TRENDING } from '../../../etc/api/BlogApi'
import { NextSeo } from 'next-seo';
import BannerCenter from '../../../components/BannerCenter/BannerCenter';
import BlogGrid from '../../../components/BlogGrid/BlogGrid';
import { useState } from 'react';
import _ from "lodash";
import StNextSEO from '../../../components/CommonComponents/StNextSEO';
import _SeoData from '../../../_SeoData';

export async function getServerSideProps(context) {
    let blogBooking = await BLOG_BOOKING();
    let trending = await TRENDING();

    let category = await BLOG_CATEGORY(context.params.slug, 0, 12);

    if (!category) {
        return {
            notFound: true,
        }
    }

    return {
        props: { category, blogBooking, trending, slug: context.params.slug },
        // props: { category },

    };
}

// export async function getStaticPaths() {

//     let paths = [
//         {
//             params: {
//                 slug: "travel-inspiration"
//             }
//         }
//     ];
//     return {
//         paths,
//         fallback: true,
//     }
// }

const Category = (props) => {
    if (_.isEmpty(props)) {
        return "Loading..."
    }
    let { slug, category, trending, blogBooking } = props;

    let { count } = category;

    const [postList, SetpostList] = useState(category.blog_posts);

    const [offset, setOffset] = useState(12);
    const [postAmount, setPostAmount] = useState(12);
    const [loading, setLoading] = useState(false);
    const [postLoader, setLoadBtn] = useState(true);

    const loadMore = async () => {
        setLoading(true);
        setOffset(offset + postAmount);
        let result = await BLOG_CATEGORY(slug, offset, postAmount);
        SetpostList([...postList, ...result.blog_posts]);
        setLoading(false);
        if (offset >= postList.length) {
            setLoadBtn(false);
        }
    }

    return (
        <>
            <StNextSEO
                title={category.category_data.name}
                description={_SeoData.categoryPage.data.meta.description}
                keywords={_SeoData.categoryPage.data.meta.keywords}
                url={`${process.env.NEXT_PUBLIC_this_site_url}/category/${slug}`}
                images={[]}
            />
            <Layout>
                <Submenu />
                <BannerCenter
                    image={category.category_data.img_src}
                    name={category.category_data.name}
                    slug={category.category_data.slug}
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

export default Category;
