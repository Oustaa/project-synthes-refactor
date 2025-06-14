import React from "react";

import { BsLayoutSidebarInsetReverse } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";

import NavBarBtn from "./NavBarBtn";
import { StyledNavBar } from "../../../styles/styled-navBar";

const NavBar = () => {
  const dispatch = useDispatch();

  return (
    <StyledNavBar sidNavOpen={true}>
      {/* {!sidNavOpen ? (
        <Button onClick={() => dispatch(openSidebar())}>
          <BsLayoutSidebarInsetReverse />
        </Button>
      ) : null} */}
      <NavBarBtn />
    </StyledNavBar>
  );
};

export default NavBar;
