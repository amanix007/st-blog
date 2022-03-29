import swal from "sweetalert";
export let isLoggedIn = () => {
  if (!localStorage.getItem("accessToken")) {
    Alert("User not logged in", "User have to be logged in to make this request", "error");
    return false;
  } else {
    return true;
  }
};
export const NewInputDesignOBJ = {
  notchedOutline: "stnotchedOutline",
  input: "stInput",
};
export const DoMMMYYYY = "Do MMM YYYY";
export const DDMMMYY = "DD MMM YY";

export const YYYYMMDD = "YYYY-MM-DD";

export let Alert = (title, msg, type, time = 5000) => {
  swal({
    title: title,
    text: msg,
    icon: type,
    buttons: false,
    timer: time,
  });
};

export const InputProps = {
  classes: {
    focused: "st-input-focus",
  },
  autocomplete: "new-password",
};

export let svgProps = {
  cacheRequests: true,
  uniquifyIDs: true,
};

export let kFormatter = (num) => {
  return Math.abs(num) > 999 ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k" : Math.sign(num) * Math.abs(num);
};

export let between = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const HotelTitleNames = ["Mr", "Ms", "Mrs", "Mstr"];

export const removeSpace = (v) => v.replace(/\s/g, "");



