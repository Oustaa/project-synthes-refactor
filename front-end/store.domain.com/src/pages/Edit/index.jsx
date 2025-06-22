import React, { useState, useEffect } from "react";

import styled from "styled-components";
import Loader from "../../components/Loader";
import Form from "./Form";
import ProductOverView from "./OverView";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../features/products-slice";

const StyledCreateProduct = styled.div`
  display: flex;
  gap: var(--spacing-lg);
  position: relative;
`;

async function getProduct(products, id, cb, loading) {
  const product = await products.find(({ _id }) => _id === id);

  cb(product);
  loading(false);
}

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const products = useSelector((state) => state.products.value);
  const [loading, setLoading] = useState(true);
  const [productInfo, setProductInfo] = useState({});

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

  useEffect(() => {
    if (products.length === 0) dispatch(getProducts());
    else {
      getProduct(products, id, setProductInfo, setLoading);
    }
  }, [id, products, dispatch]);

  return (
    <StyledCreateProduct>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Form
            productInfo={productInfo}
            setProductInfo={setProductInfo}
            id={id}
          />
          <ProductOverView
            images={productInfo.images}
            productInfo={productInfo}
          />
        </>
      )}
    </StyledCreateProduct>
  );
};

export default CreateProduct;
