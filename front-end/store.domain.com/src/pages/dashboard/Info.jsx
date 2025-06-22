import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/products-slice";
import { getOrders } from "../../features/store-slice";
import { useEffect } from "react";

const StyledInfoContainer = styled.div`
  padding-block: var(--spacing-xxl);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
`;

const StyledInfo = styled.div`
  border-radius: var(--radius-lg);
  overflow: hidden;
`;

const StyledInfoHeader = styled.div`
  background-color: var(--primary);
  padding: var(--spacing-lg);

  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--white);

  a {
    color: var(--white);
  }
`;
const StyledInfoBody = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px dashed var(--dark-300);
  border-left: 1px dashed var(--dark-300);
  border-right: 1px dashed var(--dark-300);
`;

const Info = () => {
  const dispatch = useDispatch();
  const { value: products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.store);

  useEffect(() => {
    if (orders.length === 0) dispatch(getOrders());
    if (products.length === 0) dispatch(getProducts());
  }, []);

  return (
    <StyledInfoContainer>
      <StyledInfo>
        <StyledInfoHeader>
          <h2>Products</h2>
          <Link to={"/products"}>More...</Link>
        </StyledInfoHeader>
        <StyledInfoBody>no order yet....</StyledInfoBody>
      </StyledInfo>
      <StyledInfo>
        <StyledInfoHeader>
          <h2>Orders</h2>
          <Link to={"/orders"}>More...</Link>
        </StyledInfoHeader>
        <StyledInfoBody>no order yet....</StyledInfoBody>
      </StyledInfo>
      <StyledInfo>
        <StyledInfoHeader>
          <h2>Questions</h2>
          <Link to={"/questions"}>More...</Link>
        </StyledInfoHeader>
        <StyledInfoBody>no questions yet....</StyledInfoBody>
      </StyledInfo>
    </StyledInfoContainer>
  );
};

export default Info;
