import axios from "axios";
import swal from "sweetalert";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_apiBaseUrl;
console.log('axios.defaults.baseURL:', axios.defaults.baseURL)
axios.defaults.headers.post["Content-Type"] = "application/json";

// Purpose of this,  if the api is down for time being,  and  we need to
// continue our development work const FlightApiDown = true;
const FlightApiDown = false;

// FlightApiDown end

export function Alert(title, msg, type, time = 5000) {
    swal({title: title, text: msg, icon: type, buttons: false, timer: time});
}

/* Blog  API */

export async function GET_BLOG_SLIDER() {

    try {
        let result = await axios.get("/v1/blog/slider");
        return result.data.response;
    } catch (error) {
        if (error.response) {
            // that falls out of the range of 2xx
            console.log("Request Error:", error.response);
            Alert("Oops!", error.response.data.message, "error");
        }
        console.log("Error", error);
    }
}

export async function GET_TOP_POST(offset, limit) {

    try {
        let result = await axios.get(`/v1/blog/top-post?offset=${offset}&limit=${limit}`);
        return result.data.response;
    } catch (error) {
        if (error.response) {
            // that falls out of the range of 2xx
            console.log("Request Error:", error.response);
            Alert("Oops!", error.response.data.message, "error");
        }
        console.log("Error", error);
    }
}

export async function TRENDING() {

    try {
        let result = await axios.get("/v1/blog/trending");
        return result.data.response;
    } catch (error) {
        if (error.response) {
            // that falls out of the range of 2xx
            console.log("Request Error:", error.response);
            Alert("Oops!", error.response.data.message, "error");
        }
        console.log("Error", error);
    }
}

export async function BLOG_DETAILS(slug) {
    try {
        let result = await axios.get(`/v1/blog/post/detail?slug=${slug}`);
        return result.data.response;
    } catch (error) {
        if (error.response) {
            // that falls out of the range of 2xx
            console.log("Request Error:", error.response);
        }
        console.log("Error", error);
    }
}

export async function BLOG_CATEGORY(slug, offset, limit) {
    try {
        let result = await axios.get(`/v1/blog/post/category?offset=${offset}&limit=${limit}&slug=${slug}`);
        return result.data.response;
    } catch (error) {
        if (error.response) {
            // that falls out of the range of 2xx
            console.log("Request Error:", error.response);
        }
        console.log("Error", error);
    }
}

export async function BLOG_TAG(slug, offset, limit) {
    try {
        let result = await axios.get(`/v1/blog/post/tag?offset=${offset}&limit=${limit}&slug=${slug}`);
        // console.log('result zzzzzzzzzzzzzzzzzzz:', result.data.response)
        return result.data.response;
    } catch (error) {
        if (error.response) {
            // that falls out of the range of 2xx
            console.log("Request Error:", error.response);
        }
        console.log("Error", error);
    }
}

export async function BLOG_SEARCH(string, offset, limit) {
    try {
        let result = await axios.get(`/v1/blog/post/search?offset=${offset}&limit=${limit}&text=${string}`);

        return result.data.response;
    } catch (error) {
        if (error.response) {
            // that falls out of the range of 2xx
            console.log("Request Error:", error.response);
        }
        console.log("Error", error);
    }
}

export async function BLOG_BOOKING() {
    try {
        let result = await axios.get(`/v1/blog/booking`);
        return result.data.response;
    } catch (error) {
        if (error.response) {
            // that falls out of the range of 2xx
            console.log("Request Error:", error.response);
        }
        console.log("Error", error);
    }
}

export async function BLOG_SLUGS() {
    try {
        let result = await axios.get(`/v1/blog/slugs`);
        return result.data.response;
    } catch (error) {
        if (error.response) {
            // that falls out of the range of 2xx
            console.log("Request Error:", error.response);
        }
        console.log("Error", error);
    }
}