import React, { useState } from "react";
import styled from "styled-components";
import Product from "../pages/create/product/OverView";
import { FlexContainer, StyledButton, StyledInputGroup } from "../styles";
import { Link } from "react-router-dom";
import Alert from "./Alert";
import { openAlert, closeAlert } from "../features/ui-slice";
import { deleteProduct } from "../features/products-slice";
import { useDispatch } from "react-redux";

const StyledProductDisplay = styled.td`
  width: 100%;
  max-width: 100px;
  border: 1px solid var(--dark-100);
  padding: var(--spacing-lg);
`;

const DisplayedProduct = ({ data }) => {
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const dispatch = useDispatch();

  const openDeleteAlert = () => {
    dispatch(openAlert());
  };

  const deleteHandler = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}/auth/stores/confirm/pass`, {
      method: "POST",
      body: JSON.stringify({ password }),
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then(({ matched }) => {
        if (matched) {
          fetch(`${process.env.REACT_APP_BASE_URL}/products/${data._id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              authorization: localStorage.getItem("token"),
            },
          })
            .then((res) => res.json())
            .then(({ acknowledged, deletedCount }) => {
              if (acknowledged && deletedCount === 1) {
                cancelDeleteHandler();
                dispatch(deleteProduct(data._id));
              }
            })
            .catch((err) => console.log(err));
        } else setPasswordValid(false);
      })
      .catch((err) => console.log(err));
  };

  const cancelDeleteHandler = () => {
    dispatch(closeAlert());
    setPassword("");
  };

  return (
    <>
      <Alert>
        <StyledInputGroup className={passwordValid ? "" : "invalid"}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            id="password"
          />
          <FlexContainer>
            <StyledButton onClick={deleteHandler} bgColor="var(--danger)">
              Delete
            </StyledButton>
            <StyledButton onClick={cancelDeleteHandler}>Cancel</StyledButton>
          </FlexContainer>
        </StyledInputGroup>
      </Alert>
      <StyledProductDisplay colSpan="10">
        <FlexContainer>
          <StyledButton bgColor="var(--warning)">
            <Link to={`/products/edit/${data._id}`}>Edit Product</Link>
          </StyledButton>
          <StyledButton onClick={openDeleteAlert} bgColor="var(--danger)">
            delete Product
          </StyledButton>
        </FlexContainer>
        <Product
          width="100%"
          type={"display"}
          productInfo={data}
          images={data.images}
        />
      </StyledProductDisplay>
    </>
  );
};

export default DisplayedProduct;
