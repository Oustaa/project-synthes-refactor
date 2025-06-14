import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { StyledButton } from "../../../styles";
import { openAlert } from "../../../features/ui-slice";

const StyledQuestion = styled.div`
  border: 1px dashed var(--dark-300);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);

  & + & {
    margin-top: var(--spacing-lg);
  }
`;

const StyledQuestionsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: var(--spacing-lg);
`;

const StyledQuestionForProd = styled.div`
  border-top: 1px solid var(--dark-300);
  padding-top: var(--spacing-lg);
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;

  img {
    width: 130px;
  }

  .prod_info {
    color: var(--dark-500);
    display: flex;
    flex-direction: column;
    h4 {
      font-size: 1.3rem;
    }

    h5 {
      margin: 0;
    }
  }
`;

const Question = ({ text, product_id, _id, setQuestion }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.store.store);
  const products = useSelector((state) => state.products.value);
  const [productInfo, setProductInfo] = useState({});

  useEffect(() => {
    products.forEach((product) => {
      if (product._id === product_id) setProductInfo(product);
    });
  }, [products, product_id]);

  const openAnswerAlert = () => {
    setQuestion({ text, product_id, _id });
    dispatch(openAlert());
  };

  return (
    <>
      <StyledQuestion>
        <StyledQuestionsHeader>
          <h2>{text}</h2>
          <StyledButton onClick={openAnswerAlert}>Answer</StyledButton>
        </StyledQuestionsHeader>
        <StyledQuestionForProd>
          <img
            crossOrigin="anonymous"
            src={
              productInfo?.images &&
              `${process.env.REACT_APP_BASE_URL}/images/${store.name}/products/${productInfo?.images[0]}`
            }
            alt=""
          />
          <div className="prod_info">
            <h5>{productInfo?.title}</h5>
            <h4>
              {productInfo.price} {store.currency}
            </h4>
          </div>
        </StyledQuestionForProd>
      </StyledQuestion>
    </>
  );
};

export default Question;
