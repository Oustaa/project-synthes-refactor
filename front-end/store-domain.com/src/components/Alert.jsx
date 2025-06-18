import React from "react";
import { StyledAlert } from "../styles";
import { useSelector, useDispatch } from "react-redux";
import { createPortal } from "react-dom";
import BackDrop from "./BackDrop";
import { closeAlert } from "../features/ui-slice";

const Alert = ({ children }) => {
  const dispatch = useDispatch();
  const { alertOpen } = useSelector((state) => state.ui);
  const closeAlertHandler = () => {
    dispatch(closeAlert());
  };
  if (alertOpen)
    return (
      <>
        {createPortal(
          <>
            <StyledAlert>{children}</StyledAlert>
            <BackDrop dark={true} clickHandler={closeAlertHandler} />
          </>,
          document.getElementById("backDrop")
        )}
      </>
    );
};

export default Alert;
