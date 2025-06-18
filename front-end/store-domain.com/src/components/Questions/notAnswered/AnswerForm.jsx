import React, { useState } from "react";
import { StyledButton, StyledInputGroup } from "../../../styles";
import axios from "axios";
import { deleteQuestion } from "../../../features/store-slice";
import { closeAlert } from "../../../features/ui-slice";
import { useDispatch } from "react-redux";

const AnswerForm = ({ text, product_id, _id }) => {
  const dispatch = useDispatch();

  const [answer, setAnswer] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/stores/answer/${product_id}`,
      { question: text, answer },
      {
        headers: { Authorization: localStorage.getItem("token") },
        params: { questionId: _id },
      }
    );
    const { modifiedCount, acknowledged } = await response.data;

    if (modifiedCount && acknowledged) {
      dispatch(closeAlert());
      dispatch(deleteQuestion(_id));
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <StyledInputGroup>
        <label htmlFor="question">Question</label>
        <textarea
          name="question"
          id="question"
          cols="30"
          rows="auto"
          readOnly={true}
          value={text}
        ></textarea>
      </StyledInputGroup>
      <StyledInputGroup>
        <label htmlFor="answer">Answer</label>
        <textarea
          name="answer"
          id="answer"
          cols="30"
          rows="auto"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        ></textarea>
      </StyledInputGroup>
      <StyledButton>Answer</StyledButton>
    </form>
  );
};

export default AnswerForm;
