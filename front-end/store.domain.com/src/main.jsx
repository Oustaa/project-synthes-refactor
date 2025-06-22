import React from "react";
import App from "./App";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import store from "./store";
import ReactDOM from "react-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

import { getProducts } from "./features/products-slice";
import { getOrders } from "./features/store-slice";

store.dispatch(getProducts());
store.dispatch(getOrders());

if (import.meta.env.VITE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
  </>,
);
