import Head from 'next/head';
import Layout from '../Layouts/Layout';
import Submenu from '../components/Submenu2/Submenu';
import BannerCenter from "../components/BannerCenter/BannerCenter";
import BlogGrid from "../components/BlogGrid/BlogGrid";
import BlogBooking from '../components/BlogBooking/BlogBooking';
import BlogTrending from '../components/BlogTrending/BlogTrending';
import { useRouter } from 'next/router';
import { TRENDING, BLOG_SEARCH, BLOG_BOOKING } from '../etc/api/BlogApi';
import { useState, useEffect } from 'react';

BlogSearch.getInitialProps = async () => {

    // let result = await BLOG_SEARCH(searchParam, 0, 12);

    let trending = await TRENDING();
    let blogBooking = await BLOG_BOOKING();

    return {
        trending,
        // result,
        blogBooking
    };
}






export default function BlogSearch({ trending, result, blogBooking }) {
    let searchParam = "";
    useEffect(() => {
        const searchdata = async () => {
            let result = await BLOG_SEARCH(searchParam, 0, 12);
            console.log('result:', result)

            Setcount(result.count)

            SetpostList(result.blog_posts);
        }

        searchdata();


    }, [])
    
    const [count, Setcount] = useState(0);
    const [postList, SetpostList] = useState([]);
    const [postAmount, setPostAmount] = useState(12);
    const [offset, setOffset] = useState(12);
    const [loading, setLoading] = useState(false);
    const [postLoader, setLoadBtn] = useState(true);



    const router = useRouter();
    searchParam = router.query.s;

    const loadMore = async () => {
        setLoading(true);
        setOffset(offset + postAmount);
        let result = await BLOG_SEARCH(searchParam, offset, 12);

        // let allPosts =
        SetpostList([...postList, ...result.blog_posts]);
        setLoading(false);
        if (offset >= postList.length) {
            setLoadBtn(false);
        }
    }

    return (
        <>
            <Head>
                <title>ShareTrip: All Blogs</title>
            </Head>
            <Layout>
                <Submenu />
                <div className="BlogSearch">
                    {/* <BannerCenter /> */}
                    <section className="pt-72 pt-md-50 pt-sm-35 pb-35">
                        <div className="container">
                            <h4 className="mb-4">{count} articles found for “{searchParam}”</h4>

                            <div className="section-content">
                                <BlogGrid postList={postList} loadMore={loadMore} loading={loading}
                                    loader={postLoader}
                                    count={count} />

                            </div>

                        </div>
                    </section>

                    <section className="booking-trending pt-35 pt-767-0 pb-35">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-8">
                                    <BlogBooking blogBooking={blogBooking} />
                                </div>
                                <div className="col-lg-4 mt-991-35 mt-767-0">
                                    <BlogTrending blog_posts={trending.blog_posts} />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Layout>
        </>

    )
}


