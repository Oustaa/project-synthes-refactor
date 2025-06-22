import React, { useState, useEffect } from "react";

import styled from "styled-components";

import Form from "./Form";
import ProductOverView from "./OverView";

const StyledCreateProduct = styled.div`
  display: flex;
  gap: var(--spacing-lg);
  position: relative;
`;

const CreateProduct = () => {
  const [productInfo, setProductInfo] = useState({});
  const [images, setImages] = useState([]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault(); // Cancel the default event behavior

      const confirmationMessage = "Are you sure you want to leave this page?";
      event.returnValue = confirmationMessage; // Chrome requires the returnValue property to be set

      return confirmationMessage;
    };

    const handleReload = (event) => {
      const confirmationMessage = "Are you sure you want to reload this page?";
      event.returnValue = confirmationMessage; // Chrome requires the returnValue property to be set

      // Show the confirmation dialog
      return confirmationMessage;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleReload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleReload);
    };
  }, []);

  return (
    <StyledCreateProduct>
      <Form
        productInfo={productInfo}
        setProductInfo={setProductInfo}
        setImages={setImages}
        images={images}
      />
      <ProductOverView
        images={images}
        setImages={setImages}
        productInfo={productInfo}
      />
    </StyledCreateProduct>
  );
};

export default CreateProduct;
