import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createStore } from "redux";
import reducer from "./reducers.js";
import { Provider } from "react-redux";

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById("container"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
