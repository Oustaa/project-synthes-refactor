import React, { useEffect, useState } from "react";
import {
  StyledProduct,
  StyledProductImage,
  StyledProductBody,
} from "../styles/styled-product";
import { useSelector } from "react-redux";

const ProductCard = ({ title, price, image }) => {
  const { currency } = useSelector((state) => state.store.store);

  return (
    <StyledProduct title={title}>
      <StyledProductImage>
        <img src={image} alt={title} />
      </StyledProductImage>
      <StyledProductBody>
        <h2 title={title}>{title}</h2>
        <div>
          <h3>
            {price} {currency}
          </h3>
          <h3>New</h3>
        </div>
      </StyledProductBody>
    </StyledProduct>
  );
};

export default ProductCard;
