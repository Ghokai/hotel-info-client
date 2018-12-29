import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";

import "./index.css";
import App from "./App";

//redux store for client side state management
import store from "./state/store";

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
