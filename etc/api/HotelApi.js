import axios from "axios";
import swal from "sweetalert";



axios.defaults.baseURL = process.env.NEXT_PUBLIC_apiBaseUrl;
axios.defaults.headers.post["Content-Type"] = "application/json";




export function Alert(title, msg, type, time = 5000) {
    swal({
        title: title,
        text: msg,
        icon: type,
        buttons: false,
        timer: time
    });
}


export async function FIND_CITIES(city) {
    try {
        if (sessionStorage.getItem("FIND_CITIES_" + city.toUpperCase()) && JSON.parse(sessionStorage.getItem("FIND_CITIES_" + city.toUpperCase()))) {
            return JSON.parse(sessionStorage.getItem("FIND_CITIES_" + city.toUpperCase()));
        }
        let result = await axios.get("/v1/hotel/search/property?keyword=" + city);
        sessionStorage.setItem("FIND_CITIES_" + city.toUpperCase(), JSON.stringify(result.data.response));
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


export async function HOTEL_MAPS(param) {





    try {
        let result = await axios.get("/v1/hotel/search/maps?searchCode=" + param);
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


export async function GET_HOTELS(params) {

    try {
        let result = await axios.get("/v1/hotel/search?" + params);
        console.log(result);
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


export async function GET_HOTEL(params) {
    try {
        let result = await axios.get("/v1/hotel/detail" + params);
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

export async function GET_ROOMS(params) {
    try {

        let result = await axios.get("/v1/hotel/rooms" + params);
        // console.log("GET_ROOMS:", result);
        return result.data.response;
    } catch (error) {
        if (error.response) {
            // that falls out of the range of 2xx
            console.log("Request Error:", error.response);
            // Alert("Oops!", error.response.data.message, "error");
        }
        console.log("Error", error);
    }
}




export async function CANCELLATION_POLICY(obj) {


    try {
        let result = await axios.post("/v1/hotel/cancellation-policy", obj);
        return result.data.response;
    } catch (error) {
        if (error.response) {
            // that falls out of the range of 2xx
            console.log("Request Error:", error.response);
            // Alert("Oops!", error.response.data.message, "error");
        }
        console.log("Error", error);
    }
}

export async function BOOKING(obj) {

    try {
        if (localStorage.getItem('accessToken'))
            obj.accesstoken = localStorage.getItem("accessToken");

        let result = await axios.post("/v1/hotel/booking", obj);
        console.log(result)
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







export async function CANCEL_BOOKING(voucherId) {
    Alert(
        "Please wait!",
        "As per your request we are cancelling your hotel",
        "success",
        80000
    );
    try {

        let result = await axios.post("/v1/hotel/cancel-booking", { voucherId });
        if (!result.data.error) {
            Alert("Success", result.data.message, "success");
            return result.data.message;
        }
    } catch (error) {
        if (error.response) {
            // that falls out of the range of 2xx
            console.log("Request Error:", error.response);
            Alert("Sorry!", error.response.data.message, "error");
        }
        console.log("Error", error);
    }
}







export async function HOTEL_BOOKING_HISTORY(params) {


    try {
        let result = await axios.get("/v1/hotel/booking-history?" + params);

        if (!result.data.error) {
            return result.data.response;
        }
        console.log(result);
    } catch (error) {
        // Alert("Oops!", error.response.data.message, "error");
        console.log(error);
    }
}

export async function HOTEL_BOOKING_HISTORY_DETAILS(voucherId) {



    try {
        let result = await axios.get("/v1/hotel/booking-history-detail?" + voucherId);

        if (!result.data.error) {
            return result.data.response;
        }
        console.log(result);
    } catch (error) {
        // Alert("Oops!", error.response.data.message, "error");
        console.log(error);
    }
}

export async function HOTEL_GROUP_REQUEST(requestObj) {
    try {

        let result = await axios.post("/v1/group-request/hotel/create", requestObj);
        if (!result.data.error) {
            return result.data;
        }
        console.log(result);
    } catch (error) {
        Alert("Oops!", error.response.data.message, "error");
        console.log(error);
    }
}