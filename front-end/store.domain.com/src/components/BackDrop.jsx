import React from "react";
import { StyledBackDrop } from "../styles";

const BackDrop = ({ clickHandler, dark }) => {
  return <StyledBackDrop dark={dark} onClick={clickHandler} />;
};

export default BackDrop;
