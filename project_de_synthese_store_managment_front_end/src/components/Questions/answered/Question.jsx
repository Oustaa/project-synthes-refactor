import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const StyledQuestion = styled.div`
  border: 1px dashed var(--dark-300);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);

  & + & {
    margin-top: var(--spacing-lg);
  }
`;

const StyledQuestionsHeader = styled.div`
  // display: flex;
  // align-items: center;
  // justify-content: space-between;
  // padding-bottom: var(--spacing-lg);
`;

const StyledQuestionForProd = styled.div`
  border-top: 1px solid var(--dark-300);
  padding-top: var(--spacing-lg);
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;

  img {
    width: 90px;
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

const Question = ({ question, answer, image, title, price }) => {
  const store = useSelector((state) => state.store.store);

  return (
    <>
      <StyledQuestion>
        <StyledQuestionsHeader>
          <h4>{question}</h4>
          <h2>{answer}</h2>
        </StyledQuestionsHeader>
        <StyledQuestionForProd>
          <img
            crossOrigin="anonymous"
            src={
              image &&
              `${process.env.REACT_APP_BASE_URL}/images/${store.name}/products/${image}`
            }
            alt=""
          />
          <div className="prod_info">
            <h5>{title}</h5>
            <h4>
              {price} {store.currency}
            </h4>
          </div>
        </StyledQuestionForProd>
      </StyledQuestion>
    </>
  );
};

export default Question;
