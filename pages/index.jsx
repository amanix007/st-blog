import Layout from '../Layouts/Layout';
import Submenu from '../components/Submenu2/Submenu';
import SliderFullWidth from "../components/SliderFullWidth/SliderFullWidth"
import BlogGrid from "../components/BlogGrid/BlogGrid";
import BlogBooking from "../components/BlogBooking/BlogBooking";
import BlogTrending from "../components/BlogTrending/BlogTrending";
import { GET_BLOG_SLIDER, GET_TOP_POST, TRENDING, BLOG_BOOKING } from '../etc/api/BlogApi';
import { useContext, useState } from 'react';
import _SeoData from '../_SeoData'
import StNextSEO from '../components/CommonComponents/StNextSEO';
import { STStoreContext, sTstorefromClass } from './_app';
import { observer } from 'mobx-react';


export const getServerSideProps = async () => {

	let blogSlider = await GET_BLOG_SLIDER();
	let topPost = await GET_TOP_POST(0, 12);

	let blogBooking = await BLOG_BOOKING();
	let trending = await TRENDING();

	let response = {}
	if (blogSlider) {
		response.slides = blogSlider.blog_posts
	} else {
		response.slides = null;
	}

	if (topPost) {
		response.topPost = topPost;
	} else {
		response.topPost = null;
	}
	if (trending) {
		response.trending = trending;
	} else {
		response.trending = null;
	}
	if (blogBooking) {
		response.blogBooking = blogBooking;
	} else {
		response.blogBooking = null;
	}

	if (!blogSlider && !topPost && !trending) {
		return {
			notFound: true,
		}
	}


	return { props: response };


}




function Home(props) {
	const sTStore = useContext(STStoreContext);
	let { slides, topPost, trending, blogBooking } = props;


	let { count } = topPost;

	const [postList, SetpostList] = useState(topPost.blog_posts);
	const [offset, setOffset] = useState(12);
	const [postAmount, setPostAmount] = useState(12);
	const [loading, setLoading] = useState(false);
	const [postLoader, setLoadBtn] = useState(true);

	const loadMore = async () => {
		setLoading(true);
		setOffset(offset + postAmount);
		let result = await GET_TOP_POST(offset, postAmount);
		SetpostList([...postList, ...result.blog_posts]);
		setLoading(false);
		if (offset >= postList.length) {
			setLoadBtn(false);
		}
	}




	return (
		<>
			<StNextSEO
				title={_SeoData.homePage.data.title}
				description={_SeoData.homePage.data.meta.description}
				keywords={_SeoData.homePage.data.meta.keywords}
				url={`${process.env.NEXT_PUBLIC_this_site_url}`}
				images={[]}
			/>




			<Layout>
				<Submenu />
				{/* <button onClick={() => sTStore.updateStore({
					serviceType: 'updated allah',
				})}>Update</button>
				{sTStore.serviceType} */}
				{slides && <SliderFullWidth slides={slides} />}
				<section className="blogs pt-72 pt-md-50 pt-sm-35 pb-35">
					<div className="container">
						<div className="section-content">
							{postList && <BlogGrid postList={postList} loadMore={loadMore} loading={loading} loader={postLoader} count={count} />}
						</div>
					</div>
				</section>

				<section className="booking-trending pt-35 pb-75 pb-sm-35">
					<div className="container">
						<div className="row">
							<div className="col-lg-8">
								{blogBooking && <BlogBooking blogBooking={blogBooking} />}
							</div>
							<div className="col-lg-4 mt-991-35 mt-767-0" data-aos="fade-in" data-aos-delay="200">
								{trending && <BlogTrending blog_posts={trending.blog_posts} />}
							</div>
						</div>
					</div>
				</section>
			</Layout>
		</>
	)
}
export default observer(Home);