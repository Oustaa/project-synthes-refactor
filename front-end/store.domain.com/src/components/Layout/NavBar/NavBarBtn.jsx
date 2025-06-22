import React from "react";

import { MdLogout } from "react-icons/md";
import { logout } from "../../../features/auth-slice";
import { useDispatch, useSelector } from "react-redux";

import { StyledButton } from "../../../styles";
import { StyledBtnContainer } from "../../../styles/styled-navBar";

const NavBarBtn = () => {
  const dispatch = useDispatch();
  const storename = useSelector((state) => state.store.store).name;

  const logOutHandler = () => {
    dispatch(logout());
    localStorage.clear();
  };

  return (
    <StyledBtnContainer>
      <span>{storename}</span>
      <StyledButton
        onClick={logOutHandler}
        bgColor="var(--white)"
        color="var(--dark-700)"
      >
        <MdLogout />
      </StyledButton>
    </StyledBtnContainer>
  );
};

export default NavBarBtn;
