import styled from "styled-components";

export const StyledContainer = styled.div`
  width: calc(100% - var(--spacing-xxl));
  max-width: 1700px;
  margin: auto;
`;

export const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  padding-block: var(--spacing-sm);
  gap: ${({ gap }) => (gap ? gap : "var(--spacing-sm)")};
  & > * {
    min-width: fit-content;
    height: 100%;
  }
`;

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-sm) var(--spacing-xl);
  background-color: ${({ bgColor }) =>
    bgColor ? bgColor : "var( --primary-dark) "};
  border: ${({ border }) => (border ? border : "none")};
  border-radius: var(--radius-lg);
  color: ${({ color }) => (color ? color : "var(--white)")};
  & > * {
    color: ${({ color }) => (color ? color : "var(--white)")};
  }
  span {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }
`;

export const StyledInputGroup = styled.div`
  width: 100%;
  margin-bottom: ${({ mg }) => mg || "var(--spacing-lg)"};

  label {
    margin-bottom: var(--spacing-sm);
    display: inline-block;
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: var(--spacing-sm);
    border: 1px solid var(--dark-300);
    border-radius: var(--radius-lg);
    margin-bottom: ${({ mg }) => mg || "var(--spacing-lg)"};
  }
  textarea {
    height: auto;
    resize: none;
  }
  &.invalid {
    label,
    p {
      color: var(--danger);
    }
    input {
      border-color: var(--danger);
      background-color: var(--danger-100);
    }
  }

  & > div {
    margin-bottom: var(--spacing-lg);
  }
`;

export const StyledInputButton = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
  border: 1px solid var(--dark-300);
  border-radius: var(--radius-lg);
  button {
    // padding-block: var(--spacing-lg) !important;
    border-top-left-radius: 0px !important;
    border-bottom-left-radius: 0px !important;
  }
  input {
    margin: 0;
    border: none !important;
    border-top-right-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
  }
`;

export const StyledAlert = styled.div`
  width: calc(100% - var(--spacing-lg));
  max-width: 500px;
  padding: var(--spacing-xl);
  background-color: var(--white);
  border-radius: var(--radius-lg);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

export const StyledBackDrop = styled.div`
  position: absolute;
  inset: 0 0 0 0;
  background-color: ${({ dark }) => (dark ? "#3a3a3a4a" : "")};
  z-index: 300;
`;

export const StyledLoader = styled.div`
  width: 100%;
  height: ${({ height }) => (height ? height : "80vh")};
  display: flex;
  gap: var(--spacing-xl);
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
