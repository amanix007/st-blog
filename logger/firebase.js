import firebase from "firebase/app";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB2LynOMinAYqqF5xfMxR9zJEtDm2pZ7uA",
  authDomain: "sharetrip-96054.firebaseapp.com",
  databaseURL: "https://sharetrip-96054.firebaseio.com",
  projectId: "sharetrip-96054",
  storageBucket: "sharetrip-96054.appspot.com",
  messagingSenderId: "346164418203",
  appId: "1:346164418203:web:10ae29b2b5a1fc19",
  measurementId: "G-9098T6H32G",
};

// Initialize Firebase
let logEvent = null;
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);


  if (typeof window !== undefined) {
    if (window.navigator !== undefined) {
      logEvent = firebase.analytics().logEvent;
    }
  }
}


const logFirebase = (event, data) => {
  if (logEvent) {
    console.log('event:', event)
    logEvent(event, data);
  }
};




export { firebase, logEvent, logFirebase };
