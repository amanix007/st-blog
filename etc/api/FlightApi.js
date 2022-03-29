import axios from "axios";
import swal from "sweetalert";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_apiBaseUrl;
axios.defaults.headers.post["Content-Type"] = "application/json";

// Purpose of this,  if the api is down for time being,
//  and  we need to continue our development work
// const FlightApiDown = true;
const FlightApiDown = false;

// FlightApiDown end

export function Alert(title, msg, type, time = 5000) {
  swal({
    title: title,
    text: msg,
    icon: type,
    buttons: false,
    timer: time,
  });
}

/* FLIGHT API */

export async function FIND_AIRPORTS(param) {
  try {
    if (sessionStorage.getItem("FIND_AIRPORT_" + param.toUpperCase()) && JSON.parse(sessionStorage.getItem("FIND_AIRPORT_" + param.toUpperCase()))) {
      return JSON.parse(sessionStorage.getItem("FIND_AIRPORT_" + param.toUpperCase()));
    }

    let result = await axios.get("/v1/flight/search/airport?name=" + param);
    sessionStorage.setItem("FIND_AIRPORT_" + param.toUpperCase(), JSON.stringify(result.data.response));
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

export async function GET_FLIGHTS(params) {
  try {
    let result = await axios.get("/v1/flight/search" + params);
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

export async function FILTER_FLIGHTS(data) {
  try {
    let result = await axios.post("/v1/flight/search/filter", data);
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

export async function GET_FLIGHT(params) {
  try {
    let result = await axios.get("/v1/flight/details" + params);
    console.log(result);
    if (!result.data.error) {
      return result.data.response;
    }
    Alert("Oops!", result.data.message, "error");
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export async function GET_FARE_RULES(params) {
  try {
    let result = await axios.get("/v1/flight/search/fare-rules" + params);
    return result.data.response;
  } catch (error) {
    if (error.response) {
      // that falls out of the range of 2xx
      console.log("Request Error:", error.response);
      Alert("Oops!", error.response.data.message, "error");
      return false;
    }
    console.log("Error", error);
  }
}

export async function BOOKING(data) {
  Alert("Please wait!", "We are confirming your flight booking and redirecting it to payment gateway", "success", 80000);

  try {
    let result = await axios.post("/v1/flight/booking/booking", data);
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

export async function FLIGHT_BOOKING_HISTORY() {
  try {
    // let result = await axios.get("/v1/flight/booking/history?accessToken=" + data);
    let result = await axios.get("/v1/flight/booking/history");
    if (!result.data.error) {
      return result.data.response;
    }
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export async function CANCEL_BOOKING(bookingCode) {
  Alert("Please wait!", "As per your request we are cancelling your flight", "success", 80000);
  try {
    let result = await axios.get("/v1/flight/booking/booking-cancel?bookingCode=" + bookingCode);
    if (!result.data.error) {
      Alert("Success", result.data.message, "success");
      return result.data.message;
    }
  } catch (error) {
    console.log(error);
    console.log("Request Error:", error.response);
    Alert("Sorry!", error.response.data.message, "error");
  }
}

export async function RESEND_VOUCHER(bookingCode) {
  Alert("Please wait!", "We are re-sending your flight confirmation to your email", "success", 80000);
  try {
    let result = await axios.get("/v1/flight/voucher-send?bookingCode=" + bookingCode);
    if (result) {
      console.log(result);
    }

    if (!result.data.error) {
      Alert("Success", result.data.message, "success");
    } else {
      Alert("Oops!", result.data.message, "error");
    }
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export async function PAYMENT_LINK(bookingCode) {
  Alert("Please wait!", "We are redirecting you to payment gateway", "success", 80000);
  try {
    let result = await axios.get("/v1/flight/booking/payment-link?bookingCode=" + bookingCode);

    if (!result.data.error) {
      return result.data.response;
    }
    Alert("Oops!", result.data.message, "error");
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export async function GATEWAY() {
  try {
    let result = await axios.get("/v1/payment/gateway");

    if (!result.data.error) {
      return result.data.response;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function GET_COUPON(data) {
  try {
    /*Alert(
            "Please wait!",
            "We are confirming your flight booking and redirect it to your payment gateway",
            "success",
            80000
        );*/

    let result = await axios.post("/v1/flight/coupon", data);
    if (!result.data.error) {
      console.log(result.data.response);
      return result.data.response;
    }
    Alert("Oops!", result.data.message, "error");
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export async function FLIGHT_ACTIVE_COUPON() {
  try {
    let result = await axios.get("/v1/flight/active-coupon");

    console.log(result);

    if (!result.data.error) {
      return result.data.response;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function FLIGHT_GROUP_REQUEST(requestObj) {
  try {
    let result = await axios.post("/v1/group-request/flight/create", requestObj);
    if (!result.data.error) {
      return result.data;
    }
    console.log(result);
  } catch (error) {
    Alert("Oops!", error.response.data.message, "error");
    console.log(error);
  }
}

export async function REVALIDATE(requestObj) {
  try {
    let result = await axios.post("/v1/flight/revalidate", requestObj);
    if (!result.data.error) {
      return result.data;
    }
    console.log(result);
  } catch (error) {
    Alert("Oops!", error.response.data.message, "error");
    console.log(error);
  }
}

export async function ADVANCE_SEARCH(params) {
  try {
    let result = await axios.get("/v1/flight/advance-search" + params);
    if (!result.data.error) {
      return result.data.response;
    }
    console.log(result);
  } catch (error) {
    // Alert("Oops!", error.response.data.message, "error");
    console.log(error);
  }
}

export async function GET_SSR_CODES() {
  try {
    let result = await axios.get("/v1/flight/ssr-codes");
    if (!result.data.error) {
      return result.data.response;
    }
    console.log(result);
  } catch (error) {
    // Alert("Oops!", error.response.data.message, "error");
    console.log(error);
  }
}
