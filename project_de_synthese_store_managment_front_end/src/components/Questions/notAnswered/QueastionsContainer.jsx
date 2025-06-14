import React from "react";
import Question from "./Question";
import styled from "styled-components";
import Alert from "../../Alert";
import AnswerForm from "./AnswerForm";
import { useState } from "react";

const StyledQueastionsContainer = styled.div``;

const QueastionsContainer = ({ questions }) => {
  const [question, setQuestion] = useState(null);

  return (
    <>
      <Alert>
        <AnswerForm {...question} />
      </Alert>
      <StyledQueastionsContainer>
        {questions.length
          ? questions.map((question) => (
              <Question
                key={question._id}
                setQuestion={setQuestion}
                {...question}
              />
            ))
          : "There is no unanswered questions"}
      </StyledQueastionsContainer>
    </>
  );
};

export default QueastionsContainer;
