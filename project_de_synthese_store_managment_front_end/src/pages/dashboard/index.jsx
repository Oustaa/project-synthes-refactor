import React, { useEffect } from "react";
import { useState } from "react";

import OverView from "./OverView";
import Header from "./Header";
import Info from "./Info";

const Store = () => {
  const [store, setStore] = useState({});

  useEffect(() => {}, []);

  return (
    <>
      <Header />
      <OverView />
      <Info />
    </>
  );
};

export default Store;
