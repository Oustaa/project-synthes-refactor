import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Loader from "./Loader";
import axios from "axios";
import Table from "../components/table/Table";

async function getOrderItems(items, callback) {
  const ids = items.map(({ product }) => product);
  callback({ value: [], loading: true });
  const resp = await axios.post(
    `${process.env.REACT_APP_BASE_URL}/products/ids`,
    {
      ids,
    }
  );

  const products = await resp.data;

  const orderItems = items.map((item) => {
    return {
      ...item,
      images: products.find((product) => product._id === item.product).images,
    };
  });

  callback({ value: orderItems, loading: false });
}

const StyledHader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    color: var(--primary);
  }
  padding-bottom: var(--spacing-lg);
  select {
    border: none;
    font-size: 1.1rem;
  }
`;
const StyledDisplayedOrder = styled.td`
  width: 100%;
  max-width: 100px;
  border: 1px solid var(--dark-100);
  padding: var(--spacing-lg);
`;

const StyledInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-xxl);

  h2 {
    min-width: 80px;
  }

  h3:not(:nth-child(2)) {
    color: var(--dark-400);
  }
`;

const ORDERS_HEADERS = {
  "Product SKU": { value: "product" },
  Image: { type: "image", value: "images" },
  Quantity: { value: "qte" },
  Price: { value: "price" },
  Status: { value: "status" },
};

const Order = ({ data }) => {
  const [orderItems, setOrdersItems] = useState({ value: [], loading: true });

  useEffect(() => {
    getOrderItems(data.items, setOrdersItems);
  }, [data.items]);
  useEffect(() => {
    console.log(orderItems);
  }, [orderItems]);

  return (
    <StyledDisplayedOrder colSpan="5">
      {orderItems.loading ? (
        <Loader height={"250px"} />
      ) : (
        <>
          <StyledInfo>
            <h2>Sent To:</h2>
            <h3>{data.user?.fullname}</h3>
            <h3>{data.user?.email}</h3>
            <h3>{data.user?.phone}</h3>
          </StyledInfo>
          <StyledInfo>
            <h2>At:</h2>
            <h3>
              {data.user?.adress?.county}, {data.user?.adress?.city},
              {data.user?.adress?.street}
            </h3>
          </StyledInfo>

          <Table
            TableHead={<h2>To sent:</h2>}
            data={orderItems.value}
            headers={ORDERS_HEADERS}
          />
        </>
      )}
    </StyledDisplayedOrder>
  );
};

export default Order;
