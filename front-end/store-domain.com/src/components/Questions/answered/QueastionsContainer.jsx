import React, { useState, useEffect } from "react";
import Question from "./Question";
import styled from "styled-components";
import { useSelector } from "react-redux";

const StyledQueastionsContainer = styled.div``;

const QueastionsContainer = () => {
  const [questions, setQuestion] = useState([]);
  const products = useSelector((state) => state.products.value);

  useEffect(() => {
    products.forEach((product) => {
      product.QandA.forEach((qanda) => {
        setQuestion((prev) => {
          return [
            ...prev,
            {
              ...qanda,
              image: product.images[0],
              title: product.title,
              price: product.price,
            },
          ];
        });
      });
    });
  }, []);

  return (
    <>
      <StyledQueastionsContainer>
        {questions.length
          ? questions.map((question, i) => <Question key={i} {...question} />)
          : "There is no answered questions"}
      </StyledQueastionsContainer>
    </>
  );
};

export default QueastionsContainer;
