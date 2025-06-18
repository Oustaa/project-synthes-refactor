import React, { useState } from "react";
import QuestionConatainerNotAnswered from "../components/Questions/notAnswered/QueastionsContainer";
import QuestionConatainerAnswered from "../components/Questions/answered/QueastionsContainer";
import { useSelector } from "react-redux";
import QuestionsHeader from "../components/Questions/QuestionsHeader";

const Questions = () => {
  const [questionsType, setQuestionsType] = useState("notAnswered");
  const storeQuestions = useSelector((state) => state.store.store.questions);

  return (
    <>
      <QuestionsHeader
        questionsType={questionsType}
        setQuestionsType={setQuestionsType}
      />
      {questionsType === "answered" ? (
        <QuestionConatainerAnswered />
      ) : (
        <QuestionConatainerNotAnswered questions={storeQuestions} />
      )}
    </>
  );
};

export default Questions;
