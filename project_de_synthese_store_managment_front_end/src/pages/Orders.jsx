import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { getOrders } from "../features/store-slice";
import { BsDashLg } from "react-icons/bs";
import Order from "../components/Order";
import Table from "../components/table/Table";
import styled from "styled-components";

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
const tableHeaders = {
  "Order Id": { value: "_id" },
  "Send To": {
    checked: true,
    check: (data) => {
      return data.user.fullname;
    },
  },
  "Item Count": {
    checked: true,
    check: (data) => {
      return data.items.reduce((acc, item) => acc + item.qte, 0);
    },
  },
  "Total price": {
    checked: true,
    check: (data) => {
      return (
        data.currency +
        data.items.reduce((acc, item) => acc + item.price * item.qte, 0)
      );
    },
  },
  "Ordred At": {
    checked: true,
    check: (data) => {
      return new Date(data.createdAt).toLocaleDateString();
    },
  },
};

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.store);

  console.log(orders);

  useEffect(() => {
    if (!orders.length) dispatch(getOrders());
  }, [dispatch, orders.length]);

  if (loading) return <Loader />;

  return (
    <>
      <StyledHader>
        <h1>Orders</h1>
      </StyledHader>
      <Table
        emptyMessage="There is no product, try adding one now..."
        headers={tableHeaders}
        data={orders}
        displayedComponentOnclick={(data) => <Order data={data} />}
      />
    </>
  );
};

export default Orders;
