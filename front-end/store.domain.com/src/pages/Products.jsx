import React, { useEffect } from "react";
import Table from "../components/table/Table";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../features/products-slice";
import Loader from "../components/Loader";
import { BsDashLg } from "react-icons/bs";
import styled from "styled-components";
import DisplayedProduct from "../components/DisplayedProduct";
import { StyledButton } from "../styles";
import { StyledTableHead } from "../styles/styled-table";
import { Link } from "react-router-dom";

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
  Image: { type: "image", value: "images" },
  Title: {
    value: "title",
    exec: (field) => {
      return field.slice(0, 45) + "...";
    },
  },
  Description: {
    checked: true,
    check: (data) => {
      if (data["description"] !== "") {
        return data.description.slice(0, 45) + "...";
      }
      return <BsDashLg />;
    },
  },
  Price: {
    value: "price",
  },
  "Stock Quantity": {
    value: "stock_Quantity",
  },
  "Added At": { type: "date", value: "inserted_at" },
  Views: { value: "views" },
  Visits: { value: "visits" },
  "V / V Ratio": {
    checked: true,
    check: (data) => {
      const vvRasio = data.views / data.visits;
      if (vvRasio === Infinity) return <BsDashLg />;
      else if (vvRasio) return vvRasio.toFixed(2);
      return 0;
    },
  },
  Reviews: {
    checked: true,
    check: (data) => {
      return data.reviews.length;
    },
  },
};

const TableHead = () => (
  <StyledTableHead>
    <div>
      <StyledButton color="var(--white)" bgColor="var(--primary)">
        <Link to={"/create/product"}>Add Product</Link>
      </StyledButton>
    </div>
  </StyledTableHead>
);

const Products = () => {
  const dispatch = useDispatch();
  const { value: products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getProducts());
    }
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <StyledHader>
        <h1>Products</h1>
      </StyledHader>
      <Table
        TableHead={<TableHead />}
        emptyMessage="There is no product, try adding one now..."
        headers={tableHeaders}
        data={products}
        displayedComponentOnclick={(data) => <DisplayedProduct data={data} />}
      />
    </>
  );
};

export default Products;
