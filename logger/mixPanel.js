import mixpanel from "mixpanel-browser/src/loader-module";
import moment from "moment";

mixpanel.init("d1fa3c5df1cccf074a4539fce88fe4b0");

const setUserAfterSignUp = (user) => mixpanel.people.set(user);

if (localStorage.getItem("accessToken") && localStorage.getItem("profile")) {
  let tempObj = JSON.parse(localStorage.getItem("profile"));

  let user = {
    $email: tempObj.email, // only reserved properties need the $
    "Sign up date": moment().toISOString(), // Send dates in ISO timestamp format (e.g. "2020-01-02T21:07:03Z")
    USER_ID: tempObj.username,
  };
  setUserAfterSignUp(user);
}

export const logMixPanel = (event, data) => {
  if (localStorage.getItem("accessToken") && localStorage.getItem("profile")) {
    let tempObj = JSON.parse(localStorage.getItem("profile"));
    mixpanel.identify(tempObj.username);
  }
  mixpanel.track(event, data);
};
