import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD7N5BFfjk3_roF5zVPjgo5X9TO29UqW8M",
  authDomain: "mern-ecom-bbadc.firebaseapp.com",
  projectId: "mern-ecom-bbadc",
  storageBucket: "mern-ecom-bbadc.appspot.com",
  messagingSenderId: "718244470730",
  appId: "1:718244470730:web:7f11ce5a3a08f0dbcbb933",
  measurementId: "G-0BSL09FGF1",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
