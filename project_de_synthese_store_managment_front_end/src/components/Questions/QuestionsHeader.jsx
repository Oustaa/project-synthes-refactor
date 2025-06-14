import React from "react";
import styled from "styled-components";
import { StyledInputGroup } from "../../styles";

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

const QuestionsHeader = ({ setQuestionsType, questionsType }) => {
  const changeHandler = (e) => {
    setQuestionsType(e.target.value);
  };

  return (
    <StyledHader>
      <h1>Questions</h1>
      <form>
        <StyledInputGroup mg="none">
          <select name="" id="" value={questionsType} onChange={changeHandler}>
            <option value="notAnswered">Not answered</option>
            <option value="answered">Answered</option>
          </select>
        </StyledInputGroup>
      </form>
    </StyledHader>
  );
};

export default QuestionsHeader;
