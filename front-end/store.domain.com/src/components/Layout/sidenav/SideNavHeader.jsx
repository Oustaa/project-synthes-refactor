import React from "react";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { StyledButton } from "../../../styles";
import { StyledHeader } from "../../../styles/styled-sideNav";
import { toggleNavBar } from "../../../features/ui-slice";
import { useDispatch } from "react-redux";

const SideNavHeader = ({ sideNavOpen }) => {
  const dispatch = useDispatch();
  return (
    <StyledHeader open={sideNavOpen}>
      {/* image logo */}
      {/* <img src="./images/logo-text.png" alt="payonix text logo" /> */}
      <h2>Logo</h2>
      <StyledButton
        onClick={() => dispatch(toggleNavBar())}
        bgColor="transparent"
        color="var(--dark-800)"
      >
        <BsLayoutSidebarInset />
      </StyledButton>
    </StyledHeader>
  );
};

export default SideNavHeader;
