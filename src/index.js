import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import smoothscrollPolyfill from "smoothscroll-polyfill";
import { MatomoProvider, createInstance } from "@datapunt/matomo-tracker-react";

import "bootstrap/dist/css/bootstrap.css";

import App from "./App";

smoothscrollPolyfill.polyfill();

const instance = createInstance({
  urlBase: "https://matomo.vlki.cz/",
  siteId: 4,
});

ReactDOM.hydrate(
  <MatomoProvider value={instance}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MatomoProvider>,
  document.getElementById("root")
);
