import React, { useState } from "react";
import {
  StyledAbout,
  StyledAboutForm,
  StyledAbouts,
  StyledSection,
} from "../styles/styled-extandedSection";
import { StyledButton } from "../styles";
import { BsCaretDown } from "react-icons/bs";

const ExtandedSection = ({ children, title }) => {
  const [extanded, setExtanded] = useState(false);

  const extandSection = () => {
    setExtanded((prev) => !prev);
  };

  return (
    <StyledSection>
      <header>
        <h4>{title}</h4>
        <StyledButton
          type="button"
          color={"var(--dark-600)"}
          bgColor={"transparent"}
          border={".5px solid var(--dark-600)"}
          onClick={extandSection}
        >
          {!extanded ? <BsCaretDown /> : <BsCaretDown />}
        </StyledButton>
      </header>
      {extanded && children}
      {/*
      render childers
      extande on click
      dextande on click ==> and call a callback
    */}
    </StyledSection>
  );
};

export default ExtandedSection;
