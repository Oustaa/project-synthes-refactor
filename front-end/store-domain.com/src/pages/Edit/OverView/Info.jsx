import React from "react";
import styled from "styled-components";
import { FlexContainer } from "../../../styles";
import { BsStarFill } from "react-icons/bs";
import getSymbolFromCurrency from "currency-symbol-map";

const StyledInfoContainer = styled.div`
  width: 50%;
  color: var(--dark-800);

  h2.price {
    margin-bottom: var(--spacing-xl);
  }

  .fake-link {
    color: #5f9fff;
    text-decoration: underline;
  }

  .stars {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--warning);
    span {
      color: var(--dark-800);
    }
  }
`;

const StyledSpecifications = styled.div`
  h3 {
    color: var(--dark-800);
  }

  ul {
    padding: 0;
  }

  ul li {
    display: flex;
    align-items: flex-start;
    padding: 0;
    margin-bottom: var(--spacing-sm);

    h4 {
      margin: 0;
      color: var(--dark-500);
      font-weight: 500;
      &.title {
        margin-right: var(--spacing-lg);
        width: 40%;
        color: var(--dark-700);
        font-weight: 700;
      }
    }
  }
`;

const Info = ({ productInfo, storeInfo }) => {
  return (
    <StyledInfoContainer>
      <h2>{productInfo.title || "Product Title"} </h2>
      <hr />
      <p className="fake-link">{storeInfo.name}</p>
      <FlexContainer gap={"var(--spacing-xl)"}>
        <div className="stars">
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <span>5 (459)</span>
        </div>
        <p>Number of answered questions</p>
      </FlexContainer>
      <hr />
      <h2 className="price">
        {productInfo.price
          ? getSymbolFromCurrency(storeInfo.currency) + productInfo.price
          : "Product Price"}
      </h2>

      {productInfo.specifications &&
        productInfo?.specifications?.length > 0 && (
          <StyledSpecifications>
            <ul>
              {productInfo.specifications.map((specification, i) => (
                <li key={i}>
                  <h4 className="title">{specification.name}</h4>
                  <h4>{specification.value}</h4>
                </li>
              ))}
            </ul>
          </StyledSpecifications>
        )}
      {productInfo?.about?.length ? (
        <>
          <hr />
          <h3>About This Item</h3>
          <ul>
            {productInfo?.about?.map((about) => (
              <li key={about}>{about}</li>
            ))}
          </ul>
        </>
      ) : null}
    </StyledInfoContainer>
  );
};

export default Info;
