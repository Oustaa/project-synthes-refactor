import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { getOrders } from "./features/store-slice";
import { getProducts } from "./features/products-slice";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import store from "./store";

import { disableReactDevTools } from "@fvilers/disable-react-devtools";

store.dispatch(getProducts());
store.dispatch(getOrders());

if (process.env.REACT_APP_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
  </>
);
